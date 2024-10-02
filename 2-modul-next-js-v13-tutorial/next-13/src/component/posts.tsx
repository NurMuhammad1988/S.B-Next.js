
import { PostType } from "@/interface"
import Link from "next/link"
import { FC } from "react"
const Posts: FC<{data: PostType[]}> = ({data}) => {
    // post papkani ichidagi page.tsxda serverdan chaqirilgan datalarni bu Posts sahifasiga chaqirib olindi va typeham berib qo'yildi va propsdan data chaqirib olindi chunki data posts papkani ichidagi page.tsxdaham props bilan distruptatsa qilib jo'natilgan
  return (
    <table border={1}>
    <thead>
        <th>id</th>
        <th>title</th>
    </thead>
    <tbody>
        {data.map((c) => (
            <tr key={c.id}>
                <td>{c.id}</td>
                <td>
                    <Link href={`/posts/${c.id}`}>{c.title}</Link>
                    {/* id bor lekin title yo'q   */}
                </td>
            </tr>
        ))}
    </tbody>
</table>
  )
}
export default Posts

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// "use client";

// import { PostType } from "@/interface";
// import Link from "next/link";
// import { FC, useEffect, useState } from "react";

// const Posts: FC<{ data: PostType[] }> = ({ data }) => {
//     const [mounted, setMounted] = useState(false); //hydration failed hatosini to'g'rilashni birinchi yo'li

//     useEffect(() => {
//         ////hydration failed hatosini to'g'rilashni birinchi yo'li//user saytga birinchi kirganda ishlaydi yani hech narsa yoq' deyiladi shunda shungacha SSRdan datalar kelgandan keyin userga ko'rinadi
//         setMounted(true);
//     }, []);

//     // post papkani ichidagi page.tsxda serverdan chaqirilgan datalarni bu Posts sahifasiga chaqirib olindi va typeham berib qo'yildi va propsdan data chaqirib olindi chunki data posts papkani ichidagi page.tsxdaham props bilan distruptatsa qilib jo'natilgan
//     return (
//         <>
//             {mounted && ( ////hydration failed hatosini to'g'rilashni birinchi yo'li// mounted true bo'lsa table ishlasin yani serverdan datalar SSR orqali kelsa table ko'rinadi
//                 <table border={1}>
//                     <thead>
//                         <th className="text">Id</th>
//                         <th> Title </th>
//                     </thead>
//                     <tbody>
//                         {data.map((c) => (
//                             <tr key={c.id}>
//                                 <td>{c.id}</td>
//                                 <td>
//                                     <Link href={`/posts/${c.id}`}>
//                                         {c.title}
//                                     </Link>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </>
//     );
// };

// export default Posts;
// ///////////////////////////////////////////////////////////////////////////////
// //loyihada shu html tabke sabab hydration failed hatosi chiqdi buni sababi post componentda (<Link href={`/posts/${c.id}`}>{c.title}</Link>) SSR da ishlayotganimiz SSR render bo'layotgan paytda yani loyiha serverdan kelishidan oldin userga ko'rsatilishidan oldin bu html table birinchi chiqib ketadi shu sabab hydration failed hatosi chiqadi
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// "use client";

// import { PostType } from "@/interface";
// import Link from "next/link";
// import { FC, useEffect, useState } from "react";

// const Posts: FC<{ data: PostType[] }> = ({ data }) => {
//     const [mounted, setMounted] = useState(false); //hydration failed hatosini to'g'rilashni birinchi yo'li

//     useEffect(() => {
//         ////hydration failed hatosini to'g'rilashni birinchi yo'li//user saytga birinchi kirganda ishlaydi yani hech narsa yoq' deyiladi shunda shungacha SSRdan datalar kelgandan keyin userga ko'rinadi
//         setMounted(true);
//     }, []);

//     // post papkani ichidagi page.tsxda serverdan chaqirilgan datalarni bu Posts sahifasiga chaqirib olindi va typeham berib qo'yildi va propsdan data chaqirib olindi chunki data posts papkani ichidagi page.tsxdaham props bilan distruptatsa qilib jo'natilgan
//     return (
//         <>
//             <table border={1}>
//                 <thead>
//                     <th className="text">Id</th>
//                     <th> Title </th>
//                 </thead>
//                 <tbody>
//                     {data.map((c) => (
//                         <tr key={c.id}>
//                             <td>{c.id}</td>
//                             <td>
//                                 <Link href={`/posts/${c.id}`}>{c.title}</Link>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </>
//     );
// };

// export default Posts;
// ///////////////////////////////////////////////////////////////////////////////
// //loyihada shu html table sabab hydration failed hatosi chiqdi buni sababi post componentda (<Link href={`/posts/${c.id}`}>{c.title}</Link>) SSR da ishlayotganimiz SSR render bo'layotgan paytda yani loyiha serverdan kelishidan oldin userga ko'rsatilishidan oldin bu html table birinchi chiqib ketadi shu sabab hydration failed hatosi chiqadi
