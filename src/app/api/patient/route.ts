import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/services/db";
import { JWTWithExtraData } from "@/app/services/types";

export async function GET(req: NextRequest) {

    const token = await getToken({ req }) as JWTWithExtraData

    if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })


    const { id } = token

    const user = await db.user.findUnique({
        where: {
            id
        },
        include: {
            profile: true
        }
    })

    if (!user) return NextResponse.json({ status: false, message: 'User not found' }, { status: 401 })

    // console.log(token);


    return NextResponse.json({ status: true, data: user })

}

export async function DELETE(req: NextRequest) {

    const token = await getToken({ req }) as JWTWithExtraData

    if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })


    const { id } = token

    const profile = db.profile.delete({
        where: {
            userId: id
        }
    })

    const user = db.user.delete({
        where: {
            id
        },
    })

    const res = await prisma?.$transaction([profile, user])

    if (!res) return NextResponse.json({ status: false, message: 'User not found' }, { status: 401 })

    return NextResponse.json({ status: true, message: 'User deleted' })
}