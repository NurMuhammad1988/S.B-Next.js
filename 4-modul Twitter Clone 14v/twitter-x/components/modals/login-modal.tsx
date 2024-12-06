import React, { useCallback, useState } from "react";
import Modal from "../ui/modal";
import useLoginModal from "@/hooks/useLoginModal";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/validation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Button from "../ui/button";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { signIn } from "next-auth/react";
//sign in buttoniga bosilganda ishlaydigan component bu componenetda register modal tsxda bo'lgandey serverda data create bo'lishi va kelishi haqida hamma nasa bor yani yangi account yaratish uchun kerak bo'lgan component

/////////////////////user login qilib loyihaga kiretganda shu kodlar ishlaydi va pastdagi jsxdagi button va inputlar ishlaydi

export default function LoginModal() {
    const [error, setError] = useState("");

    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const onToggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            password: "",
            email: "",
        },
    });

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        try {
            const { data } = await axios.post("/api/auth/login", values);// yani user login  qiletganda (sigin buttoni bilan ishlayotganda) axios api auth login papka ichidagi route.ts ga so'rov jo'natib parol va email to'g'ribo'lsa shu onsubmit ishga tushib pastdagi jsxda javob qaytaradi

            if (data.success) {//data success yani axiosni post metodi success bo'lsa signIn funskiyasi sabab valueslar yani email parollar olinib login modal close bo'lib user loyihaga kiradi signIn nextauthdan keladi  api auth login papka ichidagi route.ts dagi if elselarni javobiga qarab userni kiritadi yoki kiritmaydi kiritmasa catchdagi hato chiqadi agar nextauthda yoki  serverda hato bo'lsa pastdagi error chiqadi yokida faqat userni hatosi bo'lsa api auth login papka ichidagi route.ts dagi errorlar chiqadi
                signIn("credentials", values); //signIn functioni next-authdan keladi //bu "credentials" auth-options.tsdan kelepti auth-options.tsda CredentialsProvider nomli nextauthni provideri bor bu provider userni githubsiz googlesiz qo'lda ro'yhatdan o'tishi uchun kerak bo'ladigan function "credentials" esa keyi signInda nima ishlatilishi uchun key shu keyga qarab signIn kerakli providerni ishlatadi va user qo'lda kiritadigan email pasword   agar bor bo'lsa  hato qaytaradi yokida userni ro'yhatdan o'tkazadi yani bu signIn "credentials" bilan user kiritayotgan malumotlar solishtirilayapti

                loginModal.onClose();
            }
        } catch (error: any) {
            if (error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError("Something went wrong. Please try again later.");
            }
        }
    }

    const { isSubmitting } = form.formState;

    const bodyContent = (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 px-12"
            >
                {error && (
                    // agar error ishlasa chiqadi
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <FormField
                    control={form.control}
                    name="email"
                    // username hato yozilsa hato chiqishi tsdan
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    // password hato yozilsa hato chiqishi tsdan
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Password"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    label={"Login"}
                    type="submit"
                    secondary
                    fullWidth
                    large
                    disabled={isSubmitting}
                />
            </form>
        </Form>
    );

    const footer = (
        <div className="text-neutral-400 text-center mb-4">
            <p>
                First time using X?
                <span
                    className="text-white cursor-pointer hover:underline"
                    onClick={onToggle}
                >
                    {" "}
                    Create an accountt
                </span>
            </p>
        </div>
    );

    return (
        <Modal
            isOpen={loginModal.isOpen}
            onClose={loginModal.onClose}
            body={bodyContent}
            footer={footer}
        />
    );
}
