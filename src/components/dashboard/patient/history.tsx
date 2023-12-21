"use client"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { PatientHistoryEnum, TestResult, Diagnosis, columns, testResultColumn } from "@/components/modals/patient-history"
import { useState } from "react"
import { Label } from "@/components/ui/label";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { AxiosResponseMod } from "@/app/services/types";
import { SessionContextValue, useSession } from "next-auth/react";
import { Session } from "next-auth";
import DataTable from "../shared/table/data-table";
import { Input } from "@/components/ui/input";


type SessionAdd = Session & {
    id: string
}
export default function History() {

    const [searchFilter, setSearchFilter] = useState<string>('')
    const [searchFilterTests, setSearchFilterTests] = useState<string>('')

    const { data: session } = useSession() as SessionContextValue & { data: SessionAdd }

    console.log(session);


    const { data: testResultData, isLoading: testResultLoader }
        = useSWR<AxiosResponseMod<TestResult[]>>
            (
                session ? `/api/laboratory?query=${session.id}` : null, fetcher, {
                revalidateOnFocus: false,
                revalidateOnReconnect: false
            })

    const { data: historyData, isLoading: historyLoader }
        = useSWR<AxiosResponseMod<Diagnosis[]>>
            (
                session ? `/api/patient/history?query=${session.id}` : null, fetcher, {
                revalidateOnFocus: false,
                revalidateOnReconnect: false
            })


    return (
        <section className="px-2 md:px-6 py-8">
            <Tabs defaultValue={PatientHistoryEnum.DIAGNOSIS} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mx-auto">
                    <TabsTrigger value={PatientHistoryEnum.DIAGNOSIS}>DIAGNOSIS HISTORY</TabsTrigger>
                    <TabsTrigger value={PatientHistoryEnum.TESTRESULT}>TEST RESULTS</TabsTrigger>
                </TabsList>
                <TabsContent value={PatientHistoryEnum.DIAGNOSIS}
                    className="outline-none flex flex-col">
                    <Label className="my-4 text-2xl font-semibold self-center">
                        DIAGNOSIS HISTORY
                    </Label>
                    <div className='mt-3'>
                        <Input
                            placeholder="Search by date, doctor..."
                            value={searchFilter ?? ""}
                            onChange={(event) =>
                                setSearchFilter(event.target.value)
                            }
                            className="max-w-sm"
                        />
                    </div>
                    <div className="overflow-scroll max-w-full mt-5">
                        <DataTable
                            loading={historyLoader}
                            columns={columns}
                            data={(typeof historyData?.data !== undefined)
                                && historyData?.data?.status ? historyData.data.data : []
                            }
                            globalFilter={searchFilter}
                        />
                    </div>

                </TabsContent>
                <TabsContent value={PatientHistoryEnum.TESTRESULT}
                    className="outline-none flex flex-col"
                >
                    <Label className="my-4 text-2xl font-semibold self-center">
                        TEST RESULTS
                    </Label>

                    <div className='mt-3'>
                        <Input
                            placeholder="Search test..."
                            value={searchFilterTests ?? ""}
                            onChange={(event) =>
                                setSearchFilterTests(event.target.value)
                            }
                            className="max-w-sm"
                        />
                    </div>

                    <div className="overflow-scroll mt-5">
                        <DataTable
                            loading={testResultLoader}
                            columns={testResultColumn}
                            data={(typeof testResultData?.data !== undefined)
                                && testResultData?.data?.status ? testResultData.data.data : []
                            }
                            globalFilter={searchFilterTests}
                        />
                    </div>

                </TabsContent>
            </Tabs>
        </section>
    )

}