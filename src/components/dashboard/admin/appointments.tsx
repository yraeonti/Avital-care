"use client"
import { Button } from "@/components/ui/button"
import { useStore } from "@/components/hooks/use-store"
import { ModalType } from "@/components/hooks/modal-store"
import useSWR from "swr"
import { AxiosResponseModCount, APPOINTMENTSTATUS } from "@/app/services/types"
import { fetcher } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Pen, XCircle } from "lucide-react"
import { Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import DataTable from "../shared/table/data-table"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatTime } from "@/lib/utils"

export type AppointmentsData = {
    id: number;
    patientName: string;
    appointmentNo: number;
    doctor: string;
    sessionTitle: string
    sessionDate: string
    status: APPOINTMENTSTATUS
    sessionTime: { startTime: string; endTime: string, status: boolean, id: number },
}


export default function Appointments() {
    const { onOpen } = useStore()

    const [searchFilter, setSearchFilter] = useState<string>('')

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
            filterFn: 'includesString',

        },

        {
            accessorKey: "sessionTitle",
            header: () => <div className="font-semibold ">Session Title</div>,
            filterFn: 'includesString',
        },
        {
            accessorKey: "sessionDate",
            header: () => <div className="font-semibold ">Session Date</div>,
            filterFn: 'includesString',
            cell(props) {
                const date = props.row.getValue("sessionDate") as string
                return new Date(date).toLocaleDateString()
            },
        },
        {
            accessorKey: "status",
            header: () => <div className="font-semibold ">Appointment Status</div>,
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
            header: () => <div className="font-semibold ">Appointment Time</div>,
            cell(props) {
                const time = props.row.getValue("sessionTime") as AppointmentsData['sessionTime']

                return `${formatTime(time.startTime)}-${formatTime(time.endTime)} `
            },
        },
        {
            id: "actions",
            header: () => <div className="font-semibold">Actions</div>,
            cell({ row }) {
                const appointmentData = row.original

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
                                onClick={() => onOpen(ModalType.UPDATEAPPOINTMENTSTATUS, { appointmentData })}
                            >
                                <Pen className="mr-2 h-4 w-4" />
                                <span>
                                    Update Status
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => onOpen(ModalType.DELAPPOINTMENT, { appointmentData })}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>
                                    Delete
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

                <div className='mt-3'>
                    <Input
                        placeholder="Search all fields..."
                        value={searchFilter ?? ""}
                        onChange={(event) =>
                            setSearchFilter(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </div>

                <div className="my-9">

                    <DataTable
                        columns={columns}
                        data={(typeof tableData?.data !== undefined)
                            && tableData?.data?.status ? tableData.data.data : []
                        }
                        loading={tableLoader}
                        globalFilter={searchFilter}
                    />
                </div>
            </div>
        </section>
    )
}