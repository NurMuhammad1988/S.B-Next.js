import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(req.url);
        const limit = searchParams.get("limit");//searchParams va URLni get metodi vazifasi limitda belgilangan urllarnigana get qiladi

        const users = await User.find({})//endi users o'zgaruvchida User model bilan create qilnayotgan userlarni mongooseni find metodi bilanUser modelichidan izlash bor nima bilan izlaydi mongooseni selectmetodi bilan usernidalnilarni izlab topadi limitham moongoseni metodi vazifasi searchparamsdan keletgan urllarni Number object bilan limitlash yani typi Number object bu limit useparams sabab endi bu loyihani hammajoyida default holatda bor yani " string ko'rinishda ishlaydi" chunki bu query parametrlar shu sabab  bunga so'rov shu>>>`/api/users?limit=${limit}`tartibda kelaveradi  masalan bu limitga useUser.tsdagi useUser custom hookida so'rov jo'natildi>>>>>`/api/users?limit=${limit}`
            .select("name username _id profileImage email")
            .limit(Number(limit));

        return NextResponse.json( users );
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}
