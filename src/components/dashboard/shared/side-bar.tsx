
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SideBarItem from "./side-bar-item"
import { Role, SessionWithExtraData } from "@/app/services/types"
import { NavItems } from "./side-bar-data"
import SignOutButton from "./signout-button"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
    session: SessionWithExtraData;
    navitems: NavItems;
    mobile?: boolean
}


export default function NavigationSideBar({ session, navitems, mobile }: Props) {
    if (session.role === 'ADMIN') {

        return (

            <nav className="flex flex-col items-center w-full">

                <div className="flex items-center justify-center space-x-3 w-4/5 pt-14">
                    <Avatar className="w-16 h-16">
                        {/* <AvatarImage src="https://github.com/shadcn.png" alt="user" /> */}
                        <AvatarFallback className="uppercase text-2xl">A</AvatarFallback>
                    </Avatar>


                    <div className="truncate">
                        <h1 className="text-2xl font-medium truncate capitalize">
                            Admin
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
    const split = session.user?.name?.split(' ')
    const initials = split ? `${split[0][0]}${split[1][0]}` : session.role === Role.DOCTOR ? 'D' : 'P'
    return (
        <nav className="flex flex-col items-center w-full">

            <div className="flex items-center justify-center space-x-3 w-4/5 pt-14">
                {
                    session.user?.image ? (
                        <Avatar className="w-16 h-16">

                            <AvatarImage src={session.user?.image} alt="user" />


                            <AvatarFallback className="uppercase text-2xl">
                                <Skeleton className="w-full h-full rounded-full bg-stone-200" />
                            </AvatarFallback>
                        </Avatar>
                    ) : (

                        <Avatar className="w-16 h-16">
                            <AvatarFallback className="uppercase text-2xl">{initials}</AvatarFallback>
                        </Avatar>

                    )
                }



                <div className="truncate">
                    <h1 className="text-2xl font-medium truncate capitalize">
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