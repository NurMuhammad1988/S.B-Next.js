import { request, gql } from "graphql-request"; ////hygraphda qilingan serverni ishlatish uchun kerak bo'ladigan librarylar
import { BlogsType } from "src/interface/blogs.interface";

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string; //graphqlAPI bu shunchaki constni nomi va process js objecti bilan next jsga hygraphda yozilgan serverni olish uchun ishlatilgan keyni browserdan yani boshqa userlardan yashirish// bu process objectida chaqirilgan keylar browserda ko'rinmaydi himoya uchun yani NEXT_PUBLIC_HYGRAPH_ENDPOINT .env.local fileda yozilgan shu sabab local yani faqat dasturchiga ko'rinadi va bu string ekanliginiham aytib qo'yish kerak chunki loyihada ts bor bo'masa hato chiqadi yani ts buni nim aekanligini tanimasligi mumkun

export const BlogsService = {
    //constructor
    async getAllBlogs() {
        //bu async funksiya chunki hygraph serverdan datalar get qilinetganda kutish bo'masligi kerak yani async funksiyani hech narsani yani o'zidan oldingi funksiyalarni  kutmaydi birinchi ishlaydi//query shunchaki nom yani queryda chaqirilgan gql asosiy ishlaydigan kutubhona
        const query = gql`
            query GetBlogs {
                blogs {
                    excerpt
                    id
                    slug
                    title
                    createdAt
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

        const result = await request<{ blogs: BlogsType[] }>(graphqlAPI, query); //hygraph serverdan blogs nomli object qaytradi massiv ichida yani onasi massiv bo'lgan object qaytradi  // serverdan await bo'lib keladigan datalarni genericga olib  blogs deb nom berib bu serverdan keladigan datalarni type interface papka ichidagi blogs.interface.ts fileda yozilgana BlogsType bo'lsin deyildi blogstypeda hygraph serverdan keladigan datalarni typlari yozilgan... tsda agar typlar yozilmasa hato chiqadi shu sabab hamma datalarni funksiyalarni type bo'lishi shart
        return result.blogs; //yani bu funksiya qaytarsin reusult o'zgaruvchini va ichidagi blogsni blogs esa ts uchun qilingan tipizatsa hissoblanadi yani blogsda BlogsType bor
    },

    async getLatestBlog() {
        const query = gql`
        query GetLatestBlog {
            blogs (last: 2) {
                id
                slug
                title
                createdAt
                image {
                    url
                }
                author {
                    name
                    avatar {
                        url
                    }
                }
               
            }
        }
        `;

        const result = await request<{ blogs: BlogsType[] }>(graphqlAPI, query);
        return result.blogs;
    },  
};

11. Integratsiay 09:36 chi minutda qoldi