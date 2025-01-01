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

        const { currentUser }: any = await getServerSession(authOptions);//endi currentUserda getServerSession sabab (currentUser._id) userid bor yani currentUserda endi isFollowing qiymatdagi _id bor /yani user o'zgaruvchida user.modeldan findByIdfunctioni bilan userlarni idlari chaqirilgan endi user o'zgaruvchida hamma useridlar bor va shu user o'zgaruvchi filteredUserda isFollowing nomli qiymatda chaqirilib ichiga currentUser nomli parametr berilib _idga yani obshi userlarni idisga teng qilindi endi currentUserda idlar bor

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
