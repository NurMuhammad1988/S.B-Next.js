"use client";

import { ProductType } from "@/interface";
// import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import CustomImage from "./image";

const Product: FC<{ product: ProductType }> = ({ product }) => {
    // console.log(product); //bu product app papkani ichidagi asosiy sahifa page.tsxda ssrda yozilib serverdan fetch metodi bilan chaqirilgan datalarga ega

    return (
        <Link href={`/product/${product.id}`} className=" h-96 flex flex-col  p-6 rounded-lg group hover:scale-105 transition-transform ease-out duration-200 border">
            {/* linkda productni idsi bor click bo'lganda shu idga kiradi */}

            <div className="relative max-h-80 flex-1">
                <CustomImage product={product} fill/>
                {/* customimage image tsxda yozilgan next image optimizatsa qilingan   */}
                {/* next jsda imagega berilishi shart src va alt CustomImage componentda berilgan */}
                {/* <Image src={product.image} alt={product.title} fill/> */}
            </div>



            <h3 className="tracking-widest  text-indigo-500 text-xs font-medium title-font">
                {product.category}
            </h3>

            <div className="font-semibold  flex items-center justify-between mt-4 mb-1 ">
                {/* truncate classi tailwinda serverdan keletgan titleni juda uzun bo'lgani uchun faqat 1 qatoroni olib qolganiga 3ta nuqta qo'yadigan class */}
                <p className="w-44 truncate">{product.title}</p>
                <p>${product.price}</p>
            </div>

            {/* line-clamp-2 classi tailwinda serverdan keletgan description juda uzun bo'lgani uchun descriptionni faqat 2 qatoroni olib qolganiga 3ta nuqta qo'yadigan class */}
            <p className="leading-relaxed text-base line-clamp-2">
                {product.description}
            </p>
        </Link>
    );
};

export default Product;
