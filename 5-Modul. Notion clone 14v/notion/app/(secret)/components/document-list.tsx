"use client";

import { api } from "@/convex/_generated/api";
//convex/document.ts papkada convexda dacument yaratib app/(secret)/documnets/page.tsx failda esa yaratgan userni uiga chaqirib bu failda esa shu documentni o'zini user bilan birga jsxga chiqardik

import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React, { useState } from "react";
import { Item } from "./item";

interface DocumentListProps {
    parentDocumentId?: Id<"documents">; //document idisi// "documents" esa functionni linki convex/document.tsda yozilgan createDocument functionida shu "documents" parentdocumentga parametr sifatida berib qo'yilgan tableni nomi table esa umumiy dacument turadigan umumiy ramka  yani parentdocument convexda document yaratish functionida bor qiymat id esa documentni idsi yani har bir yaratilgan documentni unikal idsi bo'ladi
    level?: number; //ota documentda bola document yo'q bo'lishixam mumkun shu sabab ? qo'yildi
}

export const DocumentList = ({
    level = 0,
    parentDocumentId,
}: DocumentListProps) => {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const onExpand = (documentId: string) => {
        setExpanded((prev) => ({
            ...prev,
            [documentId]: !prev[documentId],
        }));
    };

    const documents = useQuery(api.document.getDocuments, {
        // bu holatda useQuery convex/document.ts failidagi getDocuments functioniga boradi va getDocuments functionidagi parentDocument qiymatiga ichida documentlarga id qo'yadigan convexni Id functionini typi bor parentDocumentIdni solib qo'yadi shunda  endi getDocuments functionini parentDocument qiymatida user yaratadigan documentni idisi bor qiymat (parentDocumentId)bor
        parentDocument: parentDocumentId,
    });

    // console.log(documents);//create bo'lgan documentni ko'rish logi

    return (
        <>
            {documents?.map(
                (
                    document //user va user create qiladigan documentni (secret)/components/item.tsx fasiliga props bilan jo'natildi qiymatlarida esa convexdan keladigan Id va label bor idda esa aynan shu user crerate qiladigan documentlarni idisi bor labelda esa document.tsda yozilgan getDocument functiondan keladigan documentni string typli titlesi bor
                ) => (
                    <div key={document._id}>
                        <Item
                            label={document.title}
                            id={document._id}
                            level={level}
                            expanded={expanded[document._id]}
                            onExpand={() => onExpand(document._id)}
                        />
                        {/* bu fail document-list.tsx faili lekin shudaham doxumentlar map qilinib item.tsx failga jo'natilganda document-list.tsxniham map qilib item.tsx failiga jo'natdik yani failnui o'zini ichida shi failni o'zini map qildik endi document-list.tsx props bilan item.tsx ga jo'natilganda  parentDocumentId={document._id} jo'natildi yani birinchi yartilgan doxument idisi va level yani level typi number bunga 1 qo'shildi yani agar ichida getDocuments bor doxuments o'zgaruvchi ichida id bor bo'lsa yani document create qilingan bo'lsa level bilan shu doxumentga bola doxument qo'shadi yani har safar 1 ta doxument qo'shadi */}

                        {expanded[document._id] && (
                            <DocumentList
                                parentDocumentId={document._id}
                                level={level + 1}
                            />
                        )}
                    </div>
                )
            )}
        </>
    );
};
