"use client"
import { SetStateAction, useState } from "react"
import { Transition } from "@headlessui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn } from "react-hook-form"
import * as z from "zod"
import { type Dispatch } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"


type ProfileForm = {
    first_name: string;
    last_name: string;
    address: string;
    nin: string;
    date_of_birth: any
}

type UserForm = {
    telephone: string;
    email: string;
    password: string;
    confirm_password: string
}


type SignUpProps = {
    profileForm: UseFormReturn<ProfileForm, any, undefined>,
    userForm: UseFormReturn<UserForm, any, undefined>,
    setpage: Dispatch<SetStateAction<string>>,
    setdata: Dispatch<SetStateAction<SignUpProps['data']>>,
    pageTo: string
    data: (ProfileForm) | null
}


const profileSchema = z.object({
    first_name: z.string().min(1, { message: 'This field is required' }),
    last_name: z.string().min(1, { message: 'This field is required' }),
    address: z.string(),
    nin: z.string().length(11, { message: 'Invalid Nin' }),
    date_of_birth: z.coerce.date().max(new Date(), { message: "Invalid date" }).refine((val) => val.toString().length < 1, {
        message: 'This field is required',
        path: ['date_of_birth']
    }).or(z.string())

})

const userSchema = z.object({
    telephone: z.string().min(10, { message: 'Invalid Phone number' }),
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(6, { message: 'Password must be more than 6 characters' }),
    confirm_password: z.string().min(6, { message: 'Password must be more than 6 characters' }),
}).refine((data) => data.password === data.confirm_password, {
    message: "Password does not match",
    path: ["confirm_password"]
})





export default function SignUpForm() {
    const [page, setPage] = useState<string>("profile")
    const [data, setData] = useState<SignUpProps['data']>(null)

    const profileForm = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            address: "",
            nin: "",
            date_of_birth: new Date().toDateString(),
        }
    })

    const userForm = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            telephone: "",
            email: "",
            password: "",
            confirm_password: "",
        }
    })

    const enterTransitions = {
        enter: "transition-all ease duration-500",
        enterFrom: "translate-x-[110%]",
        enterTo: "translate-x-[0%]",
        leave: "transition-all ease duration-500",
        leaveFrom: "translate-x-[0%]",
        leaveTo: "translate-x-[110%]"
    }

    const leaveTransitions = {
        enter: "transition-all ease duration-500",
        enterFrom: "-translate-x-[110%]",
        enterTo: "translate-x-[0%]",
        leave: "transition-all ease duration-500",
        leaveFrom: "translate-x-[0%]",
        leaveTo: "-translate-x-[110%]"
    }

    return (
        <div className="">

            <div className="relative" >

                <Transition
                    {...leaveTransitions}
                    show={page === 'profile'}
                    as="div"
                    className="absolute inset-x-0"
                >

                    <ProfileDetails
                        setdata={setData}
                        profileForm={profileForm}
                        setpage={setPage}
                        pageTo="signup" />

                </Transition>


                <Transition
                    {...enterTransitions}
                    show={page === 'signup'}
                    as="div"
                    className="absolute inset-x-0"
                >

                    <UserDetails
                        userForm={userForm}
                        setpage={setPage}
                        data={data}
                        pageTo="profile" />


                </Transition>

            </div>

        </div>
    )
}





const ProfileDetails = (
    {
        profileForm,
        setpage,
        pageTo,
        setdata
    }:
        Omit<SignUpProps, 'data' | 'userForm'>) => {

    const onNextClick = (values: z.infer<typeof profileSchema>) => {

        console.log(values);
        console.log('values');
        setdata({ ...values });
        pageTo && setpage(pageTo)
    }

    return (
        <div className="py-20">
            <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onNextClick)} className="border-2 border-neutral-100 py-10 px-10 md:px-28
                         w-11/12 sm:w-4/5 lg:w-1/2 bg-white mx-auto space-y-6 shadow-lg">

                    <div className="flex flex-col items-center space-y-5">
                        <p>Logo</p>

                        <h1 className="text-3xl font-semibold">Let's Get Started</h1>
                    </div>





                    <div>

                        <FormLabel>Name</FormLabel>
                        <div className="flex space-x-3 items-center w-full mt-2">

                            <FormField
                                control={profileForm.control}
                                name="first_name"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormControl>
                                            <Input placeholder="First Name" {...field} />
                                        </FormControl>

                                        < FormMessage />

                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={profileForm.control}
                                name="last_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Last Name" {...field} />
                                        </FormControl>

                                        < FormMessage />

                                    </FormItem>
                                )}
                            />

                        </div>

                    </div>


                    <FormField
                        control={profileForm.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Address" {...field} />
                                </FormControl>

                                < FormMessage />

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={profileForm.control}
                        name="nin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>NIN</FormLabel>
                                <FormControl>
                                    <Input placeholder="NIN" {...field} />
                                </FormControl>

                                < FormMessage />

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={profileForm.control}
                        name="date_of_birth"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl>
                                    <Input type="date" placeholder="Date of Birth" {...field} />
                                </FormControl>

                                < FormMessage />

                            </FormItem>
                        )}
                    />


                    <div className="flex justify-center mt-10">
                        <Button className="w-full">Next</Button>
                    </div>

                    <div className="font-extralight mt-5 flex justify-center space-x-2">
                        <p className="">Already have an account? {" "} </p><Link href="/login" className="font-semibold ">Login</Link>
                    </div>


                </form>

            </Form>

        </div>

    )

}


const UserDetails = (
    {
        userForm,
        setpage,
        pageTo,
        data
    }:
        Omit<SignUpProps, 'setdata' | 'profileForm'>) => {

    const router = useRouter()


    const onSubmit = async (values: z.infer<typeof userSchema>) => {
        console.log({ ...values, ...data, role: 'PATIENT' });
        const info = { ...values, ...data, role: 'PATIENT' }
        const res = await signIn('credentials', { ...info, redirect: false, })

        if (res?.status === 200) {
            return router.push('/login');
        }

    }
    return (
        <div className="py-20">

            <Form {...userForm}>
                <form onSubmit={userForm.handleSubmit(onSubmit)} className="border-2 border-neutral-100 py-10 px-10 md:px-28
                         w-11/12 sm:w-4/5 lg:w-1/2 bg-white mx-auto space-y-6 shadow-lg">

                    <div className="flex flex-col items-center space-y-5">
                        <p>Logo</p>

                        <h1 className="text-3xl font-semibold">Let's Get Started</h1>
                    </div>




                    <FormField
                        control={userForm.control}
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
                        control={userForm.control}
                        name="telephone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Telephone</FormLabel>
                                <FormControl>
                                    <Input placeholder="Mobile Number" {...field} />
                                </FormControl>

                                < FormMessage />

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={userForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter Password" {...field} />
                                </FormControl>

                                < FormMessage />

                            </FormItem>
                        )}
                    />


                    <FormField
                        control={userForm.control}
                        name="confirm_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Confirm Password" {...field} />
                                </FormControl>

                                < FormMessage />

                            </FormItem>
                        )}
                    />


                    <div className="flex justify-center mt-10 space-x-3">
                        <Button type="button" className="w-full" onClick={() => pageTo && setpage(pageTo)}>Back</Button>
                        <Button type="submit" className="w-full bg-black text-white text-center">
                            Sign Up
                        </Button>
                    </div>

                    <div className="font-extralight mt-5 flex justify-center space-x-2">
                        <p>Already have an account? {" "} </p><Link href="/login" className="font-semibold ">Login</Link>
                    </div>

                </form>
            </Form>




        </div>

    )

}