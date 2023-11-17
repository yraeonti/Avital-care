"use client"
import SessionsCards from "./sessions-cards"
import useSWR from "swr"
import { fetcher } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { AxiosResponseMod } from "@/app/services/types"
import SessionsCard, { SessionCardProps } from "./sessions-cards"

export default function ScheduledSessions() {

    const { isLoading, data } = useSWR<AxiosResponseMod<SessionCardProps[]>>('/api/patients/sessions', fetcher)

    return (
        <section className="px-2 md:px-6">

            {/* <div className="mt-3 flex items-center space-x-2 font-semibold text-lg">
                    <span className="">All Sessions</span> {
                        tableLoader ? (
                            <Skeleton className="h-4 w-24 bg-stone-200" />
                        ) : (
                            <h1 className="">
                                ({tableData?.data.totalcount})
                            </h1>
                        )
                    }

                </div> */}

            <div className="py-5">

                <div className="gap-4 grid lg:grid-cols-2">
                    {isLoading && !data ? (
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                            <Skeleton className="h-48 bg-stone-200 w-full" key={i} />
                        ))
                    ) : (


                        data?.data.data.map((item, i) => (
                            <SessionsCard {...item} key={i} />
                        ))


                    )}
                </div>


            </div>

        </section>
    )
}