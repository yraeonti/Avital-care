import { db } from "@/app/services/db";
import { Token } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { hash, compare } from "bcrypt";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { Role } from "@/app/services/types";

export async function PATCH(req: NextRequest) {
  try {
    const token = await Token(req);
    if (!token) {
      return NextResponse.json(
        { status: false, message: "Not authorized" },
        { status: 401 }
      );
    }

    const passwordCredentails = z
      .object({
        oldPassword: z.string(),
        newPassword: z
          .string()
          .min(6, { message: "password must be at least 6 characters" }),
        confirmPassword: z.string().min(6),
      })
      .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });

    type passCred = z.infer<typeof passwordCredentails>;

    const { id } = token;
    const { oldPassword, newPassword, confirmPassword }: passCred =
      await req.json();

    const user = await db.user.findUnique({
      where: {
        id,
        role: Role.PATIENT,
      },
    });

    if (!user)
      return NextResponse.json(
        { status: false, message: "User not found" },
        { status: 401 }
      );

    const passwordsMatch = await compare(oldPassword, user.password);

    if (!passwordsMatch)
      return NextResponse.json(
        { status: false, message: "Invalid Password" },
        { status: 401 }
      );

    const hashed = await hash(newPassword, 10);
    const passswordValidation = passwordCredentails.safeParse({
      oldPassword,
      newPassword,
      confirmPassword,
    });

    if (!passswordValidation.success) {
      const errors = fromZodError(passswordValidation.error);
      console.log(errors);
      return NextResponse.json({ message: errors.message }, { status: 400 });
    }

    await db.user.update({
      where: {
        id,
        role: Role.PATIENT,
      },
      data: {
        password: hashed,
      },
    });

    return NextResponse.json({ status: true, message: 'Password updated' })


  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { status: false, message: "Something went wrong.." },
      { status: 500 }
    );
  }
}
