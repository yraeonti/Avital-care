import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
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
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { useStore } from "../hooks/use-store";
import { ModalType } from "@/components/hooks/modal-store"
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    specialty: z.string().min(1, { message: 'This field is required' }),
    id: z.string().uuid({ message: 'Please select a doctor' })
})


export default function ViewScheduler() {

    const { isOpen, onClose, type } = useStore();

    const isModalOpen = isOpen && type === ModalType.VIEWSCHEDULE;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: ''
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);

    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black pt-4 pb-8 px-7 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Schedule a Doctor
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Schedule a doctor and book for a session
                    </DialogDescription>
                </DialogHeader>
                <div className="">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">


                            <FormField
                                control={form.control}
                                name="specialty"
                                render={({ field }) => (

                                    <FormItem>

                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">

                                                    <SelectValue placeholder="Choose specialty from the list" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="light">Accident</SelectItem>
                                                <SelectItem value="dark">Psychiatry</SelectItem>
                                                <SelectItem value="system">Ontologist</SelectItem>
                                            </SelectContent>
                                        </Select>


                                        <FormMessage />
                                    </FormItem>

                                )}
                            />


                            <FormField
                                control={form.control}
                                name="id"
                                render={({ field }) => (

                                    <FormItem>

                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Choose Doctor" />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent>
                                                <SelectItem value="light">Test Doctor</SelectItem>
                                                {/* <SelectItem value="dark">Dark</SelectItem>
                                                <SelectItem value="system">System</SelectItem> */}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>

                                )}
                            />
                            <Button type="submit">View Schedule</Button>
                        </form>

                    </Form>





                </div>
            </DialogContent>
        </Dialog>
    )
}