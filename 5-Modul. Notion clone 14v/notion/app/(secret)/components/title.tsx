import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import React, { useRef, useState } from "react";

// user create qilgan documentni titlesini o'zgartirish uchun yaratilgan component document create qilinganda aftamatik tarzda "Untitle" texti bilan document create qilinadi shuni o'zgartirish uchun shu title.tsx fail yozildi

interface TitleProps {
    document: Doc<"documents">; //bu Doc convexdan keladigan documentni generated qiladigan ts function shunda endi bu title.tsx failida real user uchun yaratilgan navbar.tsx failidan keladigan document bor yani real user uchun qilingan navbar.tsx failida document shu >>> function bor const document = useQuery(api.document.getDocumentById, {  id: params.documentId as Id<"documents">, }); yani query bilan conex/document/document.ts failida yozilgan function bor yani bu getDocumentById function props bilan faildan failga o'tib kelepti
}

export const Title = ({ document }: TitleProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const updateFields = useMutation(api.document.updateFields);

    const [title, setTitle] = useState(document.title || "Untitiled");

    const [isEditing, setIsEditing] = useState(false);

    const enableInput = () => {
        setTitle(document.title);
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(
                0,
                inputRef.current.value.length
            ); //input ichidagi qiymatni to'liq belgilab yani select qilib olish uchun yani input ichidagi qiymatni o'zgartirayotganda hariflarni bittalab o'zgartirmay bittada belgilab udalit qilish uchun masalan "Untitle" textini bittada belgilab udalit qilib yangi title yozish uchun kerak chunki document create bo'lganda default holatda titlesi "Untitle" string bo'ladi shuni user o'zi hohlagan titlega o'zgartirishi uchun kerak
        }, 0);
    };

    const disableInput = () => {
        setIsEditing(false);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        updateFields({
            id: document._id,
            title: event.target.value || "Untitled", //yani agar input ichidagi qiymat yani documentni titlesini user o'zi nomlamasa shu "Untitled" ishlaydi
        });
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

Title.Skeleton = function TitleSkeleton() {
    return <Skeleton className="h-9 w-20  rounded-md" />; //Skeleton bu Title loading bo'letganda chiqadigan loader component
};

