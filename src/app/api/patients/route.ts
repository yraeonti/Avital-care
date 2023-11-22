import { db } from "@/app/services/db";
import { Authorize, Token } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "@/app/services/types";

export async function GET(req: NextRequest) {

    try {

        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        if (!Authorize(['ADMIN', Role.DOCTOR], token.role)) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const patients = await db.user.findMany({
            where: {
                role: Role.PATIENT
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                profile: true
            },
        })

        const totalcount = await db.user.count({
            where: {
                role: Role.PATIENT
            },
        })

        const data = patients.map((item) => {
            return {
                id: item.id,
                name: item.profile?.name,
                nin: item.profile?.nin,
                email: item.email,
                telephone: item.profile?.telephone,
                date_of_birth: item.profile?.date_of_birth,
                address: item.profile?.address
            }
        })

        return NextResponse.json({ status: true, data, totalcount })

    } catch (error) {
        return NextResponse.json({ status: false, message: 'Something went wrong' }, { status: 500 })
    }





}


export async function POST(req: NextRequest) {

    try {

        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        if (token.role !== 'ADMIN') return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const {
            search
        } = await req.json()

        const patients = await db.user.findMany({
            where: {
                role: Role.PATIENT,
                OR: [
                    {
                        email: {
                            contains: search
                        }
                    },
                    {
                        profile: {
                            name: {
                                contains: search
                            }
                        }
                    }
                ]
            },
            include: {
                profile: true
            }
        })

        const totalcount = await db.user.count({
            where: {
                role: Role.DOCTOR
            }
        })

        const data = patients.map((item) => {
            return {
                id: item.id,
                name: item.profile?.name,
                nin: item.profile?.nin,
                email: item.email,
                telephone: item.profile?.telephone,
                date_of_birth: item.profile?.date_of_birth,
                address: item.profile?.address
            }
        })


        return NextResponse.json({ status: true, data, totalcount })



    } catch (error) {
        return NextResponse.json({ status: false, message: 'Something went wrong' }, { status: 500 })
    }

}