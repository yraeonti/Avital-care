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
import { Button } from "../ui/button";
import { formatTime } from "@/lib/utils";
import DataTable from "../dashboard/shared/table/data-table-non";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { AxiosResponseMod } from "@/app/services/types";
import { ColumnDef } from "@tanstack/react-table";

type PatientSummary = {
    patientName: string
    patientTel: string
    appointmentNo: number,
    sessionTime: { startTime: string; endTime: string, status: boolean, id: number }
}

const patientsColumn: ColumnDef<PatientSummary>[] = [
    {
        accessorKey: 'appointmentNo',
        header: 'Appointment No.'
    },
    {
        accessorKey: 'patientName',
        header: 'Name'
    },
    {
        accessorKey: 'patientTel',
        header: 'Telephone'
    },
    {
        accessorKey: "sessionTime",
        header: () => <div className="font-semibold ">Appointment Time</div>,
        cell(props) {
            const time = props.row.getValue("sessionTime") as PatientSummary['sessionTime']

            return `${formatTime(time.startTime)}-${formatTime(time.endTime)} `
        },
    },
]

export default function AdminViewSessions() {
    const { isOpen, onClose, type, data: { sessionData } } = useStore();

    const isModalOpen = isOpen && type === ModalType.ADMINVIEWSESSION;

    const { data: patientsData, isLoading: patientsLoader }
        = useSWR<AxiosResponseMod<PatientSummary[]>>
            (isModalOpen && sessionData && sessionData?.id ?
                `/api/doctors/sessions/patient?query=${sessionData.id}` : null, fetcher, {
                revalidateOnFocus: false,
                revalidateOnReconnect: false
            })


    console.log(patientsData && patientsData.data && patientsData.data.data.length);


    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black pt-4 pb-8 px-7 overflow-auto max-h-full max-w-full lg:min-w-max">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        View Session Details
                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-4">

                    <div className="space-y-2">
                        <h1 className="font-semibold text-xl opacity-60">
                            Session Title
                        </h1>

                        <p className="">

                            {sessionData ? (
                                sessionData.title
                            ) : (
                                <Skeleton className="h-4 w-10" />
                            )}

                        </p>
                        <Separator />
                    </div>

                    <div className="space-y-2">
                        <h1 className="font-semibold text-xl opacity-60">
                            Doctor Name
                        </h1>

                        <p className="">

                            {sessionData ? (
                                sessionData.doctor
                            ) : (
                                <Skeleton className="h-4 w-10" />
                            )}

                        </p>
                        <Separator />
                    </div>

                    <div className="space-y-2">
                        <h1 className="font-semibold text-xl opacity-60">
                            Scheduled Date
                        </h1>

                        <p className="">

                            {sessionData ? (
                                new Date(sessionData.sessionDate).toLocaleDateString()
                            ) : (
                                <Skeleton className="h-4 w-10" />
                            )}

                        </p>
                        <Separator />
                    </div>

                    <div className="space-y-2">
                        <h1 className="font-semibold text-xl opacity-60">
                            No of Time Slots
                        </h1>

                        <p className="">

                            {sessionData ? (
                                sessionData.noOfPatients
                            ) : (
                                <Skeleton className="h-4 w-10" />
                            )}

                        </p>
                        <Separator />
                    </div>

                    <div className="space-y-2">
                        <h1 className="font-semibold text-xl opacity-60">
                            No of Available Time Slots
                        </h1>

                        <p className="">

                            {sessionData ? (
                                sessionData.sessionTime.filter(ses => ses.status === false).length
                            ) : (
                                <Skeleton className="h-4 w-10" />
                            )}

                        </p>
                        <Separator />
                    </div>

                    <div className="space-y-2">
                        <h1 className="font-semibold text-xl opacity-60">
                            Scheduled Time Slots
                        </h1>

                        <div className="flex flex-wrap mt-5">

                            {sessionData && sessionData.sessionTime.length > 0 ? (
                                sessionData.sessionTime.map((item, i) => {

                                    return (
                                        <Button
                                            variant='secondary'
                                            size="sm"
                                            key={i}
                                            type="button"
                                            disabled={item.status}
                                            className={`m-1 ${item.status && 'bg-red-500 hover:bg-red-500  text-white opacity-70'} cursor-default`}
                                        >
                                            {formatTime(item.startTime)} - {formatTime(item.endTime)}
                                        </Button>
                                    )
                                })

                            ) : (
                                <Skeleton className="h-4 w-10" />
                            )}

                        </div>
                    </div>



                    <div className="mt-4 overflow-x-hidden">
                        <h3 className="font-semibold text-xl">
                            Patients registered for this session ({patientsData && patientsData.data && patientsData.data.data.length})
                        </h3>

                        <div className="pt-4 ">
                            <DataTable
                                loading={patientsLoader}
                                columns={patientsColumn}
                                data={(typeof patientsData?.data !== undefined)
                                    && patientsData?.data?.status ? patientsData.data.data : []
                                }
                            />
                        </div>
                    </div>



                </div>
            </DialogContent>
        </Dialog>
    )
}