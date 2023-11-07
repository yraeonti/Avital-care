
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { useModal, ModalType } from "../hooks/use-modal-store";

export default function PatientChangePassword() {
    const { isOpen, onClose, type } = useModal();

    const isModalOpen = isOpen && type === ModalType.PATIENTCHANGEPASSWORD;

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black pt-4 pb-8 px-7 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Change Password
                    </DialogTitle>

                </DialogHeader>




            </DialogContent>

        </Dialog>
    )

}