
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useStore } from "../hooks/use-store";
import { ModalType } from "@/components/hooks/modal-store"
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";


export default function ViewDoctorAccount() {
    const { isOpen, onClose, type, data: { doctorData } } = useStore();

    const isModalOpen = isOpen && type === ModalType.VIEWDOCTORACCOUNT;


    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black pt-4 pb-8 px-7 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Doctor Details
                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-4">

                    <div className="space-y-2">
                        <h1 className="font-semibold text-xl opacity-60">
                            Name
                        </h1>

                        <p className="">

                            {doctorData ? (
                                doctorData.name
                            ) : (
                                <Skeleton className="h-4 w-10" />
                            )}

                        </p>
                        <Separator />
                    </div>

                    <div className="space-y-2">
                        <h1 className="font-semibold text-xl opacity-60">
                            Email
                        </h1>

                        <p className="">

                            {doctorData ? (
                                doctorData.email
                            ) : (
                                <Skeleton className="h-4 w-10" />
                            )}

                        </p>
                        <Separator />
                    </div>

                    <div className="space-y-2">
                        <h1 className="font-semibold text-xl opacity-60">
                            NIN
                        </h1>

                        <p className="">

                            {doctorData ? (
                                doctorData.nin
                            ) : (
                                <Skeleton className="h-4 w-10" />
                            )}

                        </p>
                        <Separator />
                    </div>

                    <div className="space-y-2">
                        <h1 className="font-semibold text-xl opacity-60">
                            Mobile Number
                        </h1>

                        <p className="">

                            {doctorData ? (
                                doctorData.telephone
                            ) : (
                                <Skeleton className="h-4 w-10" />
                            )}

                        </p>
                        <Separator />
                    </div>


                    <div className="space-y-2">
                        <h1 className="font-semibold text-xl opacity-60">
                            Specialty
                        </h1>

                        <p className="">

                            {doctorData ? (
                                doctorData.specialty
                            ) : (
                                <Skeleton className="h-4 w-10" />
                            )}

                        </p>
                    </div>



                </div>




            </DialogContent>

        </Dialog>
    )
}