"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const DocumentPage = () => {
    const { user } = useUser(); //clerkni hooki
    const router = useRouter();
    const createDocument = useMutation(api.document.createDocument); //mutatsiya convex/documents/ faili ichidagi createDocument functioniga yo'naltirildi

    const onCreateDocument = () => {
        //bu holatda onCreateDocument functionda convexda document cretae qilish uchun yozilgan createDocument functioni chaqirilib qiymatlaridagi typi v.string berilgan title parametriga stringda  "Untitled" texti berib qo'yildi va bu onCreateDocument functioni "Create a blank" texti bor buttonga onclick bilanberib qo'yildi yani endi shu buttonga click bo'lganda shu onCreateDocument functioni ishlab  createDocument functionda yozilgan convexda dacument cretae qilish ishlaydi yani document create bo'ladi
        const promise = createDocument({
            title: "Untitled",
        }).then((docId) => router.push(`/documents/${docId}`)); //createDocument convexda ishlab document create bo'lsa shu router sabab userni /documents/ papkaga olib boradi
        toast.promise(promise, {
            loading: "Creating a new blank",
        });
    };

    return (
        <div className="h-screen w-full flex justify-center items-center space-y-4 flex-col">
            <Image
                src={"/note.svg"}
                alt="Notion loyihasi logosi"
                width={300}
                height={300}
                // dark: hidden yani agar mode-toggle.tsx sabab thema dark bo'lsa bu svg icon hidden bo'ladi yani ko'rinmaydi o'rniga boshqa svg ko'rinadi// birinchi ligh note ichon
                className="object-cover dark:hidden"
            />

            <Image
                src={"/note-dark.svg"}
                alt="Notion loyihasi logosi"
                width={300}
                height={300}
                //  hidden dark:block yani light bo'ganda hidden bo'ladi dark bo'lganda ko'rinadi //ikkinchi dark note icon
                className="object-cover hidden dark:block"
            />

            <h2 className="text-lg font-bold ">
                Welcome to {user?.firstName}`s document page!
            </h2>
            <Button onClick={onCreateDocument}>
                <Plus className="h-4 w-4 mr-2" />
                Create a blank
                {/* Create a blank buttoniga click bo'lganda onCreateDocument functioni ishlab ichidagi mutatsiya bo'ib kelgan createDocument functoni sabab convexda document yaratiladi yani convex  convex/documents.ts failidagi createDocument functionida aytilgan ishlar bajariladi va bu Plus iconiham document create bo'lgandan keyin chiqadi va plus iconga click bo'lgandaham  onCreateDocument ishga tushadi va bola document yaratadi yani asosiy yaratilgan ona document ichida bola document yaratadi chunki Plus icon bor ona divga yani buttonga onCreateDocument onclikda berib qo'yilgan onCreateDocumentda faqat title qiymati chaqirilgan item.tsx failida esa  parentDocument:id qiymatiham chaiqirilgan bu  parentDocument:id qiymati  convex/documents.ts failidagi createDocument functionida bola documentyaratish uchun yozib qo'yilgan*/}
            </Button>
        </div>
    );
};
export default DocumentPage;
