import { NextResponse } from "next/server";
import { z, ZodError } from "zod"
import { fromZodError } from 'zod-validation-error';
import { db } from "@/app/services/db";
import { hashPassword } from "@/app/utils/password";
import { Role } from "@/app/services/types";
import mailer from "@/app/utils/mailer";
import crypto from "crypto"


export async function POST(req: Request) {
    try {

        const emailCred = z.object({
            email: z.string().email({ message: 'Please provide valid email' })
        })

        type EmailCred = z.infer<typeof emailCred>

        const {
            email,
        }: EmailCred = await req.json()


        const val = emailCred.safeParse({ email })


        if (!val.success) {

            const errors = fromZodError(val.error)
            console.log(errors);
            return NextResponse.json({ message: errors.message }, { status: 400 })
        }


        const user = await db.user.findUnique({
            where: {
                email,
                NOT: {
                    role: "ADMIN"
                }
            },
            include: {
                profile: true
            }
        })

        if (!user) return NextResponse.json({ message: "User does not exist" }, { status: 400 })

        const token = crypto.randomBytes(20).toString('hex')

        const expiry = new Date()
        expiry.setMinutes(expiry.getMinutes() + 60)

        await db.user.update({
            where: {
                id: user.id
            },
            data: {
                reset_password_token: token,
                reset_password_expiry: expiry
            }
        })

        const sent = await mailer({
            to: user.email,
            subject: "RESET PASSWORD LINK",
            html: `
                <h3>
                    Hello ${user.profile?.name},
                </h3>

                <p>
                You requested for a password reset link for your account.
                </p>

                <p>
                Clink on this link to reset password: http://avital-care.vercel.app/forgot-password/${token}
                </p>
            `
        })

        if (sent !== "message sent") {
            return NextResponse.json({ message: "Reset Link not sent" }, { status: 400 })
        }


        return NextResponse.json({ status: true, message: 'Reset Link sent' })

    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: 'something went wrong' }, { status: 500 })
    }
}


export async function PATCH(req: Request) {
    try {

        const passwordCred = z.object({
            password: z.string().min(6),
            token: z.string()
        })

        type PasswordCred = z.infer<typeof passwordCred>

        const {
            password,
            token
        }: PasswordCred = await req.json()


        const val = passwordCred.safeParse({ password, token })


        if (!val.success) {

            const errors = fromZodError(val.error)
            console.log(errors);
            return NextResponse.json({ message: errors.message }, { status: 400 })
        }

        const user = await db.user.findFirst({
            where: {
                reset_password_token: token,
                reset_password_expiry: {
                    gte: new Date()
                }
            },
            include: {
                profile: true
            }
        })

        if (!user) return NextResponse.json({ message: "Token does not exist" }, { status: 400 })

        await db.user.update({
            where: {
                id: user.id
            },
            data: {
                password: await hashPassword(password),
                reset_password_expiry: null,
                reset_password_token: null
            }
        })

        const sent = await mailer({
            to: user.email,
            subject: "RESET PASSWORD CONFIRMATION",
            html: `
                <h3>
                    Hello ${user.profile?.name},
                </h3>

                <p>
                Your password has been reset for your account.
                </p>

            `
        })

        if (sent !== "message sent") {
            return NextResponse.json({ message: "Message not sent" }, { status: 400 })
        }

        return NextResponse.json({ status: true, message: 'Password successfully reset' })

    } catch (error) {
        return NextResponse.json({ message: 'something went wrong' }, { status: 500 })
    }
}