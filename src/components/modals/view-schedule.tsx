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
import { useState, useEffect, useReducer } from "react";
import { Specialties } from "./admin-add-doctors";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar"
import { DayClickEventHandler } from 'react-day-picker';


const formSchema = z.object({
    specialty: z.string().min(1, { message: 'This field is required' }).or(z.number()),
    name: z.string().min(1, { message: 'Please select a doctor' })
})


export default function ViewScheduler() {

    const { isOpen, onClose, type, data, setSessionSearch } = useStore();

    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [doctorsList, setDoctorsList] = useState<any[]>([])
    const rerender = useReducer(() => ({}), {})[1]

    // const [booked, setBooked] = useState(false);

    console.log(doctorsList);

    const handleDayClick: DayClickEventHandler = (day, modifiers) => {

        if (day && modifiers.booked) {
            setSessionSearch(form.getValues().name)
            router.push('/patient/dashboard/sessions')
            onClose()
        }
    };



    const router = useRouter()

    const isModalOpen = isOpen && type === ModalType.VIEWSCHEDULE;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            specialty: ''
        }
    })

    const currentDate = new Date();




    const checkData = data.specialtiesData && data.specialtiesData.data.status ? true : false

    const bookedDays: Date[] = doctorsList.length > 0 &&
        form.watch().name.length > 0 &&
        doctorsList.find(doc => doc.name === form.watch().name).sessionDates.map((sess: string) => new Date(sess))

    const footer = bookedDays.length < 1 && <div className="text-center text-red-400">No Scheduled days</div>

    useEffect(() => {
        if (data.specialtiesData) {
            rerender()
        }
    }, [data.specialtiesData])

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black pt-4 pb-8 px-7 max-h-full max-w-full">
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
                        <form className="space-y-7">


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

                                                <div className="max-h-80">

                                                    <Command className="">
                                                        <CommandInput placeholder="Search specialties" />
                                                        <CommandEmpty>No specialty found.</CommandEmpty>
                                                        <CommandGroup className="overflow-y-scroll max-h-80 py-4">
                                                            {checkData && data.specialtiesData ? (
                                                                data.specialtiesData.data.data.map((item: any) => (
                                                                    <CommandItem
                                                                        value={item.name}
                                                                        key={item.id}
                                                                        onSelect={() => {
                                                                            form.setValue("specialty", item.id)
                                                                            form.setValue("name", '')
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
                                name="name"
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
                                                    <SelectItem value={item.name} key={i}>{item.name}</SelectItem>

                                                ))}


                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>

                                )}
                            />
                            <Popover>
                                <PopoverTrigger asChild disabled={!(form.watch().name.length > 0)}>
                                    <Button type="button">View Schedule</Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 max-h-[30rem] overflow-scroll">
                                    <Calendar
                                        mode="single"
                                        onDayClick={handleDayClick}
                                        defaultMonth={bookedDays[0] ?? new Date()}
                                        modifiers={{ booked: bookedDays }}
                                        modifiersClassNames={
                                            {
                                                booked: 'rounded-full border-2 border-red-500 bg-red-500 text-white hover:text-black'
                                            }}
                                        footer={footer}
                                        numberOfMonths={bookedDays[0] ? 2 : 1}
                                        showOutsideDays={false}
                                        fromMonth={bookedDays[0] ?? currentDate}
                                        toMonth={bookedDays[bookedDays.length - 1] ?? currentDate.getFullYear()}
                                    />
                                </PopoverContent>
                            </Popover>

                        </form>

                    </Form>





                </div>
            </DialogContent>
        </Dialog>
    )
}