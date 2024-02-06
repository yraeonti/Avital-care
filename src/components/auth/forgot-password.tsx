"use client"
import Image from "next/image"
import avitaCare from '../../../public/avital-logo.png'
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import axios from "axios"

const formSchema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
})

export default function ForgotPassword() {

    const [isLoading, setIsLoading] = useState(false)

    const [resetSent, setResetSent] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

        }
    })


    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {
            setIsLoading(true)
            await axios.post("/api/auth/forgot-password", {
                email: values.email
            })

        } catch (error) {

        }
        setResetSent(true)
        setIsLoading(false)
    }

    return (
        <div className="text-black bg-white p-10 w-[90%] sm:w-[68%] lg:w-[50%]">
            <Image src={avitaCare} alt="AvitaCare logo for the Website" width={180} height={180} className="mx-auto" />

            {
                resetSent ? (
                    <>
                        <p className="text-green-500 text-center">
                            RESET LINK SENT SUCCESSFULLY
                        </p>
                        <p className=" text-center">
                            (Link expires in an hour)
                        </p>
                    </>


                ) : (
                    <>
                        <p className="mb-5">
                            Please enter email to get a reset link
                        </p>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            {/* <FormLabel>Email</FormLabel> */}
                                            <FormControl>
                                                <Input placeholder="Email" {...field} className="" />
                                            </FormControl>

                                            < FormMessage />

                                        </FormItem>
                                    )}
                                />


                                <Button type="submit" className="w-full active:scale-95 hover:scale-105 transition-all ease-in-out bg-[#004680] hover:bg-[#004680]" disabled={isLoading}>
                                    {isLoading && (
                                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Reset Password
                                </Button>
                            </form>

                        </Form>
                    </>
                )
            }

        </div>
    )
}