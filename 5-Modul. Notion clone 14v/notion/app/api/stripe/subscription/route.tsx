import stripe from "@/lib/stirpe";
import { NextResponse } from "next/server";

//stripe npm bilan skachat qilinadi stripe functionlari
//bu joyda chaqirilib ishlatilayotgan stripe object ichida lib/stripe.ts failida "npm install stripe" qilinganda kelgan Stripe constructor bor yani stripe constructorda hamma metodlar bor shu metodlar "stripe" objectida chaqirilib keraklilari ishlatiladi

export async function POST(req: Request) {
    try {
        const public_domain = process.env.NEXT_PUBLIC_DOMAIN; //bunda notion loyihani domaini bor hozircha local hostda agar netlify.app yokida vercal.comga qo'yilib domain olinsa shu domain shu process.env.NEXT_PUBLIC_DOMAIN ichida yani env local ichida bo'ladi va bu domen stripeda chaqirilib ishlatilishi sababi bu stripe uchun qilingan kodlar aynan shu domenda ishga tushadi agar bu loyiga netlify yoki vercalga qo'yilsa va netlify va versaldan domen olinsa bu public_domaindagi prosses envda kelgan domainham netlfy yoki vercal bergan domainga o'zgarishi kerak shunda stripe to'g'ri ishlaydi (env faildagi NEXT_PUBLIC_DOMAIN=http://localhost:3000 o'rniga yangi olinadigan domen qo'yilishi shart shunda public_domain o'zgaruvchidagi process.env.NEXT_PUBLIC_DOMAINda yangi domen kelganda stripe kodlar o'sha domenni tanib ishlaydi )
        const { email, userId, priceId } = await req.json();
        const isExistingCustomer = await stripe.customers.list({ email }); //customers.list lib/stripe.tsdan keldi//yani stripeni bu list metodi bilan payment qilmoqchi bo'lgan userni stripe ichidan izlash yani ro'yhat ichidan izleydi agar bor bo'lsa doim yani muddat tugagancha userga dostup bor bo'ladi agar ro'yhatda yo'q bo'lsa dostup ochilmeydi stripe buni email bilan qiladi yani userni emaili orqali tekshiradi

        let customer; //userni hamma datalari saqlanadigan o'zgaruvchi yani let o'zgaruvchi o'zgarmasligi kerak bo'lgan o'zgaruvchi

        if (isExistingCustomer.data.length) {
            //isExistingCustomerda kelgan listda agar email bor bo'lsa yani lenght bor bo'lsa yani nimadur bor bo'lsa let customer; o'zgaruvchiga [0]dan boshlab sovoladi masalan 0 chi user 1 chi user 2 chi user qilib yani bu customer o'zgaruvchi let yani bitta let yani o'zgarmas agar shu isExistingCustomerda length bor bo'lsa customer o'zgaruvchida turadi agar yo'q bo'lsa pastdagi if bilan yangi yaratadi
            //massiv qaytaradi
            customer = isExistingCustomer.data[0];
        }

        if (!customer) {
            //yani agar isExistingCustomerda listda kelgan data lengthda kelgan datalarni o'ziga yuklab oleydigan customer o'zgaruvchi false bo'lsa yani ichida hech narsa bo'lmasa yani tizimga kirmoqchi bo'lgan email yo'q bo'lsa (bu holatda boshqa emaillar yani usrlar bor lekin aynan tekshirilayotgan email yo"q bo'lsa) stripeni create metodi bilan  emailini va metadatada kelgan userId ga qarab useridni olib yangi create qiladi bu holatda userId req:Request bilan kelgan yani string qivolingan
            customer = await stripe.customers.create({
                email,
                metadata: { userId }, //Bu yerda  Stripedagi customer ID orqali userIdni qayta olamiz. Bu bizga Stripeda ro'yhatdan o'tgan foydalanuvchini ilovadagi foydalanuvchi bilan bog'lashga yordam beradi.//yani bu holatda customerni metadata qiymatida stripeda userni idsi saqlanadi bu uchun bu customer subscription function bilan serverga try catch bilan so'rov jo'natadi price-cards.tsx failida!!!!
            });
        }

        const subscriptions = await stripe.subscriptions.list({
            //user bitta tarifdan foydalana olishi kerak masalan loyihada 2 ta tarif bor 8 va 15 dollorlik user esa shulardan faqat bittasiga to'lov qila olishi kerak 2 ta tarifga bir vaqtda to'lov qilish kerakmas yani isExistingCustomer oz'garuvchida email bilan tekshirilgan agar email bor bo'lsa customer o'zgaruvchiga solingan customer.id

            //yani bu holatda stripeni list metodi bilan subscriptionlarni yani ko'plikda yani stripe serverdan subscriptionslarni tekshirvolish yani avvaldan subscriptions bor bo'sa shuni customer o;zgaruvcgiga sovolish yani shunda masalan user 8 dollorlik plus tarifiga ulangan bo'lsa va yana 15 dollorlik tarifgaham ulanmoqchi bo'lsa bu subscriptions o'zgaruvchi list metodi bilan stripedagi listdan ko'rib keladi yani tekshiradi va agar userni subscriptionslarida 8 dollorlik tarif ulangan yani puli to'langan va muddati o'tmagan bo'lsa shu customerni yanu userni idisni oladi va qaytaradi shunda bu subscriptions true bo'ladi agar subscriptionsda shu idli user yo'q bo'lsa subscriptions false qaytaradi bu true yokida false qaytareptimi buni bilish uchun yani ichidagi datani topish uchun isSubscribed o'zgaruvchida aytildiki agar subscriptions.datada find metodi bilan izlanganda statuse === qattiy "active" ga teng bo'lsa yani true qaytarsa yani user subscriptionsda bor bo'lsa masalan bu holatda 8 dollorlik tarifga avval ulangan bo'lsa hech narsa return qilinmadi (chunki else ichida portal nomli o'zgaruvchida agar bu subscriptions true qaytarganda ishlaydigan holat bor) yani userni qaytadan 15 dollorlik tarifga ulanish so'rovi bajarilmaydi qachonki bu subscriptions isSubscribed o'zgaruvchida buyurilgan amalda false qaytarsa yani find metodi bilan subscriptionslarni izlaganda false qaytarsagina pastdagi subscription o'zgaruvchi ishga tushib userni tarifga ulab to'lovni qabul qiladi
            customer: customer.id,
        });

        const isSubscribed = subscriptions.data.find(
            (sub) => sub.status === "active"
        ); //isSubscribed o'zgaruvchida keladigan subscriptions o'zgaruvchidagi list yani userni stripeni find metodi bilan tekshirib agar qaysidur tarifga "active" bo'lsa yani isSubscribed true yoki false bo'lishini aniqlash uchun

        if (!isSubscribed) {
            //yani isSubscribed find bilan tekshirgada isSubscribed false qaytarsa yani userni "active" holatdagi tarifi bo'lmasa shu subscription function ishlab card bilan to'lov qilib va to'lovdan keyin secret papka ichidagi documentga o'tib ketadi yani real user uchun qilingan sahifalarga o'tib ketadi bu subscription function get so'rov bilan axios bilan pricing-card.tsx failida onsubmit  functionda get qilib chaqirilgan va onsubmit buttonga onclikga berilgan shunda klik qilinganda yani pricing-card.tsxdagi "Get started" buttonga click qilinganda onSubmit function ishlab agar isSubscribed false bo'lsa bu subscription function ishlab axiosni get metodi bilan stripeda account create qiladi
            const subscription = await stripe.checkout.sessions.create({
                mode: "subscription",
                payment_method_types: ["card"], //faqat carta orqali to'lov qabul qilinadi
                line_items: [{ price: priceId, quantity: 1 }],
                customer: customer.id,
                success_url: `${public_domain}/documents?`, //yani checkout qilinagndan keyin agar user to'lov qilgan bo'lsa userni (secret) papka ichidagi documents papkaga jo'natadi yani user uchun notionda  dostup ochiladi to'lov qilgani uchun
                cancel_url: `${public_domain}`, //to'lov qilinmasa asosiy sahifaga qaytarib jo'natadi yani ona domenga
            });

            return NextResponse.json(subscription.url);
        } else {
            //yokida yani agar user uchun yuqoridagi subscription yani ayni damda falase bo'lsa yani oldin qaysidur tarifga to'lov qilgan va o'sha to'lov sabab subscription true holatda turgan  bo'lsa stripe constructordagi billingPortal.sessions.create metodi bilan url qaytaradi yani userni stripeni user uchun mahsus yani to'lov qilgan obunalai ro'yhati turgan sahifaga otvoradi shunda user hohlasa obunasini bekor qilib boshqatda yana o'zi hohlagan obunaga yani tarifga qaytadan o'tishi yani to'lov qilishiu mumkun bo'ladi
            //stripe nastroykasida agar user birorta tarifni atmen qilsaham to'lov qilgan kunigacha yani bir oy davomida active holati saqlanadi agar user atmenni srazi qilishni hohlasaham stripe nastroykasida bu holatdalar bor yani user obunasini srazi 100 foiz atmen qilib yana qaytadan boshqa tarifga o'tib to'lov qilishiham mumkun bu uchun stripe nastroykasidan dasturchi holatni to'g'irlashi kerak
            const portal = await stripe.billingPortal.sessions.create({
                //subscriptions true qaytarganda yani user 15 dollorlik tarifga ulanmoqchi bo'lganda lekin avval 8 dollorlik tarifga ulangan bo'lsa yani subscriptions true qaytarganda bu holat ishga tushadi yani pricing-card.tsx failidagi get so'rov bajarilganda yokida subscription ishga tushib user birirta tarifga ulanadi yokida eski ulangan yani to'lov muddati tugamagan tarifga o'tib ketadi yani shu ikkala holatdan biri sodir bo'ladi chunki if yokida else!!!
                customer: customer.id,
                return_url: `${public_domain}/documents`, //yani agar user avval qaysudur tarifga ulangan bo'lsa va muddati tugamagan bo'lsa userni real user uchun qilingan documents (private) papkaga olib boradi

                //va bu codda user hohlasa 8 dollorlik tarifini bekor qilib hohlasa 15 dollorlik tarifga o'tib oladi faqat avval 8 dollorlik tarifni bekor qilish shart yani stripe nastroykasidan tarifni "cancel immediately" qilish yoqilgan bo'lsa yani dasturchi bu nastroykani stripedan yoqib qo'yishi shart user 8 dollorlik tarifni o'sha zahoti bekor qilib 15 dollorlik tarifga o'tishi mumkun shu  uchun bu portal o'zgaruvchi  ishlaganda userni stripeda nastroyka qilingan sahifaga olib boradi va user hohlasa tariflarni bekor qilish va yana qaytadan hohlagan tarifiga o'tish holati ishga tushadi
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
        const { searchParams } = new URL(req.url); //searchParams — bu URL query qismini kalit-qiymat (key-value) ko‘rinishida o‘qish va boshqarish uchun JavaScript obyekti. //urlni topish uchun yani free plan uchun faqat uchta document create qilish   uchun userni emaili orqali tanib olish uchun yani bu endi stripe uchun emas bu shu notion loyiha ichidagi holat yani loyiha ichida ishlaydi stripega aloqasi yo'q faqat stripedan malumot ovoladi yani stripedan kelayotgan listda email yo'q bo'lsa yani email! null qaytarsa free planga o'tkazvoradi yani stripeda userni emaili yo'q bo'lsa yani plan sotib olmagan bo'lsa
        const email = searchParams.get("email"); //bu qiymatni URL query string ichidan oladi yani url ichidan oladi yani bu dars holatida localhost/?email.......
        //// searchParams bu URLSearchParams degan klass (obyekt) jsniki
        //// U get, set, has, append, delete kabi metodlarga ega
        //// searchParams.get("key") bilan qiymat olinadi yani bu holatda "email"

        const customer = await stripe.customers.list({ email: email! }); //email! !>>non-null assertion operator ts operatori yani ! sabab string yokida null qaytadi null qaytib turganda hech qanday hodisa sodir bo'lmaydi agar string qaytsa demak userni emaili bor ekanligi tekshirilib keyingi holat yani free holati ishga tushadi//array qaytaradi

        if (!customer.data.length) return NextResponse.json("Free"); // Agar Stripe listdan email orqali qidirilgan customer ro'yxati bo'sh bo'lsa (yani .data.length === 0),
        // bu shuni bildiradi: bu email bilan bog'langan hech qanday Stripe customer yo'q.
        // Bu holatda demak foydalanuvchi hali pulli plan sotib olmagan va  "Free" tarifida bo'ladi.

        const subscriptions: any = await stripe.subscriptions.list({
            //stripedagi aynan shu sayt domeniga aloqador obunalar ro'yxatini yani  subscriptionsni beradi (public_domain)
            customer: customer.data[0].id, //array ichida 0 dan boshlab beradi
            expand: ["data.plan.product"], //Bu Stripega Manga plan va product haqida to'liq malumotni ber   degan buyruq yani stripeni expand qiymatini vazifasi shu
        });

        if (!subscriptions.data.length) return NextResponse.json("Free"); //agar subscriptions o'zgaruvchida list metodi ishlaganda qaytgan data uzunligi 0 bo'lsa yani  emaili orqali customer oz'garuvchida kelgan email customer: customer.data[0].id da bu 0 emas bo'sh array>>>"data": [] bo'sa yani hech narsa qaytamasa userni "Free" planga o'tkazadi yani bu holatda (!subscriptions.data.length) yani Bu holatda to'g'ri ishlaydi chunki data.length 0 bo'ladi  va !0 === true yani !>> bu bilan true qivoldik yani teskari aylantirvoldik chunki jsda 0 false qiymat bu holatda !>>BU BILAN FALSEni true qilib agar shu 0 qaytsa free planga o'tkiz degan buyruq berildi

        return NextResponse.json(subscriptions.data[0].plan.product.name); //stripedagi user agar ulangan plan bo'lsa shu planni nomini oladi bu holatda bo'sh array qaytadi shunda hato chiqmasdan ishlaydi yani nimadur qaytadi>>>"data": []
    } catch (error) {
        return NextResponse.json("Something went wrong. Please try again", {
            status: 500,
        });
    }
}
