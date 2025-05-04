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
} from "../ui/command";
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
        onClose()//searchda document topilgandan keyin click qilinagdan search modalni yopadi
    };

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput placeholder={`Search ${user?.fullName}'s Notion`} />
            <CommandList>
                <CommandEmpty>
                    {/* bu  CommandEmpty if elsega qarab ishleydi  search da datalar kelamasa shu text ishga tushadi*/}
                    No results found.
                </CommandEmpty>
                <CommandGroup heading={"Documents"}>
                    {documents?.map((document) => (
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
                            )}
                            <span>{document.title}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
};
