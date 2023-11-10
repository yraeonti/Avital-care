"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useStore } from "@/components/hooks/use-store"
import { ModalType } from "@/components/hooks/modal-store"
import { fetcher } from "@/lib/utils"
import useSWR from "swr"
import useSWRImmutable from 'swr/immutable'
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

import { Form, FormField, FormItem, FormControl } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Dispatch, SetStateAction, useEffect, useState } from "react"


export type DoctorData = {
    name: string;
    email: string;
    specialty: string;
    specialtyId: string;
    nin: string;
    telephone: string;
    id: string;
}


type TableData = { status: boolean; data: DoctorData[]; totalcount: number; }


export default function Doctors() {

    const [data, setData] = useState<TableData>()
    const [searchLoader, setSearchLoader] = useState<boolean>(false)



    const { onOpen } = useStore()

    const { data: specialtiesData } =
        useSWR<AxiosResponseMod<any>>('/api/doctors/specialties', fetcher)

    const { data: tableData, isLoading: tableLoader } =
        useSWRImmutable<AxiosResponseModDoctors<DoctorData[]>>('/api/doctors', fetcher)




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
                                onClick={() => onOpen(ModalType.ADMINEDITDOCTOR, { doctorData, specialtiesData })}
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




    useEffect(() => {

        if (tableData?.data) {
            setData(tableData.data)
        }


    }, [tableData])


    console.log(tableData);






    return (
        <section className="px-6">
            <div className="my-5 mx-3 sm:px-7 flex flex-col">

                <Button
                    className="flex self-end space-x-2 hover:bg-blue-800 text-xs sm:text-sm bg-blue-700 text-white opacity-90 shadow-md"

                    onClick={() => onOpen(ModalType.ADMINADDDOCTOR, { specialtiesData })}>

                    <Plus className="stroke-white" /> <span>Add New Doctor</span>
                </Button>




                <div className="mt-3 flex items-center space-x-2 font-semibold text-lg">
                    <span className="">All DOCTORS</span> {
                        tableLoader ? (
                            <Skeleton className="h-4 w-24 bg-stone-200" />
                        ) : (
                            <h1 className="">
                                ({tableData?.data.totalcount})
                            </h1>
                        )
                    }

                </div>

                <div className="mt-3">
                    <SearchForm setdata={setData} setsearchloader={setSearchLoader} />
                </div>


                <div className="my-9">

                    <DataTable
                        columns={columns}
                        data={(typeof data !== undefined)
                            && data?.status ? data.data : []
                        }
                        loading={tableLoader}
                        searchloader={searchLoader}
                    />
                </div>

            </div>
        </section>
    )
}



const searchSchema = z.object({
    search: z.string()
})

const SearchForm = <T,>({ setdata, setsearchloader }:
    { setdata: Dispatch<SetStateAction<T>>, setsearchloader: Dispatch<SetStateAction<boolean>> }) => {

    const form = useForm({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            search: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof searchSchema>) => {
        setsearchloader(true)
        try {
            const response = await axios.post('/api/doctors', {
                ...values
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            console.log(response);


            if (response.status === 200) {
                setdata(response.data)
            }
        } catch (error) {
            console.log(error);

        }
        setsearchloader(false)
        console.log(values);

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center space-x-4 w-full">
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem className="w-full sm:w-3/5">

                            <FormControl>
                                <Input placeholder="Search doctor by name or email" className="" {...field} />
                            </FormControl>

                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-blue-700">Search</Button>
            </form>
        </Form>
    )
}