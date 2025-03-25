"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import {
    ChevronDown,
    ChevronRight,
    LucideIcon,
    MoreHorizontal,
    Plus,
    Trash,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { cn } from "@/lib/utils";

interface ItemProps {
    id?: Id<"documents">;
    label: string; //bu label document-list.tsxdan props bilan jo'natilgan va qiymatiga documents.tsda yozilgan getDocument functionda parentdocument bilan link berilgan convex serverdagi "documents" papkadagi link berilgan yani labelda convex serverdan keladigan documentni string qiymatli objecti bor
    level?: number; //ota document ichiga bola documentni qo'shish uchun
    expanded?: boolean; //mantiqiy: chunki document-list.tsxdan kelgan bu qiymay false bo'lishixam mumkun yani prev borham yo'qham bo'lishi mumkun
    onExpand?: () => void; //document-item.tsxda yozilgan function shunchaki bo'sh yani endi bu faqilda chaqirilsa shu function togridan togri kelib ishlaydi hato qaytarmaydi
    onClick?: () => void;
    active?: boolean; //dynamic keladigan document pagelarga active class berish uchun
    documentIcon?: string;
    icon?: LucideIcon;
}

//bu Item.tsx functionnalari bilan ishlashi uchun sidebar.tsx failida chaiqilib qiymatlariga kerakli typlar berilib ishlatilishi kerak 

export const Item = ({
    label,
    id,
    level,
    expanded,
    onExpand,
    onClick,
    active,
    documentIcon,
    icon: Icon,
}: ItemProps) => {
    const { user } = useUser(); //clerkni usesuer hooki bilan user objecti chaqirildi yani bu loyihada clerk bilan user crete qilib convexga joylashtirib ishlatilepti

    const createDocument = useMutation(api.document.createDocument); //convex/document.tsdan kelepti usemutatsion esa bu item.tsx fail uchunham vreatedocument functionni ulab beradi

    const onCreateDocument = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        //onCreateDocument function jsx ichida pastda divga berilgan divda Plus iconiga click bo'lganda Plus iconni ona divida turgan bu onCreateDocument function ishlaydi

        event.stopPropagation(); //bitta event sodir bo'lgandan keyin eventni to'htatadi

        if (!id) return; //agar convex serverda genereted bo'lib keladigan  id yo'q bo'lsa hech narsa qaytarmaydi

        createDocument({
            //createDocumentda convex/document.ts faildan kelgan createDocument functioni qiymatlari bilan keldi agar yuqoridagi false yo'q bo'lsa yani id kelgan bo'lsa createDocument convexda document yaratadi yani  app/(secret)/documents/page.tsx failda "create a blank" buttoni bosilgandan keyin yaratilgan document ichida Plus iconi bor shu Plus iconga click bo'lganda asosiy document ichida yana document yaratiladi yani ona document ichida bola document yaratiladi
            title: "Untitled",
            parentDocument: id, //bola document yaratish uchun masalan asosiy app/(secret)/documents/page.tsx failda bu createDocument chaiqrilganda faqat createDocumentni title qiymati chaqirilgan edi endi esa parentDocument qiymatiham chaiqirildi va bu asosiy onCreateDocument functioni Plus iconi bor divga berib qo'yildi yani shunda "create a blank" buttoniga click bo'lgandan keyin shu item.tsx faili chiqadi va Plus iconiga bosilganda onCreateDocument functioni convex/documents.tsdan chaiqirilgan createDocumentni ikkala qiymatiham ishlab "create a blank" ga bosilganda yaratilgan asosiy document ichida bola document yaratadi
        }).then((document) => {
            //yani agar createDocumentda document titlesi va parentDocumenti yani bolasi bilan bor bo'lsa shu documentni then metodi bilan chaqirib u documentga agar typi boolean bo'lgan expanded qiymati false bo'lsa  onExpand function ishlasin deyildi  onExpand functionda esa objectbi avvalgi holatini saqlash bor yani agar expanded false bo'lsa yani yo'q bo'lsa  onExpand avvalgidsini berib turadi

            if (!expanded) {
                onExpand?.();
            }
        });
    };

    const handleExpand = (
        //bu function eventni boshqarish uchun yani masalan document-list.tsx faildan kelgan onExpand function ishlatish va har ishlaganda to'htatish uchun stop qo'yish// bu functiuon ChevronIconga click bo'lganda ishlaydi yani shu uchun ChevronIcvon bor divga chaqirib qo'yilgan ChevronIcon iconmas boolean vazifa berilgan o'zgaruvchini nomi yani ChevronIcon o'zgaruvchidagi mantiqqa qarab iconlar o'zgaradi
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onExpand?.();
    };

    const ChevronIcon = expanded ? ChevronDown : ChevronRight; //o'zgaruvchi bu holatda icon yani Chevron iconlarga ga mantiqiy hodisa ilish yani agar expanded true bo'lsa yani objectni avvalgi holatida datalar saqlangan bo'lsa yani bola documentlar bor bo'lsaa ChevronDown ishlaydi agar yo'q bo'lsa ChevronRight ishlaydi yani aslida ChevronRight doim ishlab turadi  chunki ChevronDownga click bo'lmagancha expanded falseday turadi qachonki click bo'lganda boolean ishlab javob aytadi
    return (
        <div
            style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }} //yani agar ota documentni bolasi bor bo'lsa yani level true bo'lsa yani document-item.tsxda kelgan level + 1 yani true bo'lsa left tomondan paddingni 12 ga ko'paytirib 12px qo'shadi yani
            className={
                cn(
                    "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
                    active && "bg-primary/5 text-primary"
                ) //bu active qiymati document-list.tsxda yozilib propsdan jo'natilgan boolean qiymat sidebarni asosiy itemlari bor yani document create qilsa bo'ladigan bu item.tsx failida onda divga chaiqilib cn bilan bollean holatlarga qarab stle berildi yanai agar  bu ona div ichida mishka birorta buttonga (role="button") click qilinsa yani documentlarga bosilganda hover bosilgan joyda qoladi user qaysiu document ichida ekanligini bilish uchun shunda orqa foni va textni rangi o'zgarib qotib ajralib turadi
            }
            role="button"
            onClick={onClick} //bu holatda yozilishiga sabab onClick document-item.tsxdan  keletgan avoid fucntion bu jsx ichidaham ishlashi uchun masalan document-item.tsxda chaiqirilgan bu Item componentga click bo'lganda router document idisga qarab ota documentni sahifasiga jo'natadi va shu function bu yerdaham ishlasahi uchun yani masalan document-item.tsxda Item.tsx failiga click bo'lgandaham router ishlaydi va Item.tsx failidaham bola documentga yoki yana asosiy ota doxumentga click bo'lganda ishlaydi shu uchun return ichida asosiy ona div ichida onclick chaqirildi yani onclick ichida aslida onRedirect functioni bor
        >
            {!!id && (
                <div
                    className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
                    role="button"
                    onClick={handleExpand}
                >
                    <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                    {/* ChevronIcon bu iconmas bu o'zgaruvchi va ichida ikkita iconga mantiqiy vazifa berilgan afar expanded true bo'lsa yani bola document bor bo'lsa icon ChevronDownga o'zgaradi fasle bolsa ChevronRightga o'zgaradi yani doim chevronrightda turadi bosilganda va expanded true bo'lsagina chevrondownga o'zgaradi */}
                </div>
            )}

            {documentIcon ? (
                <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
            ) : (
                Icon && (
                    <Icon className="shrink-0  h-[18px] w-[18px] mr-2 text-muted-foreground" />
                )
            )}

            <span className="truncate">{label}</span>

            {!!id && ( //agar document id qattiyan bo'lmasa yani user hali document create qilmagan bo'lsa
                <div className="ml-auto flex items-center gap-x-2">
                    <DropdownMenu>
                        {/* DropdownMenu, DropdownMenuTrigger ui.shadcn.comdan skachat qilingan hech qayerga qaramliksiz componentlar */}

                        <DropdownMenuTrigger
                            onClick={(e) => e.stopPropagation()} //event siklini to'htatish uchun
                            asChild
                        >
                            <div
                                role="button"
                                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                                // group classi sababli MoreHorizontal yani ... iconi bor divga mishka borganda hoverlar ishlayapti yani bu jsxni ona divigaham group classi berilgan shu class sabab bitta divga mishka borganda ikkinchi divdagi hoverham ishlaydi masalan bu holatda ona divga mishka borganda bu bola divdagi hoverham ishlayapti yani ona divga borganda ... iconiham hover bo'lib opacitysi 100 bo'lepti va hover bo'lib bola div chiqgandan keyin bola divdagi iconni o'zigaham berilgan hover classlar ishlepti masalan hover:bg-neutral-300<<shu class
                            >
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </DropdownMenuTrigger>
                        {/* DropdownMenuTrigger va DropdownMenuContent shadcn uidan kelgan componentlar bu componentlar ichida ts bila yozilganki DropdownMenuTrigger componentga click bo'lganda  DropdownMenuContent chiqadi bular shadcndan kelgan qaramsiz tekin codlar */}

                        <DropdownMenuContent
                            className="w-60"
                            align="start"
                            side="right"
                            forceMount
                        >
                            <DropdownMenuItem>
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                            {/* DropdownMenuSeparator bu huddi hr yani chiziqcha yuqoridagi delete texti bilan last edidted by textni orasini ochib turgan hr */}

                            <div className="text-xs text-muted-foreground p-2">
                                Last edited by
                                {user?.fullName}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div
                        className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                        role={"button"}
                        onClick={onCreateDocument} //bu item.tsx faili onCreateDocument Plus iconga berib qo'yildi va bosilganda bola document yaratiladi
                    >
                        <Plus className="h-4 w-4 text-muted-foreground" />{" "}
                    </div>
                </div>
            )}
        </div>
    );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    // Item.Skeleton Item functiondan tashqairda alohida yozildi yani endi Skeleton component Item function ishlagandagina ishlaydi yani Item functionga qaram hissoblanadi /// bu skeleton loader component shadcn uidan kelgan
    return (
        <div
            style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
            className="flex gap-x-2 py-[3px]"
        >
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[30%]" />
            {/* widthni 30 foiz berilishini sababi skeleton copmonentdagi loader chiqganda ekranni to'liq emas faqat 30 foizini egallaydi yani styleda berilgan sizeni 30 foizni egallaydi shunda sidebardan tashqariga chiqib ketmaydi yoki eniga hamma joyini egallab olmaydi */}
        </div>
    );
};
