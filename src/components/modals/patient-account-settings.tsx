
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { useStore } from "../hooks/use-store";
import { ModalType } from "@/components/hooks/modal-store"

export default function PatientAccountSettings() {
    const { isOpen, onClose, type } = useStore();

    const isModalOpen = isOpen && type === ModalType.PATIENTACCOUNTSETTINGS;

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black pt-4 pb-8 px-7 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Account Settings
                    </DialogTitle>

                </DialogHeader>




            </DialogContent>

        </Dialog>
    )

}