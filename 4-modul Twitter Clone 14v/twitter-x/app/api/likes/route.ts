import Notification from "@/database/notification.model";
import Post from "@/database/post.model";
import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {//node.jsdan Request kelaidgan PUT//likesni qo'shadigan function
    try {
        await connectToDatabase();
        const { postId, userId } = await req.json();//serverdan keladigan postni idisni va qaysi user yozgan bo'lsa osha userni idsi distruptatsa bilan chaqirilib json formatga yani js tushunadigan formatga o'girib olindi//reqda nodejsdan keladigan Request global function bor shu functionni json qilib olish

        const post = await Post.findByIdAndUpdate(//update===yangilash//database model yani post.model.ts dan keladigan Postni mongoosedan keladigan findByIdAndUpdate functioni bilan update qilish yani yaratish yangilash //Bu identifikator findByIdAndUpdate() funksiyasi ichida uzatiladi va keyin u shu identifikatorga mos keladigan hujjatni ushlaydi . Hujjatni mos keladigan identifikator bilan olgandan so'ng, u hujjat ichidagi ma'lumotlarni yangilaydi. Hujjat ichida yangilanishi kerak bo'lgan narsa funktsiyada argument sifatida ko'rsatilgan yani postId yani postni yangilaydigan function yani serverda turgan holatini yangilaydi masalan likes bosilsa shuni qo'shadi update qiladi
            postId,//postni idisiga qarab update qiladi
            {
                $push: { likes: userId },//$push Operatori massivga belgilangan qiymatni qo'shadi. yani serverdagi massivga yani aynan shu postni o'rab turgan massiv ichiga likes nomli o'zgaruvchi ichida yani object ichida useridni yani userni idsini qo'shadi//likes bu holatda massiv shu uchun mongooseni findByIdAndUpdate functionini push operatori yani metodi bilan userni idisni jo'natish yani qaysi user like bosganini aniqlash
            },
            { new: true }//yani update bo'lgan infiko'rinishi uchun//uchinchi parametrda shu new qabul qilinadi
        );

        await Notification.create({
            user: String(post.user),
            body: "Someone liked your post!",
        });

        await User.findOneAndUpdate(
            { _id: String(post.user) },
            { $set: { hasNewNotifications: true } }
        );

        return NextResponse.json({ success: true });
        // likes qo'shilganda yoki udalit qilinganda shu success: true databasadan kelib logda shu >>>{"success":true} ko'rinishda chiqepti
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}

export async function DELETE(req: Request) {//likesni udalit qiladigan function
    try {
        await connectToDatabase();
        const { postId, userId } = await req.json();

        const post = await Post.findByIdAndUpdate(
            postId,
            {
                $pull: { likes: userId },//$pull Operatori belgilangan shartga mos keladigan qiymat yoki qiymatlarning barcha namunalarini mavjud massivdan olib tashlaydi. yani likeni otkaz qiladi masalan user bilmasdan likeni bosvordi shuni qaytadan o'chirib qo'yadi serverdanham udalit qivoradi
            },
            { new: true }//update bo'lgandan keyingi yangi holatni frontedgaham ko'rsatish uchun
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}
