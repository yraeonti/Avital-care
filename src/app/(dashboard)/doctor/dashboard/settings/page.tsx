import { authOptions } from "@/app/services/config"
import Header from "@/components/dashboard/shared/header"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { lazy } from "react"
import PageTransition from "@/components/dashboard/shared/page-transition"
import { DoctorNavRoutes } from "@/components/dashboard/shared/side-bar-data"

const SettingsComponent = lazy(() => import('@/components/dashboard/doctor/settings'))

export default async function SettingsPage() {
    const session = await getServerSession(authOptions)
    if (!session) return redirect('/login')
    return (
        <div className=" h-full">
            <Header session={session} navRoutes={DoctorNavRoutes} />

            <PageTransition>
                <SettingsComponent />
            </PageTransition>

        </div>
    )
}