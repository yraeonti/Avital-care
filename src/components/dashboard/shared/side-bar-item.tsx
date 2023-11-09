"use client"
import Link from "next/link"
import { NavItems } from "./side-bar-data"
import { usePathname } from "next/navigation";
import { SheetClose } from "@/components/ui/sheet";

export default function SideBarItem({ icon, name, link, mobile }: NavItems[number] & { mobile?: boolean }) {

    const path = usePathname()
    const checkActive = (type: string) => path.endsWith(type);
    return mobile ? (
        <SheetClose>
            <Link href={link} className={`flex space-x-4 items-center 
                justify-start p-3 cursor-pointer rounded-md
                ${checkActive(link) ? "bg-black" : "hover:bg-neutral-200"} 
                `}>
                {typeof icon !== 'string' && icon()}
                <div className={`truncate ${checkActive(link) ? " text-white" : "text-black"}`}>
                    {name}
                </div>



            </Link>
        </SheetClose>

    ) : (
        <Link href={link} className={`flex space-x-4 items-center 
            justify-start p-3 cursor-pointer rounded-md
             ${checkActive(link) ? "bg-black" : "hover:bg-neutral-200"} 
             `}>
            {typeof icon !== 'string' && icon()}
            <div className={`truncate ${checkActive(link) ? " text-white" : "text-black"}`}>
                {name}
            </div>
        </Link>
    )
}