"use client"
import { User2, Eye, Trash2, LockKeyhole } from "lucide-react"

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { useStore } from "@/components/hooks/use-store"
import { ModalType } from "@/components/hooks/modal-store"
import { fetcher } from '@/lib/utils'

import useSWR from 'swr'
import { AxiosResponseMod } from "@/app/services/types"

export default function Settings() {

    const { onOpen } = useStore()

    const { data, isLoading, error } = useSWR<AxiosResponseMod<any>>('/api/patient', fetcher)

    const settingsdata = [
        {
            icon: <User2 className="stroke-[#7678ed] w-8 h-8" />,
            desc: 'Account Settings',
            content: 'Edit your Account Details',
            onclick: onOpen,
            modaltype: ModalType.PATIENTACCOUNTSETTINGS
        },
        {
            icon: <LockKeyhole className="stroke-[#1ea351] w-8 h-8" />,
            desc: 'Change Password',
            content: 'Change your Account Password',
            onclick: onOpen,
            modaltype: ModalType.PATIENTCHANGEPASSWORD
        },
        {
            icon: <Eye className="stroke-[#157494] w-8 h-8" />,
            desc: 'View Account Details',
            content: 'View Profile Information on your Account',
            onclick: onOpen,
            modaltype: ModalType.PATIENTVIEWACCOUNT
        },
        {
            icon: <Trash2 className="stroke-red-500 w-8 h-8" />,
            desc: 'Delete Account',
            content: 'Permanently Remove your Account',
            onclick: onOpen,
            modaltype: ModalType.PATIENTDELACCOUNT
        },
    ]
    return (
        <section className="px-6 py-8">

            <div className="grid grid-cols-1  gap-y-6">
                {
                    settingsdata.map((item, i) => (
                        <Card key={i}>

                            <CardContent className="flex items-center space-x-6 p-3 cursor-pointer"
                                onClick={() => item.onclick(item.modaltype, { networkData: data })}>

                                <div>
                                    {item.icon}
                                </div>

                                <div className="space-y-1">
                                    <p className={`text-xl font-semibold ${item.desc.includes('Delete') && 'text-red-500'}`}>
                                        {item.desc}
                                    </p>
                                    <p className="opacity-75">
                                        {item.content}
                                    </p>
                                </div>

                            </CardContent>

                        </Card>
                    ))
                }

            </div>

        </section>
    )
}