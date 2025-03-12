"use client";
import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import React, { ElementRef, useRef, useState } from "react";

export const Sidebar = () => {
    const sidebarRef = useRef<ElementRef<"div">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);
            sidebarRef.current.style.width = "0";
            navbarRef.current.style.width = "100%";
            navbarRef.current.style.left = "0";
        }
    };

    const reset = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);
            sidebarRef.current.style.width = "240px";
            navbarRef.current.style.width = "calc(100% - 240)";
            navbarRef.current.style.left = "240";
        }
    };

    return (
        <>
            <div
                className={cn(
                    "group/sidebar  h-screen bg-secondary overflow-y-auto relative flex w-60 flex-col z-50",
                    isResetting && "transition-all ease-in  duration-300"
                )}
                ref={sidebarRef}
            >
                {/* bu ona divdagi group classi bola divgaham yozildi shunda bitta class ikkita divga bir hil ishlaydi masalan pastdagi yetim divda group-hover:opacity-100" classi bor bu degani pastdagi divda cursor tursa hover bo'lib shu classlar ishlaydi yani pastdagi divda opacity 0 bo'lib turgabi group-hover:opacity-100" ga o'zgaradi yani cursor faqat pastdagi yetim divga o'tganda shu group-hover:opacity-100" hover klasslari ishlaydi .....................group/sidebar va  group-hover/sidebar:opacity-100 deb yozilishini sababi esa bu sahifada yana shunaqa grouplar qilinganda hammasi ishlashi uchun masalan groupni o'zi bilan qilsa faqat shu group ishlaydi agar bu groupga nom berilsa (bu holatda sidebar deb nom berildi chunki faqat sidebar uchun kerakli group) har hil nomdagi hamma grouplar ishlaydi */}

                <div
                    className="h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition"
                    role="button"
                    onClick={collapse} //bu div ichidagi ChevronsLeft iconiga click bo'lganda shu function ishlaydi
                >
                    {/* opacity-0 group-hover/sidebar:opacity-100 transition shu classlar sabab cursor faqat sidebarga yani shu ona divga o'tgandagina pastdagi yetim divga o'hshab bu iconham ko'rinadi cursor shu ona div ichida bo'lmaganda bu iconham pastdagi yetimdivday ko'rinmay qoladi yani faqat hover bo'lganda ishlaydi role="button" atributini berilishi sababi bu huddi button rolida vazifasi buttun masalan bu iconga click bo'lganda hodisa sodir qilish uchun */}
                    <ChevronsLeft className="h-6 w-6" />{" "}
                </div>

                <div className="absolute right-0 top-0 w-1 h-full cursor-ew-resize bg-primary/10 opacity-0 group-hover/sidebar:opacity-100 transition" />
                {/* bu yetim div yani sidebar qismini qolgan asosiy qisimdan ajratish uchun yani tepadan pastga to'g'ri chiziq tortish uchun cursor-ew-resize classi esa shu chiziqga kelganda cursorni chap o'ng tarafgaham strelkali cursor chiqaradi>>> ↔ ↔ ↔ ↔ ↔ <<< yani ekrandagi sidebar va qolgan qismlarni o'lchamini o'zgartirish uchun   */}
            </div>

            <div
                className={cn(
                    "absolute top-0 z-50 left-60 w-[calc(100% - 240px)]",
                    isResetting && "transition-all ease-in  duration-300"
                )}
                ref={navbarRef}
            >
                <nav className={cn("bg-transparent px-3 py-2 w-full")}>
                    {isCollapsed && (
                        <MenuIcon
                            className="h-6 w-6 text-muted-foreground"
                            role="button"
                            onClick={reset}
                        />
                    )}
                </nav>
            </div>
        </>
    );
};
