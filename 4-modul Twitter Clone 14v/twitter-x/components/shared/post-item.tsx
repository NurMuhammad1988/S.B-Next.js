"use client";
import { IPost, IUser } from "@/types";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { sliceText } from "@/lib/utils";
import { formatDistanceToNowStrict } from "date-fns"; //npm i date-fns
import { AiFillDelete, AiOutlineMessage } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
    post: IPost; //post populate bo'lgani uchun frontedga mongodbdan kelgan userni datalari chiqadi yani  idsi sabab chiqadi
    user: IUser;
    setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}
// app (root) yani ildiz papka home paage.ts papkadan posts state ichida map qilib jo'natilgan bu postitem componentda state postsda yozilgan qiymatlar chaqirilib ishlatilishi shart va bu qiymatlarga postsdagi typlar bilan bir hil type berilishi kerak yuqoridagi interfaceda postsdan props bilan chaqiraloytgan map qilingan datalarga typlar berib qo'yildi

const PostItem = ({ post, user, setPosts }: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const onDelete = async (e: any) => {
        e.stopPropagation();
        try {
            setIsLoading(true); //loading axios so'rov jo'natgancha ishlab turishi kerak

            await axios.delete(`/api/posts`, {
                //bu delete local ishlatilepti yani asosiy DELETE functionini ishlatib berepti asosiy delete functoni node.jsdan compdan request bilan kelgan /api/posts/route.ts da yozilgan  bodyga esa data nomli o'zgaruvchi yaratib yani nimani udalit qilishi aytildi yani post._idni udalit qilish aytildi bu post._id esa /api/posts/route.ts da distruptatsa qilib chaqirib olingan va json formatga o'girilgan yani serverda turgan udalit qilinishi kerak bo'lgan idni bor post DELETE global functionga chaqirilishi kerak bo'lmasa global DELETE nimani udalit qilisni topa olmaydi
                data: {
                    postId: post._id,
                },
            });
            setPosts((prev) => prev.filter((p) => p._id !== post._id)); //eskisi olindi idsi bo'yicha udalit qilindi???/// yani setpostsda ipost bor ipostda user va postni detallari bor axios udalit qilganda filter metodiham ishlab agar id_ bor bo'lsa va postdan keletgan idga teng bo'lmasaginabu axios delete so'rovi ishlaydi////Filtrlash usuli callback yani onDelete = async => funktsiyasining qaytish qiymatini mantiqiy sifatida baholaydi . Agar qaytarilgan qiymat haqiqat bo'lsa, massiv elementi saqlanadi. Agar u noto'g'ri bo'lsa, massiv elementi o'chiriladi. shuu sabab !<<bu berildi chunki postni udalit qilish uchun axios ishlaganda  qaytadigan qiymat noto'g'ri bo'lishi kerak shu sabab notogri qilindi
            setIsLoading(false); //axios so'rov jo'natib bo'lgandan keyin loading to'htashi kerak
        } catch (error) {
            setIsLoading(false);

            return toast({
                title: "Error",
                description: "Something went wrong. Please try again later.",
                variant: "destructive",
            });
        }
    };

    // console.log(post);

    const onLike = async (e: any) => {//onlike function pastda like buttonidagi iconga berib qo'yilgan yani yureychaga
        e.stopPropagation();
        try {
            setIsLoading(true);
            if (post.hasLiked) {
                // delete like
                await axios.delete(`/api/likes`, {
                    data: {
                        postId: post._id,
                        userId: user._id,
                    },
                });

                const updatedPosts = {
                    ...post,
                    hasLiked: false,
                    likes: post.likes - 1,
                };

                setPosts((prev) =>
                    prev.map((p) => (p._id === post._id ? updatedPosts : p))
                );
            } else {
                await axios.put(`/api/likes`, {
                    postId: post._id,
                    userId: user._id,
                });

                const updatedPosts = {
                    ...post,
                    hasLiked: true,
                    likes: post.likes + 1,
                };

                setPosts((prev) =>
                    prev.map((p) => (p._id === post._id ? updatedPosts : p))
                );
            }

            // console.log(data);

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            return toast({
                title: "Error",
                description: "Something went wrong. Please try again laterrr.",
                variant: "destructive",
            });
        }
    };

    const goToPost = () => {
        router.push(`/posts/${post._id}`); //router posts papkani ichidagi nextdan dynamic kelgan postni idisiga qarab shu postni asosiy sahifasiga jo'natadi
    };

    const goToProfile = (evt: any) => {
        evt.stopPropagation();
        router.push(`/profile/${post.user._id}`);
    };

    return (
        <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition relative">
            {/* yuqoridagi divda ohirida relative classi bor bu class pastdagi divda ishlatilgan absalute classi bilan birga ishlatiladi huddi async awaitga o'hshab vazifasi divlarnibir biriga ulash yani endi bu ikkala div bir biriga bog'liq yani onadivda relative bo'lishi kerak bu ona divni ichida qaysidur sivda absalute bor bo'lsa absalute  sof va o'zini o'zi ta'minlaydi. Buni amalga oshirish uchun tashqi omillarga tayanmaydi nimani amalga opshirish uchun isloadingni amalga oshirish uchun tashqi ona divga aloqasi yo'q yani isloading true bo'lsa absalute div alohida ishlaydi yani loader ishlaganda faqat shu abssalute classs berilgan divda ishlaydi bu classlar bo'lmasa loader ishletgan paydi ona divgaham tasir qiladi bu esa yahshimas */}
            {isLoading && ( //isloading true bo'lsa yani serverdan postlar kelguncha loader2 ishlab tursin yokida ishlamasin yani bir tomonlama mantiqiy kod yani ifni o'zi bilan ishlaydi
                <div className="absolute inset-0 w-full h-full bg-black opacity-50">
                    <div className="flex justify-center  items-center h-full">
                        <Loader2 className="animate-spin text-sky-500" />
                        {/* serverdan postlar kelguncha ishlab turadigan loader agar postlar kelmasaham kutish vaqtida ishlaydi va asosiy sahifada qolaveradi */}
                    </div>
                </div>
            )}

            <div
                className="flex flex-row items-center gap-3 cursor-pointer"
                onClick={goToPost} //bu ona div yani userlarni postlar serverdan keladigan ona div gotopost esa bu ona divga click bo'lganda ishlaydigan function yuqorida yozilgan vazifasi click bo'lganda yani serverdan chaqirilgan postga click bo'lganda postni yozgan userni post sahifasiga olib boradi
            >
                <Avatar onClick={goToProfile}>
                    <AvatarImage src={post.user.profileImage} />
                    <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                </Avatar>
                {/*avatarga bosilganda post yozgan userni profile sahifasiga olib boradi lekin nimagadur mongodbdan bolsa kerak juda kech ishlayapti manimcha server juda kech so'rovga javob berepti lekin loader yo'qligi sabab indamey turipti */}

                <div>
                    {/* shu divga loader qo'yish kerak darsda qo'yilmadi lekin kerak mongoodan datalar kelaman degancha hech qanday o'zgarish bo'lmay turipti */}
                    <div
                        className="flex flex-row items-center gap-2"
                        onClick={goToProfile}
                    >
                        <p className="text-white font-semibold  cursor-pointer hover:underline">
                            {post.user.name}
                        </p>

                        {/* mobile versiyadi hidden bo'ladi mdda ko'rinadi */}
                        <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                            {post.user.username
                                ? `@${sliceText(post.user.username, 16)}`
                                : sliceText(post.user.email, 16)}
                            {/* emailni agar uzun bo'b ketsa 16 tadan ortiq hariflarini kesib tashaydi */}
                        </span>

                        <span className="text-neutral-500 text-sm">
                            {formatDistanceToNowStrict(
                                new Date(post.createdAt) ////formatDistanceToNowStrict data-fns kutubhonadan chaqirilgan function vazifasi postni qancha vaqt oldin yozilganini aytib turadi yanidoim hissoblaydi masalan post yozilganiga 345 kun bo'lgan bo'lsa hsuni shuncha vaqt oldin yozilgan deb turadi shu sabab
                            )}{" "}
                            ago
                        </span>
                    </div>

                    <div className="text-white mt-1"> {post.body}</div>
                    {/* postni bodysi yani postni shaxsan o'zi */}

                    <div className="flex flex-row items-center mt-3 gap-10">
                        <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
                            <AiOutlineMessage size={20} />
                            <p>{post.comments || 0}</p>
                        </div>

                        <div
                            className={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500`}
                            onClick={onLike}
                        >
                            <FaHeart
                                size={20}
                                color={post.hasLiked ? "red" : ""}
                                // agar ipost chaqirilgan postda hasliked bor bo'lsa rangi qizil yokida o'zinirodnoy rangida qoladi yani hech qanday qiymat berilmeydi
                            />
                            <p>{post.likes || 0}</p>
                            {/* postda chaqirilgan aslida ipostda turgan likes number type bo'lgani uchun agar postda lies true bo'lsa likeslarni number bilan ko'rsat yo'q bo'lsa 0 ni ko'rsat yani numberni ko'rsat*/}
                            {/*  */}
                        </div>
                        {post.user._id === user._id && ( //bu postni ichidaipost bor shu sabab tanepti va ipostda esa userni idis bor shular teng bo'lsagina bu boolean ishlaydi//yani agar postda keletgan userni idsi shu AiFillDelete iconni bosayotgan userni idisi bilan bir hil bo'lsa onclik ishlaganda ondelete functionini ishlat  bu && yani faqat bitta maqsadda ishlatiladigan if elseni ko'rinishi
                            <div
                                className={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500`}
                                onClick={onDelete}
                            >
                                <AiFillDelete size={20} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostItem;
