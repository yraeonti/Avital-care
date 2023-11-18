import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatTime } from "@/lib/utils";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { APPOINTMENTSTATUS } from "@/app/services/types";
import { Badge } from "@/components/ui/badge";
export type BookingsCardProps = {
    sessionTitle: string,
    scheduledDate: string,
    appointmentNo: number,
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

export default function BookingsCard({ sessionTitle, scheduledDate, appointmentNo, scheduledTime, doctor, doctorEmail, specialty, status }: BookingsCardProps) {
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




                <Button
                    className="w-full bg-blue-700 hover:bg-blue-800 shadow-lg"
                    disabled={(status === APPOINTMENTSTATUS.DONE || status === APPOINTMENTSTATUS.CANCELLED)}
                >
                    Cancel Appointment
                </Button>


            </CardContent>
        </Card>
    )
}