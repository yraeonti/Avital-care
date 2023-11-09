"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useStore } from "@/components/hooks/use-store"
import { ModalType } from "@/components/hooks/modal-store"
import { fetcher } from "@/lib/utils"
import useSWR from "swr"
import { AxiosResponseModDoctors, AxiosResponseMod } from "@/app/services/types"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Pen, Eye, Trash2 } from "lucide-react"
import DataTable from "../shared/table/data-table"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"


export type DoctorData = {
    name: string;
    email: string;
    specialty: string;
    specialtyId: string;
    nin: string;
    telephone: string;
    id: string;
}





export default function Doctors() {



    const { onOpen } = useStore()

    const { data: networkData } =
        useSWR<AxiosResponseMod<any>>('/api/doctors/specialties', fetcher)

    const { data: tableData, isLoading: tableLoader } =
        useSWR<AxiosResponseModDoctors<DoctorData[]>>('/api/doctors', fetcher)

    const columns: ColumnDef<DoctorData>[] = [
        {
            accessorKey: "name",
            header: () => <div className="font-semibold ">Name</div>,
        },
        {
            accessorKey: "email",
            header: () => <div className="font-semibold text-center">Email</div>,
        },
        {
            accessorKey: "specialty",
            header: () => <div className="font-semibold text-center">Specialties</div>,
        },
        {
            id: "actions",
            header: () => <div className="font-semibold text-center">Actions</div>,
            cell({ row }) {
                const doctorData = row.original

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
                                onClick={() => onOpen(ModalType.ADMINEDITDOCTOR, { doctorData, networkData })}
                            >
                                <Pen className="mr-2 h-4 w-4" />
                                <span>
                                    Edit
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => onOpen(ModalType.VIEWDOCTORACCOUNT, { doctorData })}
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                <span>
                                    View
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => onOpen(ModalType.ADMINDELDOCTOR, { doctorData })}
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







    console.log(tableData);






    return (
        <section className="px-6">
            <div className="my-5 px-3 sm:px-7 flex flex-col">

                <Button
                    className="flex self-end space-x-2 hover:bg-blue-800 text-xs sm:text-sm bg-blue-700 text-white opacity-90 shadow-md"

                    onClick={() => onOpen(ModalType.ADMINADDDOCTOR, { networkData })}>

                    <Plus className="stroke-white" /> <span>Add New Doctor</span>
                </Button>

                <div className="mt-3 flex items-center space-x-2 font-semibold text-lg">
                    <span className="">All DOCTORS</span> {
                        tableLoader ? (
                            <Skeleton className="h-4 w-24 bg-stone-200" />
                        ) : (
                            <h1 className="">
                                ({tableData?.data.totaldoctors})
                            </h1>
                        )
                    }

                </div>

                <div className="my-9">
                    <DataTable
                        columns={columns}
                        data={(typeof tableData !== undefined)
                            && tableData?.data.status ? tableData.data.data : []
                        }
                        loading={tableLoader}
                    />
                </div>

            </div>
        </section>
    )
}