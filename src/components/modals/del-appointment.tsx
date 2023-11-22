
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";
import { useStore } from "../hooks/use-store";
import { ModalType } from "@/components/hooks/modal-store"
import { Button } from "../ui/button";
import axios from "axios";
import { useState } from "react";
import { Icons } from "../icons";
import { useToast } from "../ui/use-toast";
import { useSWRConfig } from "swr";
import { Skeleton } from "../ui/skeleton";

export default function DelAppointment({ account }: { account: 'doctor' | 'admin' }) {
    const { isOpen, onClose, type, data: { appointmentData } } = useStore();
    const [isLoading, setIsLoading] = useState(false)

    const isModalOpen = isOpen && type === ModalType.DELAPPOINTMENT;

    const toast = useToast()

    const { mutate } = useSWRConfig()


    const onDelete = async () => {
        setIsLoading(true)
        try {

            if (appointmentData?.id) {

                const res = await axios.delete('/api/patient/appointment', {
                    data: {
                        id: appointmentData.id,
                        sessionTimeId: appointmentData.sessionTime.id
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    },
                },
                )

                if (res.status === 200) {
                    toast.toast({
                        variant: 'success',
                        description: 'Appointment has been deleted'
                    })

                    if (account === 'admin') {
                        mutate('/api/patients/appointments')
                    } else {
                        mutate('/api/doctor/appointment')
                    }


                }

            }

        } catch (error) {
            console.log(error);
            setIsLoading(false)
            toast.toast({
                description: 'Appointment not deleted'
            })
        }

        setIsLoading(false)
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black pt-4 pb-8 px-7 overflow-hidden">
                <DialogHeader className="pt-8">
                    <DialogTitle className="text-3xl text-red-500 font-bold text-center">
                        Appointment Deletion
                    </DialogTitle>
                    <DialogDescription className=" text-lg font-medium space-x-1 text-center">
                        Are you sure you want to delete
                        {appointmentData ? <span className="font-semibold text-black text-lg">{`${" "} ${appointmentData.patientName}'s`}</span>
                            : <Skeleton className="h-4 w-10" />} appointment?

                    </DialogDescription>

                </DialogHeader>


                <div className=" flex items-center space-x-3 mt-4 justify-start">

                    <DialogClose asChild >
                        <Button type="button" variant='default'>
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button className="mx-auto outline-none" variant='destructive' onClick={onDelete} disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Delete Appointment
                    </Button>

                </div>






            </DialogContent>

        </Dialog>
    )

}