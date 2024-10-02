// ///next  SSR routing
// ///next 13da yani app padhodda ikki hil componentlar bor server componentlar  va client componentlar

// ///server componentlar bular app papkani ichida keladigan layout, page componentlar bu componentlar appni ichida kelganda next js buni server componentga asoslangan loyiha deb hissoblaydi va reactni hooklari ishlatilganda hato chiqaradi chunki next o'zini server componentlaridan boshqasini ishlatilishiga ruhsat bermaydi chunki bu next 13 yani app routerga asoslangan ssr componentda mahsus seo va taypescript uchun mo'ljallangan funksyalar bor

// ///SSR da yani server side rendringda hooklar ishlatilmaydi faqat next serverga aloqador funksiyalar ishlatiladi

// import type { Metadata } from "next";
// // import localFont from "next/font/local";//bu joyda goog;edanham font googlelarni olib kelib ishlatish mumkun bu fontlar yani shriftlarham SSR dan o'tib keladi yani server side rendring bo'ladi user sahifani ochmasdan serverdan kelib turadi
// import "./globals.css"; // bu gloabal cssda yozilgan stylelar butun loyiha bo'ylab ishlaydi masalan loyihada qayerda qanday component bo'lsaham class berilsa va bu classga global.cssda style berilsa ishlayveradi yani asosiy css
// import { Fira_Code } from "next/font/google"; //nextda google fonsdagi hamma shriftlar bor shunday osongina chaqirib ishlatish mumkun
// import Link from "next/link";
// ////app router padhodda bu layot pageda asosan global narsalar turadi va shablon hissoblanadi  bu app padhodda layout tsx yoki js yozilganda buham next js uchun kalit so'z hissoblanadi va aftanatik tarzda bosh sahifa hissoblanagan page.tsx fileni shu layoutga children qilib solib beradi yani papkadan tashqarida alohida turgan page.tsxni papkani ichidagi pagelar esa asosiymas children sahifalar hissoblanadi

// // const geistSans = localFont({
// //     src: "./fonts/GeistVF.woff",
// //     variable: "--font-geist-sans",
// //     weight: "100 900",
// // });

// // const geistMono = localFont({
// //     src: "./fonts/GeistMonoVF.woff",
// //     variable: "--font-geist-mono",
// //     weight: "100 900",
// // }); real loyihalarda shu funksiyalar ishlatilib kerakli shriflar ko'p bo'lganda shunday ishlatilishi kerak

// const fira_code = Fira_Code({ subsets: ["latin"], weight: "400" }); //google fontdan kelgan sriftni parametrlari

// export const metadata: Metadata = {
//     //export const deyilishi butun loyiha bo'ylab bu metadatani chaqirib  yani hususiyatlarni title description keywordslarni qiymatlarini o'zgartirib ishlatish yani har bir sahifaga alohida seo qilish keywordlarni ishlatish mumkun bu se uchun ajoyib yechim
//     title: "next  SSR div routing",
//     description: "next.js App router bilan ishlash ",
//     keywords: "next.js router kursi o'zbek tilida",
//     robots: "",
//     // robots:""????????????????????? SHU SCHEMA EMASMI SEO UCHUN
// }; // bu seo uchun kerak bo'lgan metadata

// export default function RootLayout({
//     // rootlayout bu tomir yani asosoiy sahifa
//     children,
// }: // children bu holatda parametr va bu parametrga reactnodeni chaqirb olingan yani RootLayout funksiya nomiham next js uchun kalit so'z va bu kalit so'zli funksiyani typi readonly type bu typda reactnode chaqirilgan hullas reactni typlarini tanish ishlatish uchun ts kod
// Readonly<{
//     children: React.ReactNode;
// }>) {
//     return (
//         // return qilib shu childrenlarni htmlga render qilib returnda htmlni qaytarish yani next serverdan rendreng qilinagn SSR holatdagi htmlni qaytarish yani next serverda react htmlga o'giriladi va shu html ichida keladi  yani  rootlayout bilan typlari aniqlanib hatosiz  htmlga aylangan react keladi desaham bo'ladi bu seo uchun nextni juda qulay qilgan padhod va children ichida esa app papkani ichidagi page.tsx hissoblanadi yani hamma qolgan pagelar shu appni ichidagi papkasiz o'zi alohida turgan page.tsxda chaqiriladi shu sabab shu page.tsxda chaqirilgan hamma narsa reactga mos kelishi uchun yani reactnodega mos kelishi uchun  childrenda reactnodeda bor narsalardantashqari biror narsa chaqirilsa hato chiqadi

//         <html lang="uz">
//             <body className={`${fira_code.className} bodyclass `}>
//                 {/* <body className={`${geistSans.variable} ${geistMono.variable}`}> */}

//                 {/*next  SSR div routing */}
//                 <div className="navbar">
//                     <Link href={"/"}>Bosh sahifa </Link>
//                     <Link href={"/about"}>Men haqimda </Link>
//                     <Link href={"/contact"}> Bog'lanish</Link>
//                 </div>
//                 {/*next  SSR div routing */}

//                 {/* childrenni ichida hamma narsa bo'lishi mumkun lekin doimiy o'zgarmas yani saytdagi o'zgarmas componentlar masalan navbar yoki footer sahifalari childrendan pastda yoki yuqorida chaqiriladi shunda yani har bir sahifada nima ishlatilsaham navbar va footer sahifalariham  bor bo'ladi chunki bu layout sahifasi yani asosiy shablan yani asosiy sahifa emas asosiy shablon yani har bir sahifaga ishlaydigan asosiy shablon yani qayerga chaqirilsa hamma joyda bir hil turadigan shablon children esa reactda bor nextda ssr qilingan htmlga aylantirilgan hamma boshqa sahifalar hissoblanadi */}
//                 {children}
//                 <p>Footer</p>
//             </body>
//         </html>
//     );
// }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// "use client";
// // import type { Metadata } from "next";
// import "./globals.css";
// import { Fira_Code } from "next/font/google";
// import { useRouter } from "next/navigation";

// const fira_code = Fira_Code({ subsets: ["latin"], weight: "400" });

// // export const metadata: Metadata = {// bu metadata seo uchun SSR componenti hissoblanadi shu sabab CSR("use client")ishlatilganda bu ssr funksiyalar ishlamaydi tsda qilingani sabab hatoham ko'rsatadi agar csr padhod bilan ishlaganda bu metadata o'rniga Head bilan ishlab seo qilish mumkun
// //     title: "Samar Badriddinov next.js 2-modul darslari",
// //     description: "next.js App router bilan yondoshish ",
// //     keywords: "next.js kursi o'zbek tilida",
// //     robots: "",
// //     // robots:""????????????????????? SHU SCHEMA EMASMI SEO UCHUN
// // }; // bu seo uchun kerak bo'lgan metadata

// export default function RootLayout({
//     children,
// }: Readonly<{
//     children: React.ReactNode;
// }>) {
//     const router = useRouter(); //userouter faqat client copmonentda yani csr da ishlaydi ssrda ishlamaydi sababi yuqoridagi darsda tushuntirilgan

//     return (
//         <html lang="uz">
//             <body className={`${fira_code.className} bodyclass `}>
//                 {/* <body className={`${geistSans.variable} ${geistMono.variable}`}> */}

//                 {/*button bilan csr da navigate yani roouter qilish*/}
//                 <div className="navbar-1">
//                     <button onClick={() => router.push("/")}>
//                         Bosh sahifa
//                     </button>
//                     <button onClick={() => router.push("/about")}>
//                         Men haqimda
//                     </button>
//                     <button onClick={() => router.push("/contact")}>
//                         Bog'lanish
//                     </button>
//                 </div>
//                 {/*button bilan csr da navigate yani roouter qilish*/}

//                 {children}
//                 <p>Footer</p>
//             </body>
//         </html>
//     );
// }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////CSR bilan SSR padhodni birga ishlatish
import type { Metadata } from "next";
import "./globals.css";
import { Fira_Code } from "next/font/google";
import Navbar from "@/component/navbar"; //alias yani coponentlarni u pakani ichidagi bu fail yani crs/app/coponents yoki ../../ src/app/component/navbar deb yozib chiqmasdan @global holatda shu sabachka bilan import qilishga yordan beradi alias parametri nextni skachat qilayotganda parametrlarga qo'shilsinmi deb so'reydi shunda yes qilinsa yani alias o'rnatilsa bu alias o'rnatilgan loyihada componentlarni shunday oson yokida qisqaroq marshutlar bilan chaqirish mumkun tsconfig.jsonda nastroyka qilingan
import Provider from "./provider";

const fira_code = Fira_Code({ subsets: ["latin"], weight: "400" });
export const metadata: Metadata = {
    title: "CSR bilan SSR padhodni birga ishlatish",
    description: "CSR bilan SSR padhodni farqlari ",
    keywords: "next.js kursi o'zbek tilida",
    robots: "",
    // robots:""????????????????????? SHU SCHEMA EMASMI SEO UCHUN
}; // bu seo uchun kerak bo'lgan metadata

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="uz">
            <body className={`${fira_code.className} bodyclass `}>
                {/* <body className={`${geistSans.variable} ${geistMono.variable}`}> */}
                <Provider>
                    <Navbar />
                    {/* bu asosiy layout sahifasi SSR component lekin endi buni childrenlaridan aynan Navbar componenti CSR component va bu Navbar alohida joyda "use client" buyrug'i bilan yozilgan userouterham bu holatda navbarda next navigationdan chaqirib ishlatiladi next routerdanmas  */}
                    {/* asosiy sahifani yani papkalardan tashqarida turgan bu layoutni SSR qilinib qolgan childrenlarni CSR qilinishini qulayliklari shuki user saytga kirganda asosiy sahifa ssrda tayyorlab qo'yilgan bo'ladi lekin shu user kirgandagi bitta yuklanishda qolgan csr sahifalar yani childrenlar huddi react SPA dasturday yuklanib bo'ladi yani user uchun yahshi lekin savol agar CSR qilingan children componentlarga seo qilish metadatalar yozilishi kerak bo'lsa qanday qilinadi bu sahifadagi metadata default titledan tashqari  yani hamma sahifaga bir hil tasir qilayapti */}

                    {children}
                    <p>Footer</p>
                </Provider>
            </body>
        </html>
    );
}
