"use client";
import { PostType } from "@/interface";
////CSR sahifa lekin asosiy sahifa va shablon SSRda qilingan
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {
    const [isloading, setIsloading] = useState(true);
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        //moounting yani foydalanuvchi birinchi  saytga kirganda ishlaydigan funksiya//yani useeffect bilan mounting bo'lganda getDatadagi malumotlarni ko'rsatdik
        const getData = async () => {
            try {
                const { data } = await axios.get(
                    "https://jsonplaceholder.typicode.com/posts?_limit=10"
                );
                setPosts(data); //setpostsda endi sewrverdan keladigan datalar bor
            } catch (error) {
                console.log(error);
            } finally {
                setIsloading(false); //data serverdan olib bo'lingandan yani kelgandan keyin setisloading edni false bo'ladi yani loading textni yo'qoladi
            }
        };
        getData();
    }, []);

    return (
        <>
            {isloading
                ? // isloading turue bo'lsa yani loading bo'lsa loading bo'lishi esa aniq Loadingni ko'rsat yokida loading tugasa yani finally bo'lsa postsni ichidagi setpsost bilan kelgan datalarni map bilan intrigatsa qilib divni ichida chiqar va linkda postlarni id va titlelari bor
                  "Loading..."
                : posts.map((c) => (
                      <div key={c.id}>
                          <Link href={`/posts/${c.id}`}>{c.title}</Link>
                      </div>
                  ))}
            {/* <div>Home from CSR</div> */}
        </>
    );
};

export default Home;
