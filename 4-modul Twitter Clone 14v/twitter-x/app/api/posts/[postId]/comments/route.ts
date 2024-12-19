import Comment from "@/database/comment.model";
import Post from "@/database/post.model";
import User from "@/database/user.model";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, route: { params: { postId: string } }) {//params ichida keladigan postIdni typi nima ekanligi aytib qo'yilishi shart
    try {
        await connectToDatabase();
        const { postId } = route.params;

        const { currentUser }: any = await getServerSession(authOptions);//yani joriy user 

        const post = await Post.findById(postId).populate({////posdagi detallar populate qilindi masalan postni yozgan userni idisi va osha userni name email profileimage usernamelari shunday papulate qilib chaqirildi yani endi app/root/posts/postid/page.tsx fail ishlganda yani ichiga kirilganda postni shu datalariham bor bo'ladi va bu datalarni (postId) ichiga soladi yani findbyid faqat bitta parametr qabul qiladi faqat idga aloqadoryani bu holatda commentni idsiga aloqador yani commentni yozgan userni idisiga aloqador
            path: "comments",
            model: Comment, //comment modeldan kelepti

            populate: {
                //mongoosedan keletgan populate functionini rodnoy parametri
                path: "user",
                model: User,
                select: "name email profileImage _id username",
            },

            options: { sort: { likes: -1 } }, //mongoosedan keletgan populate functionini rodnoy parametri//likesi bor commentni tepaga chiqaradi yani findById va populate function ichida yozilganda qo'shimcha optionlar shu populate va findById ichida options ichiga yozilishi kerak yani options shu functionlarni metodi typi hissoblanadi boshqa metodlarni pramoy yozib bo'meydi options qiymatini ichiga yozilsa ishlaydi
        });


        const filteredComments = post.comments.map((item: any) => ({//filteredComments commentni dettallari // yani bu holatda yuqoridagi post o'zgaruvchi va ichida kelgan pathdagi commets map qilinib item nomli ichki o'zgaruvchiga olinib filteredComments nextresponse bilan json qilinib jo'natildi
            body: item.body,
            createdAt: item.createdAt,
            user: {
                _id: item.user._id,
                name: item.user.name,
                username: item.user.username,
                profileImage: item.user.profileImage,
                email: item.user.email,
            },
            likes: item.likes.length,
            hasLiked: item.likes.includes(currentUser._id),
            _id: item._id,
        }));

        return NextResponse.json(filteredComments);
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}
