import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogClose,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ModalType } from "@/components/hooks/modal-store"
import { useStore } from "../hooks/use-store";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { Icons } from "../icons";
import Image from "next/image";
import awaiting from "../../../public/awaiting.gif"
import useSWR from "swr";
import { AxiosResponseMod } from "@/app/services/types";
import { fetcher } from "@/lib/utils";
import { REQUESTHISTORY } from "../hooks/request-history-store";
import { furtureMinutes } from "@/lib/utils";
import { useToast } from "../ui/use-toast";


export default function RequestApproval() {
    const {
        isOpen, onClose, type, data: { patientData },
        setRequestPatientId, requestPatientId, setRequestStatus,
        requestTimestamp, setRequestId, requestId, requestStatus,
        onOpen, setRequestStamp } = useStore();

    const { data: historyRequestData } = useSWR<AxiosResponseMod<{ id: string, updatedAt: string, patientId: string, approval: string }>>
        (requestId && requestStatus === REQUESTHISTORY.PENDING ? `/api/doctor/request_approval/${requestId}` : null, fetcher, { refreshInterval: 5000 })

    const [loading, setLoading] = useState(false)

    const { toast } = useToast()

    const isModalOpen = isOpen && type === ModalType.REQUESTAPPROVAL;




    useEffect(() => {
        if (historyRequestData &&
            (historyRequestData.data.data.approval === REQUESTHISTORY.APPROVED
                || historyRequestData.data.data.approval === REQUESTHISTORY.REJECTED)) {
            setRequestStatus(historyRequestData.data.data.approval)
            setRequestStamp(historyRequestData.data.data.updatedAt)

        }

    }, [historyRequestData])

    const onRequestApproval = async () => {
        setLoading(true)
        try {
            if (patientData) {

                const response = await axios.post('/api/doctor/request_approval', {
                    id: patientData.id
                })

                if (response.status === 200) {
                    console.log(response.data);
                    setRequestPatientId(patientData.id)
                    setRequestId(response.data.data.id)
                    setRequestStatus(REQUESTHISTORY.PENDING)
                    setRequestStamp('')
                    toast({
                        variant: 'success',
                        description: 'Request sent successfully'
                    })
                }
            }

        } catch (error) {
            toast({
                variant: 'destructive',
                description: 'Something went wrong...'
            })
        }
        setLoading(false)
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black pt-4 pb-8 px-7 overflow-auto max-h-full">
                {
                    requestPatientId === patientData?.id &&
                        requestStatus === REQUESTHISTORY.REJECTED &&
                        requestTimestamp && new Date() < furtureMinutes(requestTimestamp, 60) ?
                        (
                            <>
                                <DialogHeader className="pt-8">
                                    <DialogTitle className="text-2xl font-bold text-red-500">
                                        Request Rejected
                                    </DialogTitle>
                                    <DialogDescription>
                                        Request to view history rejected by <b>{patientData.name}</b>.
                                    </DialogDescription>
                                </DialogHeader>
                            </>
                        ) :

                        requestPatientId === patientData?.id &&
                            requestStatus === REQUESTHISTORY.APPROVED &&
                            requestTimestamp && new Date() < furtureMinutes(requestTimestamp, 60) ? (
                            <>
                                <DialogHeader className="pt-8">
                                    <DialogTitle className="text-2xl font-bold text-green-500">
                                        Request Approved
                                    </DialogTitle>
                                    <DialogDescription>
                                        Request  to view history approved by <b>{patientData?.name}</b>.
                                    </DialogDescription>
                                </DialogHeader>
                                <Button
                                    className="bg-blue-500 hover:bg-blue-600 w-full my-3"
                                    onClick={() => onOpen(ModalType.PATIENTHISTORY, { patientData })}
                                >

                                    Go to {patientData?.name}&apos;s history
                                </Button>
                            </>
                        ) :
                            requestPatientId === patientData?.id && requestStatus === REQUESTHISTORY.PENDING ? (
                                <>
                                    <DialogHeader className="pt-8">
                                        <DialogTitle className="text-2xl font-bold">
                                            Awaiting <b>{patientData.name}&apos;s</b> Approval
                                        </DialogTitle>
                                        <DialogDescription>
                                            Awaiting <b>{patientData.name}&apos;s</b> Aproval or Rejection
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex flex-col items-center">
                                        <Image
                                            src={awaiting}
                                            width={200}
                                            height={200}
                                            alt="awaiting"
                                        />

                                        <p>Awaiting Approval...</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <DialogHeader className="pt-8">
                                        <DialogTitle className="text-2xl font-bold">
                                            Request <b>{patientData?.name}&apos;s</b> Approval
                                        </DialogTitle>
                                        <DialogDescription>
                                            Request <b>{patientData?.name}&apos;s</b> approval to view history.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Button
                                        className="bg-blue-500 hover:bg-blue-600 w-full my-3"
                                        onClick={onRequestApproval}
                                        disabled={!patientData}
                                    >
                                        {loading && (
                                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Request Approval
                                    </Button>
                                </>
                            )
                }

                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild >


                        {requestPatientId === patientData?.id && requestStatus === REQUESTHISTORY.PENDING ? (
                            <Button type="button" variant="destructive" onClick={() => {
                                setRequestPatientId(null)
                                setRequestId(null)
                                setRequestStatus(REQUESTHISTORY.PENDING)
                                setRequestStamp('')
                            }}>
                                Cancel
                            </Button>
                        ) : (
                            <Button type="button" variant="default">
                                Close
                            </Button>
                        )}


                    </DialogClose>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )

}