"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Session } from "next-auth"
import { Clock, Stethoscope, CalendarCheck, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/components/hooks/use-store"
import { ModalType } from "@/components/hooks/modal-store"

export default function Overview({ session }: { session: Session }) {
    const { onOpen } = useStore()

    const carddata = [
        {
            bgcolour: 'bg-[#e9edc9]',
            icon: <Clock className="stroke-[#8d9d13]" />,
            desc: 'Schedule Appointment',
            content: 'Book an appointment with a health practioner',
            onclick: onOpen,
            footer: 'Schedule Now'
        },
        {
            bgcolour: 'bg-[#f7e1d7]',
            icon: <Stethoscope className="stroke-[#a9491d]" />,
            desc: 'Doctor\'s List',
            content: 'View all doctors we currently offer and their sessions',
            onclick: () => { },
            footer: 'View Doctors'
        },
        {
            bgcolour: 'bg-[#d0f4de]',
            icon: <CalendarCheck className="stroke-[#1ea351]" />,
            desc: 'View Schedules',
            content: 'View and search for all your scheduled sessions',
            onclick: () => { },
            footer: 'View Schedules'
        },
        {
            bgcolour: 'bg-[#a9d6e5] opacity-80',
            icon: <Bookmark className="stroke-[#157494]" />,
            desc: 'My Bookings',
            content: 'Track your past and future appointments history',
            onclick: () => { },
            footer: 'Track History'
        },
    ]

    return (
        <section className="px-6">

            <h1 className="text-xl font-medium truncate my-5">Welcome  <span className="opacity-60 text-2xl truncate pl-1 capitalize">{session.user?.name}!</span></h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6">
                {
                    carddata.map((item, i) => (
                        <Card className={item.bgcolour} key={i}>
                            <CardHeader>
                                <CardTitle>
                                    {item.icon}
                                </CardTitle>
                                <CardDescription className="pt-5 text-lg font-semibold text-black">

                                    {item.desc}

                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="opacity-60">
                                    {item.content}
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button variant='link' className="text-blue-800 p-0" onClick={() => item.onclick(ModalType.VIEWSCHEDULE)}>
                                    <p className="text-start">
                                        {item.footer}
                                    </p>

                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                }

            </div>



        </section>
    )

}