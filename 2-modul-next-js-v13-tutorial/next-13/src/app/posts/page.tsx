// import { PostType } from "@/interface";
// import axios from "axios";
// import Link from "next/link";

// ////component papkani ichidagi homepageda shu datalarni serverdan CSRda chaqirilgani yani fetching qilingani bor lekin bu sahifaga aloqasi yo'q shunchaki SSR va CSR holatlari bitta app ichida o'rganish uchun qilindi

// //SSR sahifa
// //bu postpage sahifasi SSRda qilindi va navbarga chaqirildi navbar esa CSRda qilingan shundaham navbarda posts buttonida chaqirilgan bu sahifa SSR holatda ishlayapti yani loadingsiz user browserda ochmasdan datalar kelib turipti

// //bu async funskiya next 13 da APP router padhodda SSR qilish lekin page router padhooda yani 1-modulda SSR qilishni nextda o'zini shaxsiy funksiyalari bor edi serversidepropsnomli edi ikkala padhoddaham SSR qilish bir hil ishlaydi faqat kodlarda farqi bor

// async function getData() {
//     //nextni app router padhodida SSR qilinganda datalar serverdan async funksya bilan chaqirilishi kerak
//     const { data } = await axios.get(
//         "https://jsonplaceholder.typicode.com/posts?_limit=10"
//     );

//     return data;
// }

// const PostPage = async () => {

//     //next js app router padhodda datalar chaqirilganda async funksiya bilan chaqirilishi kerak va serverdan keladigan datalar ishlatiladigan sahifaham async bo'lishi kerak (agar async bo'lmasa datalar kelmay qolsa sahifa ochilmay loadingmi boshqami ishlab turadi user tushunmey qoladi shu sabab serverdan keladigan datalarni ko'rsatadigan bu postpage sahifaham async bo'lishi shart buham next jsno qonuni)

//     const data: PostType[] = await getData();// await qilinib data va datadagi malumotlarni typlari genericda yozilib bu const ichida kelgan await funksiyaga getData funksiyasi chaqirib qo'yildi yani endi await sihlaganda getData funskiyani yani axios bilan datalani fetch qiladigan funksiyani ishlatadi shunda serverdan datalar asonhron tarzda yani bittada keladi hech narsani kutmeydi

//     return (
//         <>
//             {/* {data.map((c) => ( */}
//                 {/* <div key={c.id}> */}
//                     <table border={1}>
//                         <thead>
//                             <th>id</th>
//                             <th>title</th>
//                         </thead>
//                         <tbody>
//                             {data.map(c => (
//                                 <tr key={c.id}>
//                                     <td>{c.id}</td>
//                                     <td>
//                                         <Link href={`/posts${c.id}`}>{c.title}</Link>
//                                         {/* id bor lekin title yo'q   */}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>

//                     {/* <Link href={`/posts/${c.id}`}>{c.title}</Link> */}
//                 {/* </div> */}
//             {/* ))} */}
//         </>
//     );
// };

// export default PostPage;
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

////SSRda datalar serverdan kelguncha loader qo'yish huddiki CSRda bo'lgani kabi loaderni suniy hosil qilish yani serverni loading bu reactda bo'ladigan loaderlardan farq qiladi farqi pastda yozilgan lekin bu seo uchun juda yomon chunki browser sahifani ochetganda html bo'lmaydi bu esa seo uchun google botlari ishlaganda htmlsiz sahifa to'g'rirog'i html seo qilinmagan sahifani indexlaydi bu degani seo nol degani buni ishlatish kerakmas
// import { PostType } from "@/interface";
// import axios from "axios";
// import Link from "next/link";
// import {notFound} from "next/navigation"//bu notFound nextda keladigan funksiya

// ////component papkani ichidagi homepageda shu datalarni serverdan CSRda chaqirilgani yani fetching qilingani bor lekin bu sahifaga aloqasi yo'q shunchaki SSR va CSR holatlari bitta app ichida o'rganish uchun qilindi

// //SSR sahifa
// //bu postpage sahifasi SSRda qilindi va navbarga chaqirildi navbar esa CSRda qilingan shundaham navbarda posts buttonida chaqirilgan bu sahifa SSR holatda ishlayapti yani loadingsiz user browserda ochmasdan datalar kelib turipti

// //bu async funskiya next 13 da APP router padhodda SSR qilish lekin page router padhooda yani 1-modulda SSR qilishni nextda o'zini shaxsiy funksiyalari bor edi serversidepropsnomli edi ikkala padhoddaham SSR qilish bir hil ishlaydi faqat kodlarda farqi bor

// async function getData() {
//     //nextni app router padhodida SSR qilinganda datalar serverdan async funksya bilan chaqirilishi kerak
//     const { data } = await axios.get(
//         // "https://jsonplaceholder.typicode.com/posts?_limit=10"

//         "https://jsonplaceholder.typicode.com/posts?_limit=0"//notFound funksiyasini tekshirib ko'rish uchun datalarni kelmasligi taminlandi

//     );

//     await new Promise((resolve) =>
//     // SSRda serverdan keladigan datalarni loading qilish yani datani 2 sekund kechiktirib olish Promise JSni constructori js darslarida bor
//         setTimeout(() => {
//             resolve("");
//         }, 2000)
//     );

//     return data;
// }

// const PostPage = async () => {
//     const data: PostType[] = await getData();

//     if(!data.length){//agar datani unuznligi bo'lmasa demak hech narsa topilmasa datalar kelmasa yani false bo'lsa ! truni false qiladi aslida if else birinchi truni qabul qiladi
//         notFound()//notFoun bu nextda funskiya hatolar chiqganda yokida ssrda datalar serverdan kelmay qolganda userga info berish uchun ishlatiladi masalan postlar datada kelmay qolsa ishlatish uchun datalar fetch qilinetgan shu pageni  ona papkasida yani posts papkasi ichida not-found.tsx nomli papka bo'lishi shart shunda nextni bu notFound funkssiyasi hato chiqganda userni not-found.tsx failga jo'natadi nod-found.tsx bu next js uchun kalit papkani nomi muhum bo'lmasa next js tanimaydi

//     }

//     return (
//         <>
//             {/* {data.map((c) => ( */}
//             {/* <div key={c.id}> */}
//             <table border={1}>
//                 <thead>
//                     <th>id</th>
//                     <th>title</th>
//                 </thead>
//                 <tbody>
//                     {data.map((c) => (
//                         <tr key={c.id}>
//                             <td>{c.id}</td>
//                             <td>
//                                 <Link href={`/posts${c.id}`}>{c.title}</Link>
//                                 {/* id bor lekin title yo'q   */}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* <Link href={`/posts/${c.id}`}>{c.title}</Link> */}
//             {/* </div> */}
//             {/* ))} */}
//         </>
//     );
// };

// export default PostPage;
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

////bu darsdan boshlab serverda fetch qilandigan datalar alohida components ichidagi posts.tsx failga olindi yuqoridagi darslardan farqi yo'q faqat kodlar holati o'zgardi
import Posts from "@/component/posts";
import { PostType } from "@/interface";
import axios from "axios";
import { notFound } from "next/navigation";

async function getData() {
    const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?_limit=10"
    );

    await new Promise((resolve) =>
        setTimeout(() => {
            resolve("");
        }, 2000)
    );

    return data;
}

const PostPage = async () => {
    const data: PostType[] = await getData();

    if (!data.length) {
        notFound();
    }

    return (
        <>
          <Posts data={data}/>
          {/* posts.tsx ga datalar props qilib jo'natildi */}
        </>
    );
};

export default PostPage;
