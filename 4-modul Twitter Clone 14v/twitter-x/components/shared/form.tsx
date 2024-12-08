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

    const onSubmit = async () => {
        try {
            setIsLoading(true);

            if (isComment) {
                const { data } = await axios.post("/api/comments", {
                    body,
                    userId: user._id,
                    postId,
                });

                const newComment = {
                    ...data,
                    user,
                    likes: 0,
                    hasLiked: false
                }

                setPosts((prev) => [newComment, ...prev])

            } else {
                const { data } = await axios.post("/api/posts", {
                    body,
                    userId: user._id,
                });
                // console.log(data);

                const newPost = {
                    ...data,
                    user,
                    likes: 0,
                    hasLiked: false,
                    comments: 0,
                };
                setPosts((prev) => [newPost, ...prev]);
              
            }

            setIsLoading(false);
            setBody("");
        } catch (error) {
            setIsLoading(false);

            toast({
                title: "Error",
                description: "Something went wrong. Please try again    ",
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
                        disabled={isLoading}//boshlang'ich qiymati false yani disablet bo'lganda loading false bob turadi chunki texareyada hech qanday harakat sodir bo'lmayotgan bo'ladi
                        value={body}//bu valuedagi bodyda bo'sh massiv bor yani bu form qayerda chaqirib ishlatilsa ichida value chaqirilsa
                        onChange={(e) => setBody(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
                    ></textarea>

                    <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />

                    <div className="mt-4 flex flex-row justify-end">
                        <Button
                            label={isComment ? "Reply" : "Post"}//iscomment bu boolean typi shu sabab bunga shu joyni o'zida shart qo'yildi agar iscomment true bo'lsa replay yokida post texti chiqsin
                            classNames="px-8"// button custom ui bu esa ts shu sabab buttonga clasname berib bo'lmaydi chunki typini aytish kerak shu sabab bu buttonga qilingan joyida string qabul qiladi deb clasnames alohioda berib qo'yilgan yani kerak bo'lsa qo'shimcha classlar yozish uchun classlar esa string formatida yozilgan shu sabab hato yo'q
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
