
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SideBarItem from "./side-bar-item"
import { SessionWithExtraData } from "@/app/services/types"
import { NavItems } from "./side-bar-data"
import SignOutButton from "./signout-button"

type Props = {
    session: SessionWithExtraData;
    navitems: NavItems;
    mobile?: boolean
}


export default function NavigationSideBar({ session, navitems, mobile }: Props) {
    const split = session.user?.name?.split(' ')
    const initials = split ? `${split[0][0]}${split[1][0]}` : 'N/A'
    return (
        <nav className="flex flex-col items-center w-full">

            <div className="flex items-center justify-center space-x-3 w-4/5 pt-14">
                <Avatar className="w-16 h-16">
                    {/* <AvatarImage src="https://github.com/shadcn.png" alt="user" /> */}
                    <AvatarFallback className="uppercase">{initials}</AvatarFallback>
                </Avatar>


                <div className="truncate">
                    <h1 className="text-2xl font-medium truncate">
                        {session.user?.name}
                    </h1>

                    <p className="text-base font-extralight opacity-60 truncate">
                        {session.user?.email}
                    </p>
                </div>
            </div>


            <SignOutButton />


            <Separator className="my-6" />

            <div className="flex flex-col w-4/5 space-y-4">

                {
                    navitems.map((item, index) => (
                        <SideBarItem {...item} mobile={mobile} key={index} />
                    ))
                }


            </div>


        </nav>
    )
}