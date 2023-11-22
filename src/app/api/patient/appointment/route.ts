import { Token } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { fromZodError } from 'zod-validation-error';
import { db } from "@/app/services/db";
import { z, ZodError } from 'zod'
import { Role } from "@/app/services/types";
import { Authorize } from "@/lib/utils";
import { APPOINTMENTSTATUS } from "@prisma/client";



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
            appointmentId: item.id,
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

export async function PATCH(req: NextRequest) {

    try {

        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const appointmentUpdateCred = z.object({
            appointmentId: z.number().min(1),
            sessionTimeId: z.number().min(1)
        })

        type AppointmentUpdateCred = z.infer<typeof appointmentUpdateCred>

        const {
            appointmentId,
            sessionTimeId
        }: AppointmentUpdateCred = await req.json()


        const updateSessionTime = db.sessionTime.update({
            where: {
                id: sessionTimeId,
            },
            data: {
                status: false
            }
        })

        const updateAppointment = db.appointment.update({
            where: {
                id: appointmentId,
                patientId: token.id
            },
            data: {
                status: APPOINTMENTSTATUS.CANCELLED
            }
        })

        const res = await db.$transaction([updateAppointment, updateSessionTime])

        if (!res) return NextResponse.json({ status: false, message: 'Appointment not Cancelled' }, { status: 400 })

        return NextResponse.json({ status: true, message: 'Appointment Cancelled Successfully' })

    } catch (error) {
        console.log(error);

        return NextResponse.json({ status: false, message: 'Something went wrong..' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {

        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        if (!Authorize([Role.DOCTOR, 'ADMIN'], token.role)) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const {
            id,
            sessionTimeId
        } = await req.json()

        const updateSessionTime = db.sessionTime.update({
            where: {
                id: sessionTimeId
            },
            data: {
                status: false
            }
        })

        const deleteAppointment = db.appointment.delete({
            where: {
                id
            }
        })

        const res = await db.$transaction([updateSessionTime, deleteAppointment])

        if (!res) return NextResponse.json({ status: false, message: 'Appointment not Deleted' }, { status: 400 })

        return NextResponse.json({ status: true, message: 'Appointment Deleted Successfully' })

    } catch (error) {
        console.log(error);

        return NextResponse.json({ status: false, message: 'Something went wrong..' }, { status: 500 })
    }
}


export async function PUT(req: NextRequest) {

    try {

        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const appointmentUpdateCred = z.object({
            id: z.number().min(1),
            sessionTimeId: z.number().min(1),
            status: z.nativeEnum(APPOINTMENTSTATUS)
        })

        type AppointmentUpdateCred = z.infer<typeof appointmentUpdateCred>

        const {
            id,
            sessionTimeId,
            status
        }: AppointmentUpdateCred = await req.json()


        const updateSessionTime = db.sessionTime.update({
            where: {
                id: sessionTimeId,
            },
            data: {
                status: false
            }
        })

        const updateAppointment = db.appointment.update({
            where: {
                id,
            },
            data: {
                status
            }
        })
        let res;
        if (status === APPOINTMENTSTATUS.CANCELLED) {
            res = await db.$transaction([updateAppointment, updateSessionTime])
        } else {
            res = await db.$transaction([updateAppointment])
        }



        if (!res) return NextResponse.json({ status: false, message: 'Appointment not Updated' }, { status: 400 })

        return NextResponse.json({ status: true, message: 'Appointment Updated Successfully' })

    } catch (error) {
        console.log(error);

        return NextResponse.json({ status: false, message: 'Something went wrong..' }, { status: 500 })
    }
}

