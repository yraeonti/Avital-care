import { Token } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { fromZodError } from 'zod-validation-error';
import { db } from "@/app/services/db";
import { z, ZodError } from 'zod'
import { hashPassword } from "@/app/utils/password";
import { Role } from "@/app/services/types";






export async function GET(req: NextRequest) {

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

}


export async function DELETE(req: NextRequest) {

    const token = await Token(req)

    if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

    if (!(['ADMIN', Role.DOCTOR].includes(token.role))) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

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

    const res = await prisma?.$transaction([profile, user])

    if (!res) return NextResponse.json({ status: false, message: 'User not found' }, { status: 401 })

    return NextResponse.json({ status: true, message: 'User deleted' })

}






export async function PATCH(req: NextRequest) {
    try {
        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        if (token.role !== 'ADMIN') return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const doctorCred = z.object({
            id: z.string(),
            email: z.string().email({ message: 'Please provide valid email' }),
            first_name: z.string(),
            last_name: z.string(),
            password: z.string(),
            nin: z.string().min(10),
            telephone: z.string().min(10),
            specialty: z.coerce.number()
        })

        const partialDoctorCred = doctorCred.partial({
            email: true,
            first_name: true,
            last_name: true,
            password: true,
            nin: true,
            telephone: true,
            specialty: true
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
        }: DoctorCred = await req.json()

        let doctorVal: { success: true; data: any; } | { success: false; error: ZodError; }

        doctorVal = partialDoctorCred.safeParse({ id, email, first_name, last_name, password, nin, telephone, specialty })


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