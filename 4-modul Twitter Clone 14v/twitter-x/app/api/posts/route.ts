import Post from "@/database/post.model";
import User from "@/database/user.model";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/mongoose";
import { getServerSession } from "next-auth";// farqli o'laroq , foydalanuvchi tizimga kirganmi yoki yo'qmi (cookie-fayllar mavjudmi yoki yo'qmi) ob'ektni useSession qaytaradi , faqat foydalanuvchi tizimga kirganida ob'ektni qaytaradi (faqat autentifikatsiya qilingan cookie-fayllar mavjud bo'lganda), aks holda>> session get ServerSession session null qaytaradi
import { NextResponse } from "next/server";//server function

// post create qiish uchun api

export async function POST(req: Request) {//Request //So'rov usulini o'z ichiga oladi ( GET, POST, va hokazo.)//bu reauest node moduldan keladi yani compda o'rnatilgan node.jsni ichidagi jsda yozilgan metod function ichida oziniham metodlari juda ko'p server bilan ishlashga javobgar yani request bu functionga POST katta harif bilan yozilishi kerak shunda compda node.jsda turgan Requestga to'gri boradi u Request function esa o'zini POSTda chaqirilayotganini bilgandan keytin POST yo'nalish bo'yicha metodlarini ishlatish mumkun shu sabab POST katta hariflarda yozilishi shart
    try {
        await connectToDatabase();

        const { body, userId } = await req.json();//chaqirilgan itemslar json qib olindi//bu body distruptatsa bilan qayerdan chaqirildi??? bu body typi global String qilingan post modeldan yani post.model.tsda mongoose schema bilan qilingan modeldan Post nomli functionga kiritilib export qilingan shu Post functiondan keldi 
        //userId esa


        const post = await Post.create({ body, user: userId });//bu create metodi mongoosedan keladi mongodbda user post create qilishi uchun kerak bu ishlashi uchun POST functioni connectToDatabase qilib mongodb databazaga ulandi  bu Post pos.modal.tsda onst PostSchema = new mongoose.Schema<<<shu nomli functionda Post nomnli function qilib yani object qilib o'ralib jo'natilgan va bu joyda mongooseni create metodi bilan user typiga global string bo'lgan bodyni olib User modeldan kelayotgan userni idisni user: nomli o'zgaruvchiga olib post create qilepti

        return NextResponse.json(post);//json format qilib jo'natish
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}

export async function GET(req: Request) {
    try {
        await connectToDatabase();

        const { currentUser }: any = await getServerSession(authOptions);

        // console.log(session.currentUser);

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

        const filteredPosts = posts.map((post) => ({
            body: post.body,
            createdAt: post.createdAt,
            user: {
                _id: post.user._id,
                name: post.user.name,
                username: post.user.username,
                profileImage: post.user.profileImage,
                email: post.user.email,
            },
            likes: post.likes.length,
            comments: post.comments.length,
            hasLiked: post.likes.includes(currentUser._id),
            _id: post._id
        }));

        return NextResponse.json(filteredPosts);
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}

export async function DELETE(req: Request) {
    try {
        await connectToDatabase();
        const { postId, userId } = await req.json();

        await Post.findByIdAndDelete(postId); 

        return NextResponse.json({ message: "Post deleted successfully" });
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}
