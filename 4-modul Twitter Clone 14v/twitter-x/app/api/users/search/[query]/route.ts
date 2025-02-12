import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

// [query]ni next js taniydi va bu>>[]ICHIDA KELGAN QUERYNI BILADIKI SO'ROV EKANLIGINI 

export default async function GET(req: Request, route: { params: { query: string } }) {
    try {
        await connectToDatabase();
        const { query } = route.params;

        const users = await User.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { username: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } },
            ],
        }).select("name username _id profileImage email")

        return NextResponse.json(users)
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}
