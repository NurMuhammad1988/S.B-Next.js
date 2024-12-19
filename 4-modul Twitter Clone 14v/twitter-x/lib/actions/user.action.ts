"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth-options";

https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations  
shu ssilkani yahshilab o'qi

8. Profile darsi 4:44 da qoldi

export async function getUserById(userId: string) {
    try {
        await connectToDatabase();
        const user = await User.findById(userId);

        const { currentUser }: any = await getServerSession(authOptions);

        const filteredUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            coverImage: user.coverImage,
            profileImage: user.profileImage,
            username: user.username,
            bio: user.bio,
            location: user.location,
            createdAt: user.createdAt,
            followers: user.followers?.length || 0,
            following: user.following?.length || 0,
            isFollowing: user.followers?.includes(currentUser._id) || false,
        };

        return filteredUser;
    } catch (error) {
        throw error;
    }
}
