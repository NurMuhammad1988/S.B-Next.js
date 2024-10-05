"use client";

import CustomImage from "@/copmponets/image";
import { ProductType } from "@/interface";
import { Dialog, DialogPanel } from "@headlessui/react"; //material uiga o'hshagan kutubhona
import { useParams, useRouter } from "next/navigation"; //joriy URL orqali keladigan marshutni dinamik parametrlarini o'qish imkonini beruvchi client side rendring component hooki
import { useEffect, useState } from "react";

const ProductDetailedPage = () => {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<ProductType>();
    const [isOpen, setIsOpen] = useState(true);

    const { id } = useParams(); //fetch bilan kelgan datalarni ichidagi idni oladi va har birini unical linkli qiladi useparams hech qanday parametr qabul qilmaydi idlar bilan qattiy ishlaydi Agar marshrutda dinamik parametrlar bo'lmasa, useParams bo'sh ob'ektni qaytaradi dynamic parametrlar serverda object uchun yozilishi kerak
    console.log(id);

    const router = useRouter();

    useEffect(() => {
        //user saytga kirgandan ishlaydi
        async function getData() {
            setLoading(true); //default holati false edi lekin user asosiy sahifada chaqirilgan product.tsxni itemlariga yani mahsulotlarga click qilishdan oldin setloading ishlamay turadi qachonki user mahsulotga bosganda getData ishlaydi shunda birinchi setLoading true bo'ladi yani falseda truega o'zgaradi yani useeffect ishlaydi

            const res = await fetch(`https://fakestoreapi.com/products/${id}`);
            const product = await res.json();
            setProduct(product); //setProductga useeffectni ichidagi product yani seerverdan kelgan datalarni o'zida saqlaydigan product o'zgaruvchi qo'yildi usestatedagi productda esa roducttype bor shunda setProductda ProductType bor va parametrida serverdan kelgan productni o'zi bor
            setLoading(false); //user bosilgan productni ichkarisiga kirmasa false bo'ladi yani parallel sahifa yopiladi
        }

        getData();
        // console.log(getData());
    }, [id]);

    return (
        <Dialog
            open={isOpen}
            onClose={() => {
                //  OnClose JSda funksiya hodisasi madal oyna yopilganda sodir bo'ladi setIsOpen bilan madal bo'lib chqadigan productni yopadi yopilganda setIsOpenham false bo'ladi va router bach ishga tuhsadi yani asosiy sahifaha otvoradi
                setIsOpen(false);
                router.back(); //next navigatondan kelgan userouterni back metodi bu metod parallel router qilish uchun kerak product sahifadagi productlarga bosilganda butunlay sahifa ichiga kirib ketmasdan productni idisga qrab madal oynada productni detallarini ko'rsatadi
            }}
            className="relative z-50"
        >
            <div className="fixed inset-0 bg-black/30 " aria-hidden="true" />

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 ">
                    <DialogPanel
                        className={"mx-auto max-w-3xl rounded bg-white p-10 "}
                    >
                        {loading ? (
                            <div className="h-8 w-8 rounded-full border-2 border-dotted border-blue-600 animate-spin" />
                        ) : (
                            <div className="flex gap-x-8 h-96 ">
                                {product?.image && (
                                    <div className="relative w-72 h-full  hidden md:inline">
                                        <CustomImage product={product} fill />
                                    </div>
                                )}
                                <div className="flex-1 flex flex-col">
                                    <div className="flex-1">

                                        <h4 className="font-semibold">
                                            {product?.title}
                                        </h4>

                                        <p className="font-medium text-sm">
                                            {product?.price}
                                        </p>

                                    </div>
                                </div>
                            </div>
                        )}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default ProductDetailedPage;
