import { db } from "@/app/services/db";
import { Token, Authorize } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "@/app/services/types";


export async function GET(req: NextRequest) {

    try {

        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        if (!Authorize(['ADMIN', Role.DOCTOR], token.role)) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })
        const searchParams = req.nextUrl.searchParams
        const sessionId = searchParams.get('query')

        if (!sessionId) return NextResponse.json({ status: false, message: 'No session id' }, { status: 400 })

        const allPatients = await db.appointment.findMany({
            where: {
                sessionId: Number(sessionId)
            },
            include: {
                patient: {
                    include: {
                        profile: {
                            select: {
                                name: true,
                                telephone: true
                            }
                        }
                    }
                }
            }
        })

        const patients = allPatients.map(item => ({
            patientName: item.patient.profile?.name,
            patientTel: item.patient.profile?.telephone,
            appointmentNo: item.appointmentNo
        }))

        return NextResponse.json({ status: true, data: patients })

    } catch (error) {
        return NextResponse.json({ status: false, message: 'Something went wrong' }, { status: 500 })
    }
}





