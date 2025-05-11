"use client";
import Cover from "@/components/shared/cover";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";

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

    if (document === undefined) return null;

    return (
        <div className="pb-40">
            {
                <Cover
                    url={
                        "https://marketplace.canva.com/EAECJXaRRew/3/0/1600w/canva-do-what-is-right-starry-sky-facebook-cover-4SpKW5MtQl4.jpg"
                    }
                />
            }
        </div>
    );
};

export default DocumentIdPage;
