import stripe from "@/lib/stirpe";
import { NextResponse } from "next/server";

//stripe npm bilan skachat qilinadi stripe functionlari 
//bu joyda chaqirilib ishlatilayotgan stripe object ichida lib/stripe.ts failida "npm install stripe" qilinganda kelgan Stripe constructor bor yani stripe constructorda hamma metodlar bor shu metodlar "stripe" objectida chaqirilib keraklilari ishlatiladi 


export async function POST(req: Request) {
    try {
        const public_domain = process.env.NEXT_PUBLIC_DOMAIN; //bunda notion loyihani domaini bor hozircha local hostda agar netlify.app yokida vercal.comga qo'yilib domain olinsa shu domain shu process.env.NEXT_PUBLIC_DOMAIN ichida yani env local ichida bo'ladi va bu domen stripeda chaqirilib ishlatilishi sababi bu stripe uchun qilingan kodlar aynan shu domenda ishga tushadi agar bu loyiga netlify yoki vercalga qo'yilsa va netlify va versaldan domen olinsa bu public_domaindagi prosses envda kelgan domainham netlfy yoki vercal bergan domainga o'zgarishi kerak shunda stripe to'g'ri ishlaydi (env faildagi NEXT_PUBLIC_DOMAIN=http://localhost:3000 o'rniga yangi olinadigan domen qo'yilishi shart shunda public_domain o'zgaruvchidagi process.env.NEXT_PUBLIC_DOMAINda yangi domen kelganda stripe kodlar o'sha domenni tanib ishlaydi )
        const { email, userId, priceId } = await req.json();
        const isExistingCustomer = await stripe.customers.list({ email }); //customers.list lib/stripe.tsdan keldi//yani stripeni bu list metodi bilan payment qilmoqchi bo'lgan userni stripe ichidan izlash yani ro'yhat ichidan izleydi agar bor bo'lsa doim yani muddat tugagancha userga dostup bor bo'ladi agar ro'yhatda yo'q bo'lsa dostup ochilmeydi stripe buni email bilan qiladi yani userni emaili orqali tekshiradi

        let customer;//userni hamma datalari saqlanadigan o'zgaruvchi yani let o'zgaruvchi o'zgarmasligi kerak bo'lgan o'zgaruvchi

        if (isExistingCustomer.data.length) {
            //isExistingCustomerda kelgan listda agar email bor bo'lsa yani lenght bor bo'lsa yani nimadur bor bo'lsa let customer; o'zgaruvchiga [0]dan boshlab sovoladi masalan 0 chi user 1 chi user 2 chi user qilib yani bu customer o'zgaruvchi let yani bitta let yani o'zgarmas agar shu isExistingCustomerda length bor bo'lsa customer o'zgaruvchida turadi agar yo'q bo'lsa pastdagi if bilan yangi yaratadi
            //massiv qaytaradi
            customer = isExistingCustomer.data[0];
        }

        if (!customer) {
            //yani agar isExistingCustomerda listda kelgan data lengthda kelgan datalarni o'ziga yuklab oleydigan customer o'zgaruvchi false bo'lsa yani ichida hech narsa bo'lmasa yani tizimga kirmoqchi bo'lgan email yo'q bo'lsa (bu holatda boshqa emaillar yani usrlar bor lekin aynan tekshirilayotgan email yo"q bo'lsa) stripeni create metodi bilan  emailini va metadatada kelgan userId ga qarab useridni olib yangi create qiladi bu holatda userId req:Request bilan kelgan
            customer = await stripe.customers.create({
                email,
                metadata: { userId }, //Bu yerda  Stripedagi customer ID orqali userIdni qayta olamiz. Bu bizga Stripeda ro'yhatdan o'tgan foydalanuvchini ilovadagi foydalanuvchi bilan bog'lashga yordam beradi.//yani bu holatda customerni metadata qiymatida stripeda userni idsi saqlanadi bu uchun bu customer subscription function bilan serverga try catch bilan so'rov jo'natadi price-cards.tsx failida!!!!
            });
        }

        const subscriptions = await stripe.subscriptions.list({
            //user bitta tarifdan foydalanaolishi kerak masalan loyihada 2 ta tarif bor 8 va 15 dollorlik user esa shulardan faqat bittasiga to'lov qila olishi kerak 2 ta tarifga bir vaqtda to'lov qilish kerakmas
            customer: customer.id,
        });

        const isSubscribed = subscriptions.data.find(
            (sub) => sub.status === "active"
        ); //isSubscribed o'zgaruvchida keladigan subscriptions functiondagi list yani userni stripeni find metodi bilan tekshirib agar qaysidur tarifga "active" bo'lsa

        if (!isSubscribed) { 
            //yani isSubscribed find bilan tekshirgada isSubscribed false qaytarsa yani userni "active" holatdagi tarifi bo'lmasa shu subscription function ishlab card bilan to'lov qilib va to'lovdan keyin secret papka ichidagi documentga o'tib ketadi yani real user uchun qilingan sahifalarga o'tib ketadi
            const subscription = await stripe.checkout.sessions.create({
                mode: "subscription",
                payment_method_types: ["card"],//faqat carta orqali to'lov qabul qilinadi
                line_items: [{ price: priceId, quantity: 1 }],
                customer: customer.id,
                success_url: `${public_domain}/documents?`, //yani checkout qilinagndan keyin agar user to'lov qilgan bo'lsa userni (secret) papka ichidagi documents papkaga jo'natadi yani user uchun notionda  dostup ochiladi
                cancel_url: `${public_domain}`,//to'lov qilinmasa asosiy sahifaga qaytarib jo'natadi
            });

            return NextResponse.json(subscription.url);
        } else {
            //yokida yani agar user uchun yuqoridagi subscription yani ayni damda falase bo'lsa yani oldin qaysidur tarifga to'lov qilgan va o'sha to'lov sabab subscription true holatda turgan  bo'lsa stripe constructordagi billingPortal.sessions.create metodi bilan url qaytaradi yani userni stripeni user uchun mahsus yani to'lov qilgan obunalai ro'yhati turgan sahifaga otvoradi shunda user hohlasa obunasini bekor qilib boshqatda yana o'zi hohlagan obunaga yani tarifga qaytadan o'tishi yani to'lov qilishiu mumkun bo'ladi
            //stripe nastroykasida agar user birorta tarifni atmen qilsaham to'lov qilgan kunigacha yani bir oy davomida active holati saqlanadi agar user atmenni srazi qilishni hohlasaham stripe nastroykasida bu holatdalar bor yani user obunasini srazi 100 foiz atmen qilib yana qaytadan boshqa tarifga o'tib to'lov qilishiham mumkun bu uchun stripe nastroykasidan dasturchi holatni to'g'irlashi kerak
            const portal = await stripe.billingPortal.sessions.create({
                customer: customer.id,
                return_url: `${public_domain}/documents`,
            });

            return NextResponse.json(portal.url);
        }
    } catch (error) {
        return NextResponse.json(
            `Something went wrong. Please try again - ${error} `,
            {
                status: 500,
            }
        );
    }
}
///////////////////////////////////////////////////////////////////////////////////////////
export async function GET(req: Request) {
    try {
        const {searchParams} = new URL(req.url)
        const email = searchParams.get("email")

        const customer = await stripe.customers.list({email: email!})

        if(!customer.data.length) return NextResponse.json("Free")//agar customer false bo'lsa  faqat free  ishga tushadi

        const subscriptions: any = await stripe.subscriptions.list({
            customer:customer.data[0].id,
            expand: ["data.plan.product"]
        })

        if(!subscriptions.data.length) return NextResponse.json("Free")

        return NextResponse.json(subscriptions.data[0].plan.product.name)



    } catch (error) {
        return NextResponse.json("Something went wrong. Please try again", {
            status: 500,
        });
    }
}

