import { Token } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { fromZodError } from 'zod-validation-error';
import { db } from "@/app/services/db";
import { z, ZodError } from 'zod'
import { hashPassword } from "@/app/utils/password";
import { Role } from "@/app/services/types";
import { Authorize } from "@/lib/utils";






export async function GET(req: NextRequest) {

    try {
        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })


        const { id } = token

        const user = await db.user.findUnique({
            where: {
                id
            },
            include: {
                profile: {
                    include: {
                        specialty: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })

        if (!user) return NextResponse.json({ status: false, message: 'User not found' }, { status: 401 })

        // console.log(token);


        return NextResponse.json({ status: true, data: user })
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Something went wrong..' }, { status: 500 })
    }



}


export async function DELETE(req: NextRequest) {

    try {
        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        if (!(Authorize(['ADMIN', Role.DOCTOR], token.role))) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const {
            id
        } = await req.json()

        const profile = db.profile.delete({
            where: {
                userId: id
            }
        })

        const user = db.user.delete({
            where: {
                id
            },
        })

        const res = await db.$transaction([profile, user])

        if (!res) return NextResponse.json({ status: false, message: 'User not found' }, { status: 401 })

        return NextResponse.json({ status: true, message: 'User deleted' })
    } catch (error) {
        console.log(error);

        return NextResponse.json({ status: false, message: 'Something went wrong..', errorMessage: error }, { status: 500 })
    }



}






export async function PATCH(req: NextRequest) {
    try {
        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        if (!(Authorize(['ADMIN', Role.DOCTOR], token.role))) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const doctorCred = z.object({
            id: z.string(),
            email: z.string().email({ message: 'Please provide valid email' }),
            first_name: z.string(),
            last_name: z.string(),
            password: z.string(),
            nin: z.string().min(10),
            telephone: z.string().min(10),
            specialty: z.coerce.number(),
            imageUrl: z.string().nullable()
        })

        const partialDoctorCred = doctorCred.partial({
            email: true,
            first_name: true,
            last_name: true,
            password: true,
            nin: true,
            telephone: true,
            specialty: true,
            imageUrl: true
        })

        type DoctorCred = z.infer<typeof partialDoctorCred>

        const {
            id,
            email,
            first_name,
            last_name,
            password,
            nin,
            telephone,
            specialty,
            imageUrl
        }: DoctorCred = await req.json()

        let doctorVal: { success: true; data: any; } | { success: false; error: ZodError; }

        doctorVal = partialDoctorCred.safeParse({ id, email, first_name, last_name, password, nin, telephone, specialty, imageUrl })


        if (!doctorVal.success) {

            const errors = fromZodError(doctorVal.error)
            console.log(errors);
            return NextResponse.json({ message: errors.message }, { status: 400 })
        }

        const name = `${first_name} ${last_name}`

        //update without password
        if (!password) {
            await db.user.update({
                where: {
                    id,
                    role: Role.DOCTOR
                },
                data: {
                    email,
                    profile: {
                        update: {
                            data: {
                                imageUrl,
                                name,
                                nin,
                                specialtyId: specialty,
                                telephone,
                            }
                        }
                    }
                }
            })

            return NextResponse.json({ status: true, message: 'Doctor updated' })
        }



        //update with password
        await db.user.update({
            where: {
                id
            },
            data: {
                email,
                password: await hashPassword(password),
                profile: {
                    update: {
                        data: {
                            imageUrl,
                            name,
                            nin,
                            specialtyId: specialty,
                            telephone,
                        }
                    }
                }
            }
        })

        return NextResponse.json({ status: true, message: 'Doctor updated' })

    } catch (error) {
        console.log(error);


        return NextResponse.json({ status: false, message: 'Something went wrong..' }, { status: 500 })
    }


}