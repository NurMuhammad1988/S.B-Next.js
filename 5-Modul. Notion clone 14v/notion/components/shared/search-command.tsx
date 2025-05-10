"use client";
import { useSearch } from "@/hooks/use-search";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../ui/command"; //bu uilat shadcn uidan chaqirilgan dasturchigaqaram componentlar
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { File } from "lucide-react";
import { useRouter } from "next/navigation";

export const SearchCommand = () => {
    const { user } = useUser();

    const router = useRouter();

    const [mounted, setMounted] = useState(false);

    const documents = useQuery(api.document.getSearch);

    const search = useSearch(); // useSearch bu hooks/use-search.tsdan kelgan function
    const { isOpen, onClose, onOpen, onToggle } = search; //hooks/use-search.tsdan kelgan functionni search nomli o'zgaruvchida chaqirib ichidagi qiymatlarini endi nomsiz o'zgaruvchi ichida object ichida chaqirdik

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                //citrl bilan k keyboardlar bosilganda shu search component ishga tushadi
                e.preventDefault();
                onToggle();
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [onToggle]); ////bu useeffect qachonki onToggle ishlaganda ishga tushadi onToggle esa use-search tsx hookida isOpenni yani shu modalni open qilishni false qiladi tani teskarisi yani bittabosganda false qiladi bitta bosganda true qiladi shunday qilib search component ishlaydi

    const onSelect = (id: string) => {
        //yani onSelect function chaqirilgan CommandItem componentda search qilib chaqirilgan idli documentga bosilganda router userni shu document ichiga olib kiradi va onClose ishlaydi yani search component close qilinadi bu onClose use-search.ts componentda zustand bilan qilingan storeda turipti
        router.push(`/documents/${id}`);
        onClose(); //searchda document topilgandan keyin click qilingandan search modalni yopadi yani onCloseda isOpen false qilingan
    };

    // bu  <SearchCommand/> componenti real user uchun qilingan (secret) papkaichidagi layout.tsxda chaqirilgan shu sabab item.tsxda isSearch qiymatibor bo'lsa yani true bo'lsagina bu  <SearchCommand/> ishga tushadi item.tsxda esa faqat "Search" labelli itemda bu isSearch qiymati bor shu sabab shu Search textli itemga click qilingandagini bu  <SearchCommand/> coponent ishga tushadi va  const documents = useQuery(api.document.getSearch); sabab documentlar ichidan search qiladi

    if (!mounted) return null; //agar boshida false qilingan va useeffect ishlaganda true qilingan setMounted false bo'b qosa bu coponent nullni qaytaradi shunda pastdagi "No results found." texti ishga tushadi

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            {/* shu open qiymati ichidagi isOpen sabab bu search-command.tsx ishga tushadi yani ochiladi yani isOpen true bo'lganda ochiladi zustand store shu uchun kerak */}
            {/* Serach texti labelda chaqirilgan item real user uchun qilingan sidebar.tsx search texti bor itemga onclick qilinganda onOpen functio ishlasin deyilgan bu degani click qilinganda birinchi open ishlaydi yani open ishlaganda shu itemdagi isSearch sabab itemda isSearch bor bo'lsa onOpen ishlab yani true bo'lib shu search-command.tsx ishga tushadi?????????????????????????????????  */}
            <CommandInput placeholder={`Search ${user?.fullName}'s Notion`} />
            {/* CommandInputda boshida search icon bor placeholderi faqat string qabul qiladi shu sabab ``<<ichida function formatham chaqirildi */}
            <CommandList>
                <CommandEmpty>
                    {/* bu  CommandEmpty component if elsega qarab ishleydi  search da datalar kelamasa shu text ishga tushadi yani shadcn uida shunday yozilganki agar pastdagi CommandGroup componentsda map qilinganda search qilingan documentlar kelamsa yani yo'q bo'lsa shu  CommandEmpty component ishga tushadi*/}
                    No results found.
                </CommandEmpty>
                <CommandGroup heading={"Documents_"}>
                    {documents?.map(
                        (
                            document //bu documentsda convex/documents.tsdan chaqirilgan getSearch function bor yani shu getSearch function sabab documentlar she search-command/tsxga kelib tushadi
                        ) => (
                            <CommandItem
                                key={document._id}//map qilish uchun key
                                value={`${document._id} - ${document.title}`}//document idis va titlesi
                                title={document.title}
                                onSelect={() => onSelect(document._id)}
                            >
                                {document.icon ? (
                                    <p className="mr-2 text-[18px]">
                                        {" "}
                                        {document.icon}
                                    </p>
                                ) : (
                                    <File className="mr-2 h-4 w-4" />
                                    // File bu papkaga o'hshagan icon search textiga click qilingada ishga tushadi agar documentni iconi bor bo'lsa yuqoridagi true if ishga tushadi yokida shu if ishga tushib  shu file iconni beradi keyin esa documentni titlesini pastdagi span ichida beradi
                                )}
                                <span>{document.title}</span>
                            </CommandItem>
                        )
                    )}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
};

// #8. Search and Settings dialog 13: 34 da qoldi
