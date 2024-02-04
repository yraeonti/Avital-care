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
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useRouter } from "next/navigation"
import { useToast } from "../ui/use-toast"
const formSchema = z
    .object({
        newPassword: z
            .string()
            .min(6, { message: "password must be at least 6 characters" }),
        confirmPassword: z.string().min(6),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export default function ResetChangePassword({ token }: { token: string }) {

    const [isLoading, setIsLoading] = useState(false)

    const [visible, setVisible] = useState(false);

    const { toast } = useToast()

    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        try {

            const response = await axios.patch("/api/auth/forgot-password", {
                token,
                password: values.confirmPassword
            })

            if (response.status === 200) {
                router.push("/login")
                return;
            }

            toast({
                variant: 'destructive',
                description: "Password not reset",
            })

        } catch (error) {
            toast({
                variant: 'destructive',
                description: "Something went wrong...",
            })
        }
        setIsLoading(false)
    }
    return (
        <div className="text-black bg-white p-10 w-[90%] sm:w-[68%] lg:w-[50%]">
            <Image src={avitaCare} alt="AvitaCare logo for the Website" width={180} height={180} className="mx-auto" />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>

                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem className="mt-2">
                                <FormLabel>New Password</FormLabel>

                                <FormControl>
                                    <div className="relative">
                                        <Input type={visible ? 'text' : 'password'} placeholder="Enter new Password" {...field} />
                                        <span onClick={() => setVisible(!visible)} className='absolute right-2.5 top-0.5 cursor-pointer translate-y-1/2 text-lg text-gray-500'>{visible ? <FaEye /> : <FaEyeSlash />}</span>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className="mt-2">
                                <FormLabel>Confirm Password</FormLabel>

                                <FormControl>
                                    <Input type={visible ? 'text' : 'password'} placeholder="Confirm Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <Button
                        type="submit"
                        className="mt-5 bg-blue-700 w-full
                                     hover:bg-blue-800 opacity-90 px-6"
                        disabled={isLoading}
                    >
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Reset Password
                    </Button>

                </form>
            </Form>
        </div>
    )
}