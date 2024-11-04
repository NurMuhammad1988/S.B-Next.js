// next 14 faillar structurasi (root) bu ildiz papka degani yani next js asosiy sahifani shunday izlaydi agar app papkani ichida page.tsx file bo'lmasa next (root)ni ichidan (home)ni ichidan page.tsxni topib asosiy sahifa qiladi next jsda bu ()structura funksiyasi yozilgan
"use client";
import Form from "@/components/shared/form";
import Header from "@/components/shared/header";
import PostItem from "@/components/shared/post-item";
import { IPost } from "@/types";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
// import { authOptions } from "@/lib/auth-options";//server component
// import { getServerSession } from "next-auth";//server component

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
export default function Page() {
    // const session: any = await getServerSession(authOptions);//server component
    const { data: session, status }: any = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        const getPosts = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get("/api/posts?limit=10");
                setPosts(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        getPosts();
    }, []);

    return (
        <>
            <Header label="Home" isBack />
            {isLoading || status === "loading" ? (
                <div className="flex justify-center items-center h-24">
                    <Loader2 className="animate-spin text-sky-500" />
                </div>
            ) : (
                <>
                    <Form
                        placeholder="What's on your mind?"
                        user={JSON.parse(JSON.stringify(session.currentUser))}
                        setPosts={setPosts}
                    />

                    {posts.map((post) => (  
                        <PostItem key={post._id} post={post} user={JSON.parse(JSON.stringify(session.currentUser))}  setPosts={setPosts}
                        
                        />
                    ))}
                </>
            )}
        </>
    );
}

// #7Post detail darsida qoldi post detaildardigacha qilingan darslarni commentlarini halqilin keyin #7Post detail darsidan davom et

// #7Post detail darsida qoldi post detaildardigacha qilingan darslarni commentlarini halqilin keyin #7Post detail darsidan davom et

// #7Post detail darsida qoldi post detaildardigacha qilingan darslarni commentlarini halqilin keyin #7Post detail darsidan davom et

// #7Post detail darsida qoldi post detaildardigacha qilingan darslarni commentlarini halqilin keyin #7Post detail darsidan davom et

// #7Post detail darsida qoldi post detaildardigacha qilingan darslarni commentlarini halqilin keyin #7Post detail darsidan davom et

// #7Post detail darsida qoldi post detaildardigacha qilingan darslarni commentlarini halqilin keyin #7Post detail darsidan davom et

// #7Post detail darsida qoldi post detaildardigacha qilingan darslarni commentlarini halqilin keyin #7Post detail darsidan davom et

// #7Post detail darsida qoldi post detaildardigacha qilingan darslarni commentlarini halqilin keyin #7Post detail darsidan davom et

// #7Post detail darsida qoldi post detaildardigacha qilingan darslarni commentlarini halqilin keyin #7Post detail darsidan davom et

// #7Post detail darsida qoldi post detaildardigacha qilingan darslarni commentlarini halqilin keyin #7Post detail darsidan davom et

// #7Post detail darsida qoldi post detaildardigacha qilingan darslarni commentlarini halqilin keyin #7Post detail darsidan davom et

// #7Post detail darsida qoldi post detaildardigacha qilingan darslarni commentlarini halqilin keyin #7Post detail darsidan davom et

// #7Post detail darsida qoldi post detaildardigacha qilingan darslarni commentlarini halqilin keyin #7Post detail darsidan davom et

// #7Post detail darsida qoldi post detaildardigacha qilingan darslarni commentlarini halqilin keyin #7Post detail darsidan davom et

// #7Post detail darsida qoldi post detaildardigacha qilingan darslarni commentlarini halqilin keyin #7Post detail darsidan davom et

// #7Post detail darsida qoldi post detaildardigacha qilingan darslarni commentlarini halqilin keyin #7Post detail darsidan davom et

// #7Post detail darsida qoldi post detaildardigacha qilingan darslarni commentlarini halqilin keyin #7Post detail darsidan davom et

// #7Post detail darsida qoldi post detaildardigacha qilingan darslarni commentlarini halqilin keyin #7Post detail darsidan davom et

// #7Post detail darsida qoldi post detaildardigacha qilingan darslarni commentlarini halqilin keyin #7Post detail darsidan davom et

// #7Post detail darsida qoldi post detaildardigacha qilingan darslarni commentlarini halqilin keyin #7Post detail darsidan davom et

// #7Post detail darsida qoldi post detaildardigacha qilingan darslarni commentlarini halqilin keyin #7Post detail darsidan davom et

// #7Post detail darsida qoldi post detaildardigacha qilingan darslarni commentlarini halqilin keyin #7Post detail darsidan davom et

// #7Post detail darsida qoldi post detaildardigacha qilingan darslarni commentlarini halqilin keyin #7Post detail darsidan davom et

// #7Post detail darsida qoldi post detaildardigacha qilingan darslarni commentlarini halqilin keyin #7Post detail darsidan davom et