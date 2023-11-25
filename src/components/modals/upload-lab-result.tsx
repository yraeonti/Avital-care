import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useStore } from "../hooks/use-store";
import { ModalType } from "@/components/hooks/modal-store"
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import TestResultUpload from "../dashboard/doctor/test-result-upload";
import { useState } from "react";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { useSWRConfig } from "swr";
import { useSession } from "next-auth/react";
import { Input } from "../ui/input";

const testResultSchema = z.object({
    test_url: z.string().url({ message: 'Please upload result before saving..' }),
    testName: z.string().min(1, { message: 'This field is required' }),
})

export default function UploadLabResult() {
    const { isOpen, onClose, type, data: { patientData } } = useStore();

    const [isLoading, setIsLoading] = useState(false)

    const isModalOpen = isOpen && type === ModalType.LABRESULT;

    const { toast } = useToast();

    const { data: session } = useSession()

    const form = useForm<z.infer<typeof testResultSchema>>({
        resolver: zodResolver(testResultSchema),
        defaultValues: {
            test_url: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof testResultSchema>) => {
        const data = { ...values };
        setIsLoading(true);

        try {
            if (patientData && session?.user?.name) {
                const response = await axios.post(
                    "/api/laboratory",
                    {
                        test_url: values.test_url,
                        patientId: patientData.id,
                        doctorName: session.user?.name,
                        testName: values.testName
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.status === 200) {
                    toast({
                        variant: "success",
                        description: "Result Uploaded Successfully",
                    });
                    onClose()
                    form.reset()

                }
            }

        } catch (error) {
            toast({
                variant: 'destructive',
                title: "Test result not uploaded",
                description: "Something went wrong..",
            });
        }
        setIsLoading(false);
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black pt-4 pb-8 px-7 overflow-auto max-h-screen lg:min-w-max">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Test Result Upload
                    </DialogTitle>

                </DialogHeader>

                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} >


                            <FormField
                                control={form.control}
                                name="testName"
                                render={({ field }) => (
                                    <FormItem className="mt-2">
                                        <FormLabel>Lab Test Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Test Name' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="test_url"
                                render={({ field }) => (
                                    <FormItem className="mt-2">

                                        <FormControl>
                                            <TestResultUpload
                                                testName={form.watch().testName}
                                                value={field.value}
                                                onchange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-center mt-9">
                                <Button
                                    type="submit"
                                    className="mt-5 mx-auto opacity-90 px-6 w-full bg-blue-800 hover:bg-blue-900"
                                    disabled={isLoading}
                                >
                                    {isLoading && (
                                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Save
                                </Button>
                            </div>

                        </form>

                    </Form>
                </div>


            </DialogContent>

        </Dialog>
    )

}