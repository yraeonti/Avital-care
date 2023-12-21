"use client"

import { Button } from "@/components/ui/button"
import { useStore } from "@/components/hooks/use-store"
import { ModalType } from "@/components/hooks/modal-store"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Pen, BookOpenText, History, Upload } from "lucide-react"
import DataTable from "../shared/table/data-table"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import axios from "axios"
import { PatientData } from "../admin/patients"
import { useSession } from "next-auth/react"
import { AxiosResponseMod, AxiosResponseModCount, SessionWithExtraData } from "@/app/services/types"
import useSWR from "swr"
import { fetcher } from "@/lib/utils"





export default function Doctors() {

    const [searchFilter, setSearchFilter] = useState<string>('')

    const { data: tableData, isLoading: tableLoader } = useSWR<AxiosResponseModCount<PatientData[]>>('/api/doctor/patient', fetcher)



    const { onOpen, requestId, type: modalType } = useStore()


    const { data } = useSession()

    const session = data as SessionWithExtraData | null










    const columns: ColumnDef<PatientData>[] = [
        {
            accessorKey: "name",
            header: () => <div className="font-semibold ">Name</div>,
            filterFn: 'includesString'
        },
        {
            accessorKey: "email",
            header: () => <div className="font-semibold">Email</div>,
            filterFn: 'includesString'
        },
        {
            accessorKey: "telephone",
            header: () => <div className="font-semibold">Mobile Number</div>,
            filterFn: 'includesString'
        },
        {
            accessorKey: "nin",
            header: () => <div className="font-semibold">NIN</div>,
            enableGlobalFilter: false
        },
        {
            accessorKey: "date_of_birth",
            header: () => <div className="font-semibold">Date Of Birth</div>,
            enableGlobalFilter: false,
            cell(props) {
                const val = props.getValue() as string
                return new Date(val).toLocaleDateString()
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
                                onClick={() => onOpen(ModalType.REQUESTAPPROVAL, { patientData })}
                            >
                                <BookOpenText className="mr-2 h-4 w-4" />
                                <span>
                                    History
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => onOpen(ModalType.DIAGNOSIS, { patientData })}
                            >
                                <History className="mr-2 h-4 w-4" />
                                <span>
                                    Diagnosis
                                </span>
                            </DropdownMenuItem>
                            {
                                session &&
                                session.specialty &&
                                session.specialty.toLowerCase() === 'laboratory' && (
                                    <>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="cursor-pointer"
                                            onClick={() => onOpen(ModalType.REQUESTAPPROVAL, { patientData })}
                                        >
                                            <Upload className="mr-2 h-4 w-4" />
                                            <span>
                                                Upload Lab Result
                                            </span>
                                        </DropdownMenuItem>
                                    </>
                                )
                            }
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
                    <span className="">My Patients</span> {
                        tableLoader || !tableData ? (
                            <Skeleton className="h-4 w-24 bg-stone-200" />
                        ) : (
                            <h1 className="">
                                ({tableData.data.totalcount})
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


