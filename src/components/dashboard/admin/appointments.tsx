"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useStore } from "@/components/hooks/use-store"
import { ModalType } from "@/components/hooks/modal-store"
import useSWR from "swr"
import { AxiosResponseModCount, APPOINTMENTSTATUS } from "@/app/services/types"
import { fetcher } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import DataTable from "../shared/table/data-table-filter"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatTime } from "@/lib/utils"

export type AppointmentsData = {
    patientName: string;
    appointmentNo: number;
    doctor: string;
    sessionTitle: string
    sessionDate: string
    status: APPOINTMENTSTATUS
    sessionTime: { startTime: string; endTime: string, status: boolean },
}


export default function Appointments() {
    const { onOpen } = useStore()

    // const { data: doctorData } =
    //     useSWR<AxiosResponseModCount<DoctorData[]>>('/api/doctors', fetcher)

    const { data: tableData, isLoading: tableLoader } =
        useSWR<AxiosResponseModCount<AppointmentsData[]>>('/api/patients/appointments', fetcher)

    console.log(tableData);


    const columns: ColumnDef<AppointmentsData>[] = [
        {
            accessorKey: "patientName",
            header: () => <div className="font-semibold ">Patient Name</div>,
            filterFn: 'includesString',
            enableGlobalFilter: true
        },
        {
            accessorKey: "appointmentNo",
            header: () => <div className="font-semibold">Appointment Number</div>,
            filterFn: 'includesString',
            enableGlobalFilter: true
        },
        {
            accessorKey: "doctor",
            header: () => <div className="font-semibold">Doctor Name</div>,
            enableGlobalFilter: true,

        },

        {
            accessorKey: "sessionTitle",
            header: () => <div className="font-semibold ">Session Title</div>,
            enableGlobalFilter: true
        },
        {
            accessorKey: "sessionDate",
            header: () => <div className="font-semibold ">Session Date</div>,
            cell(props) {
                const date = props.row.getValue("sessionDate") as string
                return new Date(date).toLocaleDateString()
            },
        },
        {
            accessorKey: "status",
            header: () => <div className="font-semibold ">Session Title</div>,
            cell(props) {
                const status = props.row.getValue("status") as string
                return (
                    <Badge variant={status === APPOINTMENTSTATUS.PENDING ?
                        'pending' : status === APPOINTMENTSTATUS.CANCELLED ?
                            'destructive' : 'done'}>
                        {status}
                    </Badge>
                )
            },
        },
        {
            accessorKey: "sessionTime",
            header: () => <div className="font-semibold ">Session Title</div>,
            cell(props) {
                const time = props.row.getValue("sessionTime") as AppointmentsData['sessionTime']

                return `${formatTime(time.startTime)}-${formatTime(time.endTime)} `
            },
        },
        {
            id: "actions",
            header: () => <div className="font-semibold">Actions</div>,
            cell({ row }) {
                const sessionData = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                className="cursor-pointer"
                            // onClick={() => onOpen(ModalType.ADMINDELSESSION, { sessionData })}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>
                                    Cancel
                                </span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]


    return (
        <section className="px-2 md:px-6">
            <div className="my-5 mx-3 sm:px-7 flex flex-col">



                <div className="mt-3 flex items-center space-x-2 font-semibold text-lg">
                    <span className="">All Appointments</span> {
                        tableLoader ? (
                            <Skeleton className="h-4 w-24 bg-stone-200" />
                        ) : (
                            <h1 className="">
                                ({tableData?.data.totalcount})
                            </h1>
                        )
                    }

                </div>
                <div className="my-9">

                    <DataTable
                        columns={columns}
                        data={(typeof tableData?.data !== undefined)
                            && tableData?.data?.status ? tableData.data.data : []
                        }
                        loading={tableLoader}
                    />
                </div>
            </div>
        </section>
    )
}