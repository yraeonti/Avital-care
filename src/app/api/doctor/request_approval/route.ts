import { Token } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/services/db";

import { Role } from "@/app/services/types";
import { Authorize } from "@/lib/utils";
import mailer from "@/app/utils/mailer";


export async function POST(req: NextRequest) {

    try {
        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        if (!(Authorize([Role.DOCTOR], token.role))) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })


        const { id } = await req.json()

        const patient = await db.user.findUnique({
            where: {
                id
            },
            include: {
                profile: true
            }
        })

        if (!patient) return NextResponse.json({ status: false, message: 'Patient not found' }, { status: 400 })

        // console.log('ids oooooo', patient.id, token.id);

        const request = await db.requestHistory.create({
            data: {
                patientId: patient.id,
                doctorId: token.id
            }
        })






        const mail = await mailer({
            to: patient.email,
            subject: 'Doctor Request',
            html: `
                <h3> Dear ${patient.profile?.name} </h3>
                <h3> Please click on the link below to approve or reject <strong>${token.name}</strong> from viewing your Diagnosis History</h3>
                <a href='http://localhost:3000/user/request_approval?request=${request.id}'> Click on Link </a>
            `
        })

        if (mail) return NextResponse.json({ status: true, data: request })

        return NextResponse.json({ status: false, message: 'mail not sent' }, { status: 400 })

    } catch (error) {
        console.log(error);


        return NextResponse.json({ status: false, message: 'Something went wrong..' }, { status: 500 })
    }

}

