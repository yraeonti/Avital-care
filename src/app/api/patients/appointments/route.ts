import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/services/db";
import { Token } from "@/lib/utils";
import { Authorize } from "@/lib/utils";
import { z, ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error';
import { Role } from "@/app/services/types";


export async function GET(req: NextRequest) {
    try {

        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        if (!Authorize(['ADMIN'], token.role)) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const allAppointments = await db.appointment.findMany({
            include: {
                session: {
                    include: {
                        doctor: {
                            include: {
                                profile: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                },
                patient: {
                    include: {
                        profile: {
                            select: {
                                name: true,
                            }
                        }
                    }
                },
                sessionTime: true
            },
            orderBy: {
                appointmentDate: 'desc'
            }
        })

        const totalcount = await db.appointment.count()


        const appointments = allAppointments.map((item) => ({
            patientName: item.patient.profile?.name,
            appointmentNo: item.appointmentNo,
            doctor: item.session.doctor.profile?.name,
            sessionTitle: item.session.title,
            sessionDate: item.appointmentDate,
            sessionTime: item.sessionTime,
            status: item.status
        }))

        return NextResponse.json({ status: true, data: appointments, totalcount })

    } catch (error) {
        console.log(error);

        return NextResponse.json({ status: false, message: 'Something went wrong' }, { status: 500 })
    }
}