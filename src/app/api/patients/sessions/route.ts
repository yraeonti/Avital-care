import { Token } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "@/app/services/types";
import { db } from "@/app/services/db";
import moment from "moment";


export async function GET(req: NextRequest) {

    try {

        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const today = new Date().toISOString().split('T')[0]
        const allsessions = await db.session.findMany({
            where: {
                sessionDate: {
                    gte: new Date(today)
                }
            },
            include: {
                doctor: {
                    include: {
                        profile: {
                            include: {
                                specialty: true
                            }
                        }
                    }
                },
                sessionTime: true
            }
        })


        const sessions = allsessions.map(item => {
            return {
                id: item.id,
                title: item.title,
                sessionDate: item.sessionDate,
                noOfAvailableSlots: item.sessionTime.filter(item => item.status === false).length,
                doctor: item.doctor.profile?.name,
                doctorEmail: item.doctor.email,
                specialty: item.doctor.profile?.specialty?.name
            }
        })
        return NextResponse.json({ status: true, data: sessions, totalcount: sessions.length })
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Something went wrong' }, { status: 500 })
    }

}


export async function POST(req: NextRequest) {

    try {
        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const {
            search
        } = await req.json()

        console.log(search);


        const allsessions = await db.session.findMany({
            where: {
                OR: [
                    {
                        doctor: {
                            email: {
                                contains: search
                            }
                        }
                    },
                    {
                        doctor: {
                            profile: {
                                name: {
                                    contains: search
                                }
                            }
                        }
                    }
                ]
            },
            include: {
                doctor: {
                    include: {
                        profile: {
                            include: {
                                specialty: true
                            }
                        }
                    }
                },
                sessionTime: true
            }
        })

        const sessions = allsessions.map(item => {
            return {
                id: item.id,
                title: item.title,
                sessionDate: item.sessionDate,
                noOfAvailableSlots: item.sessionTime.filter(item => item.status === false).length,
                doctor: item.doctor.profile?.name,
                doctorEmail: item.doctor.email,
                specialty: item.doctor.profile?.specialty?.name
            }
        })

        return NextResponse.json({ status: true, data: sessions, totalcount: sessions.length })

    } catch (error) {
        return NextResponse.json({ status: false, message: 'Something went wrong' }, { status: 500 })
    }

}