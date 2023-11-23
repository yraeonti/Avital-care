"use client"
import AnalyticsCard from "../shared/analytics-card"
import { Stethoscope, Users, Bookmark, CalendarCheck } from "lucide-react"
import useSWR from 'swr'
import { fetcher } from "@/lib/utils"
import { AxiosResponseMod } from "@/app/services/types"
import { Skeleton } from "@/components/ui/skeleton"

export type AnalyticsCardType = {
    doctors: number,
    patients: number,
    todaySessions: number,
    newBookings: number,
}

export default function Overview() {

    const { data, isLoading } = useSWR<AxiosResponseMod<AnalyticsCardType>>('/api/admin/analytics', fetcher)



    return (
        <section className="px-6">

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <AnalyticsCard title="Doctors" figure={isLoading ? <Skeleton className="h-2 w-7" /> : data?.data.data.doctors} bg="bg-[#f7e1d7]" icon={<Stethoscope className="stroke-[#a9491d]" />} />
                <AnalyticsCard title="Patients" figure={isLoading ? <Skeleton className="h-2 w-7" /> : data?.data.data.patients} bg="bg-[#d0f4de]" icon={<Users className="stroke-[#1ea351]" />} />
                <AnalyticsCard title="New Bookings" figure={isLoading ? <Skeleton className="h-2 w-7" /> : data?.data.data.newBookings} bg="bg-[#a9d6e5] opacity-80" icon={<Bookmark className="stroke-[#157494]" />} />
                <AnalyticsCard title="Today Sessions" figure={isLoading ? <Skeleton className="h-2 w-7" /> : data?.data.data.todaySessions} bg="bg-[#babbec]" icon={<CalendarCheck className="stroke-[#3537b7]" />} />
            </div>

        </section>
    )
}