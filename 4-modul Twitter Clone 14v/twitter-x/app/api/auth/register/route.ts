import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import  {hash} from "bcrypt"//npm i bcrypt///typi esa>>>npm i --save-dev @types/bcrypt bu kutubhona parswordlar uchun yani Bu xesh algoritmi yordamida ochiq matn parolini belgilangan uzunlikdagi belgilar qatoriga aylantirishni o'z ichiga oladi . Ushbu bir tomonlama funktsiya, agar kimdir xeshlangan parolga ruxsatsiz kirish huquqiga ega bo'lsa ham, uni asl parolga osongina qaytara olmasligini ta'minlaydi//////
//Masalan, “parol” kiritilishi “5f4dcc3b5aa765d61d8327deb882cf99” xeshini, “passw0rd” kiritish esa “6c569aabbf7775ef8fc5705a9f1f9b2f” xeshini ishlab chiqishi mumkin . Xeshlash qaytarilmas, ya'ni xeshdan asl ma'lumotni tiklay olmaysiz.

//api/auth/register// yani bu next va app padhod yani next14ni app padhodli versiyasi 

export async function POST(req: Request) {// bu Ushbu Fetch API interfeysi resurs so'rovini ifodalaydi. yani jsni server so'rovlari funksiyasi fetch promise bilan ishlaydi 
    try {
        await connectToDatabase();//

        // 3. Login and register darsi 20:39da qoldi 20:20dan boshlab ko'r muhum joyi bor edi

        const { searchParams } = new URL(req.url);//searchParms node.jsdan compni o'zidan o'rnatilhan node,jsdan node modulsdan keladi vazifasi urllar bilan ishlash Resursni qidirish/filtrlash uchun ishlatilishi mumkin bo'lgan nomli qidiruv elementini belgilaydigan qidiruv parametri URLSearchParams oʻrnatilgan JavaScript obyekti boʻlib, URL soʻrovlar qatori bilan ishlash imkonini beradi . U so'rovlar qatoriga kalit-qiymat juftlarini qo'shish, o'chirish, olish va o'rnatish usullarini taqdim etadi. Undan veb-ilovalaringizdagi URL manzilini osongina o'zgartirish va boshqarish uchun foydalanishingiz mumkin.

        const step = searchParams.get("step");//GET searchParams va URLni metodi vazifasi qidiruv parametriga bog'langan birinchi qiymatni qaytaradi. bu holatda birinchi qiymat "step"

        //api/auth/register?step=1
        if (step === "1") {//userni topish yani agar step teng bo'lsa qattiy 1 ga yani user account create qilayotganda 1 chi stepdan o'tayotganda emaili bilan tekshirvolish yani agar step 1 ga teng bo'lsa va kiritayotgan emaili serverda users papkada yo'q bo'lsa shu if ihslaydi yokida agar email bor bo'lsa "Email already exists" texti ishlaydi
            const { email } = await req.json();//emailni jsaon format qilish yani serverga jo'natish uchun server faqat jsonni taniydi yani o'qiy oladi shu sabab json failga o'girvolindi desaham bo'ladi
            const isExistingUser = await User.findOne({ email });//findOne bu mongoeseni metod functioni serverdan yani User ichidan yangi create bo'layotgan user kiritgan emailni izlaydi shu sabab email object ichida jo'natildi

            if (isExistingUser) {
                return NextResponse.json(
                    { error: "Email already exists" },
                    { status: 400 }
                );
            }
            return NextResponse.json({//NextResponse - bu Next tomonidan taqdim etilgan yordamchi dastur. js, HTTP so'rovlari uchun javoblar yaratish uchun o'rta dastur ichida ishlatiladi . O'rta dastur nextda js autentifikatsiya, qayta yo'naltirish va boshqalar kabi ishlarni bajarishga imkon beruvchi so'rov tugashidan oldin kodni ishga tushirishga imkon beradi huddiki async awaitga yordamichi kod desaham bo'ladi 
                success: true,//yani succes tru bo'lsa bu succes nextresponse ichida kelepti agar next response true bo'lsa successham true bo'ladi shunda axios bilan so'rov jo'natilganda axiosdagi if togri javobni oladi va shunga qarab yoki step 2 ga o'tqizadi yoki userni hatosini aytadi masalan Email already exists yoki Something went wrong. Please try again later. 
            });

             
        }else if (step === "2"){
            const {email, username, name, password} = await req.json()

            const isExistinUsername = await User.findOne({username})//endi username bilanham tekshirish yani loyihada ikkita bir hil username bo'lishi keraymas hammani nomida farq bo'lishi kerey

            if(isExistinUsername){
                return NextResponse.json(
                    {error:"Username already exists"},
                    {status: 400}
                )
            }

            const hashedPassword =  await hash (password, 10)

            const user = await User.create({//yani else if ishlasa yani 2 chi stepga o'tsauser create bo'lishi uchun shu 4 ta qiymat va hashedPasswordda chaqirilgan has kerak yani parolni 10 ta raqamligacha hash qilib beradi heshlash deganda parolni boshqalar tanimaydigan qilib o'zgartirish masalan hackerlardan himoya masalan parol 123456 bo'lsa heshlanganda "32425242343243242dsfsdhfsdfjsfhsd" bo'ladi masalanda
                email,
                username,
                name,
                password:hashedPassword
            })

            return NextResponse.json({success: true, user})//user json qilib yuborildi

        }
        //api/auth/register?step=2
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}
