"use client"
import useSWR from "swr"
import { fetcherPost } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { AxiosResponseMod } from "@/app/services/types"
import { SessionCardProps } from "./sessions-cards"
import { Button } from "@/components/ui/button"
import { MoveLeft } from "lucide-react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Icons } from "@/components/icons"
import { formatTime } from "@/lib/utils"
import { usePaystackPayment } from 'react-paystack';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"



const config = {
    reference: (new Date()).getTime().toString(),
    email: "user@example.com",
    amount: 20000 * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: 'pk_test_ef34446ef81a0ca7c86ddfd79c85aa6efb7429e4',
};

export default function ScheduledSessionsSlug({ params }: { params: { slug: string } }) {
    const [sessionTimeId, setsessionTimeId] = useState('');
    const [loader, setLoader] = useState(false);
    const { toast } = useToast()

    const initializePayment = usePaystackPayment(config);

    const router = useRouter()

    console.log(sessionTimeId);

    const onSuccess = () => {
        // Implementation for whatever you want to do with reference and after success call.
        try {
            setLoader(true)



            if (data) {
                const appointmentPayload = {
                    appointmentNo: data?.data.data.sessionTime.find(time => time.id === sessionTimeId)?.appointmentNo,
                    appointmentDate: data?.data.data.sessionDate,
                    sessionId: data?.data.data.id,
                    sessionTimeId
                }

                const response = axios.post('/api/patient/appointment', {
                    ...appointmentPayload
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if (response.status === 200) {
                        toast({
                            variant: 'success',
                            description: "Appointment has been booked",
                        })

                        router.push('/patient/dashboard/bookings')


                    }
                }).catch(error => {
                    console.log(error);

                })


            }



        } catch (error) {
            toast({
                title: 'Session not added',
                variant: 'destructive',
                description: "Something went wrong..",
            })
        }
        setLoader(false)
    };

    // you can call this function anything
    const onClose = () => {
        console.log('closed ooo')
    }


    const { slug } = params

    const { isLoading, data } = useSWR<AxiosResponseMod<SessionCardProps>>(['/api/patient/session', { id: Number(slug) }], ([url, slug]) => fetcherPost(url, slug as {}))


    const onBookNow = async () => {
        console.log(sessionTimeId);

        if (sessionTimeId.length < 1) {
            toast({
                variant: 'destructive',
                description: 'Please pick a time'
            })
            return;
        }
        setLoader(true)
        initializePayment(onSuccess, onClose)
        setLoader(false)
    }

    const checkBookingStatus = (
        data && data?.data.data.sessionTime.filter(item => item.status === true).length
        === data?.data.data.sessionTime.length
    )



    return (
        <section className="px-2 md:px-6">


            <Link href="/patient/dashboard/sessions" className="">

                <Button className="flex space-x-2 justify-center mt-4 bg-blue-700 hover:bg-blue-800">
                    <MoveLeft className="w-4" />  <span>Back</span>
                </Button>
            </Link>

            <div className="mt-4">
                {
                    isLoading && !data ? (
                        <Skeleton className="w-full h-72 bg-stone-100" />
                    ) : (
                        <Card className="bg-stone-50">

                            <CardHeader>
                                <CardTitle className="md:text-4xl">Session Details</CardTitle>
                            </CardHeader>
                            <CardContent>

                                <div className="space-y-3">

                                    <h3>
                                        Doctor Name: <span className="font-semibold text-lg capitalize">{data?.data.data.doctor}</span>
                                    </h3>
                                    <h3>
                                        Doctor Email: <span className="font-semibold text-lg">{data?.data.data.doctorEmail}</span>
                                    </h3>
                                    <h3>
                                        Doctor Specialty: <span className="font-semibold text-lg">{data?.data.data.specialty}</span>
                                    </h3>

                                </div>
                                <Separator className="my-4 w-full" />
                                <div className="space-y-2">
                                    <h3>
                                        Session Title: <span className="font-semibold text-lg">{data?.data.data.title}</span>
                                    </h3>
                                    <h3>
                                        Session Date: <span className="font-semibold text-lg">{data && new Date(data.data.data.sessionDate).toLocaleDateString()}</span>
                                    </h3>
                                    <h3>
                                        Session Fee: <span className="font-semibold text-lg">N20,000</span>
                                    </h3>
                                </div>
                                <Separator className="my-4 w-full" />
                                <h1 className="my-2">
                                    Pick a time:
                                </h1>


                                <Select onValueChange={(value) => {
                                    setsessionTimeId(value)
                                }}>

                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Pick a time" />
                                    </SelectTrigger>
                                    <SelectContent>

                                        {data && data.data.data.sessionTime.map((item, i) => {
                                            const startTime = formatTime(item.startTime)
                                            const endTime = formatTime(item.endTime)


                                            return (
                                                <div className={` ${item.status && 'cursor-not-allowed'}`}>
                                                    <SelectItem value={item.id} key={i} disabled={item.status} className={`${item.status ? 'bg-red-500 text-white' : 'cursor-pointer'} flex justify-center`}>
                                                        <div className={`w-full flex justify-start ${item.status && 'opacity-75'}`}>
                                                            {startTime} - {endTime}
                                                        </div>

                                                    </SelectItem>
                                                </div>




                                            )
                                        })}


                                    </SelectContent>
                                </Select>




                                <Button
                                    className={`bg-blue-700 hover:bg-blue-800 w-full my-3`}
                                    onClick={onBookNow}
                                    disabled={checkBookingStatus}
                                >
                                    {loader && (
                                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Book Now
                                </Button>
                            </CardContent>

                        </Card>
                    )
                }

            </div>




        </section>
    )
}