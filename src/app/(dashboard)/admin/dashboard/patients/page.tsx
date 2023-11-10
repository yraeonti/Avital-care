import { getServerSession } from "next-auth"
import { authOptions } from "@/app/services/config"
import { redirect } from "next/navigation"
import Header from "@/components/dashboard/shared/header"
import PageTransition from "@/components/dashboard/shared/page-transition"
import { AdminNavRoutes } from "@/components/dashboard/shared/side-bar-data"
import { lazy } from "react"

const PatientsComponent = lazy(() => import('@/components/dashboard/admin/patients'))


export default async function PatientsPage() {
    const session = await getServerSession(authOptions)
    if (!session) return redirect('/login')
    return (
        <div className="h-full">
            <Header session={session} navRoutes={AdminNavRoutes} />

            <PageTransition>
                <PatientsComponent />

            </PageTransition>


        </div>
    )
}