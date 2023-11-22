import { Token } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { fromZodError } from 'zod-validation-error';
import { db } from "@/app/services/db";
import { z, ZodError } from 'zod'
import { Role, APPOINTMENTSTATUS } from "@/app/services/types";
import { Authorize } from "@/lib/utils";



export async function GET(req: NextRequest) {

    try {

        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        if (!(Authorize([Role.DOCTOR], token.role))) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const allAppointments = await db.appointment.findMany({
            where: {
                session: {
                    doctorId: token.id
                }
            },
            include: {
                session: {
                    select: {
                        title: true,
                        sessionDate: true,
                    }
                },
                sessionTime: true,
                patient: {
                    include: {
                        profile: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                appointmentDate: 'desc'
            }
        })

        const appointments = allAppointments.map((item) => ({
            id: item.id,
            patientName: item.patient.profile?.name,
            appointmentNo: item.appointmentNo,
            sessionTitle: item.session.title,
            sessionDate: item.session.sessionDate,
            status: item.status,
            appointmentDate: item.appointmentDate,
            sessionTime: item.sessionTime
        }))

        return NextResponse.json({ status: true, data: appointments, totalcount: appointments.length })

    } catch (error) {
        return NextResponse.json({ status: false, message: 'Something went wrong..' }, { status: 500 })
    }

}