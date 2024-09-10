import { Footer, Navbar } from "src/components";
import { LayoutProps } from "./layout.props";
import { Box } from "@mui/material";

const Layout = ({ children }: LayoutProps): JSX.Element => {//layoutga tsda san jsx elementsan  boshqasi hato deyildi
    //ts darslaridagiday//yani bu holatda Layout.Props.ts papkada LayoutProps nomli interface ochilgan va export defoul qilingan LayoutProps interfaceda umumiy objectga yani interfacega ReactNode objecti chaqirilgan ReactNode objectida hamma kerakli typelar bor yani interfacega qiymatlar qanaqa typeda bo'lishi bittalab yozilmagan umumiy ReactNode objecti chiqirilgan reactdagi hamma typelar bor agar endi bu Layoutga ReactNodeda yo'q typelar yozilsa hato chiqadi yani layoutda hamma tsx filelar keladi birirtasini ichida ReactNodeda yo'q typelar ishlatilsa hatoni aniq aytadi
    return (
        <>
            <Navbar />
            {/* Boxni ichidagi children bu ReactNode typelar props bilan layout.props.tsdan chaqirildi endi */}
            <Box minHeight={"90vh"}>{children}</Box>

            <Footer />
        </>
    );
};

export default Layout;
