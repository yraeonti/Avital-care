"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useStore } from "@/components/hooks/use-store"
import { ModalType } from "@/components/hooks/modal-store"
import useSWR from "swr"
import { AxiosResponseModCount, AxiosResponseMod } from "@/app/services/types"
import { DoctorData } from "./doctors"
import { fetcher } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Pen, Eye, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import DataTable from "../shared/table/data-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type SessionData = {
    id: number,
    title: string,
    sessionDate: string,
    noOfPatients: number,
    sessionTime: { startTime: string; endTime: string, status: boolean }[],
    doctor: string
}


export default function Sessions() {
    const { onOpen } = useStore()

    const [searchFilter, setSearchFilter] = useState<string>('')

    const { data: doctorData } =
        useSWR<AxiosResponseModCount<DoctorData[]>>('/api/doctors', fetcher)

    const { data: tableData, isLoading: tableLoader } =
        useSWR<AxiosResponseModCount<SessionData[]>>('/api/doctors/sessions', fetcher)

    const columns: ColumnDef<SessionData>[] = [
        {
            accessorKey: "title",
            header: () => <div className="font-semibold ">Session Title</div>,
            filterFn: 'includesString',
            enableGlobalFilter: true
        },
        {
            accessorKey: "doctor",
            header: () => <div className="font-semibold">Doctor</div>,
            filterFn: 'includesString',
            enableGlobalFilter: true
        },
        {
            accessorKey: "sessionDate",
            header: () => <div className="font-semibold">Session Date</div>,
            enableGlobalFilter: false,
            cell(props) {
                const date = props.row.getValue("sessionDate") as string
                return new Date(date).toLocaleDateString()
            },
        },
        {
            accessorKey: "noOfPatients",
            header: () => <div className="font-semibold ">No. Of Time Slots</div>,
            enableGlobalFilter: false
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
                                onClick={() => onOpen(ModalType.ADMINVIEWSESSION, { sessionData })}
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                <span>
                                    View
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => onOpen(ModalType.ADMINDELSESSION, { sessionData })}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>
                                    Remove
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
                <Button
                    className="flex self-end space-x-2 hover:bg-blue-800 text-xs sm:text-sm bg-blue-700 text-white opacity-90 shadow-md"

                    onClick={() => onOpen(ModalType.ADMINADDSESSION, { networkData: doctorData })}
                >

                    <Plus className="stroke-white" /> <span>Add New Session</span>
                </Button>


                <div className="mt-3 flex items-center space-x-2 font-semibold text-lg">
                    <span className="">All Sessions</span> {
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
                        placeholder="Search session title or doctor name"
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