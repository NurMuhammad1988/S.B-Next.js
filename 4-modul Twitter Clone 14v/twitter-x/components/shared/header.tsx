"use client";

import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";

interface Props {
    label: string;
    isBack?: boolean;
}



const Header = ({ label, isBack }: Props) => {
    const router = useRouter();

    const handleBack = () => {
        router.back();//next navigationdan keladi back metodi vazifasi routerlash yani router bo'lgan
    };

    return (
        <div className="border-b-[1px] border-neutral-800 w-full p-5">
            <div className="flex flex-row items-center gap-2">
                {/* isBack true bo'lsa */}
                {isBack && (//isBackga boolean typi berilganbu isback strelka rasim agar bu header component chaqirilgan joyda isback true qilib qo'yilsa bu rasm chiqadi agar umuman chaqirilmasa hech narsa chiqmeydi shu sabab shu && bilan qilandi agar ? : bilan qilinganda chaqirilmagan joyda isbackga false berish kerak bo'lardi bu esa kerakmas
                    <BiArrowBack
                        onClick={handleBack}
                        color={"white"}
                        size={20}
                        className={"cursor-pointer hover:opacity-70 transition"}
                    />
                )}
                <h1 className="text-white text-xl font-semibold ">{label}</h1>
                {/* bu label dynamic chaqirilgan joyida faqat string qabul qiladi boshqasi hato */}
            </div>
        </div>
    );
};

export default Header;
