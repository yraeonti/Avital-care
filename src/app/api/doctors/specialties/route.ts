import { db } from "@/app/services/db";
import { Token } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const specialties = await db.specialties.findMany({
            select: {
                id: true,
                name: true
            }
        })

        return NextResponse.json({ status: true, data: specialties })

    } catch (error) {
        console.log(error);

        return NextResponse.json({ status: false, message: 'Something went wrong' }, { status: 500 })
    }







}