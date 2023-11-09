import { getServerSession } from "next-auth"
import { authOptions } from "@/app/services/config"
import { redirect } from "next/navigation"
import Header from "@/components/dashboard/shared/header"
import PageTransition from "@/components/dashboard/shared/page-transition"
import DoctorsComponent from "@/components/dashboard/admin/doctors"
import { AdminNavRoutes } from "@/components/dashboard/shared/side-bar-data"


export default async function DoctorsPage() {
    const session = await getServerSession(authOptions)
    if (!session) return redirect('/login')
    return (
        <div className="h-full">
            <Header session={session} navRoutes={AdminNavRoutes} />

            <PageTransition>
                <DoctorsComponent />

            </PageTransition>


        </div>
    )
}