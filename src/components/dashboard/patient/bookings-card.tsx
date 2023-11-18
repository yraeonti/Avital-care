import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatTime } from "@/lib/utils";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { APPOINTMENTSTATUS } from "@/app/services/types";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import axios from "axios";
import { useSWRConfig } from "swr";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"




export type BookingsCardProps = {
    sessionTitle: string,
    scheduledDate: string,
    appointmentNo: number,
    appointmentId: number,
    doctor: string,
    doctorEmail: string,
    specialty: string,
    status: APPOINTMENTSTATUS,
    scheduledTime: {
        startTime: string,
        endTime: string,
        status: boolean,
        id: string,
        appointmentNo: number
    }
}

export default function BookingsCard({ sessionTitle, scheduledDate, appointmentId, appointmentNo, scheduledTime, doctor, doctorEmail, specialty, status }: BookingsCardProps) {
    const [isLoading, setIsLoading] = useState(false)

    const { toast } = useToast()
    const { mutate } = useSWRConfig()

    const onCancel = async () => {
        setIsLoading(true)
        try {

            const response = await axios.patch('/api/patient/appointment', {
                sessionTimeId: scheduledTime.id,
                appointmentId
            })

            if (response.status === 200) {
                toast({
                    variant: 'success',
                    description: 'Appointment Cancelled'
                })
                mutate('/api/patient/appointment')
            }

            console.log(response);


        } catch (error) {
            toast({
                variant: 'destructive',
                description: 'Something went wrong...'
            })
        }
        setIsLoading(false)
    }
    return (
        <Card className="px-1 sm:px-4 py-2 bg-stone-100">


            <CardHeader className="">
                <CardTitle className="flex items-center justify-between w-full"><span>{sessionTitle}</span> <Badge variant={status === APPOINTMENTSTATUS.PENDING ?
                    'pending' : status === APPOINTMENTSTATUS.CANCELLED ?
                        'destructive' : 'done'}>
                    {status}
                </Badge></CardTitle>

            </CardHeader>

            <CardContent className="py-3 space-y-4">
                <Separator className="bg-stone-300" />

                <p className="capitalize">
                    Booking Date: <span className="font-semibold">{new Date(scheduledDate).toDateString()}</span>
                </p>
                <p>
                    Appointment Number: <span className="font-semibold">{appointmentNo}</span>
                </p>
                <Separator className="my-2 bg-stone-300" />
                <p className="capitalize">
                    Doctor Name: <span className="font-semibold">{doctor}</span>
                </p>
                <p className="">
                    Doctor Email: <span className="font-semibold">{doctorEmail}</span>
                </p>
                <p>
                    Doctor Specialty: <span className="font-semibold">{specialty}</span>
                </p>
                <p>
                    Session Date: <span className="font-semibold">{new Date(scheduledDate).toLocaleDateString()}</span>

                </p>


                <div className="flex items-center space-x-2">
                    <p>
                        Scheduled Time:
                    </p>

                    <Button variant='outline'>
                        <span className="font-semibold">{`${formatTime(scheduledTime.startTime)}-${formatTime(scheduledTime.endTime)}`}</span>
                    </Button>
                </div>


                <AlertDialog>
                    <AlertDialogTrigger
                        asChild
                        disabled={(status === APPOINTMENTSTATUS.DONE || status === APPOINTMENTSTATUS.CANCELLED)}>
                        <Button
                            className="w-full bg-blue-700 hover:bg-blue-800 shadow-lg"


                        >
                            Cancel Appointment
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure you want to cancel this appointment?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-500 text-stone-50 hover:bg-red-500/90" onClick={onCancel}>
                                {isLoading && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </CardContent>
        </Card>
    )
}