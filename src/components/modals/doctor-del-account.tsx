
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
import { signOut } from "next-auth/react";

export default function DoctorDelAccount() {
    const { isOpen, onClose, type, data: { networkData } } = useStore();
    const [isLoading, setIsLoading] = useState(false)

    const isModalOpen = isOpen && type === ModalType.DOCTORDELACCOUNT;


    const onDelete = async () => {
        setIsLoading(true)
        try {

            if (networkData) {

                const res = await axios.delete('/api/doctor', {
                    data: {
                        id: networkData.data.data.id
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    },
                },
                )

                if (res.data.status) {
                    setTimeout(() => {
                        onClose()
                        signOut()
                    }, 1000);

                }

                console.log(res);



            }




        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black pt-4 pb-8 px-7 overflow-hidden">
                <DialogHeader className="pt-8">
                    <DialogTitle className="text-3xl text-red-500 font-bold">
                        Account Deletion
                    </DialogTitle>
                    <DialogDescription className=" text-lg font-medium">
                        Are you sure you want to delete your account?
                    </DialogDescription>

                </DialogHeader>


                <div className=" flex items-center space-x-3 mt-4 justify-start">

                    <DialogClose asChild >
                        <Button type="button" variant='default'>
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button className="mx-auto outline-none" variant='destructive' onClick={onDelete} disabled={isLoading && !networkData}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Delete Account
                    </Button>

                </div>






            </DialogContent>

        </Dialog>
    )

}