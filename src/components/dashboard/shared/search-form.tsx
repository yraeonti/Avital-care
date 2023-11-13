import { Form, FormField, FormItem, FormControl } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


const searchSchema = z.object({
    search: z.string()
})

type Props<T> = {
    setdata: Dispatch<SetStateAction<T>>,
    setsearchloader: Dispatch<SetStateAction<boolean>>
    onSubmit: (values: z.infer<typeof searchSchema>) => Promise<void>
}

export const SearchForm = <T,>({ setdata, setsearchloader, onSubmit }: Props<T>) => {

    const form = useForm({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            search: ""
        }
    })

    // const onSubmit = async (values: z.infer<typeof searchSchema>) => {
    //     setsearchloader(true)
    //     try {
    //         const response = await axios.post('/api/doctors', {
    //             ...values
    //         }, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })

    //         console.log(response);


    //         if (response.status === 200) {
    //             setdata(response.data)
    //         }
    //     } catch (error) {
    //         console.log(error);

    //     }
    //     setsearchloader(false)
    //     console.log(values);

    // }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center space-x-4 w-full">
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem className="w-full sm:w-3/5">

                            <FormControl>
                                <Input placeholder="Search doctor by name or email" className="" {...field} />
                            </FormControl>

                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-blue-700">Search</Button>
            </form>
        </Form>
    )
}