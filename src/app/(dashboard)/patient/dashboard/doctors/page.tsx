import { authOptions } from "@/app/services/config"
import Header from "@/components/dashboard/shared/header"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import PageTransition from "@/components/dashboard/shared/page-transition"
import { PatientNavRoutes } from "@/components/dashboard/shared/side-bar-data"
import DoctorsComponent from '@/components/dashboard/patient/doctors'

export default async function SettingsPage() {
    const session = await getServerSession(authOptions)
    if (!session) return redirect('/login')
    return (
        <div className=" h-full">
            <Header session={session} navRoutes={PatientNavRoutes} />

            <PageTransition>
                <DoctorsComponent />
            </PageTransition>

        </div>
    )
}