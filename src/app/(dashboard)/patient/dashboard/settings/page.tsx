import { authOptions } from "@/app/services/config"
import Header from "@/components/dashboard/shared/header"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { lazy } from "react"
import PageTransition from "@/components/dashboard/shared/page-transition"

const SettingsComponent = lazy(() => import('@/components/dashboard/patient/settings'))

export default async function SettingsPage() {
    const session = await getServerSession(authOptions)
    if (!session) return redirect('/login')
    return (
        <div className=" h-full">
            <Header session={session} />

            <PageTransition>
                <SettingsComponent />
            </PageTransition>

        </div>
    )
}