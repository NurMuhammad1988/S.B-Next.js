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
    ChevronLeft,
    MoreHorizontal,
    Plus,
    Trash,
} from "lucide-react";
import React from "react";

interface ItemProps {
    id?: Id<"documents">;
    label: string; //bu label document-list.tsxdan props bilan jo'natilgan va qiymatiga documents.tsda yozilgan getDocument functionda parentdocument bilan link berilgan convex serverdagi "documents" papkadagi link berilgan yani labelda convex serverdan keladigan documentni string qiymatli objecti bor
}

export const Item = ({ label, id }: ItemProps) => {
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
        });
    };

    return (
        <div
            style={{ paddingLeft: "12px" }}
            className="group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium"
        >
            {!!id && (
                <div
                    className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
                    role="button"
                >
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                </div>
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
