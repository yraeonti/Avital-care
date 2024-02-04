import { db } from "@/app/services/db";
import { Role } from "@/app/services/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    if (!req.headers.get("apiKey"))
      return NextResponse.json(
        { status: false, message: "Not authorized" },
        { status: 400 }
      );

    const apiKey = "moegreene51234";

    if (req.headers.get("apiKey") !== apiKey)
      return NextResponse.json(
        { status: false, message: "Not authorized" },
        { status: 401 }
      );

    const doctors = await db.user.findMany({
      where: {
        role: Role.DOCTOR,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        profile: {
          include: {
            specialty: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const data = doctors.map((item) => {
      return {
        id: item.id,
        name: item.profile?.name,
        email: item.email,
        telephone: item.profile?.telephone,
      };
    });

    const totalcount = await db.user.count({
      where: {
        role: Role.DOCTOR,
      },
    });

    return NextResponse.json({ status: true, data, totalcount });
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
