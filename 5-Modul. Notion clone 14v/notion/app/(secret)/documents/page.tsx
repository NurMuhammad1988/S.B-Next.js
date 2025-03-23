"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

const DocumentPage = () => {
    const { user } = useUser(); //clerkni hooki
    const createDocument = useMutation(api.document.createDocument); //mutatsiya convex/documents/ faili ichidagi createDocument functioniga yo'naltirildi

    const onCreateDocument = () => {
        //bu holatda onCreateDocument functionda convexda document cretae qilish uchun yozilgan createDocument functioni chaqirilib qiymatlaridagi typi v.string berilgan title parametriga stringda  "Untitled" texti berib qo'yildi va bu onCreateDocument functioni "Create a blank" texti bor buttonga onclick bilanberib qo'yildi yani endi shu buttonga click bo'lganda shu onCreateDocument functioni ishlab  createDocument functionda yozilgan convexda dacument cretae qilish ishlaydi yani document create bo'ladi
        createDocument({
            title: "Untitled",
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
                {/* Create a blank buttoniga click bo'lganda onCreateDocument functioni ishlab ichidagi mutatsiya bo'ib kelgan createDocument functoni sabab convexda document yaratiladi yani convex  convex/documents.ts failidagi createDocument functionida aytilgan ishlar bajariladi  */}
            </Button>
        </div>
    );
};
export default DocumentPage;
