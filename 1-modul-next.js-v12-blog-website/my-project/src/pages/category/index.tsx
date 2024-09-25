import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { CategoryType } from "src/interface/catigories.interface";
import Layout from "src/layout/layout";
import SEO from "src/layout/seo/seo";
import { BlogsService } from "src/service/blog.service";

const CategoryPage = ({ categories }: CategoryPageProps) => {

    const router = useRouter()

    return (
        <SEO metaTitle="Hamma Categorylar"> 
        {/* yani categiriylar yozilgan categoriylar uchun asosiy sahiga hissoblangan categorypage safifasi uchun meta title yani seo uchun faqat shu categorypage sahifasi uchun qolgan metateglar ese seo page ichidagi seo.tsxda yozilgan SEO funksiyasidan dynamic keladi*/}
            <Layout>
            <Box
                width={{ xs: "100%", md: "80%" }} //katta va kichkina ekranlar uchun width
                marginX={"auto"}
                marginTop={"10vh"}
                borderRadius={"8px"}
                height={{ xs: "30vh", md: "50vh" }}
                sx={{
                    backgroundColor: "black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection:"column",
                    rowGap:"10px"
                }}
            >
                <Typography variant="h3" fontFamily={"cursive"}>ALL Categories</Typography>

                <ButtonGroup variant="contained" aria-label="Basic button group">
                    {categories.map(item => (
                    <Button onClick={()=> router.push(`/category/${item.slug}`)} key={item.slug}># {item.label}</Button>
                    ))}
               
                
                </ButtonGroup>

            </Box>
        </Layout></SEO>
       
    );
};

export default CategoryPage;

export const getServerSideProps: GetServerSideProps<
    CategoryPageProps
> = async () => {
    const categories = await BlogsService.getCategories();
    return {
        props: {
            categories,
        },
    };
};

interface CategoryPageProps {
    categories: CategoryType[];
}
