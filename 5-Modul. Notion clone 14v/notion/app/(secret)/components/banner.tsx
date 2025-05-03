import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface BannerProps {
    documentId: Id<"documents">; //bu banner.tsx fail chaqirilga real user uchun yaratilgan secret papka ichidagi navbar.tsx failida chaqirilgan va propsiga documentIdda obshi {document._id} bilan jo'natilgan  va bu idlarni qaysi idilar ekanligini bilish uchun convex/_generated/dataModel dan keladigan idlarni generet qiladigan convexni server componenti chaqirilgan va qaysi papkadan olishini <"documents"> deb papkani ssilkasi berib qo'yilgan yani covex/document.tsx falidagi idlarni generet qiladi
}

          
//// bu banner.tsx faili faqat trash-box.tsx  ichida ishlaydi chunki components/)(secret)/navbar.tsxda   {document.isArchived && <Banner documentId={document._id}/>}<<<shunday qilib vazifa berilgan yani bu banner.tsx faqat umumiy documentni isArchuved qiymati true bo'lsagina ishga tushadi yani sidebardagi trash iconga click qilinganda  agar ichuda isArchived qilingan documentlar bor bo'lsa shu documentlarni chiqaradi isArchivedni false yoku true bo'lishi trash-box.tsx failida yozigan va u trash-box.tsx failiham real user uchun asosiy sidebar.tsxda trash icon bilan popoverlar ichida chaqirilgan

export const Banner = ({ documentId }: BannerProps) => {
    const router = useRouter();

    const remove = useMutation(api.document.remove);

    const onRemove = () => {
        const promise = remove({ id: documentId }); ////convex/document.ts/remove functonni promise nomli o'zgaruvchida chaqirilishi

        toast.promise(promise, {
            loading: "Removing document...",
            success: "Removed document!",
            error: "Failed to remove document",
        });

        router.push("/documents");
    };

    return (
        <div className="w-full bg-red-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
            <p>This page is in the Trash</p>
        </div>
    );
};

