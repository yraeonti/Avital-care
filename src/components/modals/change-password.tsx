import { ModalType } from "@/components/hooks/modal-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useStore } from "../hooks/use-store";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { mutate } from "swr";

const schema = z
  .object({
    oldPassword: z.string(),
    newPassword: z
      .string()
      .min(6, { message: "password must be at least 6 characters" }),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function PatientChangePassword() {
  const { isOpen, onClose, type } = useStore();

  const isModalOpen = isOpen && type === ModalType.PATIENTCHANGEPASSWORD;

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { update } = useSession();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const data = { ...values };

    setIsLoading(true);

    try {
      const response = await axios.patch(
        "/api/patient/changePassword",
        {
          ...data,
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
          description: "Password successfully changed",
        });
        onClose();
        mutate("/api/patient/changePassword");
        await update();
        router.refresh();
      }
    } catch (error) {
        toast({
            variant: 'destructive',
            title: 'Password not changed',
            description: "Something went wrong..",
        })
    }

    setIsLoading(false)
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black pt-4 pb-8 px-7 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Change Password
          </DialogTitle>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Password</FormLabel>

                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>New Password</FormLabel>

                    <FormControl>
                      <Input placeholder="Enter new Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Confirm Password</FormLabel>

                    <FormControl>
                      <Input placeholder="Enter new Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="mt-5 mx-auto bg-blue-700
                                     hover:bg-blue-800 opacity-90 px-6"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
