
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from "../ui/form";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { useStore } from "../hooks/use-store";
import { ModalType } from "@/components/hooks/modal-store"
import { useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod"
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Icons } from "../icons";
import { useToast } from "../ui/use-toast";
import { useSession } from "next-auth/react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";


enum DiagnosisTabs {
    EXAM = 'EXAM',
    DIAGNOSE = 'DIAGNOSE',
    PRESCRIBE = 'PRESCRIBE'

}

const diagnosisSchema = z.object({
    complaint: z.string(),
    complaint_history: z.string(),
    recommended_tests: z.string(),
    diagnosis_confirmation: z.string(),
    prescription: z.string(),
    prescription_comment: z.string(),
    management_plan: z.string()
}).partial()




export default function Diagnosis() {
    const { isOpen, onClose, type, data: { patientData } } = useStore();

    const [isLoading, setIsloading] = useState(false)

    const { toast } = useToast()

    const { data } = useSession()

    const isModalOpen = isOpen && type === ModalType.DIAGNOSIS;

    const form = useForm<z.infer<typeof diagnosisSchema>>({
        resolver: zodResolver(diagnosisSchema),
    })

    const handleSubmit = async (values: z.infer<typeof diagnosisSchema>) => {

        console.log(values);
        setIsloading(true)
        try {
            const response = await axios.post('/api/doctor/diagnosis', {
                ...values,
                patientId: patientData?.id,
                doctorName: data?.user?.name
            })

            if (response.status === 200) {
                toast({
                    variant: 'success',
                    description: 'Diagnosis uploaded sucessfully'
                })
                onClose()
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                description: 'Something went wrong...'
            })
        }
        setIsloading(false)

    }

    console.log(form.formState.errors);


    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black pt-4 pb-8 px-7 max-w-screen-xl overflow-scroll max-h-screen">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-xl text-center text-white font-semibold bg-stone-500 p-2 rounded-md capitalize">
                        Patient: {patientData?.name}
                    </DialogTitle>

                </DialogHeader>

                <Form {...form}>

                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <Tabs defaultValue={DiagnosisTabs.EXAM} className="w-full">
                            <TabsList className="grid w-full grid-cols-3 mx-auto">
                                <TabsTrigger value={DiagnosisTabs.EXAM}>Exam</TabsTrigger>
                                <TabsTrigger value={DiagnosisTabs.DIAGNOSE}>Diagnose</TabsTrigger>
                                <TabsTrigger value={DiagnosisTabs.PRESCRIBE}>Prescribe</TabsTrigger>
                            </TabsList>
                            <TabsContent value={DiagnosisTabs.EXAM} className="outline-none">
                                <ExamTab form={form} />
                            </TabsContent>
                            <TabsContent value={DiagnosisTabs.DIAGNOSE}>
                                <DiagnoseTab form={form} />
                            </TabsContent>
                            <TabsContent value={DiagnosisTabs.PRESCRIBE}>
                                <PrescribeTab form={form} />
                            </TabsContent>
                        </Tabs>

                        <DialogFooter className="mt-4">
                            <Button
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Save</Button>
                        </DialogFooter>
                    </form>

                </Form>




            </DialogContent>

        </Dialog>
    )

}


type TabForm = {
    form: UseFormReturn<z.infer<typeof diagnosisSchema>>
}


const ExamTab = ({ form }: TabForm) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    EXAMINATION
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <FormField
                    control={form.control}
                    name="complaint"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Presenting Complaint (optional):</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder=""

                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="complaint_history"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>History of Presenting Complaint (optional):</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder=""

                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="recommended_tests"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Recomended Tests (optional):</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder=""

                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    )
}
const DiagnoseTab = ({ form }: TabForm) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    DIAGNOSIS
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <FormField
                    control={form.control}
                    name="diagnosis_confirmation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Diagonosis from the tests results and examination (optional):</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder=""

                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    )
}
const PrescribeTab = ({ form }: TabForm) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    PRESCRIPTION
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <FormField
                    control={form.control}
                    name="prescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Which medicine do you want to prescribe? (optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder=""

                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="prescription_comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Do you want to add prescription comment? (optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder=""

                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="management_plan"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Do you want to add management plan? (optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder=""

                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    )
}