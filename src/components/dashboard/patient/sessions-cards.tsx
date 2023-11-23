import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
export type SessionCardProps = {
    id: number;
    title: string;
    doctor: string;
    doctorEmail?: string;
    specialty: string;
    sessionDate: string;
    noOfAvailableSlots: string;
    sessionTime: { startTime: string, endTime: string, status: boolean, id: string, appointmentNo: number }[]
}

export default function SessionsCard({ id, title, doctor, specialty, sessionDate, noOfAvailableSlots, doctorEmail }: SessionCardProps) {
    return (
        <Card className="px-1 sm:px-4 py-2 bg-stone-100">


            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <Separator className="bg-stone-300" />
                <div className="my-3 space-y-2">
                    <p className="capitalize">
                        Doctor Name: <span className="font-semibold">{doctor}</span>
                    </p>
                    <p >
                        Doctor Email: <span className="font-semibold">{doctorEmail}</span>
                    </p>
                    <p>
                        Doctor Specialty: <span className="font-semibold">{specialty}</span>
                    </p>
                    <p>
                        Session Date: <span className="font-semibold">{new Date(sessionDate).toLocaleDateString()}</span>

                    </p>

                    <div>
                        Available Slots: <span className="font-semibold">{noOfAvailableSlots}</span>
                    </div>
                </div>

                <Link href={`/patient/dashboard/sessions/${id}`}>
                    <Button className="w-full bg-blue-700 hover:bg-blue-800 shadow-lg">
                        See Full Session Details
                    </Button>
                </Link>

            </CardContent>
        </Card>
    )
}