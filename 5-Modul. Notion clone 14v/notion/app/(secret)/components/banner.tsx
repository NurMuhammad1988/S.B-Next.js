import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useSubscription from "@/hooks/use-subscription";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface BannerProps {
    documentId: Id<"documents">; //bu banner.tsx fail chaqirilga real user uchun yaratilgan secret papka ichidagi navbar.tsx failida chaqirilgan va propsiga documentIdda obshi {document._id} bilan jo'natilgan  va bu idlarni qaysi idilar ekanligini bilish uchun convex/_generated/dataModel dan keladigan idlarni generet qiladigan convexni server componenti chaqirilgan va qaysi papkadan olishini <"documents"> deb papkani ssilkasi berib qo'yilgan yani covex/document.tsx falidagi idlarni generet qiladi
}

//// bu banner.tsx faili faqat trash-box.tsx  ichida ishlaydi chunki components/)(secret)/navbar.tsxda   {document.isArchived && <Banner documentId={document._id}/>}<<<shunday qilib vazifa berilgan yani bu banner.tsx faqat umumiy documentni isArchuved qiymati true bo'lsagina ishga tushadi yani sidebardagi trash iconga click qilinganda  agar ichuda isArchived qilingan documentlar bor bo'lsa shu documentlarni chiqaradi isArchivedni false yoku true bo'lishi trash-box.tsx failida yozigan va u trash-box.tsx failiham real user uchun asosiy sidebar.tsxda trash icon bilan popoverlar ichida chaqirilgan
////convex/document.ts da yaratilgan documentni isArchived qiymati tog'ri bo'lsagina bu banner.tsx ishlaydi yokida ishlamaydi isArchived qiymatini false yokida true bo'lishi holati esa trash-box.tsx failida  yozilgan yani trash-box.tsx failidagi holatga qarab isArchived true yokida false qaytaradi shu true yoki falsega qarab bu banner.tsx ishga tushadi yokida tushmaydi

////agar documentni yani  convexni useQuery functioni chaqirilgan document o'zgarunchida kelgan query yani user yaratgan documentni isArchived qiymati yani convex/document.ts da yaratilgan documentni isArchived qiymati tog'ri bo'lsagina bu banner.tsx ishlaydi yokida ishlamaydi isArchived qiymatini false yokida true bo'lishi holati esa trash-box.tsx failida  yozilgan yani trash-box.tsx failidagi holatga qarab isArchived true yokida false qaytaradi shu true yoki falsega qarab bu banner.tsx ishga tushadi yokida tushmaydi agar true qaytarsa sidebar.tsx faildagi trash iconga click qilinsa banner ishga tushadi yokida yo'q bu holat shu joyda yani aynan real user uchun yaratilgan navbar.tsxda chaqirildi yani if else holati aynan real user navbarida qilindi chunki user shu joyda turganda va trash iconga bosganda userni isArchived qilgan faillari ko'ringanda titlesiga bosilganda ishlashi uchun

/////////////yani user trash iconga click qilganda isArchivedga tushgan documentlar chiqadi va shu documentlarga click qilinganda isArchived holati true bo'lgani uchun bu bannar.tsx navbar real user navbarida chiqadi

export const Banner = ({ documentId }: BannerProps) => {
    const router = useRouter();
    const { user } = useUser(); //clerkni hooki

    const remove = useMutation(api.document.remove);
    const restore = useMutation(api.document.restore);

    const allDocuments = useQuery(api.document.getAllDocuments);

    const { isLoading, plan } = useSubscription(
        user?.emailAddresses[0]?.emailAddress!
    );

    const onRemove = () => {
        const promise = remove({ id: documentId }); ////convex/document.ts/remove functonni promise nomli o'zgaruvchida chaqirilishi

        toast.promise(promise, {
            loading: "Removing document...",
            success: "Removed document!",
            error: "Failed to remove document",
        });

        router.push("/documents");
    };

    const onRestore = () => {
        //documentni qayta tiklash uchun

        if (
            //banner.tsxdaham free plandagi user 3 tadan ortiq document yarataolmasligi yani bu holatda trashboxda archived qilib 3 tadan ortiq documentni qaytada restore qilaolmasligi uchun
            allDocuments?.length &&
            allDocuments.length >= 3 &&
            plan === "Free"
        ) {
            toast.error(
                "You already have 3 documents notes. Please delete one to restore this note. (banner.tsx onRestore function reaction for) "
            );
            return;
        }

        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: "Restoring document...",
            success: "Restored document!",
            error: "Failed to restore document",
        });
    };

    return (
        <div className="w-full bg-red-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
            <p>This page is in the Trash</p>
            <Button
                className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
                size={"sm"}
                variant={"outline"}
                onClick={onRestore}
            >
                Restore document
                {/* shu restore documentga click qilinganda  onRestore functionham ishlab agar  
                allDocuments?.length &&
                allDocuments.length >= 3 &&
                plan === "Free"     bo'lsa  bundaham ohirgi yani3 chidan ortqi documentni restore qilaolmaydi  hullas onRestore function ichidagi yuqoridagi mantiq ishga tushadi va user 3 ta bilan cheklanishga majbur bo'ladi yani restore qiladigan function agar userni docuemntlari 3 ta bo'lsa 4 chini restore qilmaydi oddiy qilib aytganda shu yani 3 tadan ortiq document bo'lsa toastdagi text info chiqadi shunda user "delete forever"ga majbur bo'ladi  */}
            </Button>

            <ConfirmModal onConfirm={() => onRemove()}>
                {/*ConfirmModal componentda  onConfirm props bilan void function qilingan shu sabab ichiga qanday function yozilsaham ishlayveradi bu holatda yuqoridagi convex/document.tsda promise bilan chaqirilgan remove function ishlatildi ///////yani endi bu buttonga click qilinganda confirmmodal component ishlab ichida chaqirilgan onRemove functionini ishlatadi va Delete forever qiladi*/}
                <Button
                    className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
                    size={"sm"}
                    variant={"outline"}
                >
                    Delete forever
                </Button>
            </ConfirmModal>
        </div>
    );
};
