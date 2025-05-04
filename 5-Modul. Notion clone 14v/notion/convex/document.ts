import { Doc, Id } from "./_generated/dataModel";
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
        //handler mutation functionni qiymati yani async function parametridagi ctx bu argsni sovolish uchun karopka va hamma narsaga shu handler javobgar bu handler convexniasosiy functioni desaham bo'laadi ctx va args sabab.......
        const identity = await ctx.auth.getUserIdentity(); //identity nomli o'zgaruvchi ichida await bilan ichida args bor ctx mutation functionni auth qiymati bilan userni indificatsiyanisi yani hamma datalarini oladi qayerdan oladi clerk orqali schemaga kelib tushgan userlarni datalardan oladi

        if (!identity) {
            //agar identitiy false bo'lsa error ishlab "Not authenticated" texti chiqadi
            throw new Error("Not authenticated");
        }

        const userId = identity.subject; //bu subject userni idsi hissoblanadi user idni convex shunday nomlagan// userId o'zgaruvchi identity o'zgaruvchi ichida getUserIdentity bilan kelgan userni datalarini oladi yani subjectni oladi agar user aftorizatsa qilgan bo'lsa shuni idsiga qarab userni oladi hamma schemadagi datalari bilan oladi
        const document = await ctx.db.insert("documents", {
            //document o'zgaruvchi ichida args bor ctxni va mutation functionini db yani databasa qiymatini oladi ma insert qilib yani ikkalasini kiritib documents yaratadi qayerga yaratadi convex serverida yaratadi
            //dacument create qilish  //birinchi parametrda tableni nomi berilishi kerak bu holatda "documents", ikkinchisida valuelar  berilishi kerak yani pastdagi qiymatlar
            title: args.title,
            parentDocument: args.parentDocument,
            userId,
            isArchived: false,
            isPublished: false,
            // argsdan hammasi chaqirilmasa hato chiqadi chunki bu ts (lekin optionallar ichidagilar chaqirilmasaham hatosiz ishlaydi chunki bu holatda schemadagi hamma narsa chaqirilmadi lekin shundaham hato chiqmadi
        });

        //createDocument function ichidagi args qiymati sabab argsni bolasi parentDocument qiymati ichidagi birinchi parametr (v.id("documents") yani id ovolgan documents ssilkasi sabab document nomli o'zgaruvchidagi insert va insert parametridagi alsi idsi bor ssilka "document" sabab convex serverda idisi bor alohida object ochildi va u objectda shu qiymatlar bor// yanaham to'g'rirog'i bu "documents" app/(secret)/documents/page.tsxga boradi yani osha sahifada document yaratadi vac convexdaham huddi shu nomli papkadaham document yaratadi//>>>title: args.title,
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

export const archive = mutation({
    //bu archive function (secret)/components/item.tsx failida chaqirilib ishlatildi
    args: {
        id: v.id("documents"),
    },
    handler: async (ctx, args) => {
        const identitiy = await ctx.auth.getUserIdentity();

        if (!identitiy) {
            throw new Error("Not authenticated");
        }

        const userId = identitiy.subject;

        const existingDocument = await ctx.db.get(args.id); //convexni get metodi// yani bu archive functioni ishlaganda (args.id) sabab aynan kerakli documentni idisini oladi yani asosan app/(secret)/documents/page.tsx va item.tsx va boshqa sahifalarda ishlatilgan shu sahifalardagi createDocument functioni ishlagan joyda yani user bor joyda user yaratgan documentnidisiga qarab aynan o'sha documentni oladi

        if (!existingDocument) {
            //agar ichida bosilgan documentni idisi yo'q bo'lsa  yani existingDocumentda ishlatilgan get metodi documentni idisni topolmasa shu if ishlaydi
            throw new Error("Not found");
        }

        if (existingDocument.userId !== userId) {
            //agar ichida tanlangan documenti idisi va userId teng bo'lmasa haqiqiy yani eventni sodir qilayotgan useIdga yani documentni yaratgan userdan boshqa user bo'lsa shu if  ishlaydi
            throw new Error("Unauthorized");
        }

        const archivedChildren = async (documentId: Id<"documents">) => {
            //ona documentni delete qilganda bolla documentrham udalit bo'lishi uchun yaratilgan function yani archive function ichida yaratilgan function
            const childrens = await ctx.db
                .query("documents")
                .withIndex(
                    "by_user_parent",
                    (
                        q //"by_user_parent" schema.tsxda
                    ) => q.eq("userId", userId).eq("parentDocument", documentId) //bu functionni uida ishlatetgan userni aniqlash uchun "userId", teng bo'lsa userId ga va shu user yaratgan documentni ota documentni idisi "parentDocument",documentId teng bo'sa shu documentni idisga
                )
                .collect(); //bir biriga bog'lash

            for (const child of childrens) {
                //js for sikl metodi yani bu holatda child nomli o'zgaruvchi yaratib uni  shu archivedChildren functionichidagi childrens o'zgaruvchiga bog'lab olindi yani childrens o'zgaruvchidagi hamma holat bog'lab olindi va bu for faqat true holatdagina ishlaydi yani agar rostdan shu holat>>>("userId", userId).eq("parentDocument", documentId) true bo'lsa shu holatdagi documentlardagi isArchivedlarni ture qiladi yani bittada hammasini true qiladi yani convex documentdagi(scheme.ts) isArchive qiymatini true qiladi
                await ctx.db.patch(child._id, {
                    isArchived: true,
                });

                archivedChildren(child._id); //documentni bolasini bolasini bolasiniham archived qilish uchun sikl ichidaham archivedChildrenni o'ziham ishlatildi yani archived qiladi yani har sikilda archived qiladi
            }
        };

        const document = await ctx.db.patch(args.id, {
            //args.id, sabab aynan qaysi user va user yaratgan aynan qaysi documentni idisi olindi
            isArchived: true, //convexni patch metodi bu holatda document o'zgaruvchi ichida createDocument functionda false qilingan aslida default holati convex serverda false bo'lib turgan isarchived qiymatini truega aylantirish patch metodi avaldan bor qiymatlarni holatini o'zgartirishda ishlatilaadi >>>patch metodi convexdagi functionlarga Yangi maydonlar qo'shadi. Mavjud maydonlar ustiga yangilarini yozadi va o'zgartiradi. Aniqlanmagan maydonlarni olib tashlaydi . //bu isArchived boshida createDocument functionda false edi chunki bu qiymatlar convex serverda default bo'lib turadi query so'rovlar bilan har bir userni holati o'zgartirilishi mumkun, bo'lmasa doim shunday holatda turadi masalan hamma yangi userda objectda qiymatlar shunday holatda default bo'b turadi shu sabab birinchi convexda createDocument function bilan yaratilgan documentda bu isarchived false edi endi bu archive function ishlaganda true qilindi chunki endi yaratilgan documentda archive papkasi ochiladi yani user o'zi yaratgan documentlarni agar hohlasa va archive functiondagi shartlarga to'g'ri kelsa archive papkaga tushuradi yani document udalit bo'lishdan oldin archive qiladi keyin archivedan udalit qilinadi
        });

        archivedChildren(args.id); //functionni to'lig'icha ishlatish

        return document;
    },
});

export const getTrashDocuments = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticaded");
        }

        const userId = identity.subject;

        const documents = await ctx.db
            .query("documents")
            .withIndex(
                "by_user",
                (q) => q.eq("userId", userId) //bu holatda   withIndex bilan userIddagi archive true bo'lgan documentlarni qaytarib beradi yani bu holatda withIndex convexda turgan userni idisiga yani userIdga qarab pastdagi filter metodi bilan isarchiveda true bo'lgan documentlarni beradi va bu olingan documentlar udalit qilinadi yani schema.tsdagi by_user indexi bilan bog'langan userId bu function ichida kelgan aynan shu userni idisi ekanligini aniqlash uchun userIdga tenglashtirildi shunda bu functionni ishlatetgan userni idisi bo'lsagina va shu idida archive objectida true qilingan documentlar bor bo'lsagina bu function ishlaydi
            )

            .filter((q) => q.eq(q.field("isArchived"), true))
            .order("desc")
            .collect();

        return documents;
    },
});

export const remove = mutation({
    //getTrashDocuments functionda trashboxga tashlangan documentlarni trashboxdan to'liq udalit qilish uchun yozilgan function
    args: { id: v.id("documents") }, //ssilka!!! yani id nomli o'zgaruvchiga documentni idisi convexdagi "documents" papkadan olinadi

    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticaded");
        }

        const userId = identity.subject; //user keldi

        const existingDocument = await ctx.db.get(args.id); //agar user va documentlarni idsi bor bo'lsa get qiladi

        if (!existingDocument) {
            throw new Error("Not found");
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Unauthorized");
        }

        const document = await ctx.db.delete(args.id); //convexni delete metodi args o'zgaruvchida kelgan idilarga qarab documentlarni delete qiladi

        return document;
    },
});

export const getDocumentById = query({
    args: { id: v.id("documents") },
    handler: async (ctx, args) => {
        const identitiy = await ctx.auth.getUserIdentity();
        const document = await ctx.db.get(args.id);
        if (!document) {
            throw new Error("Not found");
        }
        // bu holatda identitiy o'zgaruvchida keladigan userni idisi yo'q bo'lib qolishixam mumkun masalan published bo'lib publishid papkada yoki archived bo'lib archived papkada bo'lishi mumkun shu uchun pastdagi if else qilindi yani agar user getDocumentById functionni sihlatetgada so'rovi document published bo'lgan bo'lsa va yoki archived qilinmagan bo'lsagina document o'zgaruvchini qaytaradi yokida hech qanrsa qaytarmeydi shuda document qaytamagani uchun yuqoridagi if ishlab "Not found" texti ishlaydi
        if (document.isPublished && !document.isArchived) {
            //yani agar document isPublished bo'lsa yani document yaratilgan bo'lsa va document isArchived bo'lmagan bo'lsagina document o'zgaruvchini return qiladi
            return document;
        }

        if (!identitiy) {
            //va agar identitiy false bo'lsa yani user id umuman yo'q bo'lsa shu if ishlaydi
            throw new Error("Not authenticated");
        }

        const userId = identitiy.subject;

        if (document.userId !== userId) {
            throw new Error("Unauthorized");
        }

        return document;
    },
});

export const updateFields = mutation({
    //updateFields function real user documentlarni create qilgandan keyin titlini coverimagesini yoki boshqa har qanday quyidagi datalarini o'zgartirmoqchi bo'lsa ishlaydiga function v.optional qilingani esa user har doimham datalarni o'zgartirmaydi shunda hato chiqmasligi uchun
    args: {
        id: v.id("documents"),
        title: v.optional(v.string()),
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        icon: v.optional(v.string()),
        isPublished: v.optional(v.boolean()),
    },

    handler: async (ctx, args) => {
        // user yuqoridagi args dan foydalana olishi uchun aniq real user va documentlarni aniq yaratgan aynan shu user bo'lishi kerak shu uchun bu holatda userni tekshirib olish kerak yani shu documentni create qilgan user aynan shu user ekanligini  identitiy bilan tkshirib olindi
        const identitiy = await ctx.auth.getUserIdentity();

        if (!identitiy) {
            throw new Error("Not authenticated");
        }

        const userId = identitiy.subject;

        const { id, ...rest } = args; //endi    ...rest da yuqoridagi args o'zgaruvchidagi hamma narsa bor yani spred operator bilan nusxalandi

        const existingDocument = await ctx.db.get(id); //agar document bor bo'lsa yani identity true bo'lib real user va user yaratgan documentlar bor bo'lsa get method bilan shu documentlarni idsini oladi

        if (!existingDocument) {
            throw new Error("Not found");
        }

        if (existingDocument.userId !== userId) {
            //existingDocument ichida kelgan documentni userini idisni teng bo'masa useId o'zgaruvchida kelgan userga error "Unauthorized"
            throw new Error("Unauthorized");
        }

        const document = await ctx.db.patch(id, rest); //patch metodi convexdagi functionlarga yani objectlarga  Yangi maydonlar yani qiymatlar qo'shadi. Mavjud maydonlar ustiga yangilarini yozadi va o'zgartiradi. Aniqlanmagan maydonlarni olib tashlaydi// yani bu holatda document nomli o'zgaruvchiga patch metodi bilan id va rest qo'shildi restda bu functiondagi args o'zgaruvchida kelgan optional qiymatlar bor idda esa args o'zgaruvchida kelgan documentni umumiy idis bor yani bu holatda endi o'zgargan documentlarni idilari patch metodi bilan document bomli o'zgaruvchiga sovolindi

        ///VA SHU PATCH METODI SABAB BU updateFields FUNCTIONI CHAQIRILIB ISHLATILGAN publish.tsx faiidagi onPublish va onUnPublish functionlari convexdagi document papkaga document qo'shish yokida qo'shmaslik ishlayapti

        return document;
    },
});

export const restore = mutation({
    //restore qilish yani documentni trashbox faildanham butunlay udalit qilish bu restore function app/(secret)/components/banner.tsx failida va trash-box.tsx failidaham chaqirib ishlatildi  trash-box.tsxda chaqirib ishlatilganini sababi tarshboxdagi trash iconga click qilingada undo iconi chiqadi shu iconga bosgandaham shu restore ishlab documentni qayta tiklaydi yani bu functiob ikkala joydaham ishlaydi yani navbarda chaqirilgan banner.tsxdaham trash-box.tsxdaham bir hil ishlaydi trashbox.tsxda ishlatilganda real user uchun yaratilgan navbardaham ishga tushadi
    args: { id: v.id("documents") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        const existingDocument = await ctx.db.get(args.id);

        if (!existingDocument) {
            throw new Error("Not found");
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Unauthorized");
        }

        //documentmi onasi udalit qilinsa va bolasini qayta tiklash kerak bo'lganda ishleydigan function yani user documentni onasini udalit qilsaham bolasi qoladi va ona documentni tiklaganda bola documentlarham ichida birga tiklanadi lekin agar ona documentdan oldin ichidagi bola document restore qilnsa va keyin ona document restore qilinda ona restore qilinganona documentni bolasi ichida bo'lmaydi yani tashqarida alohida tiklanadi uida  alohida turadi
        const unarchivedChildren = async (documentId: Id<"documents">) => {
            const childrens = await ctx.db
                .query("documents")
                .withIndex("by_user_parent", (q) =>
                    q.eq("userId", userId).eq("parentDocument", documentId)
                )
                .collect();

            for (const child of childrens) {
                await ctx.db.patch(child._id, {
                    isArchived: false,
                });

                unarchivedChildren(child._id);
            }
        };

        const options: Partial<Doc<"documents">> = {
            ////types tipizatsa//Partial typescriptdan keladigan type vazifasi convex serverdagi "documents" papka ichidagi isArchivedni typini boshqarish
            isArchived: false,
        };

        if (existingDocument.parentDocument) {
            //agar children documentni parent documenti bor bo'lsa undefined qilib qo'yadi existingDocumentda hamma documentlar bor va shu existingDocumentda keladigan documentlarni parentini undefined qilib qo'yadi
            options.parentDocument = undefined;
        }

        const document = await ctx.db.patch(args.id, options); ////

        unarchivedChildren(args.id);

        return document;
    },
});
