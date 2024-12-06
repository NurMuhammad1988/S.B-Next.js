"use client";
import Image from "next/image";
import Button from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useCallback } from "react";
import RegisterModal from "../modals/register-modal";
import useLoginModal from "@/hooks/useLoginModal";
import LoginModal from "../modals/login-modal";
import { signIn, useSession } from "next-auth/react";

export default function Auth() {
    const registerModal = useRegisterModal(); //useRegisterModal bu qo'lda yozilgan hook hooks papkani ichidagi useRegisterModal.ts faildan kelepti
    const loginModal = useLoginModal();

    const { data } = useSession();

    console.log(data);

    const onOpenRegisterModal = useCallback(() => {
        registerModal.onOpen(); //qo'lda yozilgan useRegisterModal hookini onOpen funksiyasi yani statesi chaqirilib ishlatildi qachonki registerModalda chaqirilgan qo'lda yozilgan hookdagi onOpen funksiyasi ishlaganda bu callback ishga tushadi va bu funksiya create account buttonida onclick qilib chaqirilgan shu sabab endi shu create account buttoniga onclik bo'lganda shu onOpenRegisterModal funksiyasi ishga tushadi va ichidagi onopenni ishlatadi chunki onopenda isopen true qilingan onopenda esa isopenni true qilish bor yani onopenda true qiymatiga ega isopen state bor onopen shuni ishlatib beradi yani modalni ishlatadi yani click bo'lganda ishlatadi
    }, [registerModal]);

    const onOpenLoginModal = useCallback(() => {
        loginModal.onOpen();
    }, [loginModal]);

    return (
        <>
            <RegisterModal />
            {/*  RegisterModalni qayerga qo'yishni farqi yo'q asosiysi  return ichiga qo'yilsa bo'ldi  RegisterModal bu component va modals papkani ichidagi register-modal.tsx faildan keletp bu  RegisterModalda user account create qilishi yoki appga kirishi uchun hamma datalar yozilgan yani shu return ichida ishlashi kerak */}

            <LoginModal />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-5 md:p-0 items-center h-screen">
                {/* grid systemdaham responseda birinchi mobile hissoblanadi yani bu holatda mobileda grid-cols-1 md va md dan yuqorida grid-cols-2 bo'ladi yani default bo'lsa yani md xllar yozilmasa mobilni hissoblanadi */}
                <Image
                    src={"/images/x.svg"}
                    // /images/x.svg deyilganda next js public papkani ichidagi images papkaga boradi
                    alt="X"
                    width={450}
                    height={450}
                    className="justify-self-center hidden md:block"
                    // tailwidda response qilishda birinchi mobil hissoblanadi masalan bu holatda img mobilda hidden bo'ladi md: da block bo'ladi yani ko'rinadi yani md:da va md: dan yuqorida block bo'ladi faqat yani bu md:block yozilgandan oldin doim mobile format turadi shunda hidden mobile HISSOBLANADI YANGI USER YO'QLIGIDA ASOSIY SAHIFADA  SHUNDAY ISHLAYDI
                />
                <div className="flex flex-col justify-center md:justify-between gap-6 h-full md:h-[70vh] ">
                    {/*mobileda justify-center md yanu 768pxdan yuqorida md:justify-between birinchi mobile rersponse yani mobileda height full md va mddan yuqorida 70vh */}
                    <div className="block md:hidden">
                        {/* mobileda ko'rinadi mdda hidden bo'ladi */}
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
                                onClick={() => signIn("google")}
                                label={
                                    //bu button component ui ichidagi button.tsxda qo'lda yozilgan component hissoblanadi bu button componentda fullWidth secondary qiymatlariham bor bu fullWidth secondary qiymatlarda boolen typi bilan classga aloqador hodislarham yozilgan
                                    <div className="flex gap-2 items-center justify-center">
                                        {/* bu Button dynamic ui o'zini joyida yozilganda typiga  label: ReactNode | string yozilgan bu degani reactda bor hamma elementni bu label o'z ichiga olishi mumkun shu sabab buttonni ichida div yozilepti reactda esa div jsx bo'lib render qilinadi jsx esa react element hissoblanadi shu sabab ts urushib bermadi */}
                                        <FcGoogle />
                                        {/* FcGoogle react iconsdan kelepti buham react elemet hissoblanadi */}
                                        Sign up with Google
                                    </div>
                                }
                                fullWidth
                                // fullWidth bo'ganda shu Button chaqirilgan ona divdagi razmer ichi nazarda tutiladi chunki bu Button bola element hissoblanadi ona elementdan tashqariga chiqib ketolmaydi  fullWidth qiymati esa button componentda fullWidth ? "w-full" : "w-fit", shu tarzda yani agar true bo'lsa yani chaqirilsa yani shu joyda Button elementi sifatida chaqirilsa va true bo'lsa "w-full" ishlasin yokida "w-fit" ishlasin deb aytib qo'yilgan shu sabab bu button chaqirilgan ona divni razmeridan chiqmasdan shu boolean holatiga amal qiladi yani fullWidth chaqirilsa yuqorodagi classlar ishlaydi

                                secondary
                            />

                            <Button
                                onClick={() => signIn("github")}//bu kod github bilan kirish uchun ruhsat beradi nextauthni funskiyasi "github" texti orqali ishlab agar browswerda cookiesida githubga kirilgan bo'lsa shu accountni jwt tokenlarini olish shu orqali parolsiz loyihaga togridan  togri kirib ketadi googlenikiham huddi shunday ishlaydi bu ishlashi uchun provider.tsda ishlatilishi kerak uanisessionprovider componentga childrenlar o'ralishi kerak
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
                                {/* bu div chiziqcha hosil qiladi */}
                                <p className="mx-4">or</p>
                                {/* chziqchalar orasida or so'zi turipti */}
                                <div className="h-px bg-gray-700 w-1/2" />
                                {/* bu div chiziqcha hosil qiladi */}
                            </div>
                            <Button
                                label={"Create account"}
                                // bu buttonni labeliga reactnodeda bor hamma elelemtni berishimiz mumkun bu holatda esa string berildi holos
                                fullWidth
                                // bu buttonda bu buttoni secondary qiymati yo'q shu sabab buttonda yozilgan secondaryni false qiymati ishlaydi yani>>> secondary ? "bg-white text-black" : "bg-sky-500 text-white",>>>>>shu class ishlaydi "bg-sky-500 text-white" chunki secondary chaqirilmadi
                                onClick={onOpenRegisterModal}
                                // buttonga typida onclick qiymatiham void qilib berilgan yani bo'sh aynan qandaydur funskiyaga qaram emas har qanday funksiyani qabul qiladi ts urushib bermeydi
                            />
                            {/* onOpenRegisterModal yani Create account buttoniga click bo'lganda shu onOpenRegisterModal callback functionlik o'zgaruvchi va ichidagi callback ishga tushadi bu calback yani faqat shu buttonga click bo'lganda faqat shu callbach functionlik o'zgaruvchini render qiladi boshqa hech qaysi funksiyani render qilmaydi  */}

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
                        <Button
                            label={"Sign in"}
                            fullWidth
                            // fullwidth bu holatda ona divga yano 60vh razmerga osiladi
                            outline
                            // agar outline brilmasa bu button classlarni outline qiymatidan yuqorida yozilgan default qiymatlarni o'zlashtiradi masalan yuqoridagi buttonlarga o'hshab oladi
                            onClick={onOpenLoginModal}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
