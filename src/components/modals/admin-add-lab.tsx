
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from "../ui/form";
import { useStore } from "../hooks/use-store";
import { ModalType } from "@/components/hooks/modal-store"
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";
import { Role } from "@/app/services/types";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import axios from "axios";
import { Icons } from "../icons";
import { useSWRConfig } from "swr";



const doctorSchema = z.object({
    first_name: z.string().min(1, { message: 'This field is required' }),
    last_name: z.string().min(1, { message: 'This field is required' }),
    email: z.string().email({ message: 'Please provide valid Email' }),
    telephone: z.string().min(10, { message: 'Please provide valid Phone Number' }),
    nin: z.string().length(11, { message: 'Please provide valid NIN' }),
    specialty: z.number({ required_error: 'This field is required' }).or(z.string()),
    password: z.string().min(1, { message: 'Password is required' }).or(z.number()),
    confirm_password: z.string().min(1, { message: 'Password is required' }).or(z.number()),
}).refine((data) => data.password === data.confirm_password, {
    message: "Password does not match",
    path: ["confirm_password"]
})

export type Specialties = {
    id: number | string;
    name: string;
}

export default function AdminAddDoctor() {
    const { isOpen, onClose, type, data } = useStore();

    const [isLoading, setIsLoading] = useState(false)

    const { toast } = useToast()

    const { mutate } = useSWRConfig()

    const isModalOpen = isOpen && type === ModalType.ADMINADDLABORATORY;

    const form = useForm<z.infer<typeof doctorSchema>>({
        resolver: zodResolver(doctorSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            telephone: "",
            nin: "",
            specialty: "",
            password: "",
            confirm_password: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof doctorSchema>) => {
        const postData = { ...values, role: Role.DOCTOR }
        setIsLoading(true)



        try {

            if (data?.specialtiesData) {

                const response = await axios.post('/api/auth/register', {
                    ...postData, specialty: data.specialtiesData.data.data.find((item: Specialties) =>
                        (item.name.toLowerCase() === 'laboratory')).id
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if (response.status === 200) {
                    toast({
                        variant: 'success',
                        description: "Lab personnel has been added",
                    })

                    mutate('/api/doctors')
                }

            }





        } catch (error) {
            toast({
                title: 'Lab personnel not added',
                description: "Something went wrong..",
            })
        }
        form.reset()
        setIsLoading(false)


    }

    useEffect(() => {

        if (data.specialtiesData) {
            form.reset({
                specialty: data.specialtiesData.data.data.find((item: Specialties) => (item.name.toLowerCase() === 'laboratory')).name
            })
        }

    }, [data.specialtiesData])

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black pt-4 pb-8 px-7 overflow-y-scroll max-h-full max-w-full">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Add New Laboratory Personnel
                    </DialogTitle>

                </DialogHeader>

                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} >
                            <FormField
                                control={form.control}
                                name="first_name"
                                render={({ field }) => (
                                    <FormItem className="mt-2">
                                        <FormLabel>First Name</FormLabel>

                                        <FormControl>
                                            <Input placeholder="First Name" {...field} />
                                        </FormControl>
                                        < FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="last_name"
                                render={({ field }) => (
                                    <FormItem className="mt-2">
                                        <FormLabel>Last Name</FormLabel>

                                        <FormControl>
                                            <Input placeholder="Last Name" {...field} />
                                        </FormControl>
                                        < FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="mt-2">
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
                                name="telephone"
                                render={({ field }) => (
                                    <FormItem className="mt-2">
                                        <FormLabel>Mobile Number</FormLabel>

                                        <FormControl>
                                            <Input placeholder="Mobile Number" {...field} />
                                        </FormControl>
                                        < FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="nin"
                                render={({ field }) => (
                                    <FormItem className="mt-2">
                                        <FormLabel>NIN</FormLabel>

                                        <FormControl>
                                            <Input placeholder="NIN" {...field} />
                                        </FormControl>
                                        < FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="specialty"
                                render={({ field }) => (
                                    <FormItem className="mt-2 flex flex-col">
                                        <FormLabel>Specialty</FormLabel>


                                        <FormControl>
                                            <Input readOnly {...field} />
                                        </FormControl>

                                        < FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="mt-2">
                                        <FormLabel>Password</FormLabel>

                                        <FormControl>
                                            <Input placeholder="Enter Password" {...field} />
                                        </FormControl>
                                        < FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="confirm_password"
                                render={({ field }) => (
                                    <FormItem className="mt-2">
                                        <FormLabel>Confirm Password</FormLabel>

                                        <FormControl>
                                            <Input placeholder="Confirm Password" {...field} />
                                        </FormControl>
                                        < FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-center items-center mt-5 space-x-3">
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">
                                        Close
                                    </Button>
                                </DialogClose>
                                <Button
                                    type="submit"
                                    className=" mx-auto bg-blue-700
                                     hover:bg-blue-800 opacity-90 px-6"
                                    disabled={isLoading}
                                >
                                    {isLoading && (
                                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Add Laboratory
                                </Button>
                            </div>

                        </form>

                    </Form>
                </div>


            </DialogContent>

        </Dialog>
    )

}