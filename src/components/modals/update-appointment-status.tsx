import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from "../ui/form";
import { useStore } from "../hooks/use-store";
import { ModalType } from "@/components/hooks/modal-store"
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { APPOINTMENTSTATUS } from "@/app/services/types";
import { useToast } from "../ui/use-toast";
import { useSWRConfig } from "swr";
import axios from "axios";
import { Icons } from "../icons";

const formSchema = z.object({
    status: z.nativeEnum(APPOINTMENTSTATUS).or(z.string().min(1))
})


export default function UpdateAppointmentStatus({ account }: { account: 'doctor' | 'admin' }) {

    const { isOpen, onClose, type, data: { appointmentData } } = useStore();

    const [isLoading, setIsLoading] = useState(false)

    const toast = useToast()

    const { mutate } = useSWRConfig()

    const isModalOpen = isOpen && type === ModalType.UPDATEAPPOINTMENTSTATUS;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: '',
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        setIsLoading(true)
        try {

            if (appointmentData?.id) {

                const res = await axios.put('/api/patient/appointment', {
                    id: appointmentData.id,
                    sessionTimeId: appointmentData.sessionTime.id,
                    status: values.status
                },
                )

                if (res.status === 200) {
                    toast.toast({
                        variant: 'success',
                        description: 'Appointment status has updated deleted'
                    })

                    if (account === 'admin') {
                        mutate('/api/patients/appointments')
                    } else {
                        mutate('/api/doctor/appointment')
                    }


                }

            }

        } catch (error) {
            setIsLoading(false)
            toast.toast({
                description: 'Appointment status not updated'
            })
        }

        setIsLoading(false)

    }


    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black pt-4 pb-8 px-7 max-h-full overflow-auto">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Update Appointment Status
                    </DialogTitle>
                </DialogHeader>
                <div className="">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">


                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (

                                    <FormItem>

                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Choose Status" />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent>
                                                <SelectItem value={APPOINTMENTSTATUS.CANCELLED}
                                                    className="text-red-400">CANCEL</SelectItem>
                                                {
                                                    account === 'doctor' && (
                                                        <SelectItem value={APPOINTMENTSTATUS.DONE}
                                                            className="text-green-400">DONE</SelectItem>
                                                    )
                                                }


                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>

                                )}
                            />

                            <div className="flex justify-end">
                                <Button className="bg-blue-500 hover:bg-blue-600" type="submit">
                                    {isLoading && (
                                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Update Status
                                </Button>
                            </div>

                        </form>

                    </Form>

                </div>
            </DialogContent>
        </Dialog>
    )
}