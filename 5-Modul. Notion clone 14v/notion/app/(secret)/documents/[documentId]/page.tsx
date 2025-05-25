"use client";
import Cover from "@/components/shared/cover";
import Toolbar from "@/components/shared/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import "@blocknote/mantine/style.css";


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
    }); //  // bu paramsda kelgan documentId document dynamic yaratilganda yaratiladi yani (secret) papkani ichida bo'lgani uchun bu [documents] shu (secret) papkani assosiy sahifasi (secret)/documents/page.tsxda yaratilgan dynamic sahifalarni qabul qiladi yani ona papkasini asossiy page.tsx sahifasida yaratilgan dynamic sahifalarni qabul qiladi ona papka esa bu holatda (secret) papkasi va params bilan documentni idsini oladi
    const updateFields = useMutation(api.document.updateFields);

    const Editor = useMemo(
        () =>
            dynamic(() => import("@/components/shared/editor"), { ssr: false }), 
        [] //bu ssr false endi kerak emas edi lekin mayli turavorsin
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
        updateFields({
            id: document._id,
            content: value,
        });
    };

    return (
        <div className="pb-40">
            <Cover
                url={
                   document.coverImage
                }
            />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar document={document} />
                {/* bu toolbar component getDocumentById ishlab yserni documentlari sererdan kelganda ishleydi va bu dynamic yaratilgan document pageda hover bo'lsa ishlaydi yokida yo'q yani toolbar.tsxda shunday classlar yozilgan va add iconga click qilinganda IconPicker comonent ishga tushib "emoji-picker-react"kutubhonasidan chaqirilgan emojilar componenti ishga tushadi va user hohlasa documentga emoji add qiladi */}
                <Editor initialContent={document.content} onChange={onChange} />
            </div>
        </div>
    );
};

export default DocumentIdPage;

// BITTAGINA HATO BOR YANI DOCUMENT CREATE QILINGANDAN KEYIN UNPUBLISHED QILINSAHAM SHARED QILINGAN LINKDA UNPUBLISHED QILINGAN DOCUMENT UDALIT BO'LMAYAPTI FAQAT QACHONKI TRASH PAPKADAN UDALIT QILINSAGINA LINKDAGI DOCUMENT KEYIN HATO BEREPTI!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
