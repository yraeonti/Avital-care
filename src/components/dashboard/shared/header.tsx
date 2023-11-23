"use client"
import { Session } from "next-auth"
import MobileToggler from "./mobile-toggler"
import { usePathname } from "next/navigation"
import { CalendarDays } from "lucide-react"
import { NavItems } from "./side-bar-data"
import { } from "./side-bar-data";
import { Role, SessionWithExtraData } from "@/app/services/types"
import avitaCare from '../../../../public/Avita Health.png'
import Image from "next/image"

export default function Header({ session, navRoutes }: { session: SessionWithExtraData, navRoutes: NavItems }) {
    const pathname = usePathname()
    return (
        <header className="p-7 flex items-center justify-between border-b border-neutral-300 rounded-none">

            <MobileToggler session={session} navRoutes={navRoutes} />






            <h1 className="text-xl capitalize hidden md:block">
                {pathname.endsWith('dashboard') && session.role === Role.PATIENT
                    ? 'Home' : /^[0-9]*$/.test(pathname.split('/').slice(-1)[0])
                        ? pathname.split('/').slice(-2)[0]
                        : pathname.split('/').slice(-1)[0]
                }
            </h1>




            <div className="flex items-center space-x-2">

                <CalendarDays />
                <span className="text-lg">
                    {new Date().toISOString().split('T')[0].split('-').join('/')}
                </span>

            </div>


        </header>
    )
}