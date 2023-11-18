import { db } from "@/app/services/db";
import { Token, Authorize } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "@/app/services/types";

export async function GET(req: NextRequest) {

    try {

        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        if (!Authorize(['ADMIN'], token.role)) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })



        const sessions = await db.session.findMany({
            include: {
                sessionTime: true,
                doctor: {
                    include: {
                        profile: true
                    }
                }
            },
            orderBy: {
                sessionDate: 'desc'
            }
        })

        const totalcount = await db.session.count()

        const data = sessions.map((item) => {
            return {
                id: item.id,
                title: item.title,
                sessionDate: item.sessionDate,
                noOfPatients: item.noOfPatients,
                sessionTime: item.sessionTime,
                doctor: item.doctor.profile?.name
            }
        })

        return NextResponse.json({ status: true, data, totalcount })

    } catch (error) {
        return NextResponse.json({ status: false, message: 'Something went wrong' }, { status: 500 })
    }





}