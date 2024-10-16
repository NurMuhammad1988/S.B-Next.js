// CSR sahifa
"use client";

import CustomImage from "@/copmponets/image";
import { ProductType } from "@/interface";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactStars from "react-stars";

const ShoppingCard = () => {
    const [total, setTotal] = useState<number>(0);//reactdan keladigan usestatega typescript bilan ishlaganda typi albattayatilishi kerak
    //useState - bu komponent haqidagi ma'lumotlar yoki ma'lumotlarni o'z ichiga olish uchun ishlatiladigan o'rnatilgan React ob'ekti . Komponentning holati vaqt o'tishi bilan o'zgarishi mumkin; har doim o'zgarganda, komponent qayta ko'rsatiladi

    const [products, setProducts] = useState<ProductType[]>(
        JSON.parse(localStorage.getItem("carts") as string) || []//yokida pustoy masiv yani agar shopping cardda hech narsa bo'lmasa pustoy massiv turadi
    );

    console.log(products);

    const removeProduct = (id: number) => {
        const updatedCart = products.filter((product) => product.id !== id);//updatedCartni vazifasi my bag bo'limiga tushgan mahsulotlarni agar kerak bo'lmasa udalit qilish uchun yani bu holatda updatedCart funksiyasi filter metodi bilan agar productni yani serverdannkelgan idga ega peoductni idsi teng bo'lmasa idga yanu removeProduct buttoniga bosilganda id bo'lmasa udalit qiladi localstorgaedagi setitem bilan localstrogedan o'chadi yani faqat manitordanmas butunlay o'chadi serverdan keladigan idga qarab o'chiradi//// 
        localStorage.setItem("carts", JSON.stringify(updatedCart));
        setProducts(updatedCart);
    };

    const handleIncrement = (id: number) => {//idni nima ekanligini aytiush kerak typescript!!!
        const updatedCart = products.map((product) => {
            if (product.id === id) {//agar productni idsi teng bo'lsa + belgisi bor peoductdagi idga o'sha productni kopiya qilib sanog'iga quantity: npmli parametr ochib unga quantityni +bir qilamiz yani har bosilganda bitta qo'shib boradi va productni return qiladi va buni local storageda saqlaydi yani setItem qiladi json formatda va bu updatedcardni usestateda saqlaydi usestate esa har safar bunaqa o'zgaruvchi malumotlarsni saqlab har bir userga alohida ko'rsatadi
                return {
                    ...product,
                    quantity: product.quantity + 1,
                };
            }

            return product;
        });

        localStorage.setItem("carts", JSON.stringify(updatedCart));
        setProducts(updatedCart);
    };

    const handleDecment = (id: number) => {
        const existProduct = products.find((product) => product.id === id);//existProduct o'zgaruvchiga find metodi bilan agar productni idsi - buttondagi id bilan teng bo'lsa va bu id 1 ga teng bo'lsa yani ohiri bo'lsa if else bilan agar existProductda kelgan productsni idsi qattiy 1 ga teng bo'lsa removeProduct funksiyasni ishlatib existProductda kelgan idni udalit qil deyildi yani butunlay klocalstroagedan o'chib ketadi
        if (existProduct?.quantity === 1) {//yani agar 
            removeProduct(existProduct.id);
        } else {
            const updatedCart = products.map((product) => {
                if (product.id === id) {
                    return {
                        ...product,
                        quantity: product.quantity - 1,
                    };
                }

                return product;
            });

            localStorage.setItem("carts", JSON.stringify(updatedCart));
            setProducts(updatedCart);
        }
    };

    useEffect(() => {
        const total = products.reduce((acc, item) => {//total o'zgaruvchi bu holatda number chunki usestateda productsni typi number qilingan agar bu total o'zgaruvchini ichida numberga aloqasi yo'q metodlar ishlatilsa hato chiqadi  acc bu holatda oddiy parametr yani 0 va unga itemni yani productslarni prici ko'paytirildi itemni quantittysiga yani hamma itemlarni bhissoblab ohirgi narhni aytadi va har safar bu o'zgaruvchi malumotlarni useeffectdagi settotalda saqlaydi va har safar yangi malumotlarni beradi yani har safar updated bo'lganda
            return acc + item.price * item.quantity;
        }, 0);

        setTotal(total);
    }, [products]); //products update bo'lganda bu usestate ishga tushadi shu sabab useeffectni qaramligiga qo'yildi yani har safar update bo'lganda useeffect ishga tiushib yangi malumotni userga ko'rsatadi

    return (
        <>
            {products.length ? (//agar my bagda mahuslotlar bor bo'lsa s yani uzunligi bor bo;sa true bo'lsa shu ishlaydi yokida pastidagi sumkaning bo'sh degan textli classlar ishlaydi   
                <div className="h-full bg-gray-100 pt-20">
                    <h1 className="mb-10 text-center text-2xl font-bold">
                        Cart Items
                    </h1>
                    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                        <div className="rounded-lg md:w-2/3">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                                >
                                    <div className="relative w-52">
                                        <CustomImage product={product} fill />
                                    </div>
                                    <div className="sm:ml-4 sm:flex sm:w-full gap-x-4 sm:justify-between">
                                        <div className="mt-5 sm:mt-0">
                                            <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
                                                {product.title}
                                            </h2>
                                            <p className="mt-1 text-xs text-gray-700 line-clamp-2">
                                                {product.description}
                                            </p>

                                            <div className="flex items-center text-sm my-4">
                                                <p>{product?.rating.rate}</p>
                                                {product?.rating.rate && (
                                                    // roductni ichida rating.va rate bor bo'lsa yani serverdan kelsa
                                                    <div className="flex items-center ml-2 mr-6 ">
                                                        <ReactStars
                                                            value={
                                                                product.rating
                                                                    .rate
                                                            }
                                                            edit={false}
                                                        />
                                                        {/* productlarni yulduzuchadagi reytingiga qarab sariq styleberish aftamatik tarzda yuqoridagi uzun Array objecti bilan qilingan ishni bir qator bilan//////////// bu kutubhona reyting yuldizchalari bilan ishlash uchun kutubhonadan kelgan yulduzcha rasimlarni reytingga moslab style berish masalan mahsulotni reytingi 5 bo'lsa beshshala yulduzchaxam sariq bo'ladi agar reyting 3.5 bo'lsa yulduzchalarni uch yarimtasi sariq bo'lib qolgani bo'sh yani oq bo'lib turadi  */}
                                                    </div>
                                                )}

                                                <p className="text-blue-600 hover:underline cursor-pointer text-xs ">
                                                    See all{" "}
                                                    {product?.rating.count}{" "}
                                                    reviews
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                            <div className="flex items-center border-gray-100">
                                                <span
                                                    className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                                    onClick={() =>
                                                        handleDecment(
                                                            product.id
                                                        )
                                                    }
                                                >
                                                    -
                                                </span>
                                                <input
                                                    className="h-8 w-8 border bg-white text-center text-xs outline-none"
                                                    type="number"
                                                    value={product.quantity}
                                                    min="1"
                                                />
                                                <span
                                                    className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                                    onClick={() =>
                                                        handleIncrement(
                                                            product.id
                                                        )
                                                    }
                                                >
                                                    +
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <p className="text-sm">
                                                    {(
                                                        product.price *
                                                        product.quantity
                                                    ).toLocaleString(
                                                        // productni narhi productni sanog'iga ko'paytirildi shunda user bitta broductdan 10 ta tanlasa narhni 10 ga ko'paytiradi yani har birini hisooblaydi
                                                        "en-US",
                                                        {
                                                            style: "currency",
                                                            currency: "usd",
                                                        }
                                                    )}
                                                </p>
                                                {/* valyutalar default classlari>>>"en-US", {style: "currency", currency:"usd" */}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                                                    onClick={() =>
                                                        removeProduct(
                                                            product.id
                                                        )
                                                    }
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* <!-- Sub total --> */}
                        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                            <div className="mb-2 flex justify-between">
                                <p className="text-gray-700">Subtotal</p>
                                <p className="text-gray-700">
                                    {total.toLocaleString("en-US", {
                                        // endi totalda my bagdagi  hamma mahsulotlarni umumiy narhi bor
                                        currency: "usd",
                                        style: "currency",
                                    })}
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-700">QQS</p>
                                <p className="text-gray-700">
                                    {(10).toLocaleString("en-US", {
                                        //qqs yani soliqni shunchaki daoim shu summada bo'ladi deb yozib qo'yildi
                                        currency: "usd",
                                        style: "currency",
                                    })}
                                </p>
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-between">
                                <p className="text-lg font-bold">Jami</p>
                                <div className="">
                                    <p className="mb-1 text-lg font-bold">
                                        {(total + 10).toLocaleString("en-US", {
                                            //totalga qqsniham qo'shib obshi summani chiqarib beradi
                                            currency: "usd",
                                            style: "currency",
                                        })}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        including VAT
                                    </p>
                                </div>
                            </div>
                            <button className="mt-6 w-full rounded-md bg-blue-500 py-4 font-medium  text-blue-50 hover:bg-blue-600">
                                Check out
                            </button>
                        </div>
                    </div>
                </div>
            ) : (//agar shopping cardda mahsulotlar bor bo'lsa yuqoridagi classlar ishga tushadi agar my baggda hech qanday mahsulot bo'lmasa shu commentdan keyingi classlar ishga tushadi
                <section className="bg-white  ">
                    <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
                        <div className="wf-ull lg:w-1/2">
                            <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
                                Sizning sumkangiz bo'sh hech narsa
                                tanlamagansiz
                            </p>
                            <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-red-600 md:text-3xl">
                                Sumkangiz bo'sh!!!
                            </h1>
                            <h2 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-2xl">
                                Siz hali hech qanday mahsulot tanlamadingiz!
                            </h2>
                            <p className="mt-4 text-gray-500 dark:text-gray-400">
                                Asosiy sahifaga o'tib mahsulotlarni
                                tanlaganings=zdan son'g haridni amalga oshirish
                                uchun qaytib kelganingizda hamma sevimli
                                mahsulotlaringiz shu joyda bo'ladi
                            </p>

                            <div className="flex items-center mt-6 gap-x-3">
                                <button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                                    <Link href={"/products"}>
                                        Hardilarni amalaga oshirish
                                    </Link>
                                </button>
                            </div>
                        </div>

                        <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
                            <img
                                className="w-full max-w-lg lg:mx-auto"
                                src="/images/components/illustration.svg"
                                alt=""
                            />
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default ShoppingCard;
