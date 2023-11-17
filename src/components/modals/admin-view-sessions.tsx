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
import moment from "moment";

export default function AdminViewSessions() {
    const { isOpen, onClose, type, data: { sessionData } } = useStore();

    const isModalOpen = isOpen && type === ModalType.ADMINVIEWSESSION;

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black pt-4 pb-8 px-7 overflow-hidden">
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
                                            className="m-1 cursor-default "
                                        >
                                            {moment.utc(item.startTime).format('LT')} - {moment.utc(item.endTime).format('LT')}
                                        </Button>
                                    )
                                })

                            ) : (
                                <Skeleton className="h-4 w-10" />
                            )}

                        </div>
                    </div>







                </div>
            </DialogContent>
        </Dialog>
    )
}