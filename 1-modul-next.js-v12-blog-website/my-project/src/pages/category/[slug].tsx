import { Box } from "@mui/material";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Content, Sidebar } from "src/components";
import { BlogsType } from "src/interface/blogs.interface";
import { CategoryType } from "src/interface/catigories.interface";
import Layout from "src/layout/layout";
import SEO from "src/layout/seo/seo";
import { BlogsService } from "src/service/blog.service";

const CategoryDetailedPage = ({
    blogs,
    latestBlogs,
    categories,
}: DetailedCategoriesPageProps) => {
    //categoriylarga bosilganda hygraphdagi categoriylar ichida yozilgan maqolalarga o'tadi masalan mobilega bosilsa hygraphda categoriyasi mobile bo'lgan maqolalarni hammasini bitta sahifaga slug [slug] orqali olib o'tadi

    //14, 15, 16, darslarga comment yozilmadi qaytadan ko'rib comment va vazifalarni bajarish kerak
    // 14. Category blogs page va 15. General page va 16. SEO & NProgress darslarini qaytadan ko'rib blog papkani ichidagi hatoni topib kerakli comentlarni yozib categoriylarga moslab har bir categoriyga 3 4 tadan maqola yozib yana 1 ta categoriy qo'shib categoriylarga o'tganda maqolalarni web1 web2 mobile1 mobile2 qilib o'zing uchun tartibli qilib yahshilab tushunvol

    const router = useRouter();

    return (
        <SEO metaTitle={`${router.query.slug} - category`}>
            {/* categorylarni ustiga bossa linkdaham browserdagi meta titledaham categorylarni nomi chiqdi masalan suniy intelectga bosilsa browser titlesidaham linkni joyidaham shu text chiqdi yani  categoriydagi qaysi qiymatga bosilsaham shu qiymatni titlelari slug bilan serverdan kelepti va bu html bo'lib ssr bo'lgani uchun ko'rinepti bu seo uchun muhum  */}
            {/* bu holatda routerni vazifasi queryni yani nextga tegishli qyery yani serverdan datalarni get qiladigan query va router shu query nimani serverdan oletganini bilish uchun chaqirildi va serverdagi datalarni slugi borligi uchun shu slugni kalit so'z qilib category slugiga ega bo'lgan getGategoriesBlog nomli category: { slug: $slug } parametrli server objectida yozilgan shu category: { slug: $slug } category stringni yani textni oladi yani router bu holatda manzilni olib berepti vs `` yani bectik bilan esa bu dynamic qilineptishundan keyin yozilgan - category  category: { slug: $slug }manashu category texti hissoblanadi va shu category: { slug: $slug } category texti yozilgan serverdagi objectdagi titlellarham shunday keladi */}
            {/* categoriylarga bosilganda masalan asosiy sahifadan turib categoriylardan birini masalan mobile bosganda html title browserda category mobile bo'ldi agar categoriydan web devolepment with nur bosilsa o'sha pagega o'tadi va html title browserda  web devolepment with nur ga o'zgaradi yani seo uchun */}
            <Layout>
                {/* <Head>
                    <html lang="uz" />
                    Layoutdagi title
                    <title>Next.jsda SEO qilish</title>

                    <meta
                        name="description"
                        // shu joyda qanday teglar qo'yish mumkunligini yahshilab o'rgan
                        content="SEO uchun juda kerakli joy IndexPage sahifasi"
                    />
                </Head> */}

                <Box
                    sx={{
                        display: "flex",
                        gap: "20px",
                        flexDirection: { xs: "column", md: "row" },
                        padding: "20px",
                    }}
                >
                    <Sidebar
                        latestBlogs={latestBlogs}
                        categories={categories}
                    />
                    <Content blogs={blogs} />
                    {/* conten.tsxga blogsni yani serverdan keladigan blogsni props bilan jo'natish shu sabab ssr funksiya yoki server funksiyalari shu indexpageda yozilishi kerak  content.tsxga bu blogsni jo'natgandan keyin content papkaga content.props.ts nomli file ochildi va content.tsxga bu blogsni nima ekanligi yani type nima ekanligi aytildi chunki tsda ishlayapmiz typelar berilishi shart */}
                </Box>
            </Layout>
        </SEO>
    );
};

export default CategoryDetailedPage;

export const getServerSideProps: GetServerSideProps<
    DetailedCategoriesPageProps
> = async ({ query }) => {
    const blogs = await BlogsService.getDetailedCategoriesBlog(
        query.slug as string
    );
    const latestBlogs = await BlogsService.getLatestBlog();
    const categories = await BlogsService.getCategories();

    return {
        props: {
            blogs,
            latestBlogs,
            categories,
        },
    };
};

interface DetailedCategoriesPageProps {
    blogs: BlogsType[];
    latestBlogs: BlogsType[];
    categories: CategoryType[];
}
