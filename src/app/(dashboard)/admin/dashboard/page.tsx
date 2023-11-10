import { authOptions } from "@/app/services/config"
import Header from "@/components/dashboard/shared/header"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { lazy } from "react"
import PageTransition from "@/components/dashboard/shared/page-transition"
import { AdminNavRoutes } from "@/components/dashboard/shared/side-bar-data"

const OverviewComponent = lazy(() => import('@/components/dashboard/admin/overview'))

export default async function Overview() {
    const session = await getServerSession(authOptions)
    if (!session) return redirect('/login')
    return (
        <div className="w-full">
            <Header session={session} navRoutes={AdminNavRoutes} />


            <div className="my-4">

                <PageTransition>
                    <OverviewComponent />
                </PageTransition>

            </div>


        </div>
    )
}