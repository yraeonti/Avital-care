'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"
import { useState } from "react"
import { REQUESTHISTORY } from "@/components/hooks/request-history-store"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function RequestApproval({ requestId, doctorName }: { requestId: string, doctorName: string | undefined }) {
    const [loading, setLoading] = useState(false)
    const [approval, setApproval] = useState<REQUESTHISTORY>()

    const { toast } = useToast()
    const router = useRouter()

    const handleApproval = async (approval: REQUESTHISTORY) => {

        setLoading(true)
        setApproval(approval)

        try {

            const response = await axios.patch('/api/patient/request_approval', {
                id: requestId,
                approval
            })

            if (response.status === 200) {
                if (approval === REQUESTHISTORY.APPROVED)
                    toast({
                        variant: 'success',
                        description: "Request has been approved",
                    })
                else {
                    toast({
                        variant: 'success',
                        description: "Request has been rejected",
                    })
                }

                setTimeout(() => {
                    router.replace('/')
                }, 3000)
            }


        } catch (error) {
            toast({
                variant: 'destructive',
                description: "Something went wrong",
            })
        }
        setLoading(false)
    }
    return (
        <main className="h-full flex flex-col justify-center items-center">


            <Card className="w-[80%] md:w-[60%] flex flex-col items-center">
                <CardHeader className="text-center space-y-4">
                    <CardTitle className="text-xl">ACCEPT OR APPROVE </CardTitle>
                    <CardDescription className="text-lg">Accept or reject <b>{doctorName}</b> from viewing your Diagnosis History</CardDescription>
                </CardHeader>

                <Separator className="my-4" />
                <CardContent className="flex space-x-6 justify-center items-center">

                    <Button
                        onClick={() => handleApproval(REQUESTHISTORY.REJECTED)}
                        variant="destructive">
                        {loading && approval === REQUESTHISTORY.REJECTED && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        REJECT
                    </Button>
                    <Button
                        onClick={() => handleApproval(REQUESTHISTORY.APPROVED)}
                        className="bg-green-500 hover:bg-green-500">
                        {loading && approval === REQUESTHISTORY.APPROVED && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        APPROVE
                    </Button>
                </CardContent>

            </Card>



        </main>
    )
}