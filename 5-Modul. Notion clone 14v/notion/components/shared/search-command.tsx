"use client";
import { useSearch } from "@/hooks/use-search";
import { useUser } from "@clerk/clerk-react";
import React from "react";
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

    const documents = useQuery(api.document.getSearch);

    const search = useSearch(); // useSearch bu hooks/use-search.tsdan kelgan function
    const { isOpen, onClose, onOpen, onToggle } = search; //hooks/use-search.tsdan kelgan functionni search nomli o'zgaruvchida chaqirib ichidagi qiymatlarini endi nomsiz o'zgaruvchi ichida object ichida chaqirdik

    const onSelect = (id: string) => {
        router.push(`/documents/${id}`);
        onClose(); //searchda document topilgandan keyin click qilingandan search modalni yopadi yani onCloseda isOpen false qilingan
    };

    // bu  <SearchCommand/> componenti real user uchun qilingan (secret) papkaichidagi layout.tsxda chaqirilgan shu sabab item.tsxda isSearch qiymatibor bo'lsa yani true bo'lsagina bu  <SearchCommand/> ishga tushadi item.tsxda esa faqat "Search" labelli itemda bu isSearch qiymati bor shu sabab shu Search textli itemga click qilingandagini bu  <SearchCommand/> coponent ishga tushadi va  const documents = useQuery(api.document.getSearch); sabab documentlar ichidan search qiladi

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
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
                                key={document._id}
                                value={`${document._id}`}
                                title={document.title}
                                onSelect={onSelect}
                            >
                                {document.icon ? (
                                    <p className="mr-2 text-[18px]">
                                        {" "}
                                        {document.icon}
                                    </p>
                                ) : (
                                    <File className="mr-2 h-4 w-4" />
                                    // File bu papkaga o'hshagan icon search textiga ckick qilingada ishga tushadi agar documentniiconi bor bo'lsa yuqoridagi true if ishga tushadi yokida shu if ishgatushib  shu file iconi beradi keyin esa documentni titlesini pastdagi span ichida beradi
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
