import { db } from "@/app/services/db";
import { Token } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "@/app/services/types";

export async function GET(req: NextRequest) {

    try {

        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        if (token.role !== 'ADMIN') return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })

        const doctors = await db.user.findMany({
            where: {
                role: Role.DOCTOR
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                profile: {
                    include: {
                        specialty: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            },
        })

        const totalcount = await db.user.count({
            where: {
                role: Role.DOCTOR
            }
        })

        const data = doctors.map((item) => {
            return {
                id: item.id,
                name: item.profile?.name,
                nin: item.profile?.nin,
                email: item.email,
                telephone: item.profile?.telephone,
                specialty: item.profile?.specialty?.name,
                specialtyId: item.profile?.specialtyId
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

        const doctors = await db.user.findMany({
            where: {
                role: Role.DOCTOR,
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
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                profile: {
                    include: {
                        specialty: true
                    }
                }
            }
        })

        const totalcount = await db.user.count({
            where: {
                role: Role.DOCTOR
            }
        })

        const data = doctors.map((item) => {
            return {
                id: item.id,
                name: item.profile?.name,
                nin: item.profile?.nin,
                email: item.email,
                telephone: item.profile?.telephone,
                specialty: item.profile?.specialty?.name,
                specialtyId: item.profile?.specialtyId
            }
        })


        return NextResponse.json({ status: true, data, totalcount })



    } catch (error) {
        return NextResponse.json({ status: false, message: 'Something went wrong' }, { status: 500 })
    }

}