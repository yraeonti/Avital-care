import { authOptions } from "@/app/services/config"
import Header from "@/components/dashboard/shared/header"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import PageTransition from "@/components/dashboard/shared/page-transition"
import OverviewComponent from "@/components/dashboard/patient/overview"
import { PatientNavRoutes } from "@/components/dashboard/shared/side-bar-data"

export default async function OverviewPage() {
    const session = await getServerSession(authOptions)
    if (!session) return redirect('/login')
    return (
        <div className=" h-full">
            <Header session={session} navRoutes={PatientNavRoutes} />

            <PageTransition>
                <OverviewComponent session={session} />
            </PageTransition>

        </div>
    )
}