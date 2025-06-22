"use client";
import Cover from "@/components/shared/cover";
import Toolbar from "@/components/shared/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
// import "@blocknote/mantine/style.css";

interface DocumentIdPageProps {
    params: {
        documentId: Id<"documents">; //convexda convex/schema.tsda schema bilan nastroyka qilingan convex/document.tsda yozilgan createDocument functionida adress (ssilka) sifatida berib qo'yilgan "documents" ga convexda genereted qilib kelingan userni va documentlarni idsi global convex Id

        //yani convex documents papkada yani app/(secret)/documents/page.tsx failida uiga tayyorlangan document functionlarda failni dynamic yaratadigan functionlar bor shu dynamic yaratiladigan sahifalarni shu failida DocumentIdPage functionda bu keladigan dynamik sahifar returnda divga o'ralgan yani jsx ga o'ralgan shu sabab app/covex/documents.tsdagi server functionlar app/(secret)/documents/page.tsx failida ishlatilib uiga beriladi va bu fail esa shu bajarilgan ishlardagi dynamic sahifalarni jsxga o'girib beradi
        //YANI bu FAIL  DYNAMIC YARATILGAN YANI "ADD A PAGE" YOKIDA "NEW DOCUMENT" TEXTLARIGA BOSGANDA DYNAMIC YARATILADIGAN DOCUMENTLARNI RETURN ICHIDA JSX QIVOLISH YANI RETURNDA JSXDA RETURN QILISH yani jsx qilingan divga o'rab olish
    };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
    const document = useQuery(api.document.getDocumentById, {
        id: params.documentId as Id<"documents">,
    }); //  // bu paramsda kelgan documentId document dynamic yaratilganda yaratiladi yani (secret) papkani ichida bo'lgani uchun bu [documents] shu (secret) papkani assosiy sahifasi (secret)/documents/page.tsxda yaratilgan dynamic sahifalarni qabul qiladi yani ona papkasini asossiy page.tsx sahifasida yaratilgan dynamic sahifalarni qabul qiladi ona papka esa bu holatda (secret) papkasi va params bilan documentni idsini oladi yani params bu holatda convexdan keladigan functionni qiymati
    const updateFields = useMutation(api.document.updateFields);

    const Editor = useMemo(
        () =>
            dynamic(() => import("@/components/shared/editor"), { ssr: false }), //editor.tsx faili bu pageda import bilan chaqirilmagan Memo hookni dynamic functioni bilan shu "@/components/shared/editor" holatda import qilingan
        [] //bu usememo react function bu bilan server site rendiringni o'chirib qo'ydik yani komponentni bir marta yuklaydi va xotirada saqlaydi qaysi componentni>>>/components/shared/editor editor.tsx ni va serverda qayta qayta yukalmaydi komponenti faqat kerak bo'lganda yuklaydi (lazy loading) server-side rendering'da bu komponentni yuklamaydi, faqat browser'da ishlaydi va faqat bir martta serverda rendring qiladi saqlab olish uchun memoni dynamic functionini vazifasi shu...useMemo - bu React'ning performance optimization uchun ishlatiladigan hooki. U qimmat (expensive) hisob-kitoblarni cache qiladi va faqat dependency'lar o'zgarganda qaytadan hisoblaydi. yani o'ziga kiritilgan componentni faqat o'zgargan joyini render qilib qolganiga teginmaydi buni hotirasida saqlab qoladi
    );

    if (document === undefined) {
        //yani agar document undefined bo'lsa Cover.tsx ichidagi Skeleton functionni ishlat bu cover.tsxda yoziligan skeleton function yani loader agar cover.tsx yokida ichidagi cover imagega qilingan so'rov malum vaqt kech qolsa yokida ishlamasa so'rov tugaguncha shu skeletondagi loader ishlab turadi chunki serverdan datalar kelgancha baribir malum vaqt o'tadi
        return (
            <div>
                <Cover.Skeleton />
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                    {/* yani cover.tsx va ichidagi imagelar serverdan kelgancha shu skeleton yani alohida component/ui/skeloton.tsx failidan chaqirilgan shu sekelton loaderlar ishlab turadi yani serverdan so'rovlar kelgancha chiroyli holatda yuklanib turadi yoki net yahshi ishlamasaham shunday yuklanib kutib turadi  */}
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-14 w-[50%]" />
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-4 w-[40%]" />
                        <Skeleton className="h-4 w-[60%]" />
                    </div>
                </div>
            </div>
        );
    }

    if (document === null) return null;

    const onChange = (value: string) => {
        //bu onChange function  pastda editor.tsx memo bilan chaqirilgan joyda editordan props bilan keladigan onChange qiymatigaberilgan shunda editor.tsxdan keladigan onchange functioni ichida bu page tsxdagi onchange function ishlatiladi shunda editor.tsxdan keladigan onchange function callback orqali valueni yani contentni tashqi (ota) komponentga yani blocnoteni asosiy ota functioniga uzatadi yani bu faildagi o'zgarishni uzatadi
        updateFields({
            id: document._id,
            content: value, //content updateFields function qiymati yani string yani contentni faqat string formatda bo'lsa qabul qiladi yani editor componentda onchange function ishlaganda blocnotedan useCreateBlockNote hooki keladi hookda esa inputlar
        });
    };

    return (
        <div className="pb-40">
            <Cover url={document.coverImage} />

            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar document={document} />
                {/* bu toolbar component getDocumentById ishlab userni documentlari serverdan kelganda ishleydi va bu dynamic yaratilgan document pageda hover bo'lsa ishlaydi yokida yo'q yani toolbar.tsxda shunday classlar yozilgan va add iconga click qilinganda IconPicker comonent ishga tushib "emoji-picker-react"kutubhonasidan chaqirilgan emojilar componenti ishga tushadi va user hohlasa documentga emoji add qiladi */}
                <Editor initialContent={document.content} onChange={onChange} />
                {/* yani bu dynamic documentlar sahifasiga editor.tsx chaqirilgan editor.tsxda esa jsda reactda qilingan blocknode component bor bu component blocknotejs.org saytidan chaqiriladigan component yani hooklar bilan chaqirilib ishlatiladigan component yani jsda qilingan text editor tayyor component notion loyihamizda yaratiladigan postlarni chiroyli qilish masalan textlar har hil razmerda rangli rasm videolar qo'yish va yana ko'plab ishlarni qilish mumkun bu blocknotejs bilan shu blocknote editor shu user documentni dynamic yaratib rendering qiladigan sahifada chaqirildi chunki shu sahifada ishlatilishi kerak  va convex/document.ts failidan chaqirilgan getDocumentById document nomli o'zgaruvchiga olingan shu document o'zgaruvchiga editor.tsxdan keladigan initialContent string qiymatiga documentni  content qiymatni qo'ydik yani content faqat string bo'lsagina qabul qiladi initialContentda chaqirilganini sababi esa blocknote jsdagi initialContent qiymatida documentni boshlang'ich yani initialContent holati bo'lishi kerak yani documentni blockonte bilan o'zgartirishdan oldin serverdan kelgan asl holati initialContentda bo'ladi */}
            </div>
        </div>
    );
};

export default DocumentIdPage;

//bittagina hato borga o'hshaydi lekin hato yo'q yani yani agar user documentni crete qilib uni publish qilib publish qilingan documentni urlini copy qilib shu bu urlga alohida sahifada kirsa o'zi yaratgan documentni hech narsani change qilaolmayapti yani preview sabab va keyn user documenni unPublished qilsaham alohid sahifada ochilgan shu unpublished qilingan document baribir yo'qolib qolmayapti bu esa hatomas chunki user bitta browserdan foydalanayapti browser esa userni datalarini yani idilarini browserni Application sahifasida  Cookieslarda saqlab qolepti shu sabab user bitta browserdan kirganda unpublished qilinsaham documentni boshqa sahifadaham ko'ra olayapti lekin shu documentni unpublisheddan keyin boshqa borowserdan kirib ko'rilganda sahifa hato qaytarayapti chunki boshqa browserda userni cookilari yo'q va preview sabab boshqa userga bu document ko'rinmaydi
