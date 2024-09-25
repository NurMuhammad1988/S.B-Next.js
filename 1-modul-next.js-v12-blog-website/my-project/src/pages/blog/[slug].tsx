import { Avatar, Box, Divider, Typography } from "@mui/material"; //
import { format } from "date-fns"; //
import { GetServerSideProps } from "next"; //
import Head from "next/head"; //
import Image from "next/image"; //
import { Sidebar } from "src/components"; //
import { calculateEstimatedTimeToRead } from "src/helpers/time.format"; //
import { BlogsType } from "src/interface/blogs.interface"; //
import { CategoryType } from "src/interface/catigories.interface";
import Layout from "src/layout/layout"; //
import SEO from "src/layout/seo/seo";
import { BlogsService } from "src/service/blog.service"; //

//unical bo'lish uchun []<<shu to'rtburchak scopka ichida fail yaratiladi bu next.js uchun kalit so'z hissoblanadi va bu bloglarni idsi uchun yani id deganda slugi uchun VA AGAR [ID] bilan ochilsa next faqat idsini oberadi yani uzun tushunarsiz raqam va hariflar bu esa seo uchun yahshimas shu sabab slug bilan ishlagan yahshi
const DetailedBlogsPage = ({
    blog,
    latestBlogs,
    categories,
}: DetailedBlogsPageProps) => {
    // console.log(props);

    return (
        <SEO metaTitle={blog.title}>
            {/* bu joyda faqat blogni titlesi chaqirildi lekin SEO funksiyada qolgan metateglar dynamic shu SEOni ichida keladi */}
            {/* har bir maqolaga bosilganda html titleda browserda shu maqolani titlesi chiqadi yani haygraphda yozilgan titlelar har bir maqola uchun dynamic chiqadi va bu browserda htmldaham ko'rinadi yani google botlar o'qiy oladigan formatda chiqadi*/}
            <Layout>
                {/* layout next jsni default componenti yani layout next js uchun kalit so'z bu layout qayerga chaqirilsa ichidagi head box sidebar va boshqalar o'sha chaqirilgan joyda paydo bo'ladi yani asosiyday yani bu layout indexdaham ishlatilgan bu joygaham chaqirildi slug bilan keladigan datalardan tashqari odatiy default hamma sahifada o'zgarmay turadigan narsalar keladi masalan navbar footer va hakozo lekin headni datalarini o'zgartiridim chunki seo uchun har bir sahifani alohida kalit so'zlari titellari descriptionlari bo'lishi kerak lekin serverdan keladigan hamma maqola uchun bitta title va description bo'lib qoldi hatoni to'g'irlash o'rganish kerak!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                {/* <Head>
                    <html lang="uz" />

                    <title>blog-websayt-yasash</title>

                    <meta
                        name=" Next.js va Hygraph bilan blog websayt yasash"
                        content="Next.js va Hygraph"
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
                    <Box width={{ xs: "100%", md: "70%" }}>
                        <Box
                            sx={{
                                backgroundColor: "black",
                                padding: "20px",
                                borderRadius: "8px",
                                boxShadow: "0px 8px 16px rgba(255,255,255, .1)",
                            }}
                            position={"relative"}
                            width={"100%"}
                            height={{ xs: "30vh", md: "50vh" }}
                            marginBottom={"20px"}
                        >
                            <Image
                                src={blog.image.url} //hygraphdan kelgan imageni urli
                                alt={blog.title}
                                fill
                                style={{
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                }}
                            />
                        </Box>

                        <Box
                            display={"flex"}
                            flexDirection={"column"}
                            rowGap={"10px"}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: "10px",
                                    marginTop: "20px",
                                }}
                            >
                                <Avatar />

                                <Box>
                                    <Typography>{blog.author.name}</Typography>
                                    <Box color={"gray"}>
                                        {format(
                                            new Date(blog.createdAt),
                                            "dd MMM, yyyy"
                                        )}
                                        &#x2022; o'qish
                                        {calculateEstimatedTimeToRead(
                                            blog.description.text
                                        )}
                                        daqiqa
                                    </Box>
                                </Box>
                            </Box>

                            <Typography variant="h3">{blog.title}</Typography>
                            <Typography color={"gray"}>
                                {blog.excerpt}
                            </Typography>
                            <Divider />

                            <div
                                style={{ opacity: ".7" }}
                                dangerouslySetInnerHTML={{
                                    __html: blog.description.html,
                                }}
                            />
                        </Box>
                    </Box>

                    <Sidebar
                        latestBlogs={latestBlogs}
                        categories={categories}
                    />
                </Box>
            </Layout>
        </SEO>
    );
};

export default DetailedBlogsPage;

// getServerSideProps funksiyani typi >>>getServerSideProps yani nextd ayozilgan ssr funksiyasi shunda bu getServerSideProps funksiyasi ichida nextda yozilgan  getServerSideProps funksiyasi keladi
export const getServerSideProps: GetServerSideProps<
    DetailedBlogsPageProps
> = async ({ query }) => {
    // console.log(query); //next jsdagi GetServerSideProps funksiyasidagi queryni ko'rish uchun //next SSR funksiyada queryni faqat  terminalda ko'rish mumkun browserda emas chunki hafsizlik uchun va terminalda browserda bosilgan slug idili link chiqdi yani bu parametrdagi query shunchaki textmas bu query nextdagi GetServerSideProps SSR funksiyada keladi vazifasi sluglarni ishlatish// yani query sluigniqanday olepti query aftamatik tarzda slugni oladi slugni esa content.tsx fileda useRouter ishlatilgan onclikda chaqirib qo'yilgan shu sabab bu getServerSideProps funksiya umumiy export qilingani uchun srazi sihlaydi va slugni srazi olib terminalda ko'rsatmoqda agar [slug].tsx [id].tsx qilinsa faqat id chiqadi yani bu slug, id next uchun kalit so'zlar

    const blog = await BlogsService.getDetailedBlogs(query.slug as string); //query bilan keladigan slugni qanday typda ekanligini [slug].tsx failga as string deb aytib qo'yildi
    const latestBlogs = await BlogsService.getLatestBlog(); //run qilish// bularham slugga chaqirilganini sababi user slug orqali maqolaga kirgandaham huddi asosiy sahifadagiday latestblogs va categories qisimlariham ekranda turadi bu seo uchun yahshi yani user slug orqali kirgan maqolasini o'qib yana agar hohlasa boshqa maqolalargaham o'tib ketadi yani saytda ko'roq yurishi mumkun
    const categories = await BlogsService.getCategories(); //run qilish// bularham slugga chaqirilganini sababi user slug orqali maqolaga kirgandaham huddi asosiy sahifadagiday latestblogs va categories qisimlariham ekranda turadi bu seo uchun yahshi yani user slug orqali kirgan maqolasini o'qib yana agar hohlasa boshqa maqolalargaham o'tib ketadi yani saytda ko'roq yurishi mumkun

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


