import Post from "@/database/post.model";
import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

// post create qiish uchun api

export async function POST(req: Request) {
    try {
        await connectToDatabase();

        const { body, userId } = await req.json();

        const post = await Post.create({ body, user: userId });

        return NextResponse.json(post);
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}

export async function GET(req: Request) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(req.url);
        const limit = searchParams.get("limit");

        const posts = await Post.find({})
            .populate({
                path: "user",
                model: User,
                select: "name email profileImage _Id username",
            })
            .limit(Number(limit))
            .sort({ createdAt: -1 });

            return NextResponse.json(posts)

    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}

export async function DELETE(req:Request) {
    try {
        await connectToDatabase();
        const {postId, userId} = await req.json()

        await Post.findByIdAndDelete(postId)//darsda findByIdAndRemove funksiyasidan  foydalanildi lekin bu findByIdAndRemove funksiyasi dars qilingan vaqtda moongoesedaeskirgan va o'chirilgan shu sababli findByIdAndDeletedan foydalandim findByIdAndRemove va findByIdAndDeleteni o'rtsida farq bor farqi shuki findByIdAndRemove  o'chirilgan hujjatni qaytaradi findByIdAndDelete esa qaytarmaydi

        return NextResponse.json({message: "Post deleted successfully"})

    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}

