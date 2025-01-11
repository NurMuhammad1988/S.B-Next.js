// "use client";
// import { IUser } from "@/types";
// import React, { useState } from "react";
// import Button from "../ui/button";
// import { IoLocationSharp } from "react-icons/io5";
// import { BiCalendar } from "react-icons/bi";
// import { formatDistanceToNowStrict } from "date-fns";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import EditModal from "../modals/edit-modal";
// import useEditModal from "@/hooks/useEditModal";
// import Modal from "../ui/modal";
// import { cn } from "@/lib/utils";
// import { Loader2 } from "lucide-react";
// import User from "../shared/user";

// const ProfileBio = ({ user, userId }: { user: IUser; userId: string }) => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [open, setOpen] = useState(false);
//     const [following, setFollowing] = useState<IUser[]>([]);
//     const [followers, setFollowers] = useState<IUser[]>([]);
//     const [isFetching, setIsFetching] = useState(false);
//     const [state, setState] = useState<"following" | "followers">("following");

//     const router = useRouter();

//     const editModal = useEditModal();

//     const onFollow = async () => {
//         try {
//             setIsLoading(true);
//             await axios.put("/api/follows", {
//                 userId: user._id,
//                 currentUserId: userId,
//             });
//             router.refresh(); //???????????????????????????????????????????
//             setIsLoading(false);
//         } catch (error) {
//             console.log(error);
//             setIsLoading(false);
//         }
//     };

//     const onUnFollow = async () => {
//         try {
//             setIsLoading(true);
//             await axios.delete("/api/follows", {
//                 data: { userId: user._id, currentUserId: userId },
//             });
//             router.refresh(); //???????????????????????????????????????????
//             setIsLoading(false);
//         } catch (error) {
//             console.log(error);
//             setIsLoading(false);
//         }
//     };

//     const getFollowUser = async (userId: string, type: string) => {
//         try {
//             setIsFetching(true);
//             const { data } = await axios.get(
//                 `/api/follows?state=${type}&userId=${userId}`
//             );
//             setIsFetching(false);
//             return data;
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const openFollowModal = async () => {
//         try {
//             setOpen(true);
//             const data = await getFollowUser(user._id, "following");
//             setFollowing(data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const onFollowing = async () => {
//         setState("following");

//         if (following.length === 0) {
//             const data = await getFollowUser(user._id, "following");
//             setFollowing(data);
//         }
//     };

//     const onFollowers = async () => {
//         setState("followers");

//         if (followers.length === 0) {
//             const data = await getFollowUser(user._id, "followers");
//             setFollowers(data);
//         }
//     };

//     const onChangeFollowing = async (data: IUser[]) => {};

//     return (
//         <>
//             <EditModal user={user} />
//             <div className="border-b-[1px] border-neutral-800 pb-4">
//                 <div className="flex justify-end p-2">
//                     {userId === user._id ? (
//                         <Button
//                             label={"Edit Profile"}
//                             secondary
//                             onClick={() => editModal.onOpen()}
//                         />
//                     ) : user.isFollowing ? (
//                         <Button
//                             label={"Unfollow"}
//                             outline
//                             onClick={onUnFollow}
//                             disabled={isLoading}
//                         />
//                     ) : (
//                         <Button
//                             label={"Follow"}
//                             onClick={onFollow}
//                             disabled={isLoading}
//                         />
//                     )}
//                 </div>

//                 <div className="mt-8 px-4">
//                     <div className="flex flex-col">
//                         <p className="text-white text-2xl font-semibold">
//                             {user.name}
//                         </p>
//                     </div>

//                     <p className="text-md text-neutral-500">
//                         {user.username ? `@${user.username}` : user.email}
//                     </p>

//                     <div className="flex flex-col mt-4">
//                         <p className="text-white">{user.bio}</p>

//                         <div className="flex gap-4 items-center">
//                             {user.location && (
//                                 <div className="flex flex-row items-center gap-2 mt-4 text-sky-500">
//                                     <IoLocationSharp size={24} />
//                                     <p>{user.location}</p>
//                                 </div>
//                             )}

//                             <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
//                                 <BiCalendar size={24} />

//                                 <p>
//                                     Joined{" "}
//                                     {formatDistanceToNowStrict(
//                                         new Date(user.createdAt)
//                                     )}{" "}
//                                     ago{" "}
//                                 </p>
//                             </div>
//                         </div>

//                         <div className="flex flex-row items-center mt-6 gap-6">
//                             <div
//                                 className="flex flex-row items-center gap-1 hover:underline cursor-pointer"
//                                 onClick={openFollowModal}
//                             >
//                                 <p className="text-white">{user.following}</p>
//                                 <p className="text-neutral-500">Following</p>
//                             </div>

//                             <div
//                                 className="flex flex-row items-center gap-1 hover:underline cursor-pointer"
//                                 onClick={openFollowModal}
//                             >
//                                 <p className="text-white">{user.followers}</p>
//                                 <p className="text-neutral-500">Followers</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Following and Followers modal */}

//             <Modal
//                 isOpen={open}
//                 onClose={() => setOpen(false)}
//                 body={
//                     <>
//                         <div className="flex flex-row w-full py-3 px-4">
//                             <div
//                                 className={cn(
//                                     "w-[50%] h-full flex justify-center items-center cursor-pointer font-semibold",
//                                     state === "following" &&
//                                         "border-b-[2px] border-sky-500 text-sky-500"
//                                 )}
//                                 onClick={onFollowing}
//                             >
//                                 Following
//                             </div>

//                             <div
//                                 className={cn(
//                                     "w-[50%] h-full flex justify-center items-center cursor-pointer font-semibold",
//                                     state === "followers" &&
//                                         "border-b-[2px] border-sky-500 text-sky-500"
//                                 )}
//                                 onClick={onFollowers}
//                             >
//                                 Followers
//                             </div>
//                         </div>

//                         {isFetching ? (
//                             <div className="flex justify-center items-center h-24">
//                                 <Loader2 className="animate-spin text-sky-500" />
//                             </div>
//                         ) : (
//                             <div className="flex flex-col space-y-4">
//                                 {state === "following" ? (
//                                     following.length === 0 ? (
//                                         <div className="text-neutral-600 text-center p-6 text-xl">
//                                             No Following
//                                         </div>
//                                     ) : (
//                                         following.map((user) => (
//                                             <User
//                                                 user={user}
//                                                 key={user._id}
//                                                 isFollow
//                                                 following={following}
//                                                 onChangeFollowing={
//                                                     onChangeFollowing
//                                                 }
//                                             />
//                                         ))
//                                     )
//                                 ) : followers.length === 0 ? (
//                                     <div className="text-neutral-600 text-center p-6 text-xl">
//                                         No Followers
//                                     </div>
//                                 ) : (
//                                     followers.map((user) => (
//                                         <User
//                                             user={user}
//                                             key={user._id}
//                                             isFollow
//                                             following={following}
//                                             onChangeFollowing={
//                                                 onChangeFollowing
//                                             }
//                                         />
//                                     ))
//                                 )}
//                             </div>
//                         )}
//                     </>
//                 }
//             />
//         </>
//     );
// };

// export default ProfileBio;

"use client";

import { IUser } from "@/types";
import React, { useState } from "react";
import Button from "../ui/button";
import { IoLocationSharp } from "react-icons/io5";
import { BiCalendar } from "react-icons/bi";
import { formatDistanceToNowStrict } from "date-fns";
import axios from "axios";
import { useRouter } from "next/navigation";
import EditModal from "../modals/edit-modal";
import useEditModal from "@/hooks/useEditModal";
import Modal from "../ui/modal";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import FollowUser from "../shared/follow-user";

//bu componentham server side rendring component shu sabab eventlar terminaldagina ko'rinadi

const ProfileBio = ({ user, userId }: { user: IUser; userId: string }) => {
    //hullas IUserni user parametr o'zgaruvchiga sovolindi IUserda esa _id bot shu _idni userIdga pastda sovolindi shu sabab userIdni ichida IUserdan kelgan userni _idsi bor buni typi esa string shu sabab userIdga string typi berildi
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [following, setFollowing] = useState<IUser[]>([]);
    const [followers, setFollowers] = useState<IUser[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [state, setState] = useState<"following" | "followers">("following");//typi ham following yoki followers bo'lishi mumkun bu holatda boshlang'ich qiymati esa following typi//endi shu state sabab agar following bo'lsa bu ishni bajar followers bo'lsa bu ishni bajar degan if elselarni bajarish mumkun

    const router = useRouter();
    const editModal = useEditModal();

    const onFollow = async () => {
        // bu onfolllow function ishlaganda app/api/follows/rote.ts (api) failidagi  PUT functionga so'rov jo'natadi va u PUT function user.modelda yozilgan userni follow qiymatida object create qiladi yani userga joriy userdan bosilgan followni qo'shadi yani joriy userni idisini qo'shadi
        try {
            setIsLoading(true);
            await axios.put("/api/follows", {
                userId: user._id, //axios get qiladi userId nomli qiymat ichida userni idisni oladi
                currentUserId: userId, //axios get qiladi currentuserid qiymat ichida userIdni oladi
                //chunki api/follows/route.ts fail ichidagi  PUT functionda userId User modelda findByIdAndUpdate function bilan chaqirilgan yani ikkala userniham currnet userniham serverda turgan bu holatdagi harakatsiz userniham idlari shu userId ichida kelgan user._idda bor
            });
            router.refresh(); //follow bosilgandan keyin o'zi aftamatik refresh bo'ladi va unfollow buttoni chiqib turadi agar joriy user hohlasa keyin unfolowni bosib folllow bo'lishni to'htatishi mumkun
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const onUnfollow = async () => {
        try {
            setIsLoading(true);//boshida false edi endi true yani endi isloadingdagi loader ishlasin
            await axios.delete("/api/follows", {//api/follows/route.ts/DELETE functionga so'rov jo'natadi
                //yuqoridagi onFollow functionda chaqirilgan axiosda put metodi ishlatldi lekin axiosni typlari bor data ishlatilmadi bu joyda esa data ishlatildi chunki??????????????????????????????
                data: { userId: user._id, currentUserId: userId },
            });
            router.refresh();
            setIsLoading(false);//so'rov bajarilib bo'lgandan keyin loader2 o'chirilsin
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const getFollowUser = async (userId: string, type: string) => {//unversal function
        //bu function ham followinglarni ham followerslarni Get functiondan bittada if elsega qarab olib beradigan function yani axios get qiletganda querydagi state va dynamic ${type} sabab yani unversal get qiladigan function
        try {
            setIsFetching(true); //boshida false edi endi true bo'ldi yani bu shunchaki oddiy state vazifasi ichidagi true falselarga qarab if elselarni ishlatib so'rovlarni bajarish bu holatda setIsFetchingni true qilib so'rovni bajarish va false qilib shu so'rovni to'htatish va jsx ichidaham shu true falseligiga qarab amallarni bajarsa bo'ladi masalan agar setIsFetching true bo'lsa bu contentni ko'rsat yokida buni yokida hech narsa bu state shu uchun kerak
            const { data } = await axios.get(
                `/api/follows?state=${type}&userId=${userId}`
            );
            setIsFetching(false);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const openFollowModal = async () => {
        try {
            setOpen(true); //bu openFollowModal function chaqirilgan divga click bo'lganda boshida false bo'b turgan setopen true bo'ladi va modal ochiladi qaysi modal ochiladi shu faildagi eng pastdagi follow va followerslar uchun dynmaic yozilgan Modal ochiladi boshida esa false edi yani setopenni boshlangichi yani open false edi endi setopenga olinib true qilindi va shu sabab pastdagi modalda berilgan isOpendagi open boshida false edi endi true bo'ldi onClose qilingada esa setOpen false qilinadi yani modal compoenentda onclosega X rasim berilgan shu rasimga bosilganda modal yopiladi shu uchun modaldagi onclosega setopen false qilingan chunki onpen close qilinganda yopilishi kerak

            //bu openFollowModal functioni profile page ochilganda follwing yoki followers textlariga bosilganda ishlaydi yani ikkala textga bosilgandaham ishlab joriy holatda ikkala userniham idisga qarab followinglarni oladi yani current userham amaldagi userniham followinglarini kerakligini sababi followersda 

            const data = await getFollowUser(user._id, "following");//getFollowUser unversal function GET qiladi!!! //bu  "following" tepadgi getFollowUser functionni ikkinchi parametri type yani string qabul qiladigan type shunda getFollowUser chaqirilganda endi ikkinchi parametrida faqat string typli qiymatlar qabul qiladi bu holatda esa "following" bu "following" sabab /app/api/follows/route.tsda yozilgan GET functiondagi if elselar ishga tushadi agar stateda "following" bo'lsa serverdan userni  followinglarini oladi "followers" bo'lsa serverdan userni followerslarini oladi
            //getFollowUserga birinchi parametriga userId string deyilgan shu sabab user._id ni string deb qabul qilepti???
            setFollowing(data);
        } catch (error) {
            console.log(error);
        }
    };

    const onFollowing = async () => {
        setState("following");//following yoki followers qiymatlaridan biri yanu followingni oldi

        if (following.length === 0) {//onFollowing function ishlaganda agar ichida IUser bor following state 0 ga teng bo'lsa getFollowUser bilan so'rov jo'natadi//////////////////// 0 ni buni sababi pastdagi following va followers modali ishlaganda following va followerslarga qayta qayta so'rov ketib qolmasligi uchun masalan followingga bosilgan va serverdan datalar kelgan va endi followersga bosilsa shunda yana followingham qayta ishlamasligi uchun chunki birinchi following bosilgan va datalar kelgan yani endi 0 ga tengmas bu ishlamey tursin endi followersga so'rov jo'natilsin //bo'lmsa har so'rovda ikkala following va followerslarham qayta so'rov jo'natadi
            const data = await getFollowUser(user._id, "following");//getFollowUser unversal function//GET qiladi//agar IUserni followingni hali kelmagan bo'lsa userga idisga qarab following objectiga so'rov jo'natadi
            setFollowing(data);//yani keyin ichida IUser bor setFollowingga data o'zgaruvchini qo'shib qo'yadi yani endi IUserda userni followinglari bor
        }
    };

    const onFollowers = async () => {
        setState("followers");

        if (followers.length === 0) {
            const data = await getFollowUser(user._id, "followers");
            setFollowers(data);//endi ichida IUser bor setFollowersga data o'zgaruvchini qo'shib qo'yadi yani endi IUserda userni followerslari bor
        }
    };

    return (
        <>
            <EditModal user={user} />
            {/* edit modal endi user qabul qiladi */}
            {/* profile-bioda chaqirilgan bu EditModal.tsx bu joyda chaqirilgani sababi jsx ichida bo'lsa bo'ldi yani profile-bio component ishlaganda bu editmodalham ishlaydi yani kerakli joyga kelib turadi hohlasa user biolarga ishlov beradi hohlamada Modal.tsxdagi onClose sabab chiqib ketaveradi*/}

            <div className="border-b-[1px] border-neutral-800 pb-4">
                <div className="flex justify-end p-2">
                    {userId === user._id ? (
                        //    <ProfileBio
                        //user={JSON.parse(JSON.stringify(user))}
                        //userId={JSON.parse(JSON.stringify(session)).currentUser._id}/>//yani userIdda joriy yanni shu buttonni bosetgan user bor agar rostdan shu user bor bo'lsa yani current  user bo'lsa buttonda label={"Edit profile"}ni chiqar(yani current user bo'lsa) agar yo'q bo'lsa va user.isFollowing qiymati bo'lsa shu buttonda  label={"Unfollow"}ni chiqar yani label={"Unfollow"} chiqgan buttonga click bo'lsa onUnfollow ishlab label={"Unfollow"} chiqadi yani user  unfollow qiladi yoki shu buttonda label={"Follow"} ishlab current user follow qilishi mumkun

                        <Button
                            label={"Edit profile"} //clik qilgan user current user bo'lsa ishlaydi clik qilinganda editModaldan kelgan onOpen ishlaydi//yani userni o'zini profileda ishlaydi
                            secondary
                            onClick={() => editModal.onOpen()} //bu holatda edit profile textli buttonga click bo'ganda editModal functionda chaqirilgan useEditModalda zustandda qilingan functionni onOpen functioni ishlaydi va isOpenni true qiladi yani shunda edit-modal.tsx da return qilingan Modal componentda shu holatda chaiqirilgan isOpen={editModal.isOpen} isOpen ishga tushadi va profileni edit qilish componentiga otvoradi buni zustand bajaradi//bu edit profile textli buttonga clik qilinganda onOpen sabab CoverImageUpload va ProfileImageUpload compnentlarga otvoradi//onOpen ichida isOpenni ture qilish bor va bu onOpen edit-modeal.tsxda Model componentda chaqirilgan shunda buttonga click bo'ganda editModal function ichida kelgan useEditModal ichidagi onOpen edit-modal.tsxdagi Model componentda jsx ichida chaqirilgan Model.tsxni ochadi
                        />
                    ) : user.isFollowing ? (//yani userni isFollowing objecti bor bo'lsa Follow yokida unFollow buttonlari chiqadi followga clik qilsa onFollow function ishlab following bo'ladi unfollow buttonga click qilsa onUnFollow functioni ishlab followinglar ichidan delete bo'ladi // isfollowing user modeldan keltgan boolean typli qiymat agar shu isfollowing true bo'lsa yani bor bo'lsa current user uchun unfolllow buttoni chiqadi click qilinganda onunfollow ishlab current user folllow qilishni hohlasa to'htatadi
                        <Button
                            label={"Unfollow"} //clik qilgan user current user bo'lsa ishlaydi clik qilinganda user.isFollowing ishlab onUnfollow functionn ishlatadi
                            outline
                            onClick={onUnfollow}
                            disabled={isLoading} // current user onunfollow bo'lgandan keyin isloading disablet bo'ladi yani to'htaydi
                        />
                    ) : (
                        <Button
                            label={"Follow"} //clik qiladigan current user click qilganda onFollow functionga oboradi bu holatda isloading disablet bo'lib turadi yani qotib turadi
                            onClick={onFollow} //onfoloow ishlab chrrent userni oddiy usermodeldan kelgan userga follow qiladi
                            disabled={isLoading} //button componentda boolean qilingan disabled qiymati vazifasi Fallow holatida turgan buttonga click bo'lganda onFollow function ishlagandan keyin yani  currentuser userga follow qilgandan keyin isloadingdagi false disablet holatiga o'tadi yani onFollowdagi so'rov bajarilgancha disablet yani qotib turadi
                        />
                    )}
                </div>

                <div className="mt-8 px-4">
                    <div className="flex flex-col">
                        <p className="text-white text-2xl font-semibold">
                            {user.name}
                            {/* userni namesi user modeldan isuerda kelepti */}
                        </p>
                    </div>

                    <p className="text-md text-neutral-500">
                        {user.username ? `@${user.username}` : user.email}
                        {/* agar useerni usernamesi bo'lsa oldiga @ qo'yiladi agar bo'lmasa faqat emaili chiqadi */}
                    </p>

                    <div className="flex flex-col mt-4">
                        <p className="text-white">{user.bio}</p>
                        <div className="flex gap-4 items-center">
                            {user.location && ( //userni biosida location bor bo'lsa shu icon IoLocationSharp va classlar ishlasin
                                <div className="flex flex-row items-center gap-2 mt-4 text-sky-500">
                                    <IoLocationSharp size={24} />
                                    <p>{user.location}</p>
                                </div>
                            )}
                            <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
                                <BiCalendar size={24} />
                                <p>
                                    Joined{" "}
                                    {formatDistanceToNowStrict(
                                        new Date(user.createdAt)
                                    )}{" "}
                                    ago
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-row items-center mt-6 gap-6">
                            <div
                                className="flex flex-row items-center gap-1 hover:underline cursor-pointer"
                                onClick={openFollowModal}
                            >
                                <p className="text-white">{user.following}</p>
                                <p className="text-neutral-500">Following</p>
                                {/* bu Following texti profile ochilgada ishlaydigani  */}

                            </div>

                            <div
                                className="flex flex-row items-center gap-1 hover:underline cursor-pointer"
                                onClick={openFollowModal}
                            >
                                <p className="text-white">{user.followers}</p>
                                <p className="text-neutral-500">Followers</p>
                                {/* bu Followers texti profile ochilgada ishlaydigani  */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOLLOWING AND FOLLOWERS MODAL yani follows va eollowers textlariga bosilganda chiqadigan modal by modal dynamic yaratib qo'yilgan qiymatlariga esa following va followerslarga aloqador functionlar berib qo'yilsa bo'ldi ishlayveradi */}

            <Modal
                isOpen={open} // isopen Modal componentda boolean qiymati berilgan open esa state false berilgan yani falseham boolean shu sabab hato yo'q va
                onClose={() => setOpen(false)} //onClose modal componentda void function qiymati berilga shu sabab har qanday functionni qabul qiladi//yani onclose bo'lganda yopiladi
                body={
                    //body modal componentda react element qiymatiga egan yani hamma jsx va js functionlarni jsx qilingan htmllarni qabul qiladi
                    <>
                        <div className="flex flex-row w-full py-3 px-4">
                            <div
                                className={cn(
                                    "w-[50%] h-full flex justify-center items-center cursor-pointer font-semibold",
                                    state === "following" &&
                                        "border-b-[2px] border-sky-500 text-sky-500"
                                )}
                                onClick={onFollowing}//modal ochilgandan keyin ishlab userni user modeldagi following objecti ichida followinglarini olib beradi
                            >
                                Following
                                {/* bu Following texti modal ochilganda ishlaydigani  */}
                            </div>

                            <div
                                className={cn(
                                    "w-[50%] h-full flex justify-center items-center cursor-pointer font-semibold",
                                    state === "followers" &&
                                        "border-b-[2px] border-sky-500 text-sky-500"
                                )}
                                onClick={onFollowers}//modal ochilgandan keyin ishlab userni user modeldagi followers objecti ichida followerslarini olib beradi
                            >
                                Followers
                                {/* bu Followers texti modal ochilganda ishlaydigani  */}

                            </div>
                        </div>

                        {isFetching ? (
                            <div className="flex justify-center items-center h-24">
                                <Loader2 className="animate-spin text-sky-500" />
                                {/* following va followerslar serverdan fetching bo'letgan bo'lsa shu loader2 ishlab tursin */}
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-4">
                                {state === "following" ? (//agar ststeda following bo'lsa yani so'rowda following texti bo'lsa va following hali kelmagan yani qattiy teng bo'lsa 0 ga followingni map qilib FollowUser coponentiga jo'nat va FollowUser componentni chiqar
                                    following.length === 0 ? (//IUser//bu following state yani ichida fetch qilingan user modeldan idsi sabab kelgan followinglar 0 ga teng bo'lsa  no following textini chiqar
                                        <div className="text-neutral-600 text-center p-6 text-xl">
                                            No following
                                        </div>
                                    ) : (//yokida followingda datalar fetch qilingan bosa map qilib yani nusxalab FollowUser componentga jo'natib shu componentdan chiqar
                                        following.map((user) => (
                                            <FollowUser
                                                key={user._id}
                                                user={user}
                                                setFollowing={setFollowing}//IUer
                                            />
                                        ))
                                    )
                                ) : followers.length === 0 ? (//IUser//yokida
                                    <div className="text-neutral-600 text-center p-6 text-xl">
                                        No followers
                                    </div>
                                ) : (
                                    followers.map((user) => (
                                        <FollowUser
                                            key={user._id}
                                            user={user}
                                            setFollowing={setFollowing}//IUser
                                        />
                                    ))
                                )}
                            </div>
                        )}
                    </>
                }
            />
        </>
    );
};

export default ProfileBio;
