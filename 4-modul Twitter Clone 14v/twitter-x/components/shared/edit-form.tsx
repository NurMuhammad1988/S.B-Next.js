"use client";

import { userSchema } from "@/lib/validation";
import { IUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Button from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import useEditModal from "@/hooks/useEditModal";
import { toast } from "@/hooks/use-toast";

interface Props {
    user: IUser;
}

const EditForm = ({ user }: Props) => {
    const router = useRouter();
    const editModal = useEditModal();

    const form = useForm<z.infer<typeof userSchema>>({//bu userSchema lib papkani ichidagi validation.ts faildidan chaqirb ishlatilepti//z bu xoddan keleygan function typida validation.tsdan kelgan userschema bor 
        resolver: zodResolver(userSchema),//zodni functionlari 
        defaultValues: {
            name: user.name || "",//agar name bor bosa nameni qo'y yokida ""<< bo'sh string bosin shunda yangi user bu formda o'ziga name craete qilishi mumkun agar qilmasaham pustoy turadi//masalan google yoki github bilan account create qilgan bo'sa usernamesi bo'lmaydi shu sabab agar bo'lmasa bo'sh string yokida user accountni noldan create qilgandagi qo'ygan usernamesini chiqaradi
            username: user.username || "",
            bio: user.bio || "",//agar bio bor bo'sa bioni qo'y yo'q bosa"<< bosh tursin
            location: user.location || "",
        },
    });


    const { isSubmitting } = form.formState;

    const onSubmit = async (values: z.infer<typeof userSchema>) => {
        try {
            await axios.put(`/api/users/${user._id}?type=updateFields`, values);
        //api/users/[userId]/route.ts failiga boradigan so'rov type=updateFields<<bu qery so'rov agar api/users/[userId]/route.tsga bu so'rov borganda shu type=updateFields qery texti sabab

            router.refresh();
            editModal.onClose();
        } catch (error: any) {
            if (error.response.data.error) {
                return toast({
                    title: "Error",
                    description: error.response.data.error,
                    variant: "destructive",
                });
            }else{
                return toast({
                    title: "Error",
                    description: "Something went wrong. Please try again later.",
                    variant: "destructive",
                })
            }
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 relative -top-8 mx-4"
            >
                <FormField
                    control={form.control}
                    name={"name"}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Location" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea placeholder="Bio" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    label={"Save"}
                    secondary
                    large
                    fullWidth
                    disabled={isSubmitting}
                />
            </form>
        </Form>
    );
};

export default EditForm;
