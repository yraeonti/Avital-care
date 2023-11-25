import { Token } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/services/db";


export async function GET(req: NextRequest) {
    try {
        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const searchParams = req.nextUrl.searchParams
        const patientId = searchParams.get('query')

        if (!patientId) return NextResponse.json({ status: false, message: 'No patient id' }, { status: 400 })

        const diagnosis = await db.diagnosis.findMany({
            where: {
                patientId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })



        return NextResponse.json({ status: true, data: diagnosis })
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Something went wrong..' }, { status: 500 })
    }
}
