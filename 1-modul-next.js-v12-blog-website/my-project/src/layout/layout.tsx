//Ilovani marshrutlash tizimidagi har qanday marshrut segmenti uchun tartibni aniqlash uchun biz layout deb nomlangan maxsus fayldan standart React komponentini eksport qilamiz. js. Keyingisi. js sahifa mazmunini yoki ko'rsatish paytida mavjud bo'lishi mumkin bo'lgan har qanday ichki o'rnatilgan tartiblarni o'rash uchun ushbu ildiz tartibidan foydalanadi








import { Footer, Navbar } from "src/components";
import { LayoutProps } from "./layout.props";
import { Box } from "@mui/material";

const Layout = ({ children }: LayoutProps): JSX.Element => {//layoutga tsda san jsx elementsan  boshqasi hato deyildi
    //ts darslaridagiday//yani bu holatda Layout.Props.ts papkada LayoutProps nomli interface ochilgan va export defoult qilingan LayoutProps interfaceda umumiy objectga yani interfacega ReactNode objecti chaqirilgan ReactNode objectida hamma kerakli typelar bor yani interfacega qiymatlar qanaqa typeda bo'lishi bittalab yozilmagan umumiy ReactNode objecti chiqirilgan reactdagi hamma typelar bor agar endi bu Layoutga ReactNodeda yo'q typelar yozilsa hato chiqadi yani layoutda hamma tsx filelar keladi birirtasini ichida ReactNodeda yo'q typelar ishlatilsa hatoni aniq aytadi
    return (
        <>
            <Navbar />
            {/* Boxni ichidagi children bu ReactNode typelar props bilan layout.props.tsdan chaqirildi endi  */}
            <Box minHeight={"90vh"}>{children}</Box>

            <Footer />
        </>
    );
};

export default Layout;
// 5 chi dars hero 09;43da qoldi carousel rasimlarni to'g'irla