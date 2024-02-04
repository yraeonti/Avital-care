import { db } from "@/app/services/db";
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

    const specialties = await db.specialties.findMany({
      include: {
        profile: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    const data = specialties.map((specialty) => {
      return {
        value: specialty.name,
        label: specialty.name,
      };
    });

    return NextResponse.json({ status: true, data });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { status: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
