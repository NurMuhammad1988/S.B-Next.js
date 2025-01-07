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
        const { userId, currentUserId } = await req.json(); //profiledan keletgan userId//yani ro'yhatdan o'tgan userId emas profile bioga kirgan user id yani current usermas currentUserId esa push qilish uchun yani vga push qilish uchun userId umumiy databasadan keletgan userni idisi currentuserid esa joriy yani shu PUT functionni ishlashiga sabab bo'ladigan clickni amalga oshiradigan userni idisi bu holatda ikkala idlar 

        await User.findByIdAndUpdate(userId, {//followers buttoni bosganda ishlaydi///////////////////////////User modeldagi followersga current userni yani joriy userni push qilish yani userIdisiga qarab push qilinadi yani bu PUT functioni profile-bio.tsx failidagi follow buttoniga bosgan userni idisini olib yani mongooseni findByIdAndUpdate functioni orqali userni idisini olib User modeldagi followersga push qiladi yani jo'natadi User modelda esa followersda mongoose.Schema.Types.ObjectId, ref: "User"bor yani schema bilan userni idisni oladi shunda user followerslar qatoriga kiradi followers bo'ladi
            $push: { followers: currentUserId },//follovers User modeldan kelepti yani kalit so'z shu nomli modelni bo'limiga current userni push qilish yani joylashtirish//click qiletgan userni clickini findByIdAndUpdate function bilan user modelga push qilish  shunda user modelda click qilgan userni followers bo'limiga tushadi // yani umumiy userIdilarga push qilinib currentuserid yani joriiy userni idisi push qilidi shunda serverda umumiy userIdlar ichida shu joriy useridini objectiga shu userga followers bosgan userni idis borib tushadi
        });

        await User.findByIdAndUpdate(currentUserId, {//follow buttonni bosganda ishlaydi/////////////////////joriy userni idisni olib umumiy useridlar ichida turgan useridiga corriy yani followni bosgan userni idisini qo'shadi
            $push: { following: userId },
        });

        await Notification.create({//Notification modelda object yaseydi Notification modelda ref bilan yo'naltirilhan User modelga userIdni va bodyga "Someone followed you!" textini create qiladi //bu create mongooseni functioni yani bu PUT function profile bio.tsx failida jsx icida local axios bilan chaqirilib ishlatilganda yani har safar ishlatilganda masalan userId yani currentuserid emas umumiy user.modeldan kelgan userId profile-bio.tsx failida yozilgan onfollow functionni ishlatganda har safar bu create ishlab bodyga "Someone followed you!" textini chiqaradi bodyni typi esa string object 
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
            $pull: { followers: currentUserId },//pullni pushdan farqi pull udalit qiladi pull esa qo'shadi bu degani bu DELETE  functionida kelgan mongoosesini findByIdAndUpdate functionini pull qiymati user modeldagi userni folllowers bo'limiga borib turgan current userni idisni userIddan olib udalit qiladi qachin udalit qiladi profile-bio.tsx faildagi onUnfollow functionidagi axios so'rov bajarilganda onUnfollow functionga click bo'lganda sodir bo'ladi
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
