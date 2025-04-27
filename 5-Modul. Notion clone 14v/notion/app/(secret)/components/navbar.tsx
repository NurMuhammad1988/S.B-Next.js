import { Loader } from "@/components/ui/loader";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { Title } from "./title";
import { Publish } from "./publish";

// agar user document create qilgan bo'lsa va documentlari idilar bor bo'lsa ishlaydigan navbar yani faqat regester qilgan user uchun chiqadigan navbar component home pagedagi asosiy navbarmas 

interface NavbarProps {
    isCollapsed: boolean;//isCollapsed va reset sdebar.tsxdan props bilan chaqirldi
    reset: () => void;
}

export const Navbar = ({ isCollapsed, reset }: NavbarProps) => {
    const params = useParams();

    const document = useQuery(api.document.getDocumentById, {
        id: params.documentId as Id<"documents">,
    });

    if (document === undefined) {
        return (
            <nav className="bg-background px-3 py-2 w-full flex items-center justify-between">
                <Title.Skeleton />
                <div className=" flex items-center gap-x-2">
                    <Loader />
                </div>
            </nav>
        );
    }

    if (document === null) {
        return null;
    }

    return (
        <>
            <nav className="bg-background  px-3 py-2 w-full flex items-center gap-x-4">
                {isCollapsed && ( //agar boshida false qilingan isCollapsed statesi true bo'lsa shu icon ishlaydi va ustiga onclick qilinsa reset functionda berilgan stylelarga o'zgaradi yani qaytadan sidebar qismi chap tomondan chiqib keladi
                    <MenuIcon
                        className="h-6 w-6 text-muted-foreground"
                        role="button"
                        onClick={reset} //menuiconga click bo'lganda ichida elementref bo'lgan reset function ishlab calc bilan 100% holatda turgan  windowdan 240px joyni -minus qilib tashlaydi shunda yuqoridagi collapse functioni berilgan divga joy ochiladi
                        // bu holatda ishlatilayotgan isCollapsed va reset functionlar sidebar.tsxdan props bilan chaqirilgan functionlar shu sabab bu failda buy functionlarni o'zi yo'q faqat props bilan chaqrilib ishlatildi
                    />
                )}

                <div className="flex items-center justify-between w-full">
                    {/* bu navbar.tsx faili sidebar.tsxda chaqirilgan va chaqirilgan joyida o'ng tomonga qo'yilgan yani  sidebar.tsx faqat chap tomondan 240px joyni egallagan qolgani shu navbar.tsx joylashtirilgan va bu navbar.tsxham ikkiga bo'lingan ona divdagi flex items-center justify-between w-full classlariga qara va chap flex sabab chap tomonga Title.tsx  o'ng tomongayaniflex sabab davomigaesa Publish.tsx joylashtirildi va aslida bu faillarni hammasini ona divi sidebar.tsx faili hissoblanadi */}
                    <Title document={document} />
                    {/* props bilan jo'natilayotgan documentda aynan qaysi document bilan ishlanayotgani haqida idlarga qarab biladigan document bor ()*/}

                    <div className="flex items-center gap-x-2">

                        <Publish document={document}/>
                    </div>
                </div>
            </nav>
        </>
    );
};
