
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from 'zod'
import { db } from "./db";
import { validatePassword } from "@/app/utils/password"






const providers = [
    CredentialsProvider({
        name: 'credentials',
        credentials: {
            email: { label: "email", type: "text", },
            password: { label: "password", type: "password" },
        },

        async authorize(credentials, req) {


            try {
                if (!(credentials?.email && credentials?.password)) {
                    throw new Error('email, passwword is required')
                }

                const credSchema = z.object({
                    email: z.string().email({ message: 'Email is invalid' }),
                    password: z.string().min(6, { message: 'Password should be more than 6 characters' }),
                })

                const credVal = credSchema.safeParse({ email: credentials.email, password: credentials.password })

                if (!credVal.success) throw new Error(credVal.error.message)

                const user = await db.user.findUnique({
                    where: {
                        email: credentials.email.toLocaleLowerCase()
                    },
                    include: {
                        profile: true
                    }
                })

                if (!user) throw new Error('User does not exist')

                const passVal = await validatePassword(credentials.password, user.password)

                if (!passVal) throw new Error('Incorrect password')

                return {
                    id: user.id,
                    name: user.profile?.name ?? 'N/A',
                    email: user.email,
                    role: user.role,
                    image: user.profile?.imageUrl ?? null
                }

            } catch (error: any) {
                console.log(error);
                if (typeof error === 'object') {
                    throw new Error(error)
                }
                throw new Error('Something went wrong...')


            }



        }
    }
    )
]



export const authOptions = {
    providers,
    pages: {
        signIn: '/login',
    },
    jwt: {
        // The maximum age of the NextAuth.js issued JWT in seconds.
        // Defaults to `session.maxAge`.
        maxAge: 60 * 60 * 2,

    },
    callbacks: {
        async jwt(data) {

            if (data.trigger === 'update') {
                const id = data.token.id
                if (id) {
                    console.log('inside the id');
                    const user = await db.user.findUnique({
                        where: {
                            id: id as string
                        },
                        include: {
                            profile: true
                        }
                    })

                    return {
                        ...data.token,
                        ...data.user,
                        name: user?.profile?.name ?? 'N/A',
                        email: user?.email,
                        image: user?.profile?.imageUrl ?? null,
                        picture: user?.profile?.imageUrl ?? null
                    }
                }

            }



            return { ...data.token, ...data.user }
        },
        async session(data) {


            return { ...data.session, ...data.token }
        }
    }

} satisfies NextAuthOptions