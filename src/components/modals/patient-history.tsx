
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
import DataTable from "../dashboard/shared/table/data-table-non";
import { ColumnDef } from "@tanstack/react-table";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Label } from "../ui/label";
import { FileIcon } from "lucide-react";
import useSWR from "swr";
import { fetcher, fetcherPost } from "@/lib/utils";
import { AxiosResponseMod } from "@/app/services/types";

export enum PatientHistoryEnum {
    DIAGNOSIS = 'DIAGNOSIS',
    TESTRESULT = 'TESTRESULT'
}

export type TestResult = {
    test_url: string;
    doctorName: string,
    createdAt: string,
    testName: string
}

export type Diagnosis = {
    complaint: string,
    complaint_history: string,
    recommended_tests: string,
    diagnosis_confirmation: string,
    prescription: string,
    prescription_comment: string,
    management_plan: string,
    created_at: string
}

const headerClassName = 'font-semibold w-[150px] whitespace-nowrap'

export const columns: ColumnDef<Diagnosis>[] = [
    {
        accessorKey: "complaint",
        header: () => <div className={headerClassName}>Complaint</div>,
        enableGlobalFilter: false
    },

    {
        accessorKey: "complaint_history",
        header: () => <div className={headerClassName}>History of Complaint</div>,
        enableGlobalFilter: false
    },
    {
        accessorKey: "recommended_tests",
        header: () => <div className={headerClassName}>Recommended Tests</div>,
        enableGlobalFilter: false
    },
    {
        accessorKey: "diagnosis_confirmation",
        header: () => <div className={headerClassName}>Diagnosis Confirmation</div>,
        enableGlobalFilter: false
    },
    {
        accessorKey: "prescription",
        header: () => <div className={headerClassName}>Prescription</div>,
        enableGlobalFilter: false
    },
    {
        accessorKey: "prescription_comment",
        header: () => <div className={headerClassName}>Prescription Comment</div>,
        enableGlobalFilter: false
    },
    {
        accessorKey: "management_plan",
        header: () => <div className={headerClassName}>Management Plan</div>,
        enableGlobalFilter: false
    },
    {
        accessorKey: "doctorName",
        header: () => <div className={headerClassName}>Doctor</div>,
    },
    {
        accessorKey: "createdAt",
        header: () => <div className={headerClassName}>Date Added</div>,
        cell(props) {
            const date = props.row.getValue("createdAt") as string
            return new Date(date).toLocaleDateString()
        },
    },
]

export const testResultColumn: ColumnDef<TestResult>[] = [
    {
        accessorKey: "test_url",
        header: () => <div className={headerClassName}>Test Result</div>,
        cell(props) {
            const test_url = props.getValue() as string

            const createdAt = props.row.getValue('createdAt') as string
            const name = props.row.getValue('testName') as string

            return (
                <div className="flex items-center space-x-2">
                    <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                    <a
                        href={test_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline truncate max-w-[14rem]"
                    >
                        {`${createdAt}-${name}`}
                    </a>
                </div>

            )
        },
    },
    {
        accessorKey: "testName",
        header: () => <div className={headerClassName}>Test Name</div>,
        cell(props) {
            const value = props.getValue() as string
            return <div className="truncate max-w-[10rem]">{value}</div>
        },
    },
    {
        accessorKey: "doctorName",
        header: () => <div className={headerClassName}>Doctor Name</div>,
    },
    {
        accessorKey: "createdAt",
        header: () => <div className={headerClassName}>Date Added</div>,
        cell(props) {
            const date = props.row.getValue("createdAt") as string
            return new Date(date).toLocaleDateString()
        },
    }
]

export default function PatientHistory() {
    const { isOpen, onClose, type, data: { patientData } } = useStore();

    const isModalOpen = isOpen && type === ModalType.PATIENTHISTORY;


    const { data: testResultData, isLoading: testResultLoader }
        = useSWR<AxiosResponseMod<TestResult[]>>
            (isModalOpen && patientData && patientData?.id ?
                `/api/laboratory?query=${patientData.id}` : null, fetcher, {
                revalidateOnFocus: false,
                revalidateOnReconnect: false
            })

    const { data: historyData, isLoading: historyLoader }
        = useSWR<AxiosResponseMod<Diagnosis[]>>
            (isModalOpen && patientData && patientData?.id ?
                `/api/patient/history?query=${patientData.id}` : null, fetcher, {
                revalidateOnFocus: false,
                revalidateOnReconnect: false
            })










    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black pt-4 pb-8 px-7 overflow-auto max-h-full max-w-screen-xl">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-semibold">
                        Patient History & Test Results
                    </DialogTitle>

                    <DialogDescription className="text-center text-lg mt-2">
                        History and Lab results for: <span
                            className="font-semibold text-stone-800 capitalize">
                            {patientData?.name}</span>
                    </DialogDescription>

                </DialogHeader>

                <Tabs defaultValue={PatientHistoryEnum.DIAGNOSIS} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mx-auto">
                        <TabsTrigger value={PatientHistoryEnum.DIAGNOSIS}>PATIENT HISTORY</TabsTrigger>
                        <TabsTrigger value={PatientHistoryEnum.TESTRESULT}>TEST RESULTS</TabsTrigger>
                    </TabsList>
                    <TabsContent value={PatientHistoryEnum.DIAGNOSIS}
                        className="outline-none flex flex-col items-center justify-center">
                        <Label className="my-4 text-2xl font-semibold">
                            PATIENT HISTORY
                        </Label>
                        <div className="overflow-scroll max-w-full">
                            <DataTable
                                loading={historyLoader}
                                columns={columns}
                                data={(typeof historyData?.data !== undefined)
                                    && historyData?.data?.status ? historyData.data.data : []
                                }
                            />
                        </div>

                    </TabsContent>
                    <TabsContent value={PatientHistoryEnum.TESTRESULT}
                        className="outline-none flex flex-col"
                    >
                        <Label className="my-4 text-2xl font-semibold self-center">
                            TEST RESULTS
                        </Label>

                        <div className="overflow-scroll">
                            <DataTable
                                loading={testResultLoader}
                                columns={testResultColumn}
                                data={(typeof testResultData?.data !== undefined)
                                    && testResultData?.data?.status ? testResultData.data.data : []
                                }
                            />
                        </div>

                    </TabsContent>
                </Tabs>




            </DialogContent>

        </Dialog>
    )

}