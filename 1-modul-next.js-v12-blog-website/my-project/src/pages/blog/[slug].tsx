import { Box } from "@mui/material";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Sidebar } from "src/components";
import { BlogsType } from "src/interface/blogs.interface";
import { CategoryType } from "src/interface/catigories.interface";
import Layout from "src/layout/layout";
import { BlogsService } from "src/service/blog.service";

//unical bo'lish uchun []<<shu to'rtburchak scopka ichida fail yaratiladi bu next.js uchun kalit so'z hissoblanadi va bu bloglarni idsi uchun yani id deganda slugi uchun
const DetailedBlogsPage = ({
    blog,
    latestBlogs,
    categories,
}: DetailedBlogsPageProps) => {
    // console.log(props);

    return (
            <Layout>
              {/* layout next jsni default componenti yani layout next js uchun kalit so'z bu layout qayerga chaqirilsa ichidagi head box sidebar va boshqalar o'sha chaqirilgan joyda paydo bo'ladi yani asosiyday yani bu layout indexdaham ishlatilgan bu joygaham chaqirildi slug bilan keladigan datalardan tashqari odatiy default hamma sahifada o'zgarmay turadigan narsalar keladi masalan navbar footer va hakozo lekin headni datalarini o'zgartiridim chunki seo uchun har bire sahifani alohida kalit so'zlari titellari descriptionlari bo'lishi kerak */}
                <Head>
                    <html lang="uz" />

                    <title>blog-websayt-yasash</title>

                    <meta
                        name=" Next.js va Hygraph bilan blog websayt yasash"
                        content="Next.js va Hygraph"
                    />
                </Head>

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



                </Box>
            </Layout>
    );
};

export default DetailedBlogsPage;

// getServerSideProps funksiyani typi >>>getServerSideProps yani nextd ayozilgan ssr funksiyasi shunda bu getServerSideProps funksiyasi ichida nextda yozilgan  getServerSideProps funksiyasi keladi
export const getServerSideProps: GetServerSideProps<
    DetailedBlogsPageProps
> = async ({ query }) => {
    console.log(query); //next jsdagi GetServerSideProps funksiyasidagi queryni ko'rish uchun //next SSR funksiyada queryni faqat  terminalda ko'rish mumkun browserda emas chunki hafsizlik uchun va terminalda browserda bosilgan slug idili link chiqdi yani bu parametrdagi query shunchaki textmas bu query nextdagi GetServerSideProps SSR funksiyada keladi vazifasi sluglarni ishlatish// yani query sluigniqanday olepti query aftamatik tarzda slugni oladi slugni esa content.tsx fileda useRouter ishlatilgan onclikda chaqirib qo'yilgan shu sabab bu getServerSideProps funksiya umumiy export qilingani uchun srazi sihlaydi va slugni srazi olib terminalda ko'rsatmoqda agar [slug].tsx [id].tsx qilinsa faqat id chiqadi yani bu slug, id next uchun kalit so'zlar

    const blog = await BlogsService.getDetailedBlogs(query.slug as string);
    const latestBlogs = await BlogsService.getLatestBlog(); //run qilish
    const categories = await BlogsService.getCategories(); //run qilish

    return {
        props: {
            blog,
            latestBlogs,
            categories,
        },
    };
};

interface DetailedBlogsPageProps {
    blog: BlogsType[];
    latestBlogs: BlogsType[];
    categories: CategoryType[];
}
