import { authOptions } from "@/app/services/config"
import Header from "@/components/dashboard/shared/header"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { lazy } from "react"
import PageTransition from "@/components/dashboard/shared/page-transition"
import { DoctorNavRoutes } from "@/components/dashboard/shared/side-bar-data"

const OverviewComponent = lazy(() => import('@/components/dashboard/doctor/overview'))

export default async function Overview() {
    const session = await getServerSession(authOptions)
    if (!session) return redirect('/login')
    return (
        <div className="w-full">
            <Header session={session} navRoutes={DoctorNavRoutes} />


            <div className="my-4">

                <PageTransition>
                    <OverviewComponent />
                </PageTransition>

            </div>


        </div>
    )
}