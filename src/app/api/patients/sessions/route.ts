import { Token } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "@/app/services/types";
import { db } from "@/app/services/db";


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
                sessionTime: item.sessionTime,
                doctor: item.doctor.profile?.name,
                specialty: item.doctor.profile?.specialty?.name
            }
        })
        return NextResponse.json({ status: true, data: sessions })
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Something went wrong' }, { status: 500 })
    }

}