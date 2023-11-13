"use client"

import { Button } from "@/components/ui/button"
import { useStore } from "@/components/hooks/use-store"
import { ModalType } from "@/components/hooks/modal-store"
import { fetcher } from "@/lib/utils"
import useSWR from "swr"
import { AxiosResponseModDoctors, AxiosResponseMod } from "@/app/services/types"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Pen, Eye, Trash2 } from "lucide-react"
import DataTable from "../shared/table/data-table"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"


export type PatientData = {
    name: string;
    email: string;
    nin: string;
    telephone: string;
    id: string;
    date_of_birth: string;
    address: string
}


type TableData = { status: boolean; data: PatientData[]; totalcount: number; }


export default function Doctors() {

    const [searchFilter, setSearchFilter] = useState<string>('')



    const { onOpen } = useStore()


    const { data: tableData, isLoading: tableLoader } =
        useSWR<AxiosResponseModDoctors<PatientData[]>>('/api/patients', fetcher)




    const columns: ColumnDef<PatientData>[] = [
        {
            accessorKey: "name",
            header: () => <div className="font-semibold ">Name</div>,
            filterFn: 'includesString'
        },
        {
            accessorKey: "email",
            header: () => <div className="font-semibold text-center">Email</div>,
            filterFn: 'includesString'
        },
        {
            accessorKey: "telephone",
            header: () => <div className="font-semibold text-center">Mobile Number</div>,
            filterFn: 'includesString'
        },
        {
            accessorKey: "nin",
            header: () => <div className="font-semibold text-center">NIN</div>,
            enableGlobalFilter: false
        },
        {
            accessorKey: "date_of_birth",
            header: () => <div className="font-semibold text-center">Date Of Birth</div>,
            enableGlobalFilter: false,
            cell(props) {
                const val = props.getValue() as string
                return val.split('T')[0]
            },
        },
        {
            id: "actions",
            header: () => <div className="font-semibold text-center">Actions</div>,
            cell({ row }) {
                const patientData = row.original

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
                                onClick={() => onOpen(ModalType.VIEWPATIENTACCOUNT, { patientData })}
                            >
                                <Pen className="mr-2 h-4 w-4" />
                                <span>
                                    View
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer"
                            // onClick={() => onOpen(ModalType.VIEWDOCTORACCOUNT, { doctorData })}
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                <span>
                                    History
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
                    <span className="">All PATIENTS</span> {
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
                        placeholder="Search email or name or phone no..."
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


