import { NextRequest, NextResponse } from "next/server";
import { Token } from "@/lib/utils";
import { db } from "@/app/services/db";
import { Role } from "@/app/services/types";
import { Authorize } from "@/lib/utils";


export async function PATCH(req: NextRequest) {

    try {
        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        if (!(Authorize([Role.PATIENT], token.role))) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })


        const { id, approval } = await req.json()

        await db.requestHistory.update({
            where: {
                id,
                patientId: token.id
            },
            data: {
                approval
            }
        })

        return NextResponse.json({ status: true, message: 'Approval updated' })
    } catch (error) {
        return NextResponse.json({ status: false, message: 'Something went wrong..' }, { status: 500 })
    }

}