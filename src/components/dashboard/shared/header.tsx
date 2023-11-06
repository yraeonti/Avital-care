"use client"
import { Session } from "next-auth"
import MobileToggler from "./mobile-toggler"
import { usePathname } from "next/navigation"
import { CalendarDays } from "lucide-react"

export default function Header({ session }: { session: Session }) {
    const pathname = usePathname()
    return (
        <header className="p-7 flex items-center justify-between">

            <MobileToggler session={session} />

            <h1 className="text-lg ">
                {pathname.endsWith('dashboard') && 'Home'}
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