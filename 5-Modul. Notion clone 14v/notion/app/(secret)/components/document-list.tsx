"use client";

import { api } from "@/convex/_generated/api";
//convex/document.ts papkada convexda dacument yaratib app/(secret)/documnets/page.tsx failda esa yaratgan userni uiga chaqirib bu failda esa shu documentni o'zini chiqardik

import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";
import { Item } from "./item";

interface DocumentListProps {
    parentDocumentId?: Id<"documents">; //document idisi// "documents" esa functionni linki convex/document.tsda yozilgan createDocument functionida shu "documents" parentdocumentga parametr sifatida berib qo'yilgan tableni nomi table esa umumiy dacument turadigan umumiy ramka  yani parentdocument convexda document yaratish functionida bor qiymat id esa documentni idsi yani har bir yaratilgan documentni unikal idsi bo'ladi
    level?: number;
}

export const DocumentList = ({
    level,
    parentDocumentId,
}: DocumentListProps) => {
    const documents = useQuery(api.document.getDocuments, {
        // bu holatda useQuery convex/document.ts failidagi getDocuments functioniga boradi va getDocuments functionidagi parentDocument qiymatiga ichida documentlarga id qo'yadigan convexni Id functionini typi bor parentDocumentIdni solib qo'yadi shunda  endi getDocuments functionini parentDocument qiymatida user yaratadigan documentni idisi bor qiymat (parentDocumentId)bor
        parentDocument: parentDocumentId,
    });

    // console.log(documents);//create bo'lgan documentni ko'rish logi
    

    return <>
    {documents?.map(document => (
        <div key={document._id}>
            <Item/>
        </div>
    ))}
    </>
};
