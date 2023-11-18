import { NextResponse } from "next/server";
import { z, ZodError } from "zod"
import { fromZodError } from 'zod-validation-error';
import { db } from "@/app/services/db";
import { hashPassword } from "@/app/utils/password";
import { Role } from "@/app/services/types";


export async function POST(req: Request) {

    try {

        const userCred = z.object({
            email: z.string().email({ message: 'Please provide valid email' }),
            first_name: z.string(),
            last_name: z.string(),
            password: z.string().min(6),
            role: z.nativeEnum(Role),
            address: z.string(),
            nin: z.string().min(10),
            telephone: z.string().min(10),
            date_of_birth: z.coerce.date(),
            specialty: z.coerce.number()
        })


        const partialUserCred = userCred.partial({
            address: true,
            date_of_birth: true,
            specialty: true
        })

        type UserCred = z.infer<typeof partialUserCred>

        const {
            email,
            first_name,
            last_name,
            password,
            role,
            address,
            nin,
            telephone,
            date_of_birth,
            specialty,
        }: UserCred = await req.json()

        console.log(

            email,
            first_name,
            last_name,
            password,
            role,
            address,
            nin,
            telephone,
            date_of_birth,
            specialty,
        );




        let userVal: { success: true; data: any; } | { success: false; error: ZodError; }

        if (role === Role.PATIENT) {

            userVal = partialUserCred.safeParse({ email, first_name, last_name, password, address, nin, telephone, date_of_birth, role })
        } else {
            userVal = partialUserCred.safeParse({ email, first_name, last_name, password, nin, telephone, specialty, role })
        }

        if (!userVal.success) {

            const errors = fromZodError(userVal.error)
            console.log(errors);
            return NextResponse.json({ message: errors.message }, { status: 400 })
        }

        const name = `${first_name} ${last_name}`

        const existingUser = await db.user.findFirst({
            where: {
                email
            }
        })

        if (existingUser) return NextResponse.json({ message: 'User already exists' }, { status: 400 })

        if (role === Role.PATIENT) {

            const birth_date = new Date(date_of_birth!).toISOString()

            const user = await db.user.create({
                data: {
                    email,
                    password: await hashPassword(password),
                    profile: {
                        create: {
                            name,
                            nin,
                            telephone,
                            date_of_birth: birth_date,
                            address,
                        }
                    }
                }
            })

            if (!user) return NextResponse.json({ message: 'Patient not created' }, { status: 400 })

            console.log('user 0000', user);


            return NextResponse.json({ status: true, message: 'Patient created' })

        } else if (role === Role.DOCTOR) {
            const user = await db.user.create({
                data: {
                    email,
                    password: await hashPassword(password),
                    role,
                    profile: {
                        create: {
                            name,
                            nin,

                            telephone,
                            specialtyId: specialty
                        }
                    }
                }
            })

            if (!user) return NextResponse.json({ message: 'Doctor not created' }, { status: 400 })

            return NextResponse.json({ status: true, message: 'Doctor created' })
        }


        return NextResponse.json({ message: 'Bad request' }, { status: 400 })





    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: 'something went wrong' }, { status: 500 })
    }

}