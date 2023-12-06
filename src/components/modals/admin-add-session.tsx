import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from "../ui/form";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/custpopover"
import { useStore } from "../hooks/use-store";
import { ModalType } from "@/components/hooks/modal-store"
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";
import { useState } from "react";
import { DoctorData } from "../dashboard/admin/doctors";
import { cn } from "@/lib/utils"
import { ChevronsUpDown } from "lucide-react"
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import { Icons } from "../icons";
import _ from "lodash"
import axios from "axios";
import { mutate } from "swr";
import moment from "moment";


const sessionSchema = z.object({
    title: z.string().min(1, { message: 'This field is required' }),
    doctorId: z.string().min(10, { message: 'This field is required' }),
    sessionDate: z.string().min(1, { message: 'This field is required' }),
    sessionTime: z.array(z.object({
        startTime: z.string(),
        endTime: z.string()
    }))
})

export default function AddSession() {
    const { isOpen, onClose, type, data } = useStore();

    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [date, setDate] = useState({ startTime: "", endTime: "" })

    const isModalOpen = isOpen && type === ModalType.ADMINADDSESSION;

    const { toast } = useToast()

    const checkData = (
        data.networkData &&
        data.networkData?.data.status
    )

    const form = useForm<z.infer<typeof sessionSchema>>({
        resolver: zodResolver(sessionSchema),
        defaultValues: {
            title: "",
            doctorId: "",
            sessionDate: "",
            sessionTime: []
        }
    })


    const onSubmit = async (values: z.infer<typeof sessionSchema>) => {
        if (values.sessionTime.length === 0) {
            toast({
                variant: 'destructive',
                description: "Please Pick a date"
            })
            return;
        }

        setIsLoading(true)
        console.log(values);
        try {

            const response = await axios.post('/api/doctor/session', {
                ...values
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.status === 200) {
                toast({
                    variant: 'success',
                    description: "New Session has been created",
                })

                mutate('/api/doctors/sessions')
            }

            console.log(response);



        } catch (error) {
            console.log(error);

            toast({
                title: 'Session not added',
                description: "Something went wrong..",
            })
        }
        form.reset()
        setIsLoading(false)



    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black pt-4 pb-8 px-7 max-h-screen">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Add New Session
                    </DialogTitle>

                </DialogHeader>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="mt-2">
                                        <FormLabel>Session Title:</FormLabel>

                                        <FormControl>
                                            <Input placeholder="Session Title" {...field} />
                                        </FormControl>
                                        < FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="doctorId"
                                render={({ field }) => (
                                    <FormItem className="mt-4 flex flex-col">
                                        <FormLabel>Choose Doctor:</FormLabel>

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
                                                        {checkData && data.networkData && field.value
                                                            ? data.networkData.data.data.find(
                                                                (item: DoctorData) => item.id === field.value
                                                            )?.name
                                                            : "Choose a Doctor"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>

                                            <PopoverContent className="w-[250px] p-0">

                                                <div className="max-h-96">
                                                    <Command>
                                                        <CommandInput placeholder="Search doctors" />
                                                        <CommandEmpty>No doctor found.</CommandEmpty>
                                                        <CommandGroup className="overflow-y-scroll max-h-96 py-4">
                                                            {checkData && data.networkData ? (
                                                                data.networkData.data.data.map((item: any) => (
                                                                    <CommandItem
                                                                        value={item.name}
                                                                        key={item.id}
                                                                        onSelect={() => {
                                                                            form.setValue("doctorId", item.id)
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
                                name="sessionDate"
                                render={({ field }) => (
                                    <FormItem className="mt-4">
                                        <FormLabel>Session Date:</FormLabel>

                                        <FormControl>
                                            <Input type="date" placeholder="Session Date" {...field} />
                                        </FormControl>
                                        < FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex space-x-2 items-end mt-4">
                                <div className="w-full">
                                    <Label>Start Time:</Label>
                                    <Input type="time" placeholder="Start Time" value={date.startTime} onChange={(e) => setDate({ ...date, startTime: e.target.value })} />
                                </div>



                                <div className="w-full">
                                    <Label>Start Time:</Label>
                                    <Input type="time" placeholder="Start Time" value={date.endTime} onChange={(e) => setDate({ ...date, endTime: e.target.value })} />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="sessionTime"
                                    render={({ field }) => (
                                        <FormItem>

                                            <FormControl>
                                                <Button
                                                    className="w-full bg-blue-700
                                                                hover:bg-blue-800"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        if (date.startTime >= date.endTime) {
                                                            toast({
                                                                variant: 'destructive',
                                                                description: "Invalid time chosen"
                                                            })
                                                            return
                                                        }
                                                        form.setValue('sessionTime', [..._.uniqWith([...field.value, date], _.isEqual)])
                                                        setDate({ startTime: "", endTime: "" })
                                                    }}>
                                                    Pick date
                                                </Button>
                                            </FormControl>

                                        </FormItem>
                                    )}
                                />


                            </div>

                            <div className="flex flex-wrap mt-5">

                                {
                                    form.getValues().sessionTime.map((item, i) => {
                                        const startTime = item.startTime
                                        const endTime = item.endTime
                                        return (
                                            <Button
                                                variant='secondary'
                                                size="sm"
                                                key={i}
                                                type="button"
                                                className="m-1 cursor-default "
                                            >
                                                {startTime} - {endTime}
                                            </Button>
                                        )
                                    })
                                }

                            </div>

                            <div className="flex justify-center space-x-2 items-end">
                                <Button
                                    onClick={() => {
                                        form.reset()
                                    }}
                                >
                                    Reset Form
                                </Button>
                                <Button
                                    type="submit"
                                    className="mt-5 mx-auto bg-blue-700
                                     hover:bg-blue-800 opacity-90 px-6"
                                    disabled={isLoading}
                                >
                                    {isLoading && (
                                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Add Session
                                </Button>
                            </div>

                        </form>
                    </Form>

                </div>



            </DialogContent>
        </Dialog>
    )
}