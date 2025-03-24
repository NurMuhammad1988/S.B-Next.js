"use client";

import { api } from "@/convex/_generated/api";
//convex/document.ts papkada convexda dacument yaratib app/(secret)/documnets/page.tsx failda esa yaratgan userni uiga chaqirib bu failda esa shu documentni o'zini user bilan birga jsxga chiqardik

import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React, { useState } from "react";
import { Item } from "./item";
import { cn } from "@/lib/utils";

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
        //chevron iconga bosilganda ichidagi bola documentlarni ko'rsatish uchun yozilgan function tsx fail bo'lgani uchun functiongaham chaqiriladigan qiymatlarni typi aytilishi kerak bu holatda documentIdni typi string//yani onExpand functionda yangi documentId nomli qiymat yaratib unga string typini berib qo'ydik va ichida reactni Record qiymati bor Record typi object qabul qiladi yani record sabab yangi object qo'shiladi qanday yangi object qo'shiladi shu objectni o'zini yangisi ichiga yangi qiymat qo'shib yaratiladi record shu uchun kerak va ichida record typi bor setExpendedga reactda prev qiynati chaqirildi bu prev qiymat o'zidan oldingi holatni saqlab eslab qoladi va setExpanded ichuda prevni qayta nusxalab documentIdga massiv qilib solib qo'ydik
        setExpanded((prev) => ({
            //return object yani eski holatini qaytaradi
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
            <p
                className={cn(
                    "hidden text-sm font-medium text-muted-foreground/80",
                    expanded && "last:block",
                    level === 0 && "hidden"
                )}
                style={{
                    paddingLeft: level ? ` ${level * 12 + 25}px` : undefined,
                }}
            >
                No documents found.
                {/* agar ota documentni bolasi bo'lmasa shu text ishlaydi yani bu holatda p ichida classda default holatda hidden classi berildi yani bola document bo'lsa hech qanday "No documents found." texti chiqmeydi agar expanded true bo'lsa yani ichida prev bilan nusxa qilingan eskiholati bor bo'lsa yani bola document bor bo'lsa yani expanded state ichida boladoxument bor bo'lsa yani true bo'lsa ohirgi block lasy block ishlab bu fragment (ona div) ichidagi ohirgi element block bo'ladiyani hiddendan chiqadi yanibu fragment ichidagi ohirgi div blockidagi docemtns map qilingan bloch ishlaydi */}
            </p>
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

                        {expanded[document._id] && ( //yani  ichida onExpand fucntionda ichida setExpandedga reactni record functioni bilan sovolingan objectni eski holati bor expanded true bo'lsa yani eski holati bor bo'lsa document-list.tsx faili qaytadan level + 1 bilan chiqsin yani ota documentlarni bolasi bor bo'lsa shunda ota document strelka iconiga click bo'lganda ichidagi bola documentlarha chiqadi bu onExpand function uidaham ishlashi uchun item.tsx failigaham jo'natilishi kerak shunda item.tsxga map qilinib propsdan jo'natilgan ishga tushadi
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
