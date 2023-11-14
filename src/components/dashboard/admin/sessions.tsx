"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useStore } from "@/components/hooks/use-store"
import { ModalType } from "@/components/hooks/modal-store"
import useSWR from "swr"
import { AxiosResponseModDoctors, AxiosResponseMod } from "@/app/services/types"
import { DoctorData } from "./doctors"
import { fetcher } from "@/lib/utils"




export default function Sessions() {
    const { onOpen } = useStore()

    const { data: doctorData } =
        useSWR<AxiosResponseModDoctors<DoctorData[]>>('/api/doctors', fetcher)

    return (
        <section className="px-2 md:px-6">
            <div className="my-5 mx-3 sm:px-7 flex flex-col">
                <Button
                    className="flex self-end space-x-2 hover:bg-blue-800 text-xs sm:text-sm bg-blue-700 text-white opacity-90 shadow-md"

                    onClick={() => onOpen(ModalType.ADMINADDSESSION, { networkData: doctorData })}
                >

                    <Plus className="stroke-white" /> <span>Add New Session</span>
                </Button>
            </div>


        </section>
    )
}