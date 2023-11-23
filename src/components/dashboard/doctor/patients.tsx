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
import { Pen, BookOpenText, History } from "lucide-react"
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


enum PATIENTDATA {
    MY = 'MY',
    ALL = 'ALL'
}


export default function Doctors() {

    const [searchFilter, setSearchFilter] = useState<string>('')
    const [tableData, setTableData] = useState<{ status: Boolean, data: PatientData[], totalcount: number }>()
    const [tableLoader, setTableLoader] = useState(false)
    const [type, setType] = useState<PATIENTDATA>(PATIENTDATA.MY)



    const { onOpen } = useStore()


    const getMyPatients = async () => {
        setTableLoader(true)
        setType(PATIENTDATA.MY)
        try {
            const response = await axios.get('/api/doctor/patient')

            if (response.status === 200) {
                setTableData(response.data)
            }
        } catch (error) {

        }
        setTableLoader(false)
    }

    console.log(tableData);


    const getAllPatients = async () => {
        setTableLoader(true)
        setType(PATIENTDATA.ALL)
        try {
            const response = await axios.get('/api/patients')

            if (response.status === 200) {
                setTableData(response.data)
            }
        } catch (error) {

        }
        setTableLoader(false)
    }

    useEffect(() => {
        (async () => {
            await getMyPatients()
        })()
    }, [])


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
                                onClick={() => onOpen(ModalType.PATIENTHISTORY, { patientData })}
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
                    <span className="">{type === PATIENTDATA.MY ? 'My' : 'All'} Patients</span> {
                        tableLoader ? (
                            <Skeleton className="h-4 w-24 bg-stone-200" />
                        ) : (
                            <h1 className="">
                                ({tableData?.totalcount})
                            </h1>
                        )
                    }

                </div>

                <div className="my-4 flex w-full justify-end">
                    <Select defaultValue={PATIENTDATA.MY} onValueChange={async (value) => {
                        if (value === PATIENTDATA.MY) {
                            await getMyPatients()
                            return;
                        }
                        await getAllPatients()
                    }}>
                        <SelectTrigger className="w-[240px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value={PATIENTDATA.MY} >My Patients</SelectItem>
                                <SelectItem value={PATIENTDATA.ALL}>All Patients</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
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
                            && tableData?.status ? tableData.data : []
                        }
                        loading={tableLoader}
                        globalFilter={searchFilter}
                    />
                </div>

            </div>
        </section>
    )
}


