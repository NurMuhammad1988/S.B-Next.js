"use client";
import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "../ui/modal";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

////////////////////////////////////////////////
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

    const onToggle = useCallback(() => {//yani Sign in texti onclick bo'lganda ishlaydi yani qolda yozilgan hook useRegisterModaldan oncloseni chaqiradi onclose esa isopenni false qiladi yani modalni yopadi va onopen ishga tushib isopenni true qiladi va login sahifaga otvoradi yani qaramlikda ikkala qolda yozilh=gan hooklar yani shu ikkala hooklar ishlaganda bu callbach function ishga tushadi
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent =
        step === 1 ? (
            // step 1 ga teng bo'lsa? ha step o'zgaruvchi aslidaham birga teng va step 1 ga teng bo'lsa RegisterStep1 ni chiqar agar teng bo'lmasa RegisterStep2 ni chiqar
            <RegisterStep1 setData={setData} setStep={setStep} />
        ) : (
            // setStepda 1 bor shu sabab step  1 ga tengmi yo'qmi bilishni boshlaganda bu setStep sabab biladiki 1 ga teng chunki setstepda 1 bor step esa bo'sh o'zgaruvchi setStep esa endi undifined emas qiymati yani boshlangich qiymati 1 ga teng funksiya if else stepdan yani endi bo'sh bo'lmagan ichida setStep nomli qiymati 1 ga teng funskiayni ichida 1 bormi deb solishtirayotganda setStepdan 1 ni topadi va RegisterStep1 funksiyasini yani componentnini ishlatadi agar birni topolmasa RegisterStep2 ga o'tkazadi va stepdagi if else ishlashi uchun shu failda chaqirilgan modal comonentga berib qo'yilishi kerak kas holda modal stepni nimaligini bilmaydi fa bu if else ishlamaydi bu step pastdagi modalga chaqirilgan modal.tsxda esa stepni nima ekanligi typiga aytib qo'yilgan bu ts loyiha
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
            body={bodyContent}
            footer={footer}
            isOpen={registerModal.isOpen} //RegisterModal o'zgaruvchida chaqirilgan useRegisterModal nomli qo'lda yozilgan hookni statelari huddi usestatega o'hshaydi yani modal.tsxdagi isOpenga boolean typi berilgan va useRegisterModaldagi isOpenga esa false berilgan yani boshida modal false bo'lib turadi onclose esa modal.tsxda void function qilib berilgan useRegisterModalda esa is openni false qilishi aytilgan state shunda modalni isopen hodisasi ishlaganda useRegisterModaldagi onopen statesi sabab true bo'ladi yani ochiladi va modalni onclose hodisasi ishlaganda useRegisterModalni onclose statesi ishlab isopenni false qiladi auth/index.tsx da button ishlaganda true bo'ladi bu joyda yani buttonda modal ochilganda modalni ichida isOpen boshlang'ich qiymatiga qaytadi yani o'chadi bu uchun x rasmiga va windovga funksiya yoziladi BULARNI BARI auth/index.tsx da YOZILGAN CALLCACK FUNKSYA SABAB ISHLAYDI
            onClose={registerModal.onClose} //RegisterModal o'zgaruvchida chaqirilgan useRegisterModal nomli qo'lda yozilgan hookni statelari huddi usestatega o'hshaydi va modal ishlatib bo'lingandan keyin modalni yopadi yani false qiladi yani useRegisterModalda onclose false qilingan va boolean qiymatiga ega bu funksiya esa modal.tsxda react lucide reactdan keladigan x rasmiga berib qo'yilgan shunday chalkashib borib kelib ishlayapti
            step={step} // boshlang'ich qiyamti 1 state //bu va modalni ichidagi boshqa narsalar dynamic faqat qanday typga ega ekanligi modal.tsxda yozib qo'yilgan bo'lmasa modal ishlaganda ishlamas edi
            totalSteps={2} //bu va modalni ichidagi boshqa narsalar dynamic faqat qanday typga ega ekanligi modal.tsxda yozib qo'yilgan bo'lmasa modal ishlaganda ishlamas edi
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

    //useForm shakllarni osonlik bilan boshqarish uchun maxsus hook. U ixtiyoriy argument sifatida bitta ob'ektni oladi . Quyidagi misolda uning barcha xossalari standart qiymatlari bilan birga ko'rsatilgan. useForm formalarni boshqarish uchun ishlatiladi . U <form> elementini boshqarish uchun kerakli xususiyatlar va usullarni qaytaradi.
    const form = useForm<z.infer<typeof registerStep1Schema>>({
        //bu holatda useform ishlatidag object bu zoddadn keladigan infer typi esa registerStep1Schema bu registerStep1Schemavalidation.tsda yozilgan user account create qilayotganda inputlarga beriladigan qiymatlarni masalan login parol email nechta hariflardan yoki qanday typlardan bo'lishi kerakligini belgilab bergan zod object
        // Zod infer nima?
        //Zod iloji boricha ishlab chiquvchilar uchun qulay bo'lishi uchun yaratilgan. Maqsad - takroriy turdagi deklaratsiyalarni yo'q qilish. Zod yordamida siz bir marta validator e'lon qilasiz va Zod avtomatik ravishda statik TypeScript turini aniqlaydi . Murakkab ma'lumotlar tuzilmalariga oddiyroq turlarni tuzish oson.

        resolver: zodResolver(registerStep1Schema), //zodResolver bu functsiya react hook formdan keladi vazifasi registerStep1Schemadagi malumotlarga default qiymat berish yani bu holatda default qiymat bo'sh yani user endi bosh inputga yozaoladi lekin hohlansa userga quyidagiday qilib padskazka bersaham bo'ladi
        // email: "emailingni yoz",
        // name: "ismingni yoz",
        defaultValues: {
            email: "",
            name: "",
        },
    });

    async function onSubmit(values: z.infer<typeof registerStep1Schema>) {
        //yani formga umumiy SUBMIT BO'ganda bu onsubmit funskiya ishlab typida registerStep1Schemadan datalarni olib try catch bilam axios ishlatililib user account create qilishi funksiyalari ishga tushadi yani serverdan keladi ketadi update bo'ladi
        try {
            const { data } = await axios.post(
                //bu holatda data axiosdan keladi ts bo'lgani uchun yani axiosda axiosni typlari T yani genrik qib berib qo'yilgan loyiha tsda qilinayotgani uchun axiosniham metodlariga typi berilishi kerak typlari esa T da any qilib berib qo'yilgan shu sabab ts loyihada hatosiz ishlamoqda
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

    const { isSubmitting } = form.formState; //isSubmitting react hook formdan keladi boolean qiymat qaytaradi ichdagi formState esa  isLoading: boolean;disabled: boolean; va yana ko'plab qiymatlarni ts bilanq aytaradi bular RegisterStep1 funksiyani ichida yozilepti yani RegisterStep1 funskiya ishlaganda bu react hook formni typlariham ishlaydi bu typlar react hook formda reactda root papkada ts bilan yozib qo'yilgan

    return (
        <Form {...form}>
            {/* Form bu component components ui ichidan kelepti raect form hookni bilan kelgan component {...form esa yuqoridagi registerStep1Schema funksiyasini ona nomi yani registerStep1Schema funksiyani copya qilib shu  Form componentdaham ishlatish uchun yani obshi ishlatish uchun butunlay copy qilindi>>>JavaScript-dagi uchta nuqta ... tarqalish sintaksisi sifatida tanilgan va u odatda JavaScript obyektlarining sayoz nusxalarini yaratish uchun ishlatiladi . Buni iteratsiyani qabul qilish va uni alohida elementlarga kengaytirish orqali amalga oshiradi. Tarqalgan sintaksis odatda JavaScript obyektlarining sayoz nusxalarini yaratish uchun ishlatiladi.*/}
            <form
                onSubmit={form.handleSubmit(onSubmit)} //handleSubmitham react form hookdan keladi yani boshida yozilgasn onSubmit= esa reactni o'zini funksiyasi yani formni handlesubmit bilan onSubmitni ishlatadi
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
                                <Input placeholder="Nameeee" {...field} />
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
                                <Input placeholder="Emaillll" {...field} />
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
                    disabled={isSubmitting} //bu holatda disabletga boolean typi berilgan shui sabab raect hook formdan keletgan isSubmitingni qabul qilaoladi isSubmitingdaham boolean qiymati berilgan buni sababi button yoki disablet bo'ladi yoki bo'meydi
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
                signIn("credentials", {
                    email: data.email,
                    password: values.password,
                });

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
