import { Box } from "@mui/material";
import { GetServerSideProps } from "next";
// import Head from "next/head";
import { Hero, Sidebar, Content } from "src/components";
import { BlogsType } from "src/interface/blogs.interface";
import { CategoryType } from "src/interface/catigories.interface";
import Layout from "src/layout/layout";
import SEO from "src/layout/seo/seo";
import { BlogsService } from "src/service/blog.service";

//loyiha yarn dev bilan ishlaydi

const IndexPage = ({ blogs, latestBlogs, categories }: HomePageProps) => {
    //endi next jsni asosiy sahifasi hissoblangan indexPageda props bilan kelgan  qiymatlarida serverdan keladigan datalarni typlelari bor HomePageProps nomli interface bor
    // console.log(props.message);//bu propsdan kelgan message qiymati

    // console.log(blogs);

    // //reactda qilinganda shunday qilinardi yani reactdagi csr holatini shu kodlar bilan qilib serverdan datalarni olib ko'rdik
    // const [blogs, setBlogs] = useState(null)//null bu holatda loader yani react serverdan keladigan datalar kelguncha kutish joyi
    // useEffect(() => {
    //     BlogsService.getAllBlogs().then((data) => setBlogs(data));
    // }, []);
    // console.log(blogs);//onmountda kirish//birinchi usestatedagi null chiqadi chunki csr (client side rendring) ikkinchi esa bloglar chunki reactni default serveri yani csr (yani bo'sh html) shunda react spa (single page application) ishladi yani clientni browseri serverdan keladigan datani emas birinchi loaderni ko'rdi shu sabab spa csr default holatda seo uchun bo'maydi
    // //reactda qilinganda shunday qilinardi

    return (
        // bu layout.tsx da yozilgan component bu componentni vazifasi buni ichidagi chaqiriladigan componentlar roturga aftamatik tarzda olinadi yani rooter ishlatish shartmas reactda roter domni nextni o'zi bajaradi. aslida bu Layout component nextda yozilgan funksiya ichida rooter va yana useeffect yana qanadur funksiyalar aslida default holatda layout ichida yozilgan

        <SEO>
            {/*
            Bu SEO seo papkani ichidagi seo.tsxda yozilgan COMPONENT HISSOBLANADI yani bu SEOda pastdagi metateglar dynamic kelgan  yani hygraphda yozilgan titlelarni blogs ichidan yani BlogsType ichidan olib  kerakli joylarga qo'yadi yani blogs, latestBlogs, categorieslarda yozilgan maqolalarni titellarini dynamic tarzda olib shu asosiy sahifadan boshlab qo'yib boradi            

                <title>{metaTitle}</title>
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <meta name="keyword" content={metaKeywords} />
                <meta name="author" content={author} />
                <meta name="description" content={metaDescription} /> */}

            {/* seo.tsxda yozilgan qiymatlarni hammasi kelmasa hato chiqarkan bu SEO seo qilish uchun dynamic ishlaydigan keywordlarga ega  */}
            <Layout>
                {/* <Head>
                    bu Head tegi next jsni seo uchun chiqarilgan tegi bu title esa asosiy sahifani title bu Head ichiga discription va meta teglarni seoga aloqador hamma teglarni yozib saytni asosiy sahifasini seosini qilish mumkun bu holatda "Next.jsda SEO qilish" asosiy sahifani titeli yani asosiy kalit so'zi 
                    sahifa tilini belgialsh bu seo uchun juda muhum
                    <html lang="uz" />
                    Layoutdagi title
                    <title>Next.jsda SEO qilish</title>
                    bu index pages papkani ichida pagesni ichida index papka bo'lsa next.js buni aftamatik tarzda asosiy sahifa qiladi huddi reactdagi app.js failday yani bu asosiy papka hamma marshutlash shu papkadan boshlanadi
                    <meta
                        name="description"
                        // shu joyda qanday teglar qo'yish mumkunligini yahshilab o'rgan
                        content="SEO uchun juda kerakli joy IndexPage sahifasi"
                    />
                </Head> */}

                <Hero blogs={blogs.slice(1, 4)} />
                {/* heroga umumiy blogsni slice qilib 1 bilan 4 ni orasidagi massivlarni ko'rsatish aytildi yani haygraphdan keladigan datalarni 1 chisi bilan 4 chini orasi chiqadi yani 1,2,3,4 */}

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

export default IndexPage;

////getServerSideProps bu next jsni server side funksiyasini nomi nextda serverdan yani ssr serverdan foydalanganda shu nom bilan  funksiya yozish shart shunda next biladi bu server bilan ishlash funksiyasi ekanligini getServerSideProps kalit so'z hissobida  va bu funksiya pagesni ichidagi index.tsda yozilishi shart shunda next bu funksiyani taniydi agar boshqa papkada yozilsa next buni tanimasligi mumkun bu nextni 12 chi versiyasida exportham global bo'lishi shart
export const getServerSideProps: GetServerSideProps<
    HomePageProps
> = async () => {
    ///GetServerSideProps nextda yozilgan funksiya va endi type HomePageProps chunki tsda nextni radnoy funksiyasi bo'lsaham bu funksiyaga type berilishi shart genericda interface HomePageProps bu GetServerSidePropsni type yani shunda GetServerSideProps funksiya faqat shu interfacega ishlaydi boshqasiga emas boshqasi yoki return berilmasaham hato chiqadi returnham to'g'ri berilishi shart ////endi bu nextni ssr funksiyasiga generic HomePagePropsda yo'q narsa qo'shilsa srazi hato chiqadi ts!!!
    //GetServerSideProps NEXTNI KALIT SO'ZI TS UCHUN Bu GetServerSideProps ishlatilganda funksiya return qilmasa hato chiqadi yani server bilan malumot oldi berdida hato bor deb hatoni aniq aytadi shu uchun bu next jsda ts uchun kalit so'z hissoblanadi // generic ichidagi HomePageProps esa SERVERDAN GET qilinib olib kelingan datalarni taype nima ekanligini aniq aytish uchun boshqa datalarni qabul qilmaslik uchun yani bu holatda generik yani ona type qilib HomePageProps interface berildi endi bu getserversideprops funksiyasi get qilganda get qilgan narsalari ichida HomePagePropsda type aniq berilmagan narsalar bo'lsa hato chiqaradi endi bu funksiya ts bo'yicha typelar masalasida HomePageProps interfacega qaram HomePageProps esa pastda interface kalit so'zi bilan yozilib blogsni yani distruptatsa bilan chaqirilgan blogs.service.tsda yozilgan hygraphdan kelgan blogsni type blogs.interface.ts da yozilgan BlogsType bo'lsin BlogsTypeda serverdan query gql sabab keladigan datalarni typlari yozilgan va bu massiv yani blogs massiv ichida objectda keladi

    const blogs = await BlogsService.getAllBlogs(); //hygrapg serverdan blogs olindi //getServerSideProps funksiyani asosiy maqsadi shu blogs o'zgaruvchini ishlatish yani BlogsService.getAllBlogs bilan hygrapg serverdan datalarni chaqirish awaitni sababi esa bu async funksiya yani serverdan datalar kechikibroq kelsaham kutib turadi //run qilish

    const latestBlogs = await BlogsService.getLatestBlog(); //run qilish
    const categories = await BlogsService.getCategories(); //run qilish

    return {
        props: {
            //bu holatda props nextda yozilgan GetServerSideProps funksiyani parametri bu holatda GetServerSideProps funksiyada props ko'rinmasaham aslida ichida yozilgan//yani GetServerSideProps funksiya returnda propsda keyni qaytaradi key bu blogs yani props huddi reactdagiday props vazifasini bajaradigan parametr va blogsni returnda propsni ichidagi qiymatni keyini qaytaradi va ssr ishlaydi
            blogs,
            latestBlogs,
            categories,
        },
    };
};

interface HomePageProps {
    //bu asosiy indexpage sahifasi uchun typelar yozish interfacesi yani indexpagega props bilan keladigan har qanday datalarni typi aniq bo'lishi kerak bu uchun u datalarga typelar berib typelar berilgan objectlar shu joyga chaqirilib yozib qo'yiladi shunda indexpage biladiki hamma datalarni typi bor va bu to'g'ri typlar shunda hato chiqmaydi
    blogs: BlogsType[]; //blogsni typelari yani massiv ichida
    latestBlogs: BlogsType[];
    categories: CategoryType[];
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////