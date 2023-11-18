import { Token } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { fromZodError } from 'zod-validation-error';
import { db } from "@/app/services/db";
import { z, ZodError } from 'zod'
import { Role } from "@/app/services/types";
import { Authorize } from "@/lib/utils";



export async function GET(req: NextRequest) {

    try {

        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const allAppointments = await db.appointment.findMany({
            where: {
                patientId: token.id
            },
            include: {
                session: {
                    include: {
                        doctor: {
                            include: {
                                profile: {
                                    select: {
                                        name: true,
                                        specialty: {
                                            select: {
                                                name: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                sessionTime: true
            }
        })

        const appointments = allAppointments.map((item) => ({
            sessionTitle: item.session.title,
            scheduledDate: item.appointmentDate,
            appointmentNo: item.appointmentNo,
            doctor: item.session.doctor.profile?.name,
            doctorEmail: item.session.doctor.email,
            specialty: item.session.doctor.profile?.specialty?.name,
            scheduledTime: item.sessionTime,
            status: item.status
        }))

        return NextResponse.json({ status: true, data: appointments, totalcount: appointments.length })

    } catch (error) {
        console.log(error);

        return NextResponse.json({ status: true, message: 'Something went wrong...' }, { status: 500 })
    }




}


export async function POST(req: NextRequest) {
    try {

        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        if (!Authorize([Role.PATIENT], token.role)) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const appointmentCred = z.object({
            appointmentNo: z.number().min(1000),
            appointmentDate: z.coerce.date(),
            sessionId: z.number().min(1),
            sessionTimeId: z.number().min(1)
        })

        type AppointmentCred = z.infer<typeof appointmentCred>

        const {
            appointmentNo,
            appointmentDate,
            sessionId,
            sessionTimeId
        }: AppointmentCred = await req.json()

        const appointmentVal = appointmentCred.safeParse({ appointmentNo, appointmentDate, sessionId, sessionTimeId })

        if (!appointmentVal.success) {
            const errors = fromZodError(appointmentVal.error)
            console.log(errors);
            return NextResponse.json({ message: errors.message }, { status: 400 })
        }



        const createAppointment = db.appointment.create({
            data: {
                appointmentDate,
                appointmentNo,
                sessionId,
                sessionTimeId,
                patientId: token.id,
            }
        })

        const updateSessionTime = db.sessionTime.update({
            where: {
                id: sessionTimeId,
                sessionId
            },
            data: {
                status: true
            }
        })


        const res = await db.$transaction([createAppointment, updateSessionTime])

        if (!res) return NextResponse.json({ status: false, message: 'Session not Created' }, { status: 401 })

        return NextResponse.json({ status: true, message: 'Session Created' })



    } catch (error) {
        console.log(error);

        return NextResponse.json({ status: false, message: 'Something went wrong..' }, { status: 500 })
    }
}