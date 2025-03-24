"use client";

import CustomImage from "@/copmponets/image";
import { ProductType } from "@/interface";
import { Dialog, DialogPanel } from "@headlessui/react"; //material uiga o'hshagan kutubhona
import { useParams, useRouter } from "next/navigation"; //joriy URL orqali keladigan marshutni dinamik parametrlarini o'qish imkonini beruvchi client side rendring component hooki
import { useEffect, useState } from "react";
// import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline"; //bu kutubhona reyting yuldizchalari bilan ishlash uchun npm i @heroicons/react
// import { StarIcon } from "@heroicons/react/24/solid";//starslar Array bilan qilinganda ishlatilgan edi agar Array bilan qilingan starslar yoqilsa bu importham yoqilishi kerak
import ReactStars from "react-stars"; //npm i react-stars va npm i --save-dev @types/react-stars bilan typiham chaqiriladi ts bilan ishlangani uchun typiham kerak ekan
import { toast } from "react-toastify";

const ProductDetailedPage = () => {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<ProductType>();
    const [isOpen, setIsOpen] = useState(true);

    const { id } = useParams(); //fetch bilan kelgan datalarni ichidagi idni oladi va har birini unical linkli qiladi useparams hech qanday parametr qabul qilmaydi idlar bilan qattiy ishlaydi Agar marshrutda dinamik parametrlar bo'lmasa, useParams bo'sh ob'ektni qaytaradi dynamic parametrlar serverda object uchun yozilishi kerak
    console.log(id);

    const router = useRouter();

    const handleClick = () => {
        // handleClick funksiyasiga products nomli o'zgaruvchi ochib typiga ProductTypeni berib qo'ydik
        const products: ProductType[] =
            //products o'zgaruvchi ichida JSON object bilan parse metodini ishlatib ichida ProductType bor massivni objectga aylantirvoldik va jsdan keladigan localstorageni ishlatib keyni "carts"deb nomladik (bu getItem keysiz ishkamaydi birinchi parametri keyi bo'ladi keyinchalik bu ProductTypeni set qiletganda shu key kerak bo'ladi) va buni yani getItem qilingan objectni typi string ekanligi aytildi yani string yoki bo'sh bo'ladi(add qilganda yoki massiv ichida objetc bo'ladi yoki bo'sh bo'ladi)
            JSON.parse(localStorage.getItem("carts") as string) || [];//serverdat keladigan stringni oblect qilib getItem bilan carts kalit so;zi bilan localsstoragega typi string qilib berilsa yoki bosh array yani agar localstorageda hech narsa bo'lmasa bo'sh massiv turadi bo'sh massiv default bo'lib turadi agar ichiga idlar qo'shilsa bo'shmas ichida objectlar bor massivga aylanadi
        console.log(products);
        const isExistProduct = products.find((c) => c.id === product?.id); //add qilingan idini localstorageda bor yo'qligini tekshirish yani isExistProduct nomli o'zgaruvchi yaratib unga agar productni ichidagi idlardan birirtasi shu isExistProduct ichida bor bo'lsa yani qattiy teng bo'lsa buni find metodi qiladi yani idlarga qarab solishtiradi agar bir hil idlar bor bo'lsa if else bilan shart qo;yiladi
        if (isExistProduct) {
            const updatedData = products.map((c) => {
                if (c.id === product?.id) {
                    return {
                        ...c,
                        quantity: c.quantity + 1,
                        // qunatity yani miqdori sanog'i user bagda bitta idli mahsulotni  bir donadan  ko'p tanlaganda hissoblaydi masalan bitta uzuk user shu uzukdan 10 dona sotib olmoqchi + qilib 10 tagacha tanlaydi qunatity shuni sanab localstorageda saqlash uchun kerak
                    };
                }
                return c;
            });
            localStorage.setItem("carts", JSON.stringify(updatedData));
            //agar isExistProduct o'zgaruvchidagi holat true bo'lsa yani findda topilgan id local storegda avvaldan bor bo'lsa yani find metodi ishlab productsni ichida bir hil qattiy teng bo'lgan idlar topilsa updateData nomli o'zgaruvchi ishga tushib ichida ProductTypedan kelgan datalar bor prosucts o'zgaruvchini map qilib va agar idlar qattiy teng bo'lsa productni copiya qilib yangidan parametr qo'shadi (c bu holatda shunchaki parametrni nomi ichida products bor) va har bosilganda + 1 qilib boradi  va c ni yani productni  return qiladi//yani user bagga bitta idga ega bir hil mahsulotdan bir nechta olmoqchi bo'lsa shuni hissoblab localstoragega qo'shib boradi
        } else {
            // yokida yani agar bittadan ko'p add qilinmasa data nomli o'zgaruvchi ochib productsni copiya qilib ProductTypeda kelgan asosiy productni yangidan copiya qilib 1 ni qaytaradi yani bittani o'zini yani endi add qilingan bitta idni o'zini qaytaradi yani user bitta mahsulotni endi tanlagan bo'lsa shuni if ichida tekshirib agar boshqa  bir hil id bo'lmasa shu yagona idni o'zini qaytaradi massiv ichida qaytaradi va localstoragega set qiladi nimani set qiladi yangi data o'zgaruvchini ichiga tushgan if da tekshirilib bunaqa id yoqligi aniqlanib faqat endi add qilingan yagona idga ega string objectni setqilib data o'zgaruvchiga set qiladi
            const data = [...products, { ...product, quantity: 1 }];
            localStorage.setItem("carts", JSON.stringify(data));
        }
        toast("Product added to your bag!!!"); //react-toastify kutubhonasidan kelgan user mahsulotni tanlagandan keyin bagga add qilinganini aytib turadigan o'z stylelariga ega kutubhona bu layoutda yani sahblonda config qilingan bu joyga to'g'ridan to'gri chaqirib ishlatilgan layoutda navbar componentdan keyin to'g'ridan to'g'ri qo'yilgan qanday ishlashini tushunmadim????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????

        // bu funksiya user serverdan keladigan itemlarni my bag sahifasiga olishi uchun add to bag buttoniga bosganda itemni localstorageda saqlash uchun localstorgaega productni localstorgaeni setItem metodi bilan to'g'ridan to'g'ri yuborib bo'lmaydi chunki serverdan keladigan itemlar object shu sabab bu js objectni localstorage nima ekanligini tushunmaydi js objectni localstoragega js json object qilib jo'natish kerak shu sabab JS jSON OBJECTNI stringify metodi ishlatildi yani serverdan keladigan product deb nomlangan objectni string formatga o'girvoldik localstorgae uchun bu produk object massiv ichida bo'lishi kerak shunda localstorage bu productni nima ekanligini tushunadi va massiv ichida objectni to'liq ko'rsatadi

        //Massivni localStorage-da saqlash veb-brauzer xotirasida seanslar davomida saqlanadigan ma'lumotlar massivini saqlashni anglatadi. Bu foydalanuvchi sozlamalari yoki vaqtinchalik maʼlumotlar kabi maʼlumotlarni sahifani yangilagandan yoki brauzer qayta ochilgandan keyin ham foydalanish mumkin boʻlgan holda saqlash uchun foydalidir.

        //JavaScript localStorage - bu brauzerda kalit-qiymat juftlarini amal qilish muddatisiz saqlash imkonini beruvchi veb-xotira API. LocalStorage-da saqlangan ma'lumotlar sahifalarni qayta yuklash, brauzer seanslari va qayta ishga tushirishda saqlanib qoladi va bu ma'lumotlarni doimiy saqlash uchun foydali bo'ladi.userni browserini hotirasida saqlaydi browserni serverida emas yani massivni mahalliy hotirada saqlaydi

        // birinchi parametr key 2chisi string bo'lishi kerak shu sabab productni JSON bilan string qildikbirinchi parametr "carts" sabab set va get itemlar bir birini tanib oladi
        // localStorage.setItem("carts", JSON.stringify(product));

        // localStorage.setItem("carts",product)//bu holatda localstorage productni nima ekanligini tushunmaydi faqat massiv ichida object ichida object ko'rsatadi server timeout tugagandan keyin shu kodni yoqib localstorageni ko'r
    };

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
                                        <button
                                            className="button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black"
                                            onClick={handleClick}
                                        >
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
                                        {/* app papkani ichida (.)product papka ichida [id] papka bor [id]papkani ichida page.tsx bor >>>(.)<<bu degani next js App padhodda ichidagi idga kirishdan oldin hodisa ko'rsatadi huddi vanila jsdagiday masalan (.)product/[id]/page.tsx ichida chaqirilgan idni ko'rsatishdan oldi hodisa iladi yani idni ko'rsatishdan oldin nimadur hodisa ilish shart shunda (.)<<bu to'g'ri ishlaydi bu usulda routerlash usuli maqsad user biror bir sahifaga kirish uchun click qilganda hodisa yani modal ko'rsatish bu holatda (.)product papkani ichidagi [id] papkasi dynamic id degani next js shu [id]dan bu [id] papkani ichidagi page.tsxda serverdan keladigan idlar dynamic qilinishini biladi va next jsni dynamic routerlash funksiyasi ishga tushadi yani dynamic routerlash uchun katta funkisiya yozish shart emas next jsni o'zi qilib beradi  va (.)<<bu esa shu dynamic keladigan idlarga kirishdan oldin modal oyna chiqaradi yani user serverdan kelgan idsi bor elementga bosadi router bo'yicha aslida bosilgan elementga kirish kerak edi yani sahifa marshuti o'zgarishi kerak edi lekin bu holatda sahifa butunlay o'zgarmaydi user click qilganda click qilgan sahifasiga kirishdan oldin boshqa modal ko'rsatadi va agar shu modal chiqgandan keyin modaldan boshqa har qanday joyga bosilganda yana asosiy turgan sahifasiga qaytaradi yoki bu holatda View full details buttoniga bosilsa product/[id]/page.tsxga yani hodisali marshutlashga aloqasi yo'q realni shu idga aloqador shu idni detallari bor sahifaga bu holatda product/[id]/page.tsx ichidagi ProductDetailedPage sahifasiga yani dynamic kelgan idlar uchun yaratilgan sahifaga olib kiradi  hullas next js internet magazinlar uchun qulay qilib App padhodda udar routing qilgan dacumentatsa>>>https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes  */}
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

// ended