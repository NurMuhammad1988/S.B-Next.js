import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Doc } from "@/convex/_generated/dataModel";
import React, { useRef, useState } from "react";

interface TitleProps {
    document: Doc<"documents">; //bu Doc convexdan keladigan documentni generated qiladigan ts function shunda endi bu title.tsx failida real user uchun yaratilgan navbar.tsx failidan keladigan document bor yani real user uchun qilingan navbar.tsx failida document shu >>> function bor const document = useQuery(api.document.getDocumentById, {  id: params.documentId as Id<"documents">, }); yani query bilan conex/document/document.ts failida yozilgan function bor yani bu getDocumentById function props bilan faildan failga o'tib kelepti
}

export const Title = ({ document }: TitleProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [title, setTitle] = useState(document.title || "Untitiled");

    const [isEditing, setIsEditing] = useState(false);

    const enableInput = () => {
        setTitle(document.title);
        setIsEditing(true);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const disableInput = () => {
        setIsEditing(false);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            disableInput();
        }
    };

    return (
        <div className="flex items-center gap-x-1">
            {/* bu documentda endi title bor yani getDocumentById sabab documentni hamma narsasi bor masalan idsi va hakozo bu holatda document.title qilib titlesi chaqirildi yani real activ user ozi yaratgan documentni titlesini uiga berish uchun
            {document.title} */}

            {!!document.icon && <p> {document.icon}</p>}

            {isEditing ? (
                <Input
                    ref={inputRef}
                    onClick={enableInput}
                    onBlur={disableInput}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={title}
                    className="h-7 px-2 focus-visible:ring-transparent"
                />
            ) : (
                <Button
                    className="font-normal h-auto p-1"
                    variant={"ghost"}
                    size={"sm"}
                    onClick={enableInput}
                >
                    <span className="truncate">{document.title}</span>
                </Button>
            )}
        </div>
    );
};
