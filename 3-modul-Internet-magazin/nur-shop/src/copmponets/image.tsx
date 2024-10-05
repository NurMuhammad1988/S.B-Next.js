"use client";

import { ProductType } from "@/interface";//image srcda chaqiriladigan imageni qiymatlari uchun typlari chaqirildi
import { FC, useState } from "react";
import Image from "next/image";

interface Props {
    product: ProductType;//ProductType product textida chaqirildi bu product keyin parametr qilib beriladi ichida esa shu ProductType bo'ladi
    fill?: boolean;
}

const CustomImage: FC<Props> = ({ product, fill }) => {//CustomImagega function component ekanligi aytilishi kerak
    // agar sahifa yani bu funksiya ssr bo'lsa usestate ishlamaydi chunki serverga aloqador funksiya bo'ladi
    const [isLoading, setisLoading] = useState(true);

    return (

        // usestatega boshlang'ich qiymat true berilgan yani isloadingda true bor agar isloading true bo'lsa classnamedagi loading (imageni hira qiladigan) classlar ishlaydi agar yani loading holatida bo'lsa lekin loading bo'letganini yani serverdan kelish vaqtidagi loadingni isloading funksiya qayerdan biladi???  

        <Image
            src={product.image}//hamma image
            alt={product.title}//hamma objectlarni titeli
            fill
            className={`object-contain duration-700 ease-in-out group-hover: opacity-75 ${
                isLoading
                    ? "scale-110 blur-2xl grayscale "
                    : "scale-100 blur-0 grayscale-0"
            }`}
            onLoadingComplete={() => setisLoading(false)}//onLoadingComplete next jsni funksiyasiloading holati o'tgandan keyin isloadingni true hoatini false qiladi yani serverdan datalar kelgandan keyin loadingni o'chiradi
        />
    );
};

export default CustomImage;

// 31. Image optimization va fetch va asosiy sahifaga Product componenti qanday ishlayotganini tushunib comentga yoz