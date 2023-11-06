import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavigationSideBar from "./side-bar";
import { Session } from "next-auth"
import { PatientNavRoutes } from "./side-bar-data";


export default function MobileToggler({ session }: { session: Session }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex gap-0 md:hidden">

                <NavigationSideBar session={session} navitems={PatientNavRoutes} mobile />

            </SheetContent>
        </Sheet>
    )
}