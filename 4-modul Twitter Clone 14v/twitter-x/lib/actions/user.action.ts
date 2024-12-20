"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth-options";

//bu fail actions papkani ichida yozildi user.action.ts bu papka nomi va fail nomi next jsda defaultmi???

//next js actions/user.actions.ts fail next js shunda getUserById functionni server tarafda render qilinadi

export async function getUserById(userId: string) {//default export qilingan
    try {
        await connectToDatabase();
        const user = await User.findById(userId);//mongoose functioni

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
