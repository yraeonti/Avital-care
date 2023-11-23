
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
import DataTable from "../dashboard/shared/table/data-table-non";
import { PatientData } from "../dashboard/admin/patients";
import { ColumnDef } from "@tanstack/react-table";

export default function PatientHistory() {
    const { isOpen, onClose, type, data: { patientData } } = useStore();

    const isModalOpen = isOpen && type === ModalType.PATIENTHISTORY;

    const headerClassName = 'font-semibold w-[150px] whitespace-nowrap'

    const columns: ColumnDef<PatientData['diagnosis'][number]>[] = [
        {
            accessorKey: "complaint",
            header: () => <div className={headerClassName}>Complaint</div>,
        },

        {
            accessorKey: "complaint_history",
            header: () => <div className={headerClassName}>History of Complaint</div>,

        },
        {
            accessorKey: "recommended_tests",
            header: () => <div className={headerClassName}>Recommended Tests</div>,
        },
        {
            accessorKey: "diagnosis_confirmation",
            header: () => <div className={headerClassName}>Diagnosis Confirmation</div>,
        },
        {
            accessorKey: "prescription",
            header: () => <div className={headerClassName}>Prescription</div>,
        },
        {
            accessorKey: "prescription_comment",
            header: () => <div className={headerClassName}>Prescription Comment</div>,
        },
        {
            accessorKey: "management_plan",
            header: () => <div className={headerClassName}>Management Plan</div>,
        },
        {
            accessorKey: "doctorName",
            header: () => <div className="font-semibold ">Doctor</div>,
        },
        {
            accessorKey: "createdAt",
            header: () => <div className="font-semibold ">Date Created</div>,
            cell(props) {
                const date = props.row.getValue("createdAt") as string
                return new Date(date).toLocaleDateString()
            },
        },
    ]
    console.log(patientData?.diagnosis);

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black pt-4 pb-8 px-7 max-w-screen-xl overflow-scroll max-h-screen">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Patient History
                    </DialogTitle>

                </DialogHeader>

                <div className="">
                    <DataTable
                        loading={false}
                        columns={columns}
                        data={patientData?.diagnosis ?? []}
                    />
                </div>


            </DialogContent>

        </Dialog>
    )

}