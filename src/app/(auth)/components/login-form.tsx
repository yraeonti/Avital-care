"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import * as z from "zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Icons } from "@/components/icons"
import { useState } from "react"
import { getSession } from "next-auth/react"
import { SessionWithExtraData } from "@/app/services/types"
import { Role } from "@/app/services/types"

const formSchema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(6, { message: 'Password must be more than 6 characters' })
})


export default function LoginForm() {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);

        setIsLoading(true)

        const res = await signIn('credentials', { ...values, redirect: false })

        console.log('ok', res);

        if (res?.status === 200) {
            const session: SessionWithExtraData | null = await getSession()

            if (session) {

                const { role } = session
                if (role === Role.PATIENT) {
                    return router.push('/patient/dashboard')
                } else if (role === Role.DOCTOR) {
                    return router.push('/doctor/dashboard')
                } else {
                    if (role === 'ADMIN') return router.push('/admin/dashboard')
                }
            }
            return router.push('/login')
        }

        console.log('error', res);
        setIsLoading(false)

    }
    return (
        <div className="border border-neutral-100 py-10 px-10 md:px-28 w-11/12 sm:w-4/5 lg:w-1/2 bg-white mt-32 shadow-lg">

            <div className="flex flex-col items-center space-y-5">
                <p>Logo</p>

                <h1 className="text-3xl font-semibold">Welcome Back</h1>
            </div>

            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>

                                < FormMessage />

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Password" {...field} />
                                </FormControl>

                                < FormMessage />

                            </FormItem>
                        )}
                    />
                    <div className="flex justify-center">
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Login
                        </Button>
                    </div>


                </form>
            </Form>

            <div className="font-light mt-5 flex justify-center space-x-2">
                <p>Don't have an account? {" "} </p><Link href="/signup" className="font-semibold ">Sign Up</Link>
            </div>


        </div>
    )

}