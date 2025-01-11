// "use client";
// import React from "react";
// import { useState } from "react"; //
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"; //
// import { IUser } from "@/types"; //
// import { sliceText } from "@/lib/utils"; //
// import { useSession } from "next-auth/react"; //
// import { useParams, useRouter } from "next/navigation"; //
// import Button from "../ui/button"; //
// import axios from "axios"; //

// interface Props {
//     user: IUser;
//     setFollowing: React.Dispatch<React.SetStateAction<IUser[]>>;
// }

// // #10 follow modal darsi tugadi lekin chala bo'ldi follow unfollow buttonlari ishlamadi ???????????????????????????????????????????????????????????????????????????

// // 11. Notifications darsi ohiri tekshirilsin!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// const User = ({ user, setFollowing }: Props) => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [profile, setProfile] = useState<IUser>(user);

//     const router = useRouter();
//     const { userId } = useParams();
//     const { data: session }: any = useSession();

//     const onFollow = async () => {
//         try {
//             setIsLoading(true);
//             await axios.put("/api/follows", {
//                 userId: user._id,
//                 currentUserId: session?.currentUser?._id,
//             });

//             if (userId === session?.currentUser?._id) {
//                 setFollowing((prev) => [
//                     ...prev,
//                     {
//                         ...user,
//                         followers: [
//                             ...user.followers,
//                             session?.currentUser?._id,
//                         ],
//                     },
//                 ]);
//             }

//             setProfile((prev) => ({
//                 ...prev,
//                 followers: [...prev.followers, session?.currentUser?._id],
//             }));

//             router.refresh();
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
//                 data: {
//                     userId: user._id,
//                     currentUserId: session?.currentUser?._id,
//                 },
//             });

//             if (userId === session?.currentUser?._id) {
//                 setFollowing((prev) =>
//                     prev.filter((following) => following._id !== user._id)
//                 );
//             }

//             setProfile((prev) => ({
//                 ...prev,
//                 followers: prev.followers.filter(
//                     (follower) => follower !== session?.currentUser?._id
//                 ),
//             }));
//         } catch (error) {
//             console.log(error);
//             setIsLoading(false);
//         }
//     };

//     const goToProfile = (evt: any) => {
//         evt.stopPropagation();
//         router.push(`/profile/${user._id}`);
//     };

//     return (
//         <div className="flex gap-3 items-center justify-between cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 transition py-2 px-3 rounded-md  ">
//             <div className="flex gap-2 cursor-pointer">
//                 <Avatar onClick={goToProfile}>
//                     <AvatarImage src={profile.profileImage} />
//                     <AvatarFallback>{profile.name[0]}</AvatarFallback>
//                 </Avatar>

//                 <div className="flex flex-col" onClick={goToProfile}>
//                     <p className="text-white font-semibold text-sm line-clamp-1">
//                         {profile.name}
//                     </p>
//                     <p className="text-neutral-400  text-sm line-clamp-1">
//                         {profile.username
//                             ? `@${sliceText(user.username, 20)}`
//                             : sliceText(user.email, 20)}
//                     </p>
//                 </div>
//             </div>

//             {profile._id !== session?.currentUser?._id ? (
//                 profile.followers.includes(session?.currentUser?._id) ? (
//                     <Button
//                         label={"Unfollow"}
//                         outline
//                         classNames="h-[30px] p-0 w-fit px-3 text-sm"
//                         disabled={isLoading}
//                         onClick={onUnFollow}
//                     />
//                 ) : (
//                     <Button
//                         label={"Follow"}
//                         outline
//                         classNames="h-[30px] p-0 w-fit px-3 text-sm"
//                         disabled={isLoading}
//                         onClick={onFollow}
//                     />
//                 )
//             ) : null}
//         </div>
//     );
// };

// export default User;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// "use client";
// import React, { useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { IUser } from "@/types";
// import { sliceText } from "@/lib/utils";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Button from "../ui/button";
// import axios from "axios";

// interface Props {
//     user: IUser;
//     onChangeFollowing?: (user: IUser[]) => void;
//     isFollow?: boolean;
//     following?: IUser[];
// }

// #10 follow modal darsi tugadi lekin chala bo'ldi follow unfollow buttonlari ishlamadi ???????????????????????????????????????????????????????????????????????????

// const User = ({ user, onChangeFollowing, isFollow, following }: Props) => {eski darsdagisi
//     const [isLoading, setIsLoading] = useState(false);

//     const { data: session }: any = useSession();
//     const router = useRouter();

//     const onUnFollow = () => {};

//     const onFollow = async () => {
//         try {
//             setIsLoading(true);
//             await axios.put("/api/follows", {
//                 userId: user._id,
//                 currentUserId: session?.currentUser?._id,
//             });

//             const updatedFollowing = [...(following as IUser[]), user];
//             onChangeFollowing && onChangeFollowing(updatedFollowing)

//             router.refresh();
//             setIsLoading(false);
//         } catch (error) {
//             console.log(error);
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="flex gap-3 items-center justify-between cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 transition py-2 px-3 rounded-md  ">
//             <div className="flex gap-2 cursor-pointer">
//                 <Avatar>
//                     <AvatarImage src={user.profileImage} />
//                     <AvatarFallback>{user.name[0]}</AvatarFallback>
//                 </Avatar>
//                 <div className="flex flex-col">
//                     <p className="text-white font-semibold text-sm line-clamp-1">
//                         {user.name}
//                     </p>
//                     <p className="text-white font-semibold text-sm line-clamp-1">
//                         {user.username
//                             ? `@${sliceText(user.username, 16)}`
//                             : sliceText(user.email, 16)}
//                     </p>
//                 </div>
//             </div>

//             {isFollow && user._id !== session?.currentUser?._id ? (
//                 user.followers.includes(session?.currentUser?._id) ? (
//                     <Button
//                         label={"Unfollow"}
//                         outline
//                         classNames="h-[30px] p-0 w-fit px-3 text-sm"
//                         disabled={isLoading}
//                         onClick={onUnFollow}
//                     />
//                 ) : (
//                     <Button
//                         label={"Follow"}
//                         outline
//                         classNames="h-[30px] p-0 w-fit px-3 text-sm"
//                         disabled={isLoading}
//                         onClick={onFollow}
//                     />
//                 )
//             ) : null}
//         </div>
//     );
// };

// export default User;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IUser } from "@/types";
import { sliceText } from "@/lib/utils";

const User = ({ user }: { user: IUser }) => {
    return (
        <div className="flex gap-3 items-center justify-between cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 transition py-2 px-3 rounded-md">
            <div className="flex gap-2 cursor-pointer">
                <Avatar>
                    <AvatarImage src={user.profileImage} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                    <p className="text-white font-semibold text-sm line-clamp-1">
                        {user.name}
                    </p>
                    <p className="text-neutral-400 text-sm line-clamp-1">
                        {user.username
                            ? `@${sliceText(user.username, 16)}`
                            : sliceText(user.email, 16)}
                        {/* userni nusername bor bo'lsa usernameni chiqar yoki emailini chiqar sliceText esa shu datalarni26 ta harfdan ko'p bolmasligi uchun  */}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default User;
