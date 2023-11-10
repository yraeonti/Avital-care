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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/custpopover"
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from "../ui/form";
import { useStore } from "../hooks/use-store";
import { ModalType } from "@/components/hooks/modal-store"
import { useForm } from "react-hook-form";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Specialties } from "./admin-add-doctors";

const formSchema = z.object({
    specialty: z.string().min(1, { message: 'This field is required' }).or(z.number()),
    id: z.string().uuid({ message: 'Please select a doctor' })
})


export default function ViewScheduler() {

    const { isOpen, onClose, type, data } = useStore();

    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [doctorsList, setDoctorsList] = useState([])

    const isModalOpen = isOpen && type === ModalType.VIEWSCHEDULE;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: '',
            specialty: ''
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);

    }

    const checkData = data.specialtiesData && data.specialtiesData.data.status ? true : false

    console.log(data.specialtiesData);

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black pt-4 pb-8 px-7 max-h-screen">
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
                                                            )?.name
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
                                                                            setDoctorsList(item.profile)
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
                                                {doctorsList.map((item: { id: string, name: string }, i) => (
                                                    <SelectItem value={item.id} key={i}>{item.name}</SelectItem>

                                                ))}

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