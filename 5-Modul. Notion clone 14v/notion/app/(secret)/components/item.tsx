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

    const createDocument = useMutation(api.document.createDocument)

    const onCreateDocument = (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=> {

        event.stopPropagation()

        if(!id) return
        createDocument({
            title: "Untitled",
            parentDocument:id
        })

    }

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
                        {/* DropdownMenuTrigger va DropdownMenuContent shadcn uidan kelgan componentlar bu componentlar ichida ts bila yozilganki DropdownMenuTrigger componentga click bo'lganda  DropdownMenuContent chiqadi bular shadcndan kelgan qaramsiz */}

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

                            <div className="text-xs text-muted-foreground p-2">
                                Last edited by
                                {user?.fullName}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div
                        className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                        role={"button"}
                        onClick={onCreateDocument}
                    >
                        <Plus className="h-4 w-4 text-muted-foreground" />{" "}
                    </div>
                </div>
            )}
        </div>
    );
};

#4. Create document 22:00 da qoldi
