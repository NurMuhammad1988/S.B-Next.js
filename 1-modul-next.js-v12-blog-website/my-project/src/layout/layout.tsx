//Ilovani marshrutlash tizimidagi har qanday marshrut segmenti uchun tartibni aniqlash uchun biz layout deb nomlangan maxsus fayldan standart React komponentini eksport qilamiz. js. Keyingisi. js sahifa mazmunini yoki ko'rsatish paytida mavjud bo'lishi mumkin bo'lgan har qanday ichki o'rnatilgan tartiblarni o'rash uchun ushbu ildiz tartibidan foydalanadi

import { Footer, Navbar } from "src/components";
import { LayoutProps } from "./layout.props";
import { Box } from "@mui/material";

const Layout = ({ children }: LayoutProps): JSX.Element => {
    //layoutga tsda san jsx elementsan  boshqasi hato deyildi
    //ts darslaridagiday//yani bu holatda Layout.Props.ts papkada LayoutProps nomli interface ochilgan va export defoult qilingan LayoutProps interfaceda umumiy objectga yani interfacega ReactNode objecti chaqirilgan ReactNode objectida hamma kerakli typelar bor yani interfacega qiymatlar qanaqa typeda bo'lishi bittalab yozilmagan umumiy ReactNode objecti chiqirilgan reactdagi hamma typelar bor agar endi bu Layoutga ReactNodeda yo'q typelar yozilsa hato chiqadi yani layoutda hamma tsx filelar keladi birirtasini ichida ReactNodeda yo'q typelar ishlatilsa hatoni aniq aytadi
    return (
        <>
        {/* src ichida layot papka ochilsa bu default yani saytni hamma sahifasida turish kerak bo'lgan componentlar chaqirilishi kerak deganai */}
            <Navbar />
            {/* Boxni ichidagi children bu ReactNode typelar props bilan layout.props.tsdan chaqirildi endi bu chidrenni joyida pagesni ichida yozilgan index.tsxda chaqirilgan layoutni yani nextni layout funksiyasini ichiga qaysi component chaqirilsa shu component ts bo'yicha ReactNodega mos typelar bor bo'lsa  shu boxni ichida keladi yani children bu pages papkani ichida yozilgan index.tsx fileda chaqirilgan hamma componentni o'z ichiga oladi */}
            <Box minHeight={"90vh"}>{children}</Box>
            {/*  navbar va footerni bu joyda yozilishini sababi bular pagesga papkaga aloqador emas yani bu navbar va footer default saytni qayeriga borilsaham shu footer va navbqar joyida qimillamay turadi chunki src papkani ichida pages papkaga layout nomli file ochilsa next.js buni taniydi va onmount va shunga o'hshagan papkalarga ega layot funksiyasisni shu layoutda ishga tushuradi yani kalit so'zday gap*/}
            <Footer />
        </>
    );
};

export default Layout;
