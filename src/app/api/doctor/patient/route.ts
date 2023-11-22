import { Token } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { fromZodError } from 'zod-validation-error';
import { db } from "@/app/services/db";
import { z, ZodError } from 'zod'
import { hashPassword } from "@/app/utils/password";
import { Role } from "@/app/services/types";
import { Authorize } from "@/lib/utils";


export async function GET(req: NextRequest) {
    try {
        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const { id } = token

        const myPatients = await db.appointment.findMany({
            where: {
                session: {
                    doctorId: id
                }
            },
            include: {
                patient: {
                    include: {
                        profile: true
                    }
                }
            }
        })

        const data = myPatients.map((item) => {
            return {
                id: item.patient.id,
                name: item.patient.profile?.name,
                nin: item.patient.profile?.nin,
                email: item.patient.email,
                telephone: item.patient.profile?.telephone,
                date_of_birth: item.patient.profile?.date_of_birth,
                address: item.patient.profile?.address
            }
        })

        return NextResponse.json({ status: true, data, totalcount: data.length })
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Something went wrong..' }, { status: 500 })
    }
}
