import { getServerSession } from "next-auth"
import { authOptions } from "@/app/services/config"
import { redirect } from "next/navigation"
import Header from "@/components/dashboard/shared/header"
import PageTransition from "@/components/dashboard/shared/page-transition"
import { DoctorNavRoutes } from "@/components/dashboard/shared/side-bar-data"
import SessionsComponent from "@/components/dashboard/doctor/sessions"
export default async function Appointments() {
    const session = await getServerSession(authOptions)
    if (!session) return redirect('/login')
    return (
        <div className="">
            <Header session={session} navRoutes={DoctorNavRoutes} />

            <PageTransition>
                <SessionsComponent />

            </PageTransition>

        </div>
    )
}