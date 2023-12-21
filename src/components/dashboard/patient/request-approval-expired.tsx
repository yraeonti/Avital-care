

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function RequestApprovalExpired() {
    return (
        <main className="h-full flex flex-col justify-center items-center">

            <Card className="w-[80%] md:w-[60%] flex flex-col items-center">
                <CardHeader className="text-center space-y-4">
                    <CardTitle className="text-xl">ACCEPT OR APPROVE </CardTitle>
                    <CardDescription className="text-lg text-red-400">Link is Expired</CardDescription>
                </CardHeader>

            </Card>

        </main>
    )
}