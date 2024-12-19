"use client";

import { IPost, IUser } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Button from "../ui/button";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
// import React, { Dispatch, SetStateAction } from 'react'

interface Props {
    placeholder: string;
    // isComment?: boolean

    user: IUser;
    setPosts: Dispatch<SetStateAction<IPost[]>>;
    postId?: string;
    isComment?: boolean;
    // posts: IPost[]
    // setPosts: Dispatch<SetStateAction<IPost[]>>
}

const Form = ({ placeholder, user, setPosts, isComment, postId }: Props) => {
    const [body, setBody] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    
    const onSubmit = async () => {//yani form componentga submit bo'lganda ishlaydigan function vazifasi post create qilish
        //bu function onsubmit yani inputga post submit qilish functioni bu function async chunki serverga so'rov jo'natadi
        try {
            setIsLoading(true); //isloadingni boshlang'ich qiymati false shu sabab so'rov jonatilayotganda true qilish kerak yani kutib turish kerak

            if (isComment) {
                //agar boolean qiymatiga ega iscomment true bo'lsa axios bilan api papkani ichidagi comments papkani ichidagi route.ts papkaga so'rov jo'natadi so'rov uchun axiosga String typli body userni idisi va postni idisi kerak bu datalar api papkani ichidagi comments papkani ichidagi route.ts ichida aytib qo'yilgan
                const { data } = await axios.post("/api/comments", {//so'rov jo'natish//api/comments/route.ts/post nomli functionni oladi yani GET function ichidan oladi
                    body,//distruptatsa bilan axiosga type aytildi//comments.modelda typi aytilgan body
                    userId: user._id,//postni yozgan userni idisi olinadi
                    postId,//post qilinadigan postga unique id bilam  olinadi
                });

                const newComment = {
                    ///agar boolean qiymatiga ega iscomment true bo'lsa axios so'rovni bajarishi uchun datani yani axiosni typlarini bu newcomment o'zgaruvchigam copy qilinadi aks holsa tepadagi o'zgaruvchi ishlab bu o'zgaruvchi ishlamay qolishi mumkun
                    ...data,
                    user,
                    likes: 0,
                    hasLiked: false, //like qilish boshida false bob turadi qachonki shu function ichidagi user ichida kelgan userni idsi bor bo'lib clik qilsagia true bo'ladi
                };

                setPosts((prev) => [newComment, ...prev]); // interface setPosts: Dispatch<SetStateAction<IPost[]>>; ichidagi ipostdan keladigan bo'sh object
            } else {
                const { data } = await axios.post("/api/posts", {
                    body,
                    userId: user._id,
                });
                // console.log(data);

                const newPost = {
                    ...data, //bu data axiosdan keladigan data
                    user, //bu user isuerdan keladigan o'zgaruvchi
                    likes: 0,//setPostsda ipost interface bor va likesga number typi berilgan shu sabab likes distruptatsa bilan chaqirildi va faqat number qabul qiladi
                    hasLiked: false,//ipost interfacedan keladi boolean typi berilgan setPostsga ipost sabab distruptatsa bilan kelgan
                    comments: 0,//ipost interfacedan kelgan  typi number
                    // likes hasliked commentsga bu joyda berilgan qiymatlar jsxda ishlatilganda ko'rinib turadi masalan likes numberda 0 bob yani default holati 0 bob hsliked boolean SHU SABAB hasliked chaqirilgan jsx ichida yani postitem.jsx ichida classiga {post.likes || 0}<<shu boolean topshiriq berilgan yani postda likes ishlamasa yani yo'q bo'lsa va likes number type bo'lgani uchun 0 qaytaradi yoki likesni lengthini yani uzunligini yani sonini qaytaradi
                };
                setPosts((prev) => [newPost, ...prev]);
            }

            setIsLoading(false);
            setBody("");
        } catch (error) {
            setIsLoading(false);

            toast({
                //https://ui.shadcn.com/dan skachat qilingan my own codes fazifasi hatolarni chiroyli qilib qaytaradi buni secces bo'lgandaham ishlatish mumnkun bo'lgan functioniham bor// BU HOLATDA  post.model.ts da yozilgan mongose schemani ishlatadigan posts papkadagi roue,tsda yozilgan user post qilishini taminlaydigan POST function ishlamaganda shu hatoni qaytaradi
                title: "Error",
                description: "Something went wrong. Please try againNNN    ",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="border-b-[1px] border-neutral-800 px-5 py-2">
            <div className="flex flex-row gap-4">
                <Avatar>
                    {/* bu avatar user psot qo'yadigan joyda chiqadigan avatar interfaceda userda iuser borligi uchun mongodbdagi userni avayatarini tanib olepti agar userni profileiamgesikelmasa user.name[0] bilam userni emailini yoki usdernaesini bosh harifini oladi */}
                    <AvatarImage src={user.profileImage} />

                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>

                <div className="w-full">
                    <textarea
                        className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white h-[50px]"
                        placeholder={placeholder}
                        disabled={isLoading} //boshlang'ich qiymati false yani disablet bo'lganda loading false bob turadi chunki texareyada hech qanday harakat sodir bo'lmayotgan bo'ladi
                        value={body} //bu valuedagi bodyda bo'sh massiv bor yani bu form qayerda chaqirib ishlatilsa ichida value chaqirilsa
                        onChange={(e) => setBody(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
                    ></textarea>

                    <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />

                    <div className="mt-4 flex flex-row justify-end">
                        <Button
                            label={isComment ? "Reply" : "Post"} //iscomment bu boolean typi shu sabab bunga shu joyni o'zida shart qo'yildi agar iscomment true bo'lsa replay yokida post texti chiqsin// shunda bu form chaqirilgan joyda (bu button form ichida yozilgan shunda ichida shu buttoni bor form chaqirilgan joyda yani formni ichida bu buttonni labeliham ishlayveradi labelga Button.tsxda reacnode typi berilgan  ) agar iscomment bor bo'lsa replay chiqadi (masalan  app/(root)/posts/[postId]/page.ts failida iscomment chaqirilgan yani u holatda true yani chaqirilgan shunda postga replay qilish bo'ladi yani replay texti ishlaydi)//lable Bu
                            classNames="px-8" // button custom ui bu esa ts shu sabab buttonga clasname berib bo'lmaydi chunki typini aytish kerak shu sabab bu buttonga qilingan joyida string qabul qiladi deb clasnames alohioda berib qo'yilgan yani kerak bo'lsa qo'shimcha classlar yozish uchun classlar esa string formatida yozilgan shu sabab hato yo'q
                            disabled={isLoading || !body} //agar isloading bor bo'lsa yokida body false bo'lsa yani textarea bo'sh bo'lsa disabled bo'ladi
                            onClick={onSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;
