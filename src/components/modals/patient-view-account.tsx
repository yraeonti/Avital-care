
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useStore } from "../hooks/use-store";
import { ModalType } from "@/components/hooks/modal-store"
import { Skeleton } from "../ui/skeleton";

export default function PatientViewAccount() {
    const { isOpen, onClose, type, data: { networkData } } = useStore();

    const isModalOpen = isOpen && type === ModalType.PATIENTVIEWACCOUNT;



    if (networkData && networkData?.data.status) {

        const { data: { data: { email, profile: {
            name,
            nin,
            address,
            date_of_birth,
            telephone
        } } } } = networkData


        const details = [
            {
                det: 'Name', val: name
            },
            {
                det: 'Email', val: email
            },
            {
                det: 'Nin', val: nin
            },
            {
                det: 'Telephone', val: telephone
            },
            {
                det: 'Address', val: address
            },
            {
                det: 'Date of Birth', val: new Date(date_of_birth).toLocaleDateString()
            },
        ]


        return (
            <Dialog open={isModalOpen} onOpenChange={onClose}>
                <DialogContent className="bg-white text-black pt-4 pb-8 px-7 overflow-auto max-h-full">
                    <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-2xl text-center font-bold">
                            View Account Details
                        </DialogTitle>

                    </DialogHeader>

                    <div className="space-y-4">

                        {
                            details.map(({ det, val }, i) => (
                                <div className="space-y-2" key={i}>
                                    <h1 className="font-semibold text-xl">
                                        {det}
                                    </h1>

                                    <p className="opacity-70">

                                        {val}

                                    </p>
                                </div>
                            ))
                        }



                    </div>




                </DialogContent>

            </Dialog>
        )

    }
    const details = [
        {
            det: 'Name'
        },
        {
            det: 'Email'
        },
        {
            det: 'Nin'
        },
        {
            det: 'Telephone'
        },
        {
            det: 'Address'
        },
        {
            det: 'Date of Birth'
        },
    ]
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black pt-4 pb-8 px-7 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        View Account Details
                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-4">

                    {
                        details.map(({ det }, i) => (
                            <div className="space-y-2" key={i}>
                                <h1 className="font-semibold text-xl">
                                    {det}
                                </h1>

                                <p className="opacity-70">
                                    <Skeleton className="h-4 w-[200px] bg-stone-500" />
                                </p>
                            </div>
                        ))
                    }



                </div>




            </DialogContent>

        </Dialog>
    )




}