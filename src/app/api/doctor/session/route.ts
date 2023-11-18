import { Token } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { fromZodError } from 'zod-validation-error';
import { db } from "@/app/services/db";
import { z, ZodError } from 'zod'
import { Role, APPOINTMENTSTATUS } from "@/app/services/types";
import { Authorize } from "@/lib/utils";


export async function POST(req: NextRequest) {

    try {

        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        if (!(Authorize(['ADMIN'], token.role))) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const sessionCred = z.object({
            title: z.string(),
            doctorId: z.string().uuid(),
            sessionDate: z.coerce.date(),
            sessionTime: z.array(z.object({
                startTime: z.string(),
                endTime: z.string()
            })),
        })

        type SessionCred = z.infer<typeof sessionCred>

        const {
            title,
            doctorId,
            sessionDate,
            sessionTime,
        }: SessionCred = await req.json()


        const sessionVal = sessionCred.safeParse({ title, doctorId, sessionDate, sessionTime })

        if (!sessionVal.success) {
            const errors = fromZodError(sessionVal.error)
            console.log(errors);
            return NextResponse.json({ message: errors.message }, { status: 400 })
        }

        const date = new Date(sessionDate).toISOString()

        const time = sessionTime.map((item) => (
            {
                startTime: new Date(`${sessionDate} ${item.startTime}`).toISOString(),
                endTime: new Date(`${sessionDate} ${item.endTime}`).toISOString(),
                appointmentNo: Math.floor(1000 + Math.random() * 9000)
            }
        ))

        await db.session.create({
            data: {
                title,
                noOfPatients: sessionTime.length,
                doctorId,
                sessionDate: date,
                sessionTime: {
                    createMany: {
                        data: time
                    }
                }
            }
        })


        return NextResponse.json({ status: true, message: 'Session created' })

    } catch (error) {
        console.log(error);

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

        const time = db.sessionTime.deleteMany({
            where: {
                sessionId: id
            }
        })
        const appointments = db.appointment.deleteMany({
            where: {
                sessionId: id
            },
        })
        const session = db.session.delete({
            where: {
                id
            }
        })

        const res = await db.$transaction([appointments, time, session])

        if (!res) return NextResponse.json({ status: false, message: 'Session not deleted' }, { status: 401 })

        return NextResponse.json({ status: true, message: 'Session deleted' })

    } catch (error) {
        console.log(error);

        return NextResponse.json({ status: false, message: 'Something went wrong..' }, { status: 500 })
    }



}