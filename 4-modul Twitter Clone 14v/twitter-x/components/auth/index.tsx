import Image from "next/image";
import Button from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

export default function Auth() {
    return (
        <>
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
                            <Button label={"Create account"} fullWidth />

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
                        <Button label={"Sign in"} fullWidth outline />
                    </div>
                </div>
            </div>
        </>
    );
}
