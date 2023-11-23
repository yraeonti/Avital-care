import { Token } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { fromZodError } from 'zod-validation-error';
import { db } from "@/app/services/db";
import { z, ZodError } from 'zod'
import { hashPassword } from "@/app/utils/password";
import { Role } from "@/app/services/types";
import { Authorize } from "@/lib/utils";


export async function POST(req: NextRequest) {
    try {

        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        if (!Authorize([Role.DOCTOR], token.role)) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })


        const diagnosisCred = z.object({
            patientId: z.string().uuid(),
            doctorName: z.string().min(1),

            complaint: z.string(),
            complaint_history: z.string(),
            recommended_tests: z.string(),
            diagnosis_confirmation: z.string(),
            prescription: z.string(),
            prescription_comment: z.string(),
            management_plan: z.string()
        }).partial({
            complaint: true,
            complaint_history: true,
            recommended_tests: true,
            diagnosis_confirmation: true,
            prescription: true,
            prescription_comment: true,
            management_plan: true
        })

        type DiagnosisCred = z.infer<typeof diagnosisCred>

        const {
            patientId,
            doctorName,
            complaint,
            complaint_history,
            recommended_tests,
            diagnosis_confirmation,
            prescription,
            prescription_comment,
            management_plan
        }: DiagnosisCred = await req.json()


        const diagnosisVal = diagnosisCred.safeParse({
            patientId,
            doctorName,
            complaint,
            complaint_history,
            recommended_tests,
            diagnosis_confirmation,
            prescription,
            prescription_comment,
            management_plan
        })

        if (!diagnosisVal.success) {

            const errors = fromZodError(diagnosisVal.error)
            console.log(errors);
            return NextResponse.json({ message: errors.message }, { status: 400 })
        }

        await db.diagnosis.create({
            data: {
                patientId,
                doctorName,
                complaint,
                complaint_history,
                recommended_tests,
                diagnosis_confirmation,
                prescription,
                prescription_comment,
                management_plan
            }
        })


        return NextResponse.json({ status: true, message: 'Diagnosis created for patient' })

    } catch (error) {
        console.log(error);

        return NextResponse.json({ status: false, message: 'Something went wrong..' }, { status: 500 })
    }
}