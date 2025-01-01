"use client";

import { IPost, IUser } from "@/types";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import PostItem from "./post-item";

interface Props {
    ///app/(root)/profile/[userId]/page.tsx failidan props bilan chaqiriladigan userId bilan user qiymatlarini nima ekanligi shu faildaham aytilishi kerak chunki shu failda ishlatiladi
    userId: string; //userda keletgan IUser ichidagi useridni typi string
    user: IUser; ///app/(root)/profile/[userId]/page.tsx failida bu user qiymatiga  currentUser parametri berilgan
}

// current user profilega kirganda yizgan postlarini profile sahifasiga chaqirish uchun ypzilgan component
const PostFeed = ({ userId, user }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState<IPost[]>([]);

    const getPosts = async () => {
        try {
            setIsLoading(true);//loader2 so'rov bajarilgancha ishlab turadi yani true bo'ladi


            const { data } = await axios.get(`/api/users/posts/${userId}`);////app/api.users/posts/[userId]/route.tsdagi GET functionga so'rov jo'natildi yani joriy userni postlarini get qilish ${userId}<<bu GET functionda chaqirilgan
            setPosts(data);//
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {//userId kelganda useEffect ishga tushadi va getPosts axios async functionni ishga tushuradi
        getPosts();
    }, [userId]);

    return isLoading ? (
        <div className="flex justify-center items-center h-24">
            <Loader2 className="animate-spin text-sky-500" />
        </div>
    ) : (
        posts.map((post) => (//map qilingan postlar postitem.tsx failga jo'natildi
            <PostItem
                key={post._id}
                post={post}
                user={user}
                setPosts={setPosts}
            />
        ))
    );
};

export default PostFeed;
