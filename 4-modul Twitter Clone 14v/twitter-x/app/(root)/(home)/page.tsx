// next 14 faillar structurasi (root) bu ildiz papka degani yani next js asosiy sahifani shunday izlaydi agar app papkani ichida page.tsx file bo'lmasa next (root)ni ichidan (home)ni ichidan page.tsxni topib asosiy sahifa qiladi next jsda bu ()structura funksiyasi yozilgan

import Form from "@/components/shared/form";
import Header from "@/components/shared/header";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";

// import Auth from "@/components/auth";
// export default function Page() {
//     const user = false;
//     if (!user) {
//         //agar user yo'q bo'lsa yani false bo'lsa Auth componentga otvoradi lekun user yo'q chunki yuqorida false qilingan shu sabab aftamati tarzda auth pagega jo'natadi
//         return <Auth />;
//     }

//     return <div>Page</div>;
// }

/////////////////////////////////////////////////////////////////////
export default async function Page() {

    const session: any = await getServerSession(authOptions)
    return (
        <>
            <Header label="Home" isBack></Header>
            <Form placeholder="What's on your mind?"
            user={JSON.parse(JSON.stringify(session.currentUser))}
            />
        </>
    );
}
