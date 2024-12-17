import Post from "@/database/post.model";
import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request, route: { params: { postId: string } }) {//postidni typi berib qo'yildi va route nima????////Marshrutlash so'rovi yangi ish yukiga talab ob'ektini, odatda VMni tegishli xosting joyiga yo'naltirish so'rovini ifodalaydi .////"Route Request Packet" - bu so'rovlar tartib raqami va tasodifiy so'rov identifikatorini o'z ichiga olgan kompyuter aloqasidagi manba tugunlari tomonidan yaratilgan paket . U maqsadli manzil bilan xavfsiz aloqa qilish uchun ishlatiladi va oraliq tugunlarga so'rovni belgilangan manzilga aniqlash va tarqatish imkonini beradi.
    try {
        await connectToDatabase();
        const { postId } = route.params;//postni idisini topib olish uchun

        const post = await Post.findById(postId).populate({//posdagi detallar populate qilindi masalan postni yozgan userni idisi va osha userni name email profileimage usernamelari shunday papulate qilib chaqirildi yani endi app/root/posts/postid/page.tsx fail ishlganda yani ichiga kirilganda postni shu datalariham bor bo'ladi
            path: "user",
            model: User,//usermodeldan keletgan User yani userni hamma detallari bor shu detallardan keraklilarini selectga sovoldik bu model:User selectdan oldin yozilishi kerak chunki selectga malumotlar shu  Userdan keladi
            select: "name email profileImage _id username",
        });

        return NextResponse.json(post);//ichida post detaillar uchun user populate qilingan o'zgaruvchi
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}
