
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


export default function ViewPatientAccount() {
    const { isOpen, onClose, type, data: { patientData } } = useStore();

    const isModalOpen = isOpen && type === ModalType.VIEWPATIENTACCOUNT;


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
                            Patient ID
                        </h1>

                        <p className="">

                            {patientData ? (
                                patientData.id.split('-')[0]
                            ) : (
                                <Skeleton className="h-4 w-10" />
                            )}

                        </p>
                        <Separator />
                    </div>

                    <div className="space-y-2">
                        <h1 className="font-semibold text-xl opacity-60">
                            Name
                        </h1>

                        <p className="">

                            {patientData ? (
                                patientData.name
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

                            {patientData ? (
                                patientData.email
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

                            {patientData ? (
                                patientData.nin
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

                            {patientData ? (
                                patientData.telephone
                            ) : (
                                <Skeleton className="h-4 w-10" />
                            )}

                        </p>
                        <Separator />
                    </div>


                    <div className="space-y-2">
                        <h1 className="font-semibold text-xl opacity-60">
                            Address
                        </h1>

                        <p className="">

                            {patientData ? (
                                patientData.address
                            ) : (
                                <Skeleton className="h-4 w-10" />
                            )}

                        </p>
                    </div>

                    <div className="space-y-2">
                        <h1 className="font-semibold text-xl opacity-60">
                            Date Of Birth
                        </h1>

                        <p className="">

                            {patientData ? (
                                patientData.date_of_birth
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