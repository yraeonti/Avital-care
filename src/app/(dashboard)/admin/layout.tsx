import NavigationSideBar from "@/components/dashboard/shared/side-bar"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/services/config"
import { SessionWithExtraData } from "@/app/services/types"
import { AdminNavRoutes } from '@/components/dashboard/shared/side-bar-data'
import { redirect } from "next/navigation"
import { ModalProvider } from "@/components/providers/admin-modal-provider"




export default async function AdminLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {

    const session: SessionWithExtraData | null = await getServerSession(authOptions)

    if (!session) return redirect('/login')

    if (!(session.role === 'ADMIN')) return redirect('/login')

    return (
        <main className="h-full md:flex">
            <div className="hidden md:block h-full w-[25%] lg:w-80 z-30 fixed inset-y-0 border-r border-neutral-200 overflow-auto shadow-md">
                <NavigationSideBar session={session} navitems={AdminNavRoutes} />


            </div>
            <main className="md:flex-1  pl-0 md:pl-[25%] lg:pl-80 h-full overflow-x-hidden">
                {children}
            </main>
            <ModalProvider />
        </main>
    )
}