//yarn add graphql graphql-request// hygraphda qilingan tayyor serverni ishlatish uchun kerak bo'ladigan librariylar lekin bular yangi versiyalari bo'lgani uchun ishlamadi shu nom bilan bir hil lekin dars qilingan paytdagi versiyasi bu eski versiyasini download qilish buyrug'i>>>yarn add graphql-request@5.1.0 <<<shu bilan ishladi

import { gql, request } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

export const BlogsService = {
    //constructor
    9. GraphQL darsida hato bor
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

        const result = await request(graphqlAPI, query);
        return result;
    },
};
