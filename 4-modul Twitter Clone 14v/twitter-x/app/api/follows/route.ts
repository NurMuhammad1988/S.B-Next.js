import Notification from "@/database/notification.model";
import User from "@/database/user.model";
// import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/mongoose";
// import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        await connectToDatabase();
        // const { currentUser }: any = await getServerSession(authOptions);
        const { userId, currentUserId } = await req.json(); //profiledan keletgan userId//yani ro'yhatdan o'tgan userId emas profile bioga kirgan user id yani current usermas currentUserId esa push qilish uchun yani vga push qilish uchun

        await User.findByIdAndUpdate(userId, {//User modeldagi followersga current userni yani joriy userni push qilish yani userIdisiga qarab push qilinadi yani bu PUT functioni profile-bio.tsx failidagi follow buttoniga bosgan userni idisini olib yani mongooseni findByIdAndUpdate functioni orqali userni idisini olib User modeldagi followersga push qiladi yani jo'natadi User modelda esa followersda mongoose.Schema.Types.ObjectId, ref: "User"bor yani schema bilan userni idisni oladi shunda user followerslar qatoriga kiradi followers bo'ladi
            $push: { followers: currentUserId },
        });

        await User.findByIdAndUpdate(currentUserId, {
            $push: { following: userId },
        });

        await Notification.create({
            user: userId,
            body: "Someone followed you!",
        });

        await User.findOneAndUpdate(
            { _id: userId },
            { $set: { hasNewNotifications: true } }
        );

        return NextResponse.json({ message: "Followed" });
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}

export async function DELETE(req: Request) {
    try {
        await connectToDatabase();
        // const { currentUser }: any = await getServerSession(authOptions);
        const { userId, currentUserId } = await req.json(); //profiledan keletgan userId

        await User.findByIdAndUpdate(userId, {
            $pull: { followers: currentUserId },
        });

        await User.findByIdAndUpdate(currentUserId, {
            $pull: { following: userId },
        });

        return NextResponse.json({ message: "Followed" });
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}

export async function GET(req: Request) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        const state = searchParams.get("state");

        const user = await User.findById(userId);

        if (state === "following") {
            const following = await User.find({ _id: { $in: user.following } });

            return NextResponse.json( following );
        } else if (state === "followers") {
            const followers = await User.find({ _id: { $in: user.followers } });

            return NextResponse.json( followers );
        }
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}
