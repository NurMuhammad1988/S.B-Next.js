"use client";

import Cover from "@/components/shared/cover";
import Toolbar from "@/components/shared/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

//bu sahifada chaqirilgan toolbar va cover tsxlar prewiew qiymati true qilingan  yani preview qiymatlari berilganini sababi bu sahifada document dynamic yaratiladi yaratilgan sahifaga esa convex unique link beradi shu linkni yani documentni puplish qilib linkni boshqa userlarga jo'natganda linkdagi yangi sahifadagi postni boshqa userlar o'zgartiraolmaydi shu uchun preview qiymatlariga toolbar va cover tsx faillarida va operatori bilan mantiqiy vazifalar berilgan bu ikkala componentga  preview qiymati  berilmagan joylarda documentni create qilganuser hamma ishni qilaoladi lekin preview berilgan yani preview true qilinganbu sahifada yaratilgan documentda hech kim toolbar va cover tsxdan foydalanib documentni change qilaolmaydi
//bu sahifaga o'hshash yana [documentId] sahifa bor unda preview qiymati yo'q u documenti create qiladigan edit qiladigan user uchun bu esa preview qiymati bor shunda dastur biladi kim real user kim begona.... yani shu preview mantig'i orqali tanib oladi
interface DocumentIdPageProps {
    params: {
        documentId: Id<"documents">;
    };
}

const Page = ({ params }: DocumentIdPageProps) => {
    const document = useQuery(api.document.getDocumentById, {
        id: params.documentId as Id<"documents">,
    });

    const Editor = useMemo(
        () =>
            dynamic(() => import("@/components/shared/editor"), { ssr: false }),
        []
    );

    if (document === undefined) {
        return (
            <div>
                <Cover.Skeleton />
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
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

    return (
        <div className="pb-40">
            <Cover url={document.coverImage} preview />
            {/* preview sabab endi cover imageni faqat documentni create qilgan user o'zgartira oladi */}

            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar document={document} preview />
                {/* bu holatdaham preview sabab faqat real user toolbardan foydalana oladi/// toolbar bu bu pageda ishlatilganda "use client" berilgan chunki toolbarda server componentlar bor ssr talab qilinadi*/}

                <Editor
                    initialContent={document.content}
                    onChange={() => {}}//editordan props bilan kelgani function qabul qilishga majbur ekanligi sabab bo'sh function berib qo'yildi bo'masa hato qaytarishi mumkun
                    editable={false} //false bo'lgani uchun boshqa userlarga ishlamaydi faqat shu document egasi bo'lgan usergina ishlata oladi yani editorni editable qiymati bu joyda yani document dycnamic yaratilib link berilgan joyda ishlamaydi
                />
            </div>
        </div>
    );
};

export default Page;

//bittagina hato borga o'hshaydi lekin hato yo'q yani yani agar user documentni crete qilib uni publish qilib publish qilingan documentni urlini copy qilib shu bu urlga alohida sahifada kirsa o'zi yaratgan documentni hech narsani change qilaolmayapti yani preview sabab va keyn user documenni unPublished qilsaham alohid sahifada ochilgan shu unpublished qilingan document baribir yo'qolib qolmayapti bu esa hatomas chunki user bitta browserdan foydalanayapti browser esa userni datalarini yani idilarini browserni Application sahifasida  Cookieslarda saqlab qolepti shu sabab user bitta browserdan kirganda unpublished qilinsaham documentni boshqa sahifadaham ko'ra olayapti lekin shu documentni unpublisheddan keyin boshqa borowserdan kirib ko'rilganda sahifa hato qaytarayapti chunki boshqa browserda userni cookilari yo'q va preview sabab boshqa userga bu document ko'rinmaydi
