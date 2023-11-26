"use client"
import { FolderOpen } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import { AxiosResponseModCount } from "@/app/services/types"
import SessionsCard, { SessionCardProps } from "./sessions-cards"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useStore } from "@/components/hooks/use-store"
import { useEffect, useState } from "react"
import axios from "axios"

export default function ScheduledSessions() {

    const { sessionSearch, setSessionSearch, setSessionData, sessionData } = useStore()

    const [loader, setLoader] = useState(false)


    const onFetch = async () => {
        setLoader(true)
        setSessionSearch('')
        try {

            const response = await axios.get('/api/patients/sessions')

            if (response.status === 200) {
                setSessionData(response)
            }
        } catch (error) {

        }
        setLoader(false)
    }


    const onSubmit = async () => {
        setLoader(true)
        try {
            const response = await axios.post('/api/patients/sessions', {
                search: sessionSearch
            })

            if (response.status === 200) {
                setSessionData(response)

            }
        } catch (error) {

        }
        setLoader(false)
    }

    console.log(sessionData);


    useEffect(() => {

        (async () => {
            if (sessionSearch) {
                await onSubmit()
                return;
            }
            await onFetch()
        })()


    }, [])

    return (
        <section className="px-2 md:px-6">

            <div className="mt-3 flex items-center space-x-2 font-semibold text-lg">
                <span className="">{!sessionSearch && 'All'} Sessions</span> {
                    !sessionData || loader ? (
                        <Skeleton className="h-4 w-24 bg-stone-200" />
                    ) : (
                        <h1 className="">
                            ({sessionData.data.totalcount})
                        </h1>
                    )
                }

            </div>

            <div className='mt-3 flex items-center space-x-2'>
                <Input
                    placeholder="Search with doctor email, name..."
                    value={sessionSearch}
                    onChange={(event) =>
                        setSessionSearch(event.target.value)
                    }
                    className="max-w-md"
                />

                <Button
                    onClick={async () => {
                        await onSubmit()
                    }}
                    className='bg-blue-800 hover:bg-blue-900'
                >
                    Search
                </Button>
            </div>

            <div className="py-5">


                {loader || !sessionData ? (
                    <div className="gap-4 grid lg:grid-cols-2">
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                                <Skeleton className="h-48 bg-stone-200 w-full" key={i} />

                            ))
                        }
                    </div>
                ) : (

                    sessionData && sessionData.data.data.length > 0 ? (
                        <div className="gap-4 grid lg:grid-cols-2">
                            {
                                sessionData?.data.data.map((item, i) => (
                                    <SessionsCard {...item} key={i} />
                                ))
                            }
                        </div>

                    ) : (
                        <div className="flex flex-col items-center justify-center space-y-3 pt-14">
                            <h1>No Available Sessions</h1>
                            <FolderOpen className='h-16 w-20' />
                            {
                                sessionSearch && (
                                    <Button variant='outline' onClick={onFetch}>
                                        View All Sessions
                                    </Button>
                                )
                            }

                        </div>
                    )



                )}


            </div>

        </section>
    )
}