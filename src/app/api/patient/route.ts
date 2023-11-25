
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/services/db";
import { Token } from "@/lib/utils";
import { z, ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error';
import { Role } from "@/app/services/types";

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
                profile: true
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


        const { id } = token

        const testResults = db.testResults.deleteMany({
            where: {
                patientId: token.id
            }
        })

        const appointments = db.appointment.deleteMany({
            where: {
                patientId: token.id
            }
        })

        const diagnosis = db.diagnosis.deleteMany({
            where: {
                patientId: token.id
            }
        })

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

        const res = await prisma?.$transaction([testResults, appointments, diagnosis, profile, user])

        if (!res) return NextResponse.json({ status: false, message: 'User not found' }, { status: 401 })

        return NextResponse.json({ status: true, message: 'User deleted' })

    } catch (error) {
        console.log(error);

        return NextResponse.json({ status: false, message: 'Something went wrong..' }, { status: 500 })
    }


}

export async function PATCH(req: NextRequest) {

    try {

        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const patientCred = z.object({
            id: z.string(),
            email: z.string().email({ message: 'Please provide valid email' }),
            first_name: z.string(),
            last_name: z.string(),
            nin: z.string().min(10),
            telephone: z.string().min(10),
            address: z.string(),
            imageUrl: z.string().url().nullable()
        })

        const partialPatientred = patientCred.partial({
            email: true,
            first_name: true,
            last_name: true,
            nin: true,
            telephone: true,
            address: true,
            imageUrl: true
        })

        type PatientCred = z.infer<typeof partialPatientred>

        const {
            id,
            email,
            first_name,
            last_name,
            nin,
            telephone,
            address,
            imageUrl
        }: PatientCred = await req.json()

        const patientVal = partialPatientred.safeParse({ id, email, first_name, last_name, address, nin, telephone, imageUrl })

        if (!patientVal.success) {
            const errors = fromZodError(patientVal.error)
            console.log(errors);
            return NextResponse.json({ message: errors.message }, { status: 400 })
        }

        const name = `${first_name} ${last_name}`

        await db.user.update({
            where: {
                id: token.id,
                role: Role.PATIENT
            },
            data: {
                email,
                profile: {
                    update: {
                        data: {
                            name,
                            nin,
                            telephone,
                            address,
                            imageUrl
                        }
                    }
                }
            }
        })

        return NextResponse.json({ status: true, message: 'Patient updated' })

    } catch (error) {
        console.log(error);


        return NextResponse.json({ status: false, message: 'Something went wrong..' }, { status: 500 })
    }



}