import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

////bu menu.tsx component user documentni create qilib bo'lgandan keyin faqat real user uchun ishlaydigan navbar.tsxda o'ng tomonida eng ohirida chiqadigan menu.tsx component!!!

interface MenuProps {
    documentId: Id<"documents">;
}

export const Menu = ({ documentId }: MenuProps) => {
    const router = useRouter();
    const { user } = useUser();

    const archive = useMutation(api.document.archive); ////convex/document.tsdan keletgan archive functioni bu holatda convex/document.tsdan kelgan archive function shu>>> api.document.archive//archive functionda convexni patch metodi bilan agar user idsi bor bo'lsa va document create qilgan bo'lsa shu create qilgan documentini idisiga qarab convexni get metodi bilan chaqirivolib isarchive qiymatini true qilib qo'yishni bajaradi

    const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (!documentId) return; //agar documentId yo'q bo'lsa shunchaki shu sahifani o'zini return qiladi

        const promise = archive({ id: documentId }) //document archive qilingandan keyin userni asosiy "/documents" papkasiga push qiladi yani app/(secret)/documents/page.tsx failiga router bilan jo'natadi yani document archived qilingandan keyin userni dynamic yaratilgan sahifadan  chiqarib qo'yadi// bu holatda promise o'zgaruvchini nomi = archive esa convex/document.tsdan keletgan archive functioni

        toast.promise(promise, {
            loading: "Archiving document...",
            success: "Archived document!",
            error: "Failed to archive document.",
        });

        router.push("/documents")//onArchive ishlab document archivega tushgabdan keyin router userni asosiy sahifaga yani real userga tegishli asosiy sidebar.tsx sahifasiga otvoradi
    };

    return (
        <DropdownMenu>
            {/* DropdownMenu, DropdownMenuTrigger ui.shadcn.comdan skachat qilingan hech qayerga qaramliksiz componentlar */}

            <DropdownMenuTrigger
                onClick={(e) => e.stopPropagation()} //event siklini to'htatish uchun
                asChild // shu child sabab MoreHorizontal iconga bosilganda event  bo'lib onArchive function ishga tushadi
            >
                <Button size={"sm"} variant={"ghost"}>
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            {/* DropdownMenuTrigger va DropdownMenuContent shadcn uidan kelgan componentlar bu componentlar ichida ts bila yozilganki DropdownMenuTrigger componentga click bo'lganda  DropdownMenuContent chiqadi bular shadcndan kelgan qaramsiz tekin codlar */}

            <DropdownMenuContent
                className="w-60"
                align="end"
                alignOffset={8}
                forceMount
            >
                <DropdownMenuItem onClick={onArchive}>
                    {/* delete textiga click qilinib onArchive function  ishlaganda document delete bo'meydi faqat arhiv papkaga tashab turiladi keyin user documentni udalit qilish niyati qattiy bo'lsa keyin arhivdanham udalit qilish mumkun */}
                    <Trash className="h-4 w-4 mr-2" />
                    {/* Trash icon  bu holatda MoreHorizontal iconiga yani 3 ta nuqtaga bosilganda chiqadi bunga sabab MoreHorizontal iconini ona compoenti hissoblangan DropdownMenuTrigger componentdagi asChild qiymati sabab va trash iconga bosilganda onArchive functioni ishlab documentni archived papkaga tushuradi yani convexdagi archivedga tushuradi va onArchive functiondagi toast.promise hodisalari convexdan kelgan javobga qarab ishlaydi va */}
                    Delete
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                {/* DropdownMenuSeparator bu huddi hr yani chiziqcha yuqoridagi delete texti bilan last edidted by textni orasini ochib turgan hr */}

                <div className="text-xs text-muted-foreground p-2">
                    Last edited by {""}
                    {user?.fullName}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};


Menu.Skeleton = function MenuSkeleton() {//yani bu componentda server so'rov functionlar bor shu sabab bu so'rovlar bajarulgancha shu loader ishlashi kerak
    return <Skeleton className="h-10 w-10" />; 

}