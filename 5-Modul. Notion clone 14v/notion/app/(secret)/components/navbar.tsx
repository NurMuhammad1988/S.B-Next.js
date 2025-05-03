import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { Title } from "./title";
import { Publish } from "./publish";
import { Menu } from "./menu";
import { Banner } from "./banner";

// agar user document create qilgan bo'lsa va documentlari idilar bor bo'lsa ishlaydigan navbar yani faqat regester qilgan user uchun chiqadigan navbar component home pagedagi asosiy navbarmas

interface NavbarProps {
    isCollapsed: boolean; //isCollapsed va reset sdebar.tsxdan props bilan chaqirldi
    reset: () => void;
}

export const Navbar = ({ isCollapsed, reset }: NavbarProps) => {
    const params = useParams();

    const document = useQuery(api.document.getDocumentById, {
        id: params.documentId as Id<"documents">, //yani bu documentId endi huddiki /convex/_generated/dataModel yani bu documentIdda endi convexni Id generete qiladigan componenti bor va parametridagi "documents" esa qaysi faildagi documentni idlarini generet qilishyani convex/documents.ts failiga link endi convexni Id generete qiladigan server componentni convex/documents.ts failidagi functionlarda yaratilgan idlarni hammasini convex serverda turgan functionlar bilan generete qilib tanib oladi yani bu holatda asosan convex/document.tsx failidagi getDocumentById functionida chaqirilgan idlarni generet qiladi  shunda convexdagi obshi documentlar orasidan yoki shu loyiha ozida agar har hil boshqa idlar bo'lsaham adashmasdan aynan kerakli papkaga borib aynan o'sha papkadagi idlarni generet qiladi bu as Id shu uchun juda muhum buni to'g'ri yo'natirish uchun nextni useParams functioni kerak chunki useParams documentId nomli o'zgaruvchi ichiga shu convex Idni solib beradi
    });

    if (document === undefined) {
        //agar convexdan keladigan document va idilari topilmasa shu if operator ishlab pastdagi navni return qiladi
        return (
            <nav className="bg-background px-3 py-2 w-full flex items-center justify-between">
                <Title.Skeleton />
                {/* yani menu.tsx server so'rovlari bilan kelgancha agar kech qolsa shu menu.tsxdagi Skeleton function va ichidagi loader uchun qo'yilgan animatsya icon ishlaydi */}
                <div className=" flex items-center gap-x-2">
                    <Menu.Skeleton />
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
                    {/* bu navbar.tsx faili sidebar.tsxda chaqirilgan va chaqirilgan joyida o'ng tomonga qo'yilgan yani  sidebar.tsx faqat chap tomondan 240px joyni egallagan qolgani shu navbar.tsx joylashtirilgan va bu navbar.tsxham ikkiga bo'lingan ona divdagi flex items-center justify-between w-full classlariga qara va chap flex sabab chap tomonga Title.tsx  o'ng tomonga yani flex sabab davomiga esa Publish.tsx joylashtirildi va aslida bu faillarni hammasini ona divi sidebar.tsx faili hissoblanadi yani bu faillar ha joyda allohoda yozilib bitta sidebar.tsxga chaqirib ishlatilgan */}
                    <Title document={document} />
                    {/* title screnni chap tomonini egallaydi bu navbar real userni sidebar.tsxda chaqirilgan va chap tomondan 240px dan keyin chiqadi yani navbar faqat tepada chiqadi birinchi shu title,tsx navbar ohirida esa publish va menu tsxlar chiqadi*/}
                    {/* props bilan jo'natilayotgan documentda aynan qaysi document bilan ishlanayotgani haqida idlarga qarab biladigan document bor ()*/}

                    <div className="flex items-center gap-x-2">
                        <Publish document={document} />
                        {/* publish.tsx screnni chap tominida kinchkina joy egallaydi yani faqat popover uchun joy oladi popoverdagi "Share' textiga click qilinganda ichida yana functionlar ishllaydi puplish unpublish copy va hakozo functionlar bor*/}

                        <Menu documentId={document._id} />
                        {/* menu.tsx bu sidebar.tsxda chiqadigan asosiy real userni navbarida o'ng tomon ohirda MoreHorizontal iconi bilan chiqadi MoreHorizontal iconiga bosilganda shu menu.tsx failidagi functionlar eventlar ishga tushadi */}
                    </div>
                </div>
            </nav>

            {document.isArchived && <Banner documentId={document._id} />}
            {/* paramsda kelgan bu documentIdda hamma idlar bor shu idlarni document nomli yuqoridagi o'zgaruvchi bilan birga props bilan banner.tsxga jo'natdik  /////////////yani documentId idlarni generet qiladi qaysi idlarni generet qiladi document o'zgaruvchida query bilan chaqirilgan idlarni yani convex/document.tsx failidagi getDocumentById functionida kelgan idilarni generet qilgan holda banner.tsxga jo'natadi */}
            {/* agar documentni yani  convexni useQuery functioni chaqirilgan document o'zgarunchida kelgan query yani user yaratgan documentni isArchived qiymati yani convex/document.ts da yaratilgan documentni isArchived qiymati tog'ri bo'lsagina bu banner.tsx ishlaydi yokida ishlamaydi isArchived qiymatini false yokida true bo'lishi holati esa trash-box.tsx failida  yozilgan yani trash-box.tsx failidagi holatga qarab isArchived true yokida false qaytaradi shu true yoki falsega qarab bu banner.tsx ishga tushadi yokida tushmaydi agar true qaytarsa sidebar.tsx faildagi trash iconga click qilinsa banner ishga tushadi yokida yo'q bu holat shu joyda yani aynan real user uchun yaratilgan navbar.tsxda chaqirildi yani if else holati aynan real user navbarida qilindi chunki user shu joyda turganda va trash iconga bosganda userni isArchived qilgan faillari ko'ringanda titlesiga bosilganda ishlashi uchun

            /////////////yani user trash iconga click qilganda isArchivedga tushgan documentlar chiqadi va shu documentlarga click qilinganda isArchived holati true bo'lgani uchun bu bannar.tsx navbar real user navbarida chiqadi
            
            */}
        </>
    );
};
