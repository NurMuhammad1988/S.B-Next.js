"use client";
import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "../ui/modal";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

////////////////////////////////////////////////???????????????????????????????
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerStep1Schema, registerStep2Schema } from "@/lib/validation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../ui/form";

import { Input } from "../ui/input";
import Button from "../ui/button";
import useLoginModal from "@/hooks/useLoginModal";
import axios from "axios";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { signIn } from "next-auth/react";


export default function RegisterModal() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({ name: "", email: "" });

    const registerModal = useRegisterModal(); //qo'lda yozilgan shaxsiy hook chaqirildi
    const loginModal = useLoginModal();

    const onToggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent =
        step === 1 ? (
            <RegisterStep1 setData={setData} setStep={setStep} />
        ) : (
            <RegisterStep2 data={data} />
        ); //bu bodycontent dynamic modalda dynamic tarzda reactelementlarni qabul qiladi va bu holatda modal chaqirilganda bodcontentni qabul qiladi va bu modalni asosiy qismi hissoblanadi va bu asosiy qisimga usestate bilan step nomli bo'sh lekin default qiymati 1 ga teng bo'lgan o'zgaruvchi yaratib uni if elsga qo'yildi yani agar step 1 ga teng bo'lsa (yani bu holatda aniq birga teng) RegisterStep1 funksiyasini ishlat yokida RegisterStep2 funksiyasini ishlat //RegisterStep1 va RegisterStep2 funksiyalari return qiladi shu register-modal.tsx failida yozilgan lekin alohida component faqat bu register-modal.tsx fail ichida ekanligi shu failga aloqador bo'lgani uchun shu joyda va shu joydan export bo'ladi

    const footer = (
        <div className="text-neutral-400  text-center mb-4 ">
            <p>
                Already have anaccount?{" "}
                <span
                    className="text-white cursor-pointer hover:underline"
                    onClick={onToggle}
                >
                    Sign in{" "}
                </span>
            </p>
        </div>
    );

    return (
        <Modal
            // title="Create an account"
            body={bodyContent}
            footer={footer}
            isOpen={registerModal.isOpen} //RegisterModal o'zgaruvchida chaqirilgan useRegisterModal nomli qo'lda yozilgan hookni statelari huddi usestatega o'hshaydi yani modal.tsxdagi isOpenga boolean typi berilgan va useRegisterModaldagi isOpenga esa false berilgan yani boshod modal false bo'lib turadi onclose esa modal.tsxda void function qilib berilgan useRegisterModalda esa is openni false qilishi aytilgan state shunda modalni isopen hodisasi ishlaganda useRegisterModaldagi onopen statesi sabab true bo'ladi yani ochiladi va modalni onclose hodisasi ishlaganda useRegisterModalni onclose statesi ishlab isopenni false qiladi
            onClose={registerModal.onClose} //RegisterModal o'zgaruvchida chaqirilgan useRegisterModal nomli qo'lda yozilgan hookni statelari huddi usestatega o'hshaydi
            step={step} // boshlang'ich qiyamti 1 state
            totalSteps={2}
        />
    );
}

function RegisterStep1({
    setData,
    setStep,
}: {
    setData: Dispatch<SetStateAction<{ name: string; email: string }>>;
    setStep: Dispatch<SetStateAction<number>>;
}) {
    const [error, setError] = useState("");

    const form = useForm<z.infer<typeof registerStep1Schema>>({
        resolver: zodResolver(registerStep1Schema),
        defaultValues: {
            email: "",
            name: "",
        },
    });

    async function onSubmit(values: z.infer<typeof registerStep1Schema>) {
        try {
            const { data } = await axios.post(
                "/api/auth/register?step=1",
                values
            );
            if (data.success) {
                setData(values);
                setStep(2);
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

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 px-12"
            >
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <FormField
                    control={form.control}
                    name="name"
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
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    label={"Next"}
                    type="submit"
                    secondary
                    fullWidth
                    large
                    disabled={isSubmitting}
                />
            </form>
        </Form>
    );
}

function RegisterStep2({ data }: { data: { name: string; email: string } }) {
    const [error, setError] = useState(" ");

    const registerModal = useRegisterModal();

    const form = useForm<z.infer<typeof registerStep2Schema>>({
        resolver: zodResolver(registerStep2Schema),
        defaultValues: {
            password: "",
            username: "",
        },
    });

    async function onSubmit(values: z.infer<typeof registerStep2Schema>) {
        try {
            const { data: response } = await axios.post(
                "/api/auth/register?step=2",
                { ...data, ...values }
            );

            if (response.success) {

                signIn("credentials" , {
                    email: data.email,
                    password: values.password
                })

                registerModal.onClose();
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

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 px-12"
            >
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <FormField
                    control={form.control}
                    name="username"
                    // username hato yozilsa hato chiqishi tsdan
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
                    label={"Register"}
                    type="submit"
                    secondary
                    fullWidth
                    large
                    disabled={isSubmitting}
                />
            </form>
        </Form>
    );
}
