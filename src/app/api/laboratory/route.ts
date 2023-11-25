import { Token } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { fromZodError } from 'zod-validation-error';
import { db } from "@/app/services/db";
import { z } from 'zod'
import { Role } from "@/app/services/types";
import { Authorize } from "@/lib/utils";

export async function POST(req: NextRequest) {

    try {

        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        if (!(Authorize([Role.DOCTOR], token.role))) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const testResultCred = z.object({
            test_url: z.string().url(),
            patientId: z.string(),
            doctorName: z.string(),
            testName: z.string().min(1)
        })

        type TestResultCred = z.infer<typeof testResultCred>

        const {
            test_url,
            patientId,
            doctorName,
            testName
        }: TestResultCred = await req.json()

        const testResultVal = testResultCred.safeParse({
            test_url,
            patientId,
            doctorName,
            testName
        })

        if (!testResultVal.success) {

            const errors = fromZodError(testResultVal.error)
            console.log(errors);
            return NextResponse.json({ message: errors.message }, { status: 400 })
        }

        await db.testResults.create({
            data: {
                test_url,
                patientId,
                doctorName,
                testName
            }
        })

        return NextResponse.json({ status: true, message: 'Test Result Saved Successfully' })

    } catch (error) {
        console.log(error);

        return NextResponse.json({ status: false, message: 'Something went wrong..' }, { status: 500 })
    }

}


export async function GET(req: NextRequest) {

    try {

        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        if (!Authorize(['ADMIN', Role.DOCTOR], token.role)) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const searchParams = req.nextUrl.searchParams
        const patientId = searchParams.get('query')

        if (!patientId) return NextResponse.json({ status: false, message: 'No patient id' }, { status: 400 })

        const data = await db.testResults.findMany({
            where: {
                patientId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })



        return NextResponse.json({ status: true, data })

    } catch (error) {
        return NextResponse.json({ status: false, message: 'Something went wrong' }, { status: 500 })
    }
}