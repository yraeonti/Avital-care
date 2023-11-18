"use client"
import useSWR from "swr"
import { fetcher } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { AxiosResponseMod, AxiosResponseModCount } from "@/app/services/types"
import BookingsCard, { BookingsCardProps } from "./bookings-card"
import { FolderOpen } from 'lucide-react'

export default function Bookings() {

    const { isLoading, data } = useSWR<AxiosResponseModCount<BookingsCardProps[]>>('/api/patient/appointment', fetcher)

    return (
        <section className="px-2 md:px-6">

            <div className="mt-3 flex items-center space-x-2 font-semibold text-lg">
                <span className="">My Appointments</span> {
                    !data || isLoading ? (
                        <Skeleton className="h-4 w-24 bg-stone-200" />
                    ) : (
                        <h1 className="">
                            ({data.data.totalcount})
                        </h1>
                    )
                }

            </div>

            <div className="py-5">


                {isLoading && !data ? (
                    <div className="gap-4 grid lg:grid-cols-2"> {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                            <Skeleton className="h-48 bg-stone-200 w-full" key={i} />
                        ))
                    }

                    </div>
                ) : (
                    data && data?.data?.data.length > 0 ? (
                        <div className="gap-4 grid lg:grid-cols-2"> {
                            data?.data.data.map((item, i) => (
                                <BookingsCard {...item} key={i} />
                            ))
                        }

                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center space-y-3 pt-14">
                            <h1>No Available Bookings</h1>
                            <FolderOpen className='h-16 w-20' />
                        </div>
                    )


                )}



            </div>

        </section>
    )
}