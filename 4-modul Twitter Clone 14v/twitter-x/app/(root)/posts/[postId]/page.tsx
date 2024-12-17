"use client";
import CommentItem from "@/components/shared/comment-item";
import Form from "@/components/shared/form";
import Header from "@/components/shared/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sliceText } from "@/lib/utils";
import { IPost } from "@/types";
import axios from "axios";
import { formatDistanceToNowStrict } from "date-fns";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { postId: string } }) => {
    const { data: session, status }: any = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingComment, setIsFetchingComment] = useState(false);
    const [post, setPost] = useState<IPost | null>(null); //boshida null qaytaradi ishlatilganda esa yoki ipostni yokida nullni qaytaradi
    const [comments, setComments] = useState<IPost[]>([]); //ipostni detallarini alohida massivga yani comments massiviga oladi

    const getPost = async () => {
        try {
            setIsLoading(true); //isloadingda jsxda loader2 iconi bor shu iconni ishlatish yoki ishlatmaslik uchun qilingan state
            const { data } = await axios.get(`/api/posts/${params.postId}`); //api/posts/[postId]/route.ts da yozilgan postni get qiladigan local axios function bu holatdagi params api/posts/[postId]/route.ts da shu ko'rinishda yozilgan>>>> const { postId } = route.params; functionidan kelepti bu {postId} api/posts/[postId]/route.ts da populate qilingan>>>Post.findById(postId).populate yani Post modeldan userni datalarnini yani post yozgan userni qolgan datalarini User modeldan populate qiladi yani ovoladi shunda bu axios get qiladi nimani get qiladi api/posts/[postId]/route.ts da GET functionda post o'zgaruvchida yozilgan mongooseni  findbyid  metodi bilan Post modelga chaqirilgan userni dalnilarini get qiladi ([]<< bu degani nextda dynamic degani yani functiondagi datalarni dynamic qabul qilish yoki yaratish uchun alohida function yozish shartmas []shu ichiuda kelgan papkalardagi faillari yani route.ts bo'lsagina next-13 datalarni dynamic ishlatadi bu nextni qulayliklaridan biri hissoblanadi shunda bu failda api/posts/[postId]/route.ts dan GET functioni bilan userni datalari axios bilan dynamic get qilindi )  ///axios.get(`/api/posts/${params.postId}`) yani api/posts/[postId]/route.ts fail ichidagi etibor ber ```````````<<ichida {params.postId}ni get qiladi/>//route.params ichida esa distruptatsa bilan postId chaqirilgan yani finbyidga esa (postId) berilgan yani findbyid qiladigan ishini params orqali distruptatsa qilingan postId ichiga solib beradi// bu esa ts fail shu uchun Page functioniga buparams va postId nima ekanligini aytib qo'yish shasrt>>>>{ params }: { params: { postId: string } } shunda dynamica ishlaydi
            setPost(data); //axiosni typlari bor datani setpostga berdik bu setpostda ipost bor edi shunda ipost datalari bilan axiosni datasidan keletgan get qilingan postni datalari setpostda bo'ladi va o'zidan oldingi null holatdagi post o'zgaruvchiga solibh beradi shunda setpostni nulli post o'zgaruvchida post va postni yozgan user va pastdagi getComments function sabab postga yozilgan commentlar hammasi useeffect ishlaganda serverdan get qilinadi
            setIsLoading(false); //datalar get qilib bo'linsa loader2 iconi ishlashdan to'htaydi
        } catch (error) {
            console.log(error);
            setIsLoading(false); // moboda error bo'lsaham errordan keyin loader2 iconni ishlashdan to'htatish uchun false qilindi
        }
    };

    const getComments = async () => {
        try {
            setIsFetchingComment(true); //setIsFetchingComment stateda false holatida yani boshida false bo'lishi kerak yani pastdagi useeffect ishlasagina serverdan get qilinadi ungacha false bo'lib turadi tru bo'lganda va serverdan get qilingancha jsxda loader2 ishlab turadi
            const { data } = await axios.get(
                `/api/posts/${params.postId}/comments` ////api/posts/[postId]/comments/route.ts dan keladigan GET function yani bu axios get api/posts/[postId]/comments/route.ts da yozilgan GETni ishlatib beradi
            );
            setComments(data); //setmonnetsga axios get qilgan datalarni qo'shish
            setIsFetchingComment(false); //loaderni o'chirish
        } catch (error) {
            console.log(error);
            setIsFetchingComment(false);
        }
    };

    useEffect(() => {
        //qachonki getPost va getComments functionlari ishlaganda yana serverdan postni datlaricommentlar get qilinsagina ishlaydi yokida yo'q
        getPost();
        getComments();
    }, []);

    console.log(comments);

    return (
        <>
            <Header label="Posts" isBack />

            {isLoading || status === "loading" ? (
                <div className="flex justify-center items-center h-24">
                    <Loader2 className="animate-spin text-sky-500" />
                </div>
            ) : (
                <>
                    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer bg-neutral-900 transition">
                        <div className="flex flex-row items-center gap-3">
                            <Avatar>
                                <AvatarImage src={post?.user.profileImage} />
                                {/* profileImage kelmay qolsaham hato chiqmasligi uchun query parametr ? qo'yildi yani kelmay qolsaham hato chiqmaydi */}
                                <AvatarFallback>
                                    {post?.user.name[0]}
                                </AvatarFallback>
                            </Avatar>

                            <div>
                                <div className="flex flex-row items-center gap-2">
                                    <p className="text-white font-semibold cursor-pointer hover:underline">
                                        {post?.user.name}
                                    </p>

                                    <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                                        {post && post?.user.username
                                            ? `@${sliceText(
                                                  post.user.username,
                                                  20
                                              )}` //agar userni username bor bo'lsa yani user gmail yoki githubdanmas ozi account created qilib kirgan bo'lsagina va mobodo shu username 20 ta harifdan kop' bo'lsa faqat 20 tasinigina ko'rsat yokida user gmail yoki github bilan kirgan bo'lsa emailini 20 ta harfini ko'rsat //////postdan kelishi kerak bo'lgan username mobodo boyagidan kelmay qolsa yani user gmail yoki githubdan kirgan bo'lsa username kelmasa hato chiqmasligi uchun post? qilindi yani query parametr ? qo'yildi yani postni ichidagi datalardan birirtasi kelmay qolasaham hato chiqmaydi bu ts uchun kerak
                                            : post &&
                                              sliceText(post.user.email, 20)}
                                    </span>

                                    <span className="text-neutral-500 text-sm">
                                        {post &&
                                            post.createdAt &&
                                            formatDistanceToNowStrict(
                                                new Date(post.createdAt)
                                            )}
                                    </span>
                                </div>

                                <div className="text-white mt-1">
                                    {post?.body}
                                    {/* postni bodysi chaqirildi yani String typli */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Form
                        // app/(root)/posts/[postId]/page.ts yani shu failda postga bosilgandan keyin datalari va postni o'zi yani bodysnidan keyin orada form bor yani postga comment yozish boshqa user postga comment yozish uchun setPostsga setComment berib qo'yildi setCommentsda esa comment yozgan userni datalari keladi shunda user comment yozsa serverga boradi va comment model sabab serverda qoladi va boshqa user kirganda isFetchingComment ishlab commentlar fetching bo'ladi yngi user esa hohlasa shu fetching bo'lgan commentlargaham comment yozishi mumkun yani form component ichida yozishi mumkun
                        placeholder="Post your reply?"
                        user={JSON.parse(JSON.stringify(session.currentUser))}
                        setPosts={setComments}
                        postId={params.postId}
                        isComment
                    />

                    {isFetchingComment ? ( //isFetchingComment holati bo'lsa yani serverdan commentga aloqador datalar keletganda shu loader2 iconi ishleydi yokida datalar kelib bo'lsa va bu loader2 ishlashdan to'htasa yani false bo'lsa pastdagi map function ishlab comments o'zgaruvchi ichida get qilingan commentni datalari map qilinib commentitem componentiga jo'natilsin
                        <div className="flex justify-center items-center h-24">
                            <Loader2 className="animate-spin text-sky-500" />
                        </div>
                    ) : (
                        comments.map(
                            (
                                comment //serverdan getComments functionida get qilingan datalar map qilinib  commentItem componentiga jo'natildi
                            ) => (
                                <CommentItem
                                    comment={comment} //endi bu comment qiymati commentitem comonentdaham chaqirilib typoi aytib ishlatilishi shart qolgan qiymatlarham shu chunki bu ts
                                    key={comment._id}
                                    user={JSON.parse(
                                        JSON.stringify(session.currentUser) //serverdan keletgan userni json formatga o'girvolish
                                    )}
                                    setComments={setComments}
                                    comments={comments}
                                />
                            )
                        )
                    )}
                </>
            )}
        </>
    );
};

export default Page;
