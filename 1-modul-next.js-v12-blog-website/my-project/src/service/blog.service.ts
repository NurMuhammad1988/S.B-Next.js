import { request, gql } from "graphql-request"; ////hygraphda qilingan serverni ishlatish uchun kerak bo'ladigan librarylar
import { BlogsType } from "src/interface/blogs.interface";
import { CategoryType } from "src/interface/catigories.interface";

const graphqlAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string; //graphqlAPI bu shunchaki constni nomi va process js objecti bilan next jsga hygraphda yozilgan serverni olish uchun ishlatilgan keyni browserdan yani boshqa userlardan yashirish// bu process objectida chaqirilgan keylar browserda ko'rinmaydi himoya uchun yani NEXT_PUBLIC_HYGRAPH_ENDPOINT .env.local fileda yozilgan shu sabab local yani faqat dasturchiga ko'rinadi va bu string ekanliginiham aytib qo'yish kerak chunki loyihada ts bor bo'masa hato chiqadi yani ts buni nim aekanligini tanimasligi mumkun

export const BlogsService = {
    //constructor
    async getAllBlogs() {
        //bu server bilan aloqa qialdigan async funksiyalar qo'lda yozilgan metod hissoblanadi yani axipos bilanmas qo'lda get qilinmoqda
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
                    description {
                        text
                    }
                }
            }
        `;

        const result = await request<{ blogs: BlogsType[] }>(graphqlAPI, query); //hygraph serverdan blogs nomli object qaytradi massiv ichida yani onasi massiv bo'lgan object qaytradi  // serverdan await bo'lib keladigan datalarni genericga olib  blogs deb nom berib bu serverdan keladigan datalarni type interface papka ichidagi blogs.interface.ts fileda yozilgana BlogsType bo'lsin deyildi blogstypeda hygraph serverdan keladigan datalarni typlari yozilgan... tsda agar typlar yozilmasa hato chiqadi shu sabab hamma datalarni funksiyalarni type bo'lishi shart
        return result.blogs; //yani bu funksiya qaytarsin reusult o'zgaruvchini va ichidagi blogsni blogs esa ts uchun qilingan tipizatsa hissoblanadi yani blogsda BlogsType bor
    },

    async getLatestBlog() {
        //ohirigi bloglarni chaqirish hygraphdan ohirgi 3 ta blog lates bo'limida turadi//sidebarda ishlatilgan
        const query = gql`
            query GetLatestBlog {
                blogs(last: 3) {
                    id
                    slug
                    title
                    createdAt
                    image {
                        url
                    }
                    description {
                        text
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

    async getCategories() {
        //idebarda ishlatilgan
        //gategories bo'limi uchun ochilgan query yani serverdan datalarni olish hygraphda bu server alohida queryda yozilgan MyQuery nomli  lekin loyihaga hygraphdan object chaqirilganda nomini o'zgartirish mumkun bu holatda GetCategories unda dastur serverdan datani chaqirganda adashib ketmeydimi?? adashmeydi chunki gql buni aniq taniydi agar bu>>>
        //  categories
        // {slug
        //label} haygraphda mani keyim bor accountda bor bo'lsa bo'ldi shu categoriesni chaqirib keladi gql hygraph uchun mahsus kutubhona

        //graphqlAPI bu holatda mani hygraphda bor accountimda yozilgan serverni keyi bor o'zgaruvchi shu sabab gql bularni taniydi masalan gql o'zi chaqirilgan o'zgaruvchioni parametriga qaraydi va ichida graphqlAPIni ko'radi graphqlAPIni ichiga qareydi ichida o'zi taniydigan hygraphni keyini ko'radi keyni ko'rib shu keyni hygraph serverdan izlaydi va shu key bor objectni ichidagi qiymatlarni masalan bu holatda categoriesni chaqirib keladi

        const query = gql`
            query GetCategories {
                categories {
                    slug
                    label
                }
            }
        `;

        const result = await request<{ categories: CategoryType[] }>(
            graphqlAPI,
            query
        );
        return result.categories;
    },

    async getDetailedBlogs(slug: string) {
        //getDetailedBlogs haygraph serverda yozilgan file sluglarni qaytaradi yani hygraphda yozilgan maqolalarni slugini qaytaradi ``<<shuni ichidagi gql ichida yozilgan server kodlar hygraphda yozilgan tsda ishlangani uchun slugni qandat type ekanligiham yoizb qo'yilishi shart
        const query = gql`
            query GetDetailedBlog($slug: String) {
                blog(where: { slug: $slug }) {
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
                    description {
                        html
                        text
                    }
                }
            }
        `;

        const result = await request<{ blog: BlogsType[] }>(graphqlAPI, query, {
            slug,
        });
        return result.blog;
    },

    async getDetailedCategoriesBlog(slug: string) {
        const query = gql`
            query getGategoriesBlog($slug: String!) {
                blogs(where: { category: { slug: $slug } }) {
                   
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
                    description {
                        text
                    }

                }
            }
        `;

        const result = await request<{ blogs: BlogsType[] }>(graphqlAPI, query, {slug});
        return result.blogs;
    },

    

};

// query MyQuery($slug: String = "mobiles") {
//  blogs(where: {category: {slug: $slug}}) {
//  id
//  title
//  }
// }

// query GetDetailedBlog {($slug: String = "hygraphcom-va-nextjs-bilan-blog-sayt-yaratish")
//     blog(where: {slug: $slug}) {
//       excerpt
//       id
//       slug
//       title
//     }
//   }

// query GetDetailedBlog {
//     blog(where: {slug: "$slug"}) {
//       excerpt
//       id
//       slug
//       title
//     }
//   }

// query GetDetailedBlog($slug: String = "hygraphcom-va-nextjs-bilan-blog-sayt-yaratish") {
//     blog(where: {slug: $slug}) {
//         excerpt
//         id
//         slug
//         title
//         description {
//           html
//         }
//       }
//     }
