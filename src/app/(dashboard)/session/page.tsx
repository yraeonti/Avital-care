import { getServerSession } from "next-auth";
import { authOptions } from "@/app/services/config";
import { SessionWithExtraData, Role } from "@/app/services/types";
import { redirect } from "next/navigation";

export default async function SessionCheck() {
    const session: SessionWithExtraData | null = await getServerSession(authOptions)
    console.log('session page', session);
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