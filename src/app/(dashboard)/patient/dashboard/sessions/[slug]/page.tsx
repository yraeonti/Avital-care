import { authOptions } from "@/app/services/config"
import Header from "@/components/dashboard/shared/header"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { lazy } from "react"
import PageTransition from "@/components/dashboard/shared/page-transition"
import { PatientNavRoutes } from "@/components/dashboard/shared/side-bar-data"

const SessionSlugComponent = lazy(() => import('@/components/dashboard/patient/session-slug'))

export default async function SessionsSlug({ params }: { params: { slug: string } }) {
    const session = await getServerSession(authOptions)
    if (!session) return redirect('/login')
    return (
        <div className=" h-full">
            <Header session={session} navRoutes={PatientNavRoutes} />

            <PageTransition>
                <SessionSlugComponent params={params} />
            </PageTransition>

        </div>
    )
}