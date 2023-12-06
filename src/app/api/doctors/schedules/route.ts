import { db } from "@/app/services/db";
import { Token } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const token = await Token(req)

        if (!token) return NextResponse.json({ status: false, message: 'Not authorized' }, { status: 401 })
        const today = new Date().toISOString().split('T')[0]
        const allspecialties = await db.specialties.findMany({
            include: {
                profile: {
                    include: {
                        user: {
                            include: {
                                session: {
                                    where: {
                                        sessionDate: {
                                            gte: new Date(today)
                                        }
                                    },
                                    include: {
                                        sessionTime: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        const specialties = allspecialties.map((item) => {
            return {
                id: item.id,
                name: item.name,
                profile: item.profile.map(prof => ({
                    name: prof.name,
                    id: prof.id,
                    sessionDates: prof.user.session.map(sess => sess.sessionDate)
                }))
            }
        })

        return NextResponse.json({ status: true, data: specialties })

    } catch (error) {
        console.log(error);

        return NextResponse.json({ status: false, message: 'Something went wrong' }, { status: 500 })
    }







}