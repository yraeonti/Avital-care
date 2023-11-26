import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input"
import { useStore } from "../hooks/use-store";
import { ModalType } from "@/components/hooks/modal-store"
import * as z from "zod"
import { Icons } from "../icons";
import FileUpload from "../dashboard/shared/file-upload";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { mutate } from "swr"
import { useSession } from "next-auth/react";


const patientSchema = z.object({
    id: z.string(),
    first_name: z.string().min(1, { message: 'This field is required' }),
    last_name: z.string().min(1, { message: 'This field is required' }),
    email: z.string().email({ message: 'Please provide valid Email' }),
    telephone: z.string().min(10, { message: 'Please provide valid Phone Number' }),
    nin: z.string().length(11, { message: 'Please provide valid NIN' }),
    address: z.string().min(1, { message: 'This field is required' }),
    imageUrl: z.string().nullable(),
})

export default function PatientAccountSettings() {
    const { isOpen, onClose, type, data } = useStore();
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const router = useRouter()
    const { update } = useSession()

    const isModalOpen = isOpen && type === ModalType.PATIENTACCOUNTSETTINGS;

    const form = useForm<z.infer<typeof patientSchema>>({
        resolver: zodResolver(patientSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            telephone: "",
            nin: "",
            imageUrl: null,
            id: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof patientSchema>) => {
        // console.log(values);

        const data = { ...values }

        setIsLoading(true)

        try {

            const response = await axios.patch('/api/patient', {
                ...data
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.status === 200) {
                toast({
                    variant: 'success',
                    description: "Account successfully edited",
                })
                onClose()
                mutate('/api/patient')
                await update()
                router.refresh()

            }



        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Account not edited',
                description: "Something went wrong..",
            })
        }
        setIsLoading(false)

    }


    useEffect(() => {
        if (data.networkData?.data && data.networkData.data.status) {

            form.reset(
                {
                    first_name: data.networkData.data.data.profile.name.split(' ')[0],
                    last_name: data.networkData.data.data.profile.name.split(' ')[1],
                    email: data.networkData.data.data.email,
                    telephone: data.networkData.data.data.profile.telephone,
                    nin: data.networkData.data.data.profile.nin,
                    id: data.networkData.data.data.id,
                    address: data.networkData.data.data.profile.address,
                    imageUrl: data.networkData.data.data.profile.imageUrl
                }
            )

        }

    }, [data.networkData])




    if (!data.networkData) {
        return null
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black pt-4 pb-8 px-7 max-h-full overflow-y-scroll">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Account Settings
                    </DialogTitle>

                </DialogHeader>

                <div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>

                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem className="mt-2">
                                        {/* <FormLabel>First Name</FormLabel> */}

                                        <FormControl>
                                            <FileUpload value={field.value} onchange={field.onChange} />
                                        </FormControl>
                                        < FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="first_name"
                                render={({ field }) => (
                                    <FormItem className="mt-2">
                                        <FormLabel>First Name</FormLabel>

                                        <FormControl>
                                            <Input placeholder="First Name"  {...field} />
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
                                            <Input placeholder="Email"  {...field} />
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
                                name="address"
                                render={({ field }) => (
                                    <FormItem className="mt-2">
                                        <FormLabel>Address</FormLabel>

                                        <FormControl>
                                            <Input placeholder="Address" {...field} />
                                        </FormControl>
                                        < FormMessage />
                                    </FormItem>
                                )}
                            />


                            <div className="flex justify-center items-center space-x-3 mt-5">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
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
                                    Edit Profile
                                </Button>
                            </div>

                        </form>


                    </Form>


                </div>




            </DialogContent>

        </Dialog>
    )

}