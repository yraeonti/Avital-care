import { NextRequest, NextResponse } from "next/server";
import { Token } from "@/lib/utils";
import { db } from "@/app/services/db";
import { Role } from "@/app/services/types";
import { Authorize } from "@/lib/utils";


export async function GET(req: NextRequest) {
    try {
        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        if (!(Authorize([Role.DOCTOR], token.role))) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const today = new Date().toISOString().split('T')[0]
        const mySessions = await db.session.findMany({
            where: {
                doctorId: token.id,
                sessionDate: {
                    gte: new Date(today)
                }
            },
            include: {
                sessionTime: true
            },
            orderBy: {
                sessionDate: 'desc'
            },
            take: 5
        })

        const sessions = mySessions.map((item) => ({
            sessionTitle: item.title,
            sessionDate: item.sessionDate,
            noOfBookedTimes: item.sessionTime.filter(sess => sess.status === true).length
        }))

        return NextResponse.json({ status: true, data: sessions })
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Something went wrong..' }, { status: 500 })
    }
}