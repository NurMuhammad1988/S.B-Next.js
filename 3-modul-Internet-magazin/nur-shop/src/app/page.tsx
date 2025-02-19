import Cta from "@/copmponets/cta";
import Hero from "@/copmponets/hero";
import Product from "@/copmponets/product";
import Statistics from "@/copmponets/statistics";
import { ProductType } from "@/interface";

//app papkani ichidagi alohida fail bo'lib turadig  an page.tsx  bosh sahifa hissoblanadi
// bu asosiy sahifa

// 36, 37, 38, 39 chi darslarga umuman tushuniulmadi va coment yozilmadi shularniqaytadan ko'rib tushunganingni commentga yoz

export default async function Home() {
    const res = await fetch("https://fakestoreapi.com/products");
    const products: ProductType[] = await res.json(); //serverdan datalarni fetch metodi bilan chaqirildi res o'zgaruvchida fetch bilan chaqirilgan datalarga typlari berilib json formatga o'girib olindi

    // console.log(products); //serverdan keladigan datalarni ko'rish uchun yozildi bu log browserda ishlamaydi chunki bu Home sahifasi SSR da yozilgani uchun server kodlar hissoblanadi shu sabab bu log faqat terminalda ko'rinadi

    return (
        <main className="min-h-screen max-w-7xl mx-auto px-8 xl:px-0 ">
            <Hero />
            <section className="flex  flex-col space-y-12">
                <h1 className="text-5xl font-bold  text-center">UZ SHOP</h1>

                {/* tailwind cssda grid siystem bilan response qilish  tailwind cssda stylelar birinchi mobile uchun bo'ladi grid-cols-1 mobilda 1 ta card bo'lsin sm:da 2 ta lg:da 3 ta xl:da 4 ta xl:da katta xl ekranlar uchun orasi katatroq xl:gap-x-8 */}
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        // product kalit so'z yani parametr endi Product pagega props qilib jo'natilgan  product parametrda products o'zgaruvchi ichida serverdan kelgan hamma datalar bor bu datalarni   Product.tsx failida typi nima ekanligi aytilib distruptatsa qilib chaqirib ishlatish mumkun propsdan jo'natiladigan datalarg akey berilishi kerak tanib olish uchun shu sabab id beriladi idilar unical bo'lgani uchun
                        <Product key={product.id} product={product} />
                        //products nomli o'zgaruvchida  serverdan keletgan datalarni Product nomli sahifaha jo'natish
                    ))}
                </div>
            </section>

            <Cta />
            <Statistics />
        </main>
    );
}
