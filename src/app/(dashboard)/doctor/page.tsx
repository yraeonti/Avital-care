import { authOptions } from "@/app/services/config"
import { getServerSession } from "next-auth"
import { Role, SessionWithExtraData } from "@/app/services/types"
import { redirect } from "next/navigation"


export default async function Page() {

    const session: SessionWithExtraData | null = await getServerSession(authOptions)

    if (session) {

        const { role } = session
        if (role === Role.PATIENT) {
            return redirect('/patient/dashboard')
        } else if (role === Role.DOCTOR) {
            return redirect('/doctor/dashboard')
        } else {
            if (role === 'ADMIN') return redirect('/admin/dashboard')
        }
    }
    return redirect('/login')

}