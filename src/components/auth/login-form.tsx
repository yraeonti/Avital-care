"use client"

import { Role, SessionWithExtraData } from "@/app/services/types"
import { Icons } from "@/components/icons"
import {
    Alert,
    AlertDescription
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
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
import { AlertCircle } from "lucide-react"
import { getSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import avitaCare from '../../../public/avital-logo.png'
import Image from "next/image"

import { useForm } from "react-hook-form"
import * as z from "zod"


const formSchema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(6, { message: 'Password must be more than 6 characters' })
})


export default function LoginForm() {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [visible, setVisible] = useState(false);
    const router = useRouter()


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);

        setIsLoading(true)

        const res = await signIn('credentials', { ...values, redirect: false })

        console.log('ok', res);

        if (res?.status === 200) {
            const session: SessionWithExtraData | null = await getSession()

            if (session) {

                const { role } = session
                if (role === Role.PATIENT) {
                    const previousURL = document.referrer
                    if (previousURL.includes('user/request_approval')) return router.push(previousURL)
                    return router.push('/patient/dashboard')
                } else if (role === Role.DOCTOR) {
                    return router.push('/doctor/dashboard')
                } else {
                    if (role === 'ADMIN') return router.push('/admin/dashboard')
                }
            }
            return router.push('/login')
        }

        console.log('error', res);
        setError(res?.error ?? 'Something went wrong...')
        setIsLoading(false)

    }

    useEffect(() => {
        signOut({ redirect: false })
    }, [])
    return (
        <div className="border border-neutral-100 py-7 px-10 md:px-28 w-11/12 sm:w-4/5 lg:w-1/2 bg-white shadow-lg">

            <div className="flex flex-col items-center space-y-2">
                <Image src={avitaCare} alt="AvitaCare logo for the Website" width={180} height={180} />

                <h1 className="text-3xl font-semibold text-[#004680]">Welcome Back</h1>
            </div>

            {
                error !== '' && (
                    <Alert variant="destructive" className="my-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            {error}
                        </AlertDescription>
                    </Alert>
                )
            }

            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>

                                < FormMessage />

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input type={visible ? 'text' : 'password'} placeholder="Password" {...field} />
                                        <span onClick={() => setVisible(!visible)} className='absolute right-2.5 top-0.5 cursor-pointer translate-y-1/2 text-lg text-gray-500'>{visible ? <FaEye /> : <FaEyeSlash />}</span>
                                    </div>
                                </FormControl>

                                < FormMessage />

                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col justify-center">
                        <Button type="submit" className="w-full active:scale-95 hover:scale-105 transition-all ease-in-out bg-[#004680] hover:bg-[#004680]" disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Login
                        </Button>


                        <div className="mt-3">
                            <Link href="/forgot-password" className="underline text-sm">Forgot Password?</Link>
                        </div>

                    </div>






                </form>
            </Form>

            <div className="font-light mt-5 flex justify-center space-x-2">
                <p>Don&apos;t have an account? {" "} </p><Link href="/signup" className="font-semibold ">Sign Up</Link>
            </div>


        </div>
    )

}