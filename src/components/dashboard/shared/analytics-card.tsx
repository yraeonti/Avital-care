import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ReactNode } from "react";

type Props = {
    title: string,
    figure: ReactNode;
    bg: string;
    icon: ReactNode
}

export default function AnalyticsCard({ title, figure, bg, icon }: Props) {
    return (
        <Card className={`${bg}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{figure}</div>
            </CardContent>
        </Card>
    )
}