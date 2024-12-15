// nima uchun bu sahifaga chaqirilgan modellardani nomi masalan post.modal.ts yani modalni nima uchun qo'shish kerak js tushunishi uchunmi???????????????????????????????????????????

import Post from "@/database/post.model";
import User from "@/database/user.model";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/mongoose";
import { getServerSession } from "next-auth";// farqli o'laroq , foydalanuvchi tizimga kirganmi yoki yo'qmi (cookie-fayllar mavjudmi yoki yo'qmi) ob'ektni useSession qaytaradi , faqat foydalanuvchi tizimga kirganida ob'ektni qaytaradi (faqat autentifikatsiya qilingan cookie-fayllar mavjud bo'lganda), aks holda>> session get ServerSession session null qaytaradi
import { NextResponse } from "next/server";//server function

// post create qilish uchun api

export async function POST(req: Request) {//Request //So'rov usulini o'z ichiga oladi ( GET, POST, va hokazo.)//bu reauest node moduldan keladi yani compda o'rnatilgan node.jsni ichidagi jsda yozilgan metod function ichida oziniham metodlari juda ko'p server bilan ishlashga javobgar yani request bu functionga POST katta harif bilan yozilishi kerak shunda compda node.jsda turgan Requestga to'gri boradi u Request function esa o'zini POSTda chaqirilayotganini bilgandan keytin POST yo'nalish bo'yicha metodlarini ishlatish mumkun shu sabab POST katta hariflarda yozilishi shart
    try {
        await connectToDatabase();

        const { body, userId } = await req.json();//chaqirilgan itemslar json qib olindi//bu body distruptatsa bilan qayerdan chaqirildi??? bu body typi global String qilingan post modeldan yani post.model.tsda mongoose schema bilan qilingan modeldan Post nomli functionga kiritilib export qilingan shu Post functiondan keldi 
        //userId esa????


        const post = await Post.create({ body, user: userId });//bu create metodi mongoosedan keladi mongodbda user post create qilishi uchun kerak bu ishlashi uchun POST functioni connectToDatabase qilib mongodb databazaga ulandi  bu Post post.modal.tsda const PostSchema = new mongoose.Schema<<<shu nomli functionda Post nomnli function qilib yani object qilib o'ralib jo'natilgan va bu joyda mongooseni create metodi bilan user typiga global string bo'lgan bodyni olib User modeldan kelayotgan userni idisni user: nomli o'zgaruvchiga olib post create qilepti

        return NextResponse.json(post);//json format qilib jo'natish
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}


export async function GET(req: Request) {
    try {
        await connectToDatabase();

        const { currentUser }: any = await getServerSession(authOptions);//userni mongodbda bor yoki yo'qligini aniqlash yani get so'rov ishlayotganda shu getServerSession function bilan userni aniqlash

        // console.log(session.currentUser);

        const { searchParams } = new URL(req.url);//search params URL dan nodejsdan keladi
        const limit = searchParams.get("limit");

        const posts = await Post.find({})//bu Post post.model.tsdan chaqirilgan
            .populate({//Funktsiya ma'lum bir to'plamning hujjatidagi mos yozuvlar maydonlarini boshqa to'plamdagi hujjatlar bilan to'ldirish uchun ishlatiladi yani post.modeldan userni solishtirish uchun pathda "user" ni modelda User modelni selectda esa userni malumotlari bilan//next js tushunadigan holatda populate qilish yani agar bu posts o'zgaruvchi mongooseni find metodi bilan Post.modeldan find metodi bilan userni 

                // populate mongodbdagi user objectni ochib beradi yani idsini oladi shu id sabab qaysi user yozgan post ekanligini frontedga aytiladi
                path: "user",
                model: User,
                select: "name email profileImage _Id username",
            })
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        const filteredPosts = posts.map((post) => ({//posts o'zgaruvchida mongooseni populate metodi bilan Postdan find qilingan userni yani userlarni datalari bor bu datalar map qilinib posts nomli o'zgaruvchiga solinepti yani endi filteredPosts o'zgaruvchida userni hamma datalari qilmish qidirmishlari bor likelsari commentslari postlari idilari bilan bor bu GET function shularni get qilib beradi

            //bu filteredPosts  callback function posts o'zgaruvchini yani post.model.tsdan keletgan post modelni map qiladi ((post)<<bu map qilinetgan itemlarga nom berish yani o'zgaruvchi desaham bo'ladi filteredPosts postsni ((post)ga map qilib user modeldan userni hamma dalnilarini olib bitta qopga soldi va json qilib nextresponseda jo'natdi//yani bu holatdabody:nomli parametrga post modeldan kelgan postni bodysi solindi user:nomli parametrga user.modeldan keletgan yanipost.modelda chaqirilgani uchun keletgan userni hamma itemlarini sovoldo va hakozo yani bitta joyga sovoldi shu sabab likes comments hasliked hammasi alohida massiv bo'libmasbitta bitta massivda length sabab faqat raqamda keladigan bo'ldi yani serverdan shunday keladi va serverda esa likes aslidamassiv su massivni yani likelar ko'p bolsa har biriga massivochilib serverdan kelsa dastur kop yuklanadi shu sabab har bir likeni hama malumotlari to'liq emas faqat soni keladigan qilindi yani bitta postga 10 ta like bosilsa hamauserni idsi hamma likeni massiv ichida suerniidisi emas likesni: lengthi yani nechta ekanligigina serverdan keladi yani kopmassivmas faqat number ko'rinsida keladi masalan likes: 10 bo'b keladi bu loyihada so'rov tezoq bajariladi kutish qotish kam bo'ladi degani agar shudnay qilinamsa bitta ppostda mingta like bo'lsa server hamma likes egalarini hamma dalnilarini jo'natadi bu holadta sayt og'irlaashib so'rov bajarulguncha vaqt o'tadi bu oddiy userga ko'rinmasaham backenda yuklanish ko'p bo'ladi

            

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

export async function DELETE(req: Request) {//node.jsdan yozilgan function hissoblanadi yani frontenddan delete so'rov kelsa masalan local axiosdan so'rov kelsa ishga tushadigan function qolgan katta hariflar bilan yozilib Request bilan ishlatilgan hamma functionham shunday node.jsda yozilgan function
    try {
        await connectToDatabase();
        const { postId, userId } = await req.json();//yani postid req:dan keladigan Requestni json qildib oldi 
        // node js da frontdan delete so'rov kelsa o'chirsin degan kamandani yaratish axios orqali o'sha kamandani berish kerak 
        // Post post.modal.tsdan kelepti
        await Post.findByIdAndDelete(postId); //mongoosedan keletgan findByIdAndDelete bu so'rov bajarilganda shu findByIdAndDelete functioni bilan post idisga qarab udalit qilinadi




        return NextResponse.json({ message: "Post deleted successfully" });
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}
