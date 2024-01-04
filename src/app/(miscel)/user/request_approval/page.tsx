import { redirect } from "next/navigation"
import { db } from "@/app/services/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/services/config"
import { Role, SessionWithExtraData } from "@/app/services/types"
import RequestApproval from "@/components/dashboard/patient/request-approval"
import RequestApprovalExpired from "@/components/dashboard/patient/request-approval-expired"
import { REQUESTHISTORY } from "@/components/hooks/request-history-store"
import { furtureMinutes } from "@/lib/utils"


export default async function Page({ searchParams }: {
    searchParams: { [key: string]: string | undefined }
}) {

    const session: SessionWithExtraData | null = await getServerSession(authOptions)

    if (!session) return redirect('/login')

    if (!(session.role === Role.PATIENT)) return redirect('/login')

    const requestId = searchParams['request']

    if (!requestId) {
        return redirect('/')
    }

    const request = await db.requestHistory.findUnique({
        where: {
            id: requestId
        },
        include: {
            doctor: {
                include: {
                    profile: true
                }
            }
        }
    })

    if (!request) {
        return redirect('/')
    }

    if (request.approval !== REQUESTHISTORY.PENDING) {
        return redirect('/')
    }

    if (new Date() >= furtureMinutes(`${request.createdAt}`, 1440)) {
        return <RequestApprovalExpired />
    }


    return <RequestApproval requestId={requestId} doctorName={request.doctor.profile?.name} />


}