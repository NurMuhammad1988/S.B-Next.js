"use client"
import Image from "next/image";
import Button from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useCallback } from "react";
import RegisterModal from "../modals/register-modal";
import useLoginModal from "@/hooks/useLoginModal";
import LoginModal from "../modals/login-modal";

export default function Auth() {
    const registerModal = useRegisterModal();//useRegisterModal bu qo'lda yozilgan hook hooks papkani ichidagi useRegisterModal.ts faildan kelepti
    const loginModal = useLoginModal()

    const onOpenRegisterModal = useCallback(() => {
        registerModal.onOpen();//qo'lda yozilgan useRegisterModal hookini onOpen funksiyasi yani statesi chaqirilib ishlatildi qachonki registerModalda chaqirilgan qo'lda yozilgan hookdagi onOpen funksiyasi ishlaganda bu callback ishga tushadi va bu funksiya create account buttonida onclick qilib chaqirilgan shu sabab endi shu create account buttoniga onclik bo'lganda shu onOpenRegisterModal funksiyasi ishga tushadi va ichidagi on openni ishlatadi onopenda esa isopenni true qilish bor yani onopenda true qiymatiga ega isopen state bor onopen shuni ishlatib beradi yani modalni ishlatadi yani click bo'lganda ishlatadi
    }, [registerModal]);


    const onOpenLoginModal = useCallback(() => {
        loginModal.onOpen();
    }, [loginModal]);


    return (
        <>
            <RegisterModal />
            {/*  RegisterModalni qayerga qo'yishni farqi yo'q asosiysi  return ichiga qo'yilsa bo'lsi  RegisterModal bu component va modals papkani ichidagi register-modal.tsx faildan keletp bu  RegisterModalda */}

            <LoginModal/>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-5 md:p-0 items-center h-screen">
                {/* grid systemdaham responseda birinchi mobile hissoblanadi yani bu holatda mobileda grid-cols-1 md va mddan yuqorida grid-cols-2 bo'ladi*/}
                <Image
                    src={"/images/x.svg"}
                    alt="X"
                    width={450}
                    height={450}
                    className="justify-self-center hidden md:block"
                    // tailwidda response qilishda birinchi mobil hissoblanadi masalan bu holatda img mobilda hidden bo'ladi md: da block bo'ladi yani ko'rinadi yani md:da va md: dan yuqorida block bo'ladi
                />
                <div className="flex flex-col justify-center md:justify-between gap-6 h-full md:h-[70vh] ">
                    {/*mobileda justify-center md yanu 768pxdan yuqorida md:justify-between birinchi mobile rersponse yani mobileda height full md va mddan yuqorida 70vh */}
                    <div className="block md:hidden">
                        <Image
                            src={"/images/x.svg"}
                            alt="X"
                            width={50}
                            height={50}
                            className="justify-self-center  md:block"
                        />
                    </div>
                    <h1 className="text-2xl md:text-6xl font-bold ">
                        Happening now
                    </h1>
                    <div className=" w-full md:w-[60%]">
                        <h2 className="font-bold text-3xl mb-4">Join today.</h2>
                        <div className="flex flex-col space-y-2">
                            <Button
                                label={
                                    //bu button component ui ichidagi button.tsxda qo'lda yozilgan component hissoblanadi bu button componentda fullWidth secondary qiymatlariham bor bu fullWidth secondary qiymatlarda boolen typi bilan classga aloqador hodislarham yozilgan
                                    <div className="flex gap-2 items-center justify-center">
                                        <FcGoogle />
                                        {/* FcGoogle react iconsdan kelepti */}
                                        Sign up with Google
                                    </div>
                                }
                                fullWidth
                                secondary
                            />

                            <Button
                                label={
                                    <div className="flex gap-2 items-center justify-center">
                                        <AiFillGithub />
                                        Sign up with Github
                                    </div>
                                }
                                fullWidth
                                secondary
                            />

                            <div className="flex items-center justify-center  ">
                                <div className="h-px bg-gray-700 w-1/2" />
                                <p className="mx-4">or</p>
                                <div className="h-px bg-gray-700 w-1/2" />
                            </div>
                            <Button label={"Create account"} fullWidth onClick={onOpenRegisterModal} />
                            {/* onOpenRegisterModal yani Create account buttoniga click bo'lganda shu onOpenRegisterModal calbach functionlik o'zgaruvchi va ichidagi callback ishga tushadi bu calback yani faqat shu buttonga click bo'lganda faqat shu callbach functionlik o'zgaruvchini render qiladi boshqa hech qaysi funksiyani render qilmaydi  */}

                            <div className="text-[13px] text-gray-400">
                                By signing up, you agree to the
                                <span className="text-sky-500 cursor-pointer">
                                    {" "}
                                    Terms of Service
                                </span>{" "}
                                and
                                <span className="text-sky-500 cursor-pointer">
                                    {" "}
                                    Privacy Policy
                                </span>{" "}
                                including
                                <span className="text-sky-500 cursor-pointer">
                                    {" "}
                                    Cookie Use
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className=" w-full md:w-[60%]">
                        <h3 className="font-medium text-xl mb-4">
                            Already have an account?
                        </h3>
                        <Button label={"Sign in"} fullWidth outline onClick={onOpenLoginModal} />
                    </div>
                </div>
            </div>
        </>
    );
}
