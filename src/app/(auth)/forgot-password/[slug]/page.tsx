import { db } from "@/app/services/db"
import ChangePasswordComponent from "@/components/auth/change-password"



export default async function ForgotPasswordPage({ slug }: { slug: string }) {
    const user = await db.user.findFirst({
        where: {
            reset_password_token: slug,
            reset_password_expiry: {
                gte: new Date()
            }
        }
    })


    if (user) {
        return (
            <section className="flex items-center justify-center h-full">

                <ChangePasswordComponent token={user.reset_password_token!} />

            </section>
        )
    }
    return (
        <div className="flex items-center justify-center h-full">

            <h1 className="text-white">
                Link is Invalid
            </h1>

        </div>
    )

}