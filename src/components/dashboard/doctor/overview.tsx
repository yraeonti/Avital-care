"use client"
import AnalyticsCard from "../shared/analytics-card"
import { Stethoscope, Users, Bookmark, CalendarCheck } from "lucide-react"

import useSWR from 'swr'
import { fetcher } from "@/lib/utils"
import { AxiosResponseMod } from "@/app/services/types"
import { Skeleton } from "@/components/ui/skeleton"
import { AnalyticsCardType } from "../admin/overview"
import { Summary } from "../admin/overview"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type SessionSummary = {
    sessionTitle: string;
    sessionDate: string;
    noOfBookedTimes: number;
}

const sessionColumn: ColumnDef<SessionSummary>[] = [
    {
        accessorKey: 'sessionTitle',
        header: 'Session Title'
    },

    {
        accessorKey: 'sessionDate',
        header: 'Session Date',
        cell(props) {
            const date = props.row.getValue("sessionDate") as string
            return new Date(date).toLocaleDateString()
        },
    },
    {
        accessorKey: 'noOfBookedTimes',
        header: 'No. Of Booked Times'
    }
]

export default function Overview() {
    const { data, isLoading } = useSWR<AxiosResponseMod<AnalyticsCardType>>('/api/admin/analytics', fetcher)

    const { data: sessionData, isLoading: sessionLoader } = useSWR<AxiosResponseMod<SessionSummary[]>>('/api/doctor/dashboard', fetcher)

    const router = useRouter();
    return (
        <section className="px-6">

            {/* <div className="bg-[url('/doc-bg.jpg')] bg-no-repeat bg-cover bg-origin-border h-64 m">

            </div> */}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                <AnalyticsCard title="All Doctors" figure={isLoading ? <Skeleton className="h-2 w-7" /> : data?.data.data.doctors} bg="bg-[#f7e1d7]" icon={<Stethoscope className="stroke-[#a9491d]" />} />
                <AnalyticsCard title="All Patients" figure={isLoading ? <Skeleton className="h-2 w-7" /> : data?.data.data.patients} bg="bg-[#d0f4de]" icon={<Users className="stroke-[#1ea351]" />} />
                <AnalyticsCard title="New Bookings" figure={isLoading ? <Skeleton className="h-2 w-7" /> : data?.data.data.newBookings} bg="bg-[#a9d6e5] opacity-80" icon={<Bookmark className="stroke-[#157494]" />} />
                <AnalyticsCard title="Today Sessions" figure={isLoading ? <Skeleton className="h-2 w-7" /> : data?.data.data.todaySessions} bg="bg-[#babbec]" icon={<CalendarCheck className="stroke-[#3537b7]" />} />
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 pt-10 gap-5 pb-7">
                <div className="">
                    <Summary
                        title="Your Upcoming Sessions"
                        description=""
                        columns={sessionColumn}
                        loading={sessionLoader}
                        data={(typeof sessionData?.data !== undefined)
                            && sessionData?.data?.status ? sessionData.data.data : []
                        }
                    />
                    <Button className="my-2 w-full"
                        onClick={() => {
                            router.push('/doctor/dashboard/sessions')
                        }}
                    >
                        View All Sessions
                    </Button>
                </div>
            </section>

        </section>
    )
}