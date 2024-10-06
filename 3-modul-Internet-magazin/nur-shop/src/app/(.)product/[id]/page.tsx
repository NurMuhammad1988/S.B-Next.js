"use client";

import CustomImage from "@/copmponets/image";
import { ProductType } from "@/interface";
import { Dialog, DialogPanel } from "@headlessui/react"; //material uiga o'hshagan kutubhona
import { useParams, useRouter } from "next/navigation"; //joriy URL orqali keladigan marshutni dinamik parametrlarini o'qish imkonini beruvchi client side rendring component hooki
import { useEffect, useState } from "react";
// import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline"; //bu kutubhona reyting yuldizchalari bilan ishlash uchun npm i @heroicons/react
// import { StarIcon } from "@heroicons/react/24/solid";
import ReactStars from "react-stars"; //npm i react-stars va npm i --save-dev @types/react-stars bilan typiham chaqiriladi ts bilan ishlangani uchun typiham kerak ekan

const ProductDetailedPage = () => {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<ProductType>();
    const [isOpen, setIsOpen] = useState(true);

    const { id } = useParams(); //fetch bilan kelgan datalarni ichidagi idni oladi va har birini unical linkli qiladi useparams hech qanday parametr qabul qilmaydi idlar bilan qattiy ishlaydi Agar marshrutda dinamik parametrlar bo'lmasa, useParams bo'sh ob'ektni qaytaradi dynamic parametrlar serverda object uchun yozilishi kerak
    console.log(id);

    const router = useRouter();

    const handleClick = () => {
        // localStorage.setItem("carts", prod)
    }

    useEffect(() => {
        //// user saytga kirgandan ishlaydi
        async function getData() {
            setLoading(true); //default holati false edi lekin user asosiy sahifada chaqirilgan product.tsxni itemlariga yani mahsulotlarga click qilishdan oldin setloading ishlamay turadi qachonki user mahsulotga bosganda getData ishlaydi shunda birinchi setLoading true bo'ladi yani falseda truega o'zgaradi yani useeffect ishlaydi
            const res = await fetch(`https://fakestoreapi.com/products/${id}`);
            const product = await res.json();
            setProduct(product); //setProductga useeffectni ichidagi product yani seerverdan kelgan datalarni o'zida saqlaydigan product o'zgaruvchi qo'yildi usestatedagi productda esa product type bor shunda setProductda ProductType bor va parametrida serverdan kelgan productni o'zi bor
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
                setIsOpen(false); //onclose funksiya ishlaganda yani modal yopilganda setisopen false bo'ladi va orqaga asosiy sahifaga qaytaradi yani bu funksiya asosiy sahifadan turib mahsulotlarni ichiga kirmasdat detallarini ko'rish uchun yani
                router.back(); //next navigatondan kelgan userouterni back metodi bu metod parallel router qilish uchun kerak product sahifadagi productlarga bosilganda butunlay sahifa ichiga kirib ketmasdan productni idisga qrab madal oynada productni detallarini ko'rsatadi
            }}
            className="relative z-50"
        >
            <div className="fixed inset-0 bg-black/30 " aria-hidden="true" />

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 ">
                    <DialogPanel
                        // dialog panel onclose va router back uchun @headlessuida  moslashtirilgan component
                        className={"mx-auto max-w-3xl rounded bg-white p-10 "}
                    >
                        {loading ? (
                            // agar loading true bo'lsa yani loading sodir bo'lsa loadingda shu stylelar  chiqadi yani loadingni ko'rsatish
                            <div className="h-8 w-8 rounded-full border-2 border-dotted border-blue-600 animate-spin" />
                        ) : (
                            // agar loading false bo'lsa yani serverdam datalar muammosiz kelssa shu div ichidagi classlar ishlaydi yani serverdan keladigan datalarni styleleri birga ishlab userga product shu classdagi detallari bilan ko'rinadi
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

                                        <div className="flex items-center text-sm my-4">
                                            <p>{product?.rating.rate}</p>
                                            {product?.rating.rate && (
                                                // roductni ichida rating.va rate bor bo'lsa yani serverdan kelsa
                                                <div className="flex items-center ml-2 mr-6 ">
                                                    {/* starlar uchun  StarIcon va StarIconOutline ni  Array object bilan ishlatish buni react stars kutubhonasi bilan osonroq yo'l bilan qaytadan qilindi */}

                                                    {/* {Array.from(
                                                        {
                                                            length: Math.floor(
                                                                product.rating
                                                                    .rate
                                                            ),
                                                        },
                                                        (_, i) => (
                                                            <StarIcon
                                                                // bu kutubhona reyting yuldizchalari bilan ishlash uchun kutubhonadan kelgan yulduzcha rasimlarni reytingga moslab style berish masalan mahsulotni reytingi 5 bo'lsa beshshala yulduzchaxam sariq bo'ladi agar reyting 3.5 bo'lsa yulduzchalarni uch yarimtasi sariq bo'lib qolgani bo'sh yani oq bo'lib turadi
                                                                key={i}
                                                                className="h-4 w-4  text-yellow-500"
                                                            />
                                                        )
                                                    )}
                                                    {Array.from(
                                                        {
                                                            length:
                                                                5 -
                                                                Math.floor(
                                                                    product
                                                                        .rating
                                                                        .rate
                                                                ),
                                                        },
                                                        (_, i) => (
                                                            <StarIconOutline
                                                                key={i}
                                                                className="h-4 w-4 text-yellow-500"
                                                            />
                                                        )
                                                    )} */}

                                                    {/* starlar uchun  StarIcon va StarIconOutline ni  Array object bilan ishlatish buni react stars kutubhonasi bilan osonroq yo'l bilan qaytadan qilindi */}

                                                    <ReactStars
                                                        value={
                                                            product.rating.rate
                                                        }
                                                        edit={false}
                                                    />
                                                    {/* productlarni yulzuchadagi reytingiga qarab sariq styleberish aftamatik tarzda yuqoridagi uzun Array objecti bilan qilingan ishni bir qator bilan//////////// bu kutubhona reyting yuldizchalari bilan ishlash uchun kutubhonadan kelgan yulduzcha rasimlarni reytingga moslab style berish masalan mahsulotni reytingi 5 bo'lsa beshshala yulduzchaxam sariq bo'ladi agar reyting 3.5 bo'lsa yulduzchalarni uch yarimtasi sariq bo'lib qolgani bo'sh yani oq bo'lib turadi  */}
                                                </div>
                                            )}

                                            <p className="text-blue-600 hover:underline cursor-pointer text-xs ">
                                                See all {product?.rating.count}{" "}
                                                reviews
                                            </p>
                                        </div>

                                        <p className="line-clamp-5 text-sm">
                                            {product?.description}
                                        </p>
                                    </div>

                                    <div className="space-y-3 text-sm">
                                        <button className="button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black" onClick={handleClick}>
                                            Add to bag
                                        </button>
                                        <button
                                            onClick={() =>
                                                window.location.reload()
                                            }
                                            className="button w-full bg-transparent border-blue-600 hover:bg-blue-600 hover:text-white hover:border-transparent"
                                        >
                                            View full details
                                        </button>
                                        {/* app papkani ichida (.)product papka ichida [id] papka bor [id]papkani ichida page.tsx bor >>>(.)<<bu degani next js App padhodda ichidagi idga kirishdan oldin hodisa ko'rsatadi huddi vanila jsdagiday masalan (.)product/[id]/page.tsx ichida chaqirilgan idni ko'rsatishdan oldi hodisa iladi yani idni ko'rsatishdan oldin nimadur hodisa ilish shart shunda (.)<<bu to'g'ri ishlaydi bu usulda routerlash usuli maqsad user biror bir sahifaga kirish uchun click qilganda hodisa yani modal ko'rsatish bu holatda (.)product papkani ichidagi [id] papkasi dynamic id degani next js shu [id]dan bu [id] papkani ichidagi page.tsxda serverdan keladigan idlar dynamic qilinishini biladi va next jsni dynamic routerlash funksiyasi ishga tushadi yani dynamic routerlash uchun katta funkisiya yozish shart emas next jsni o'zi qilib beradi  va (.)<<bu esa shu dynamic keladigan idlarga kirishdan oldin modal oyna chiqaradi yani user serverdan kelgan idsi bor elementga bosadi router bo'yicha aslida bosilgan elementga kirish kerakedi yani sahifa marshuti o'zgarishi kerak edi lekin bu holatda sahifa butunlay o'zgarmaydi user click qilganda click qilgan sahifasiga kirishdan oldin boshqa modal ko'rsatadi va agar shu modal chiqgandan keyin modaldan boshqa har qanday joyga bosilganda yana asosiy turgan sahifasiga qaytaradi yoki bu holatda View full details buttoniga bosilsa product/[id]/page.tsxga yani hodisali marshutlashga aloqasi yo;q realni shu idga aloqador shu idni detallari bor sahifaga bu holatda product/[id]/page.tsx ichidagi ProductDetailedPage sahifasiga yani dynamic kelgan idlar uchun yaratilgan sahifaga olib kiradi  hullas next js internet magazinlar uchun qulay qilib App padhodda udar routing qilgan dacumentatsa>>>https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes  */}
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
