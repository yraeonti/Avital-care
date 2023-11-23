import { NextRequest, NextResponse } from "next/server";
import { Token } from "@/lib/utils";
import { db } from "@/app/services/db";
import { z, ZodError } from 'zod'
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