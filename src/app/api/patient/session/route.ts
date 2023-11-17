import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/services/db";
import { Token } from "@/lib/utils";


export async function POST(req: NextRequest) {
    try {

        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const {
            id
        } = await req.json()

        const onesession = await db.session.findUnique({
            where: {
                id
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

        if (!onesession) return NextResponse.json({ status: false, message: 'session not found' }, { status: 404 })

        const session = {
            id: onesession.id,
            title: onesession.title,
            sessionDate: onesession.sessionDate,
            sessionTime: onesession.sessionTime,
            doctor: onesession.doctor.profile?.name,
            doctorEmail: onesession.doctor.email,
            specialty: onesession.doctor.profile?.specialty?.name
        }

        return NextResponse.json({ status: true, data: session })

    } catch (error) {
        console.log(error);

        return NextResponse.json({ status: false, message: 'Something went wrong...' }, { status: 500 })
    }
}