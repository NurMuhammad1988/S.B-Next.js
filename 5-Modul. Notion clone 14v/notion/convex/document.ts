import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
//Mutatsiyalar ma'lumotlar bazasiga ma'lumotlarni kiritadi, yangilaydi va o'chiradi, autentifikatsiyani tekshiradi yoki boshqa biznes mantiqini bajaradi va ixtiyoriy ravishda mijoz ilovasiga javob qaytaradi.

///////////////////////bu dacuments schema.ts bilan birlashayaptimi??? ha birlasharekan yani schemaga (schema.ts) qarab dacument (documents.ts) convexda yaratiladi



export const createDocument = mutation({
    //convexdan keladigan function
    args: {
        //createDocument ichida args qiymatini vazifasi shuki schemadan olinadigan qiymatlarni bitta object ichida jamlab typlarini belgilash
        title: v.string(),
        parentDocument: v.optional(v.id("documents")), //parentDocument optional yani so'rovda kelmay qolsaham hato qaytarmaydi id userni idisi dacuments esa bu ssilka yani parentDocumentni ikkinchi parametridagi "dacuments" yaratilayotgan dacument yani tableni nomi yani bu parentDocument bola document yaratadi va ona document ssilkasiga yani convexda birinchi yaratilgan "document" papkasiga jo'natadi convex esa shu ssilkaga qarab bola documentni yaratadi
    },

    handler: async (ctx, args) => {
        //handler mutation functionni qiymati yani async function parametridagi ctx bu argsni sovolish uchun karopka
        const identity = await ctx.auth.getUserIdentity(); //identity nomli o'zgaruvchi ichida await bilan ichida args bor ctx mutation functionni auth qiymati bilan userni indificatsiyanisi yani hamma datalarini oladi qayerdan oladi clerk orqali schemaga kelib tushgan datalardan oladi

        if (!identity) {
            //agar identitiy false bo'lsa error ishlab "Not authenticated" texti chiqadi
            throw new Error("Not authenticated");
        }

        const userId = identity.subject; //bu subject userni idsi hissoblanadi user idni convex shunday nomlagan// userId o'zgaruvchi identity o'zgaruvchi ichida getUserIdentity bilan kelgan userni datalarini oladi yani subjectni oladi agar user aftorizatsa qilgan bo'lsa shuni idsiga qarab userni oladi hamma schemadagi datalari bilan oladi
        const document = await ctx.db.insert("documents", {
            //document o'zgaruvchi ichida args bor ctxni va mutation functionini db yani databasa qiymatini oladi ma insert qili yani ikkalasini kiritib documents yaratadi qayerga yaratadi convex serverida yaratadi
            //dacument create qilish  //birinchi parametrda tableni nomi berilishi kerak bu holatda "documents", ikkinchisida valuelar  berilishi kerak yani pastdagi qiymatlar
            title: args.title,
            parentDocument: args.parentDocument,
            userId,
            isArchived: false,
            isPublished: false,
            // argsdan hammasi chaqirilmasa hato chiqadi chunki bu ts (lekin optionallar ichidagilar chaqirilmasaham hatosiz ishlaydi chunki bu holatda schemadagi hamma narsa chaqirilmadi lekin shundaham hato chiqmadi
        });

        //createDocument function ichidagi args qiymati sabab argsni bolasi parentDocument qiymati ichidagi birinchi parametr (v.id("documents") yani id ovolgan documents ssilkasi sabab document nomli o'zgaruvchidagi insert va insert parametridagi alsi idsi bor ssilka "document" sabab convex serverda idisi bor alohida object ochildi va u objectda shu qiymatlar bor>>>title: args.title,
        //parentDocument: args.parentDocument,
        // userId,
        //isArchived: false,
        // isPublished: false, bu qiymatlar convex serverda default bo'lib turadi query so'rovlar bilan har bir userni holati o'zgartirilishi mumkun bo'lmasa doim shunday holatda turadi masalan hamma yangi userda objectda qiymatlar shunday holatda default bo'b turadi

        return document;
    },
});

export const getDocuments = query({
    //bu query convexni functioni vazifasi???/ userni crete qilgan documentlarini qayerda yaratish va qaysilarini uiga ko'rsatish va userni aniqlash
    args: {
        parentDocument: v.optional(v.id("documents")),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            //agar user false bo'lsa
            throw Error("Not authenticated");
        }

        const userId = identity.subject;

        const documents = await ctx.db
            .query("documents") //endi user bor createDocument bor endi document yaratilayotganda query so;rov bilan qayerda yaratilishi aytdik yani tableni nomi "documents" query birinchi shu "documents" ga boradi bu "documents" yuqoridagi createDocument functionini args_ida berilgan yani bu query shu createDocumnent/parentDocumentdagi "documents"ga oboradi
            .withIndex(
                "by_user_parent", //userId bilan parentDocument qiymatlari birlashtirildi bu qiymatlarda convexda object bor yani objectlar birlashtirildi sababi userIdiga qarab user yaratadigan documentlarga bola documentlarham qo'shish yani user ona document  chida bola documentham yarata olishi kerak bu uchun esa userni idi va bola documentni idis kerak shu uchun bu ikkala qiymat convex/schema.ts failida convexni index metodi bilan "by_user_parent" siislkasida  birlashtirilgan va "by_user_parent" shu ssilka bilan withIndex metodi bilan chaqirib ishlatildi
                (q) =>
                    q
                        .eq("userId", userId)
                        .eq("parentDocument", args.parentDocument) //agar withIndexda kelgan "by_user_parent" da "userId" bor bo'lsa yani convex/schema.tsda yoratiladigan userId bor bo'lsa shu userni idsi bilan shu faildagi userId o'zgaruvchida kelgan userid bilan birlashtir yani convex ishinch hosil qilishi kerak yani ota document bilan bola documentni bitta useridli user yaratayaptimi yo'qmi shini aniqlash uchun shunda filtir qilindi yani agar schemada birlashtirilgan userid bilan bu faildagi user idni idilari bir hil bo'lsa useridlarni birlashtir yokida yo'q (bu holatda "userId" "by_user_parent" da kelgan user id userId esa shu failda yaratilgan userId o'zgaruvchi )/// huddi shuday "by_user_parent" da kelgan parentDocument teng bo'lsa   shu faildagi args ichidagi parentDocumentga shunda ota documentni va bola documentni bitta user yaratayotganini aniqladi yani shunday bo'lsagina bola document yaratiladi
            )

            .filter((q) => q.eq(q.field("isArchived"), false)) //yani query "documents" ga borib userni datalarini oladi filter esa userni isArchived qiymatlarini olmaslik kerey masalan eski documentlarini olmaslik kerey shu uchu isArchived false qilib qo'yildi
            .order("desc") //userni hamma yangi documentlarni chiqarib beradi
            .collect(); //yuqoridagi query va filter metodlarda kelgan datalarni collect qilib chiqarib beradi

        return documents;
    },
});
