//yarn add graphql graphql-request// hygraphda qilingan tayyor serverni ishlatish uchun kerak bo'ladigan librariylar lekin bular yangi versiyalari bo'lgani uchun ishlamadi shu nom bilan bir hil lekin dars qilingan paytdagi versiyasi bu eski versiyasini download qilish buyrug'i>>>yarn add graphql-request@5.1.0 <<<shu bilan ishladi

import { request, gql } from "graphql-request";
import { BlogsType } from "src/interface/blogs.interface";

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

export const BlogsService = {
    //constructor
    // 9. GraphQL darsida hato bor
    async getAllBlogs() {
        const query = gql`
            query GetBlogs {
                blogs {
                    excerpt
                    id
                    slug
                    title
                    image {
                        url
                    }
                    author {
                        name
                        avatar {
                            url
                        }
                    }
                    category {
                        label
                        slug
                    }
                }
            }
        `;

        const result = await request<{ blogs: BlogsType[] }>(graphqlAPI, query); //hygraph serverdan blogs nomli object qatradi massiv ichida yani onasi massiv bo'lgan object qaytradi  // serverdan await bo'lib keladigan datalarni genericga olib  blogs deb nom berib bu serverdan keladigan datalarni type interface papka ichidagi blogs.interface.ts fileda yozilgana BlogsType bo'lsin deyildi blogstypeda hygraph serverdan keladigan datalarni typlari yozilgan... tsda agar typlar yozilmasa hato chiqadi shu sabab hamma datalarni funksiyalarni type bo'lishi shart
        return result.blogs//yani bu funksiya qaytarsin reusult o'zgaruvchini va ichidagi blogsni blogs esa ts uchun qilingan tipizatsa hissoblanadi 
    },
};
