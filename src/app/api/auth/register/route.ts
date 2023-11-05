import { NextResponse } from "next/server";
import {z, ZodError} from "zod"
import { fromZodError } from 'zod-validation-error';
import { db } from "@/app/services/db";
import { hashPassword } from "@/app/utils/password";

enum Role {
  PATIENT = "PATIENT",
  DOCTOR = "DOCTOR"
}

export async function POST(req: Request) {

    try {

        const userCred = z.object({
            email: z.string().email(),
            name: z.string(),
            password: z.string().min(6),
            role: z.string(),
            address: z.string(),
            nin: z.string().min(10),
            telephone: z.string().min(10),
            date_of_birth: z.date(),
            specialty: z.string()
        })


        const partialUserCred = userCred.partial({
            address: true,
            date_of_birth: true,
            specialty: true
        })

        type userCred = z.infer<typeof partialUserCred>

        const {
            email,
            name,
            password,
            role,
            address,
            nin,
            telephone,
            date_of_birth,
            specialty,
        } : userCred = await req.json()

        let userVal: { success: true; data: any; } | { success: false; error: ZodError; }

        if (role === Role.PATIENT) {

            userVal =  partialUserCred.safeParse({email, name, password, address, nin, telephone, date_of_birth})
        }else {
            userVal = partialUserCred.safeParse({email, name, password, nin, telephone, specialty})
        }

        if (!userVal.success) {

            const errors = fromZodError(userVal.error)
            console.log(errors);
            return NextResponse.json({message: errors.message}, {status: 400})
        }

        if (role === Role.PATIENT) {

            const user = await db.user.create({
                data: {
                    email,
                    password: await hashPassword(password),
                    profile: {
                        create: {
                            name,
                            nin,
                            telephone,
                            date_of_birth,
                            address,
                        }
                    }
                }
            })

         if (!user) return NextResponse.json({message: 'Patient not created'}, {status: 400})

         return NextResponse.json({status: true, message: 'Patient created'})

        }

        const user = await db.user.create({
            data: {
                email,
                password: await hashPassword(password),
                profile: {
                    create: {
                        name,
                        nin,
                        telephone,
                        specialty: {
                            create: {
                                name: specialty!
                            }
                        }
                    }
                }
            }
        })

     if (!user) return NextResponse.json({message: 'Doctor not created'}, {status: 400})

     return NextResponse.json({status: true, message: 'Doctor created'})

        

       
        
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({message: 'something went wrong'}, {status: 500})
    }

}