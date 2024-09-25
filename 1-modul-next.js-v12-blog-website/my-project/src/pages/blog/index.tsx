import { GetServerSideProps } from "next";
import { BlogsType } from "src/interface/blogs.interface";
import Layout from "src/layout/layout";
import { BlogsService } from "src/service/blog.service";
import { Content } from "src/components";
import { Box } from "@mui/material";
import SEO from "src/layout/seo/seo";

const BlogPage = ({ blogs }: BlogPageProps) => {
    return (

        <SEO metaTitle="IT haqidagi barcha yangiliklar">
            {/* bu metatitle saytdagi blogs sahifasi uchun yani faqat bloglarni o'zi yani hammasi joylashadigan page uchun alohida kalit so'z bu IT haqidagi barcha yangiliklar va blogslar uchun esa dynamic har biriga har birini haygraphda yozilgan titlesi chiqadi bu blog papka ichidagi [slug].tsxda yozilgan */}

            <Layout>
            <Box
                sx={{
                    display: "flex",
                    gap: "20px",
                    flexDirection: { xs: "column", md: "row" },
                    padding: "20px",
                    justifyContent:"center"
                }}
            >
                <Content blogs={blogs} />
            </Box>
        </Layout>
        </SEO>

        
    );
};

export default BlogPage;

export const getServerSideProps: GetServerSideProps<
    BlogPageProps
> = async () => {
    const blogs = await BlogsService.getAllBlogs();
    return {
        props: {
            blogs,
        },
    };
};

interface BlogPageProps {
    blogs: BlogsType[];
}
