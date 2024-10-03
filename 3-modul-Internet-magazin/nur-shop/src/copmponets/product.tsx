"use client";

import { ProductType } from "@/interface";
import { FC } from "react";

const Product: FC<{ product: ProductType }> = ({ product }) => {
    console.log(product); //bu product app papkani ichidagi asosiy sahifa page.tsxda ssrda yozilib serverdan fetch metodi bilan chaqirilgan datalarga ega

    return (
        <div className="bg-gray-100 p-6 rounded-lg">
            <img className="h-40 rounded w-full object-cover object-center mb-6" src="https://dummyimage.com/721x401" alt="content"/>
            <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
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
        </div>
    );
};

export default Product;
