import { NextRequest, NextResponse } from "next/server";
import { Token } from "@/lib/utils";
import { db } from "@/app/services/db";


export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {

    try {
        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const request = await db.requestHistory.findUnique({
            where: {
                id: params.slug
            }
        })


        if (!request) return NextResponse.json({ status: false, message: 'Request not found' }, { status: 404 })


        return NextResponse.json({ status: true, data: request })


    } catch (error) {
        return NextResponse.json({ status: false, message: 'Something went wrong..' }, { status: 500 })
    }

}