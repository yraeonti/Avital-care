
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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/custpopover"
import { Button } from "../ui/button";
import { cn } from "@/lib/utils"
import { ChevronsUpDown } from "lucide-react"
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import axios from "axios";
import { Icons } from "../icons";
import { useSWRConfig } from "swr";



const doctorSchema = z.object({
    id: z.string(),
    first_name: z.string().min(1, { message: 'This field is required' }),
    last_name: z.string().min(1, { message: 'This field is required' }),
    email: z.string().email({ message: 'Please provide valid Email' }),
    telephone: z.string().min(10, { message: 'Please provide valid Phone Number' }),
    nin: z.string().length(11, { message: 'Please provide valid NIN' }),
    specialty: z.string().or(z.number()),
    password: z.string(),
}).partial({
    password: true
})

type Specialties = {
    id: number | string;
    name: string;
}

export default function AdminEditDoctor() {
    const { isOpen, onClose, type, data } = useStore();

    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const { toast } = useToast()

    const { mutate } = useSWRConfig()

    const isModalOpen = isOpen && type === ModalType.ADMINEDITDOCTOR;

    const checkData = (
        data.specialtiesData?.data.status &&
        data.specialtiesData.data.data
    )

    console.log(data.specialtiesData);

    const form = useForm<z.infer<typeof doctorSchema>>({
        resolver: zodResolver(doctorSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            telephone: "",
            nin: "",
            specialty: "",
            id: "",
            password: "",
        },
    })

    useEffect(() => {
        if (data.doctorData) {
            console.log('i got to my reset');

            form.reset(
                {
                    first_name: data.doctorData.name.split(' ')[0],
                    last_name: data.doctorData.name.split(' ')[1],
                    email: data.doctorData.email,
                    telephone: data.doctorData.telephone,
                    nin: data.doctorData.nin,
                    specialty: data.doctorData.specialtyId,
                    id: data.doctorData.id,
                    password: "",
                }
            )

        }

    }, [data.doctorData])

    const onSubmit = async (values: z.infer<typeof doctorSchema>) => {
        const data = { ...values }

        console.log(data);
        setIsLoading(true)

        try {

            const response = await axios.patch('/api/doctor', {
                ...data
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.status === 200) {
                toast({
                    variant: 'success',
                    description: "Doctor has been successfully edited",
                })

                mutate('/api/doctors')
            }



        } catch (error) {
            toast({
                title: 'Doctor not changed',
                description: "Something went wrong..",
            })
        }
        setIsLoading(false)


    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black pt-4 pb-8 px-7 overflow-y-scroll max-h-full ">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Edit Doctor Account
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
                                name="specialty"
                                render={({ field }) => (
                                    <FormItem className="mt-2 flex flex-col">
                                        <FormLabel>Specialties</FormLabel>

                                        <Popover open={open} onOpenChange={setOpen}>

                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        aria-expanded={open}
                                                        disabled={!checkData}
                                                        className={cn(
                                                            " justify-between",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {checkData && data.specialtiesData && field.value
                                                            ? data.specialtiesData.data.data.find(
                                                                (item: Specialties) => item.id === field.value
                                                            )?.name : data.doctorData?.specialty ? data.doctorData.specialty
                                                                : "Choose a Specialty"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>

                                            <PopoverContent className="w-[250px] p-0">

                                                <div className="max-h-96">



                                                    <Command>
                                                        <CommandInput placeholder="Search specialties" />
                                                        <CommandEmpty>No specialty found.</CommandEmpty>
                                                        <CommandGroup className="overflow-y-scroll max-h-screen py-4">
                                                            {checkData && data.specialtiesData ? (
                                                                data.specialtiesData.data.data.map((item: any) => (
                                                                    <CommandItem
                                                                        value={item.name}
                                                                        key={item.id}
                                                                        onSelect={() => {
                                                                            form.setValue("specialty", item.id)
                                                                            setOpen(false)
                                                                        }}
                                                                    >

                                                                        {item.name}
                                                                    </CommandItem>
                                                                ))
                                                            ) : (
                                                                <CommandItem>
                                                                    loading...
                                                                </CommandItem>
                                                            )}
                                                        </CommandGroup>
                                                    </Command>
                                                </div>
                                            </PopoverContent>
                                        </Popover>


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

                            <div className="flex justify-center items-center space-x-3 mt-5">
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
                                    Edit Doctor
                                </Button>
                            </div>

                        </form>

                    </Form>
                </div>


            </DialogContent>

        </Dialog>
    )

}