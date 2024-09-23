import { Box } from "@mui/material";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Content, Sidebar } from "src/components";
import { BlogsType } from "src/interface/blogs.interface";
import { CategoryType } from "src/interface/catigories.interface";
import Layout from "src/layout/layout";
import { BlogsService } from "src/service/blog.service";

const CategoryDetailedPage = ({
    blogs,
    latestBlogs,
    categories,
}: DetailedCategoriesPageProps) => {
    return (
        <Layout>
            <Head>
                
                <html lang="uz" />
                {/* Layoutdagi title */}
                <title>Next.jsda SEO qilish</title>
                
                <meta
                    name="description"
                    // shu joyda qanday teglar qo'yish mumkunligini yahshilab o'rgan
                    content="SEO uchun juda kerakli joy IndexPage sahifasi"
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
                <Sidebar latestBlogs={latestBlogs} categories={categories} />
                <Content blogs={blogs} />
                {/* conten.tsxga blogsni yani serverdan keladigan blogsni props bilan jo'natish shu sabab ssr funksiya yoki server funksiyalari shu indexpageda yozilishi kerak  content.tsxga bu blogsni jo'natgandan keyin content papkaga content.props.ts nomli file ochildi va content.tsxga bu blogsni nima ekanligi yani type nima ekanligi aytildi chunki tsda ishlayapmiz typelar berilishi shart */}
            </Box>
        </Layout> //[slug].tsx bo'lgani uchun Layoutga o'ralgandan
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
