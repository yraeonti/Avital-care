"use client"
import AnalyticsCard from "../shared/analytics-card"
import { Stethoscope, Users, Bookmark, CalendarCheck } from "lucide-react"
import useSWR from 'swr'
import { fetcher, fetcherPost } from "@/lib/utils"
import { AxiosResponseMod } from "@/app/services/types"
import { Skeleton } from "@/components/ui/skeleton"
import DataTable from "../shared/table/data-table-non"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableProps } from "../shared/table/data-table-non"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export type AnalyticsCardType = {
    doctors: number,
    patients: number,
    todaySessions: number,
    newBookings: number,
}

type AppointmentSummary = {
    appointmentNo: number
    patientName: string
    doctor: string
    sessionTitle: string
}

type SessionSummary = {
    doctor: string;
    sessionTitle: string;
    sessionDate: string;
}


const appointMentColumn: ColumnDef<AppointmentSummary>[] = [
    {
        accessorKey: 'appointmentNo',
        header: 'Appointment No'
    },
    {
        accessorKey: 'patientName',
        header: 'Patient Name'
    },
    {
        accessorKey: 'doctor',
        header: 'Doctor'
    },
    {
        accessorKey: 'sessionTitle',
        header: 'Session Title'
    },

]
const sessionColumn: ColumnDef<SessionSummary>[] = [
    {
        accessorKey: 'sessionTitle',
        header: 'Session Title'
    },
    {
        accessorKey: 'doctor',
        header: 'Doctor'
    },
    {
        accessorKey: 'sessionDate',
        header: 'Session Date',
        cell(props) {
            const date = props.row.getValue("sessionDate") as string
            return new Date(date).toLocaleDateString()
        },
    }
]

export default function Overview() {

    const { data, isLoading } = useSWR<AxiosResponseMod<AnalyticsCardType>>('/api/admin/analytics', fetcher)

    const { data: appointmentsData, isLoading: appointmentLoader } =
        useSWR<AxiosResponseMod<AppointmentSummary[]>>(['/api/admin/analytics', { type: 'appointment' }], ([url, slug]) => fetcherPost(url, slug as {}))

    const { data: sessionData, isLoading: sessionLoader } =
        useSWR<AxiosResponseMod<SessionSummary[]>>(['/api/admin/analytics', { type: 'session' }], ([url, slug]) => fetcherPost(url, slug as {}))

    const router = useRouter()

    return (
        <section className="px-6 mt-10">

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <AnalyticsCard title="Doctors" figure={isLoading ? <Skeleton className="h-2 w-7" /> : data?.data.data.doctors} bg="bg-[#f7e1d7]" icon={<Stethoscope className="stroke-[#a9491d]" />} />
                <AnalyticsCard title="Patients" figure={isLoading ? <Skeleton className="h-2 w-7" /> : data?.data.data.patients} bg="bg-[#d0f4de]" icon={<Users className="stroke-[#1ea351]" />} />
                <AnalyticsCard title="New Bookings" figure={isLoading ? <Skeleton className="h-2 w-7" /> : data?.data.data.newBookings} bg="bg-[#a9d6e5] opacity-80" icon={<Bookmark className="stroke-[#157494]" />} />
                <AnalyticsCard title="Today Sessions" figure={isLoading ? <Skeleton className="h-2 w-7" /> : data?.data.data.todaySessions} bg="bg-[#babbec]" icon={<CalendarCheck className="stroke-[#3537b7]" />} />
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 pt-14 md:mt-16 gap-5 pb-7">

                <div className="">
                    <Summary
                        title="Upcoming Appointments"
                        description="Brief View of Upcoming Appointments. More details available in @Appointments section.."
                        columns={appointMentColumn}
                        loading={appointmentLoader}
                        data={(typeof appointmentsData?.data !== undefined)
                            && appointmentsData?.data?.status ? appointmentsData.data.data : []
                        }
                    />
                    <Button className="my-2 w-full"
                        onClick={() => {
                            router.push('/admin/dashboard/appointments')
                        }}
                    >
                        View All Appointments
                    </Button>
                </div>

                <div className="">
                    <Summary
                        title="Upcoming Sessions"
                        description="Brief View of Upcoming Sessions. Add,Remove and Many features available in @Sessions section.."
                        columns={sessionColumn}
                        loading={sessionLoader}
                        data={(typeof sessionData?.data !== undefined)
                            && sessionData?.data?.status ? sessionData.data.data : []
                        }
                    />
                    <Button className="my-2 w-full"
                        onClick={() => {
                            router.push('/admin/dashboard/sessions')
                        }}
                    >
                        View All Sessions
                    </Button>
                </div>



            </section>

        </section>
    )
}

interface SummaryProps<TData, TValue> extends DataTableProps<TData, TValue> {
    title: string;
    description: string;
}

export const Summary = <Data, TValue>({ title, description, columns, loading, data }: SummaryProps<Data, TValue>) => {
    return (
        <div className="">

            <h1 className="text-2xl text-sky-600">
                {title}
            </h1>

            <p className="mt-4">{description}</p>

            <div className="mt-10">
                <DataTable
                    columns={columns}
                    loading={loading}
                    data={data}
                />
            </div>

        </div>
    )
}