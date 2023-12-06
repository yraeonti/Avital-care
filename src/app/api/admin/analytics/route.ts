import { NextRequest, NextResponse } from "next/server";
import { Token } from "@/lib/utils";
import { db } from "@/app/services/db";
import { Role } from "@/app/services/types";
import { Authorize } from "@/lib/utils";

export async function GET(req: NextRequest) {
    try {
        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        if (!(Authorize(['ADMIN', Role.DOCTOR], token.role))) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })
        const today = new Date().toISOString().split('T')[0]
        const doctors = await db.user.count({
            where: {
                role: Role.DOCTOR
            }
        })

        const patients = await db.user.count({
            where: {
                role: Role.PATIENT
            }
        })

        const newBookings = await db.appointment.count({
            where: {
                createdAt: {
                    gte: new Date(today)
                }
            }
        })

        const todaySessions = await db.session.count({
            where: {
                sessionDate: {
                    equals: new Date(today)
                }
            }
        })

        console.log(todaySessions);


        return NextResponse.json({ status: true, data: { doctors, patients, todaySessions, newBookings } })
    } catch (error) {
        console.log(error);

        return NextResponse.json({ status: false, message: 'Something went wrong..' }, { status: 500 })
    }
}


export async function POST(req: NextRequest) {
    try {

        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        if (!(Authorize(['ADMIN'], token.role))) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const {
            type
        }: { type: 'appointment' | 'session' } = await req.json()

        const take = 10
        const today = new Date().toISOString().split('T')[0]

        if (type === 'appointment') {
            const allAppointment = await db.appointment.findMany({
                where: {
                    appointmentDate: {
                        gte: new Date(today)
                    }
                },
                include: {
                    patient: {
                        include: {
                            profile: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    },
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
                    }
                },
                orderBy: {
                    appointmentDate: 'desc'
                },
                take
            })


            const appointments = allAppointment.map((item) => ({
                appointmentNo: item.appointmentNo,
                patientName: item.patient.profile?.name,
                doctor: item.session.doctor.profile?.name,
                sessionTitle: item.session.title
            }))

            return NextResponse.json({ status: true, data: appointments })
        }

        const allSessions = await db.session.findMany({
            where: {
                sessionDate: {
                    gte: new Date(today)
                }
            },
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
            },
            orderBy: {
                sessionDate: 'desc'
            },
            take
        })

        const sessions = allSessions.map((item) => ({
            doctor: item.doctor.profile?.name,
            sessionTitle: item.title,
            sessionDate: item.sessionDate,
        }))

        return NextResponse.json({ status: true, data: sessions })



    } catch (error) {
        return NextResponse.json({ status: false, message: 'Something went wrong..' }, { status: 500 })
    }
}