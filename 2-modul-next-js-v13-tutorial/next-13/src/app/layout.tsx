import type { Metadata } from "next";
// import localFont from "next/font/local";//bu joyda goog;edanham font googlelarni olib kelib ishlatish mumkun bu fontlar yani shriftlarham SSR dan o'tib keladi yani server side rendring bo'ladi user sahifani ochmasdan serverdan kelib turadi
import "./globals.css";
import {Fira_Code} from "next/font/google";
////app router padhodda bu layot pageda asosan global narsalar turadi va shablon hissoblanadi  bu app padhodda layout tsx yoki js yozilganda buham next js uchun kalit so'z hissoblanadi va aftanatik tarzda bosh hsahifa hissoblanagan page.tsx fileni shu layoutga children qilib solib beradi

// const geistSans = localFont({
//     src: "./fonts/GeistVF.woff",
//     variable: "--font-geist-sans",
//     weight: "100 900",
// });

// const geistMono = localFont({
//     src: "./fonts/GeistMonoVF.woff",
//     variable: "--font-geist-mono",
//     weight: "100 900",
// }); real loyihalarda shu funksiyalar ishlatilib kerakli shriflar ko'p bo'lganda shunday ishlatilishi kerak

const fira_code = Fira_Code({subsets: ["latin"], weight: "400"})

export const metadata: Metadata = {
    title: "Samar Badriddinoc next.js 2-modul",
    description: "next.js App router bilan yondoshish ",
    keywords: "next.js kursi o'zbek tilida",
    robots:""
    // robots:""????????????????????? SHU SCHEMA EMASMI SEO UCHUN
};

export default function RootLayout({
    // rootlayout bu tomir yani asosoiy sahifa 
    children,
    // children bu holatda parametr va bu parametrga reactnodeni chaqirb olingan yani RootLayout funksiya nomiham next js uchun kalit so'z va bu kalit so'zli funksiyani typi readonly type bu typda reactnode chaqirilgan hullas reactni typlarini tanish ishlatish uchun ts kod
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
      // return qilib shu childrenlarni htmlga render qilib returnda htmlni qaytarish yani next serverdan rendreng qilinagn SSR holatdagi htmlni qaytarish yani next serverda react htmlga o'giriladi va shu html ichida keladi  yani  rootlayout bilan typlari aniqlanib hatosiz  htmlga aylangan react keladi desaham bo'ladi bu seo uchun nextni juda qulay qilgan padhod va children ichida esa app papkani ichidagi page.tsx hissoblanadi yani hamma qolgan pagelar shu appni ichidagi papkasiz o'zi alohida turgan page.tsxda chaqiriladi shu sabab shu page.tsxda chaqirilgan hamma narsa reactga mos kelishi uchun yani reactnodega mos kelishi uchun  childrenda reactnodeda bor narsalardantashqari biror narsa chaqirilsa hato chiqadi
        <html lang="uz">
            <body className={fira_code.className}>

            {/* <body className={`${geistSans.variable} ${geistMono.variable}`}> */}

              <p>Navbar</p>
              {/* childrenni ichida hamma narsa bo'lishi mumkun lekin doimiy o'zgarmas yani saytdagi o'zgarmas componentlar masalan navbar yoki footer sahifalari childrendan pastda yoki yuqorida chaqiriladi shunda yani har bir sahifada nima ishlatilsaham navbar va footer sahifalariham  bor bo'ladi chunki bu layout sahifasi yani asosiy shablan yani asosiy sahifa emas asosiy sahblon yani har bir sahifaga ishlaydigan asosiy shablon yani qayerga chaqirilsa hamma joyda bir hil turadigan shablon children esa reactda bor nextda ssr qilingan htmlga aylantirilgan hamma boshqa sahifalar hissoblanadi */}
                {children}
                <p>Footer</p>
            </body>
        </html>
    );
}