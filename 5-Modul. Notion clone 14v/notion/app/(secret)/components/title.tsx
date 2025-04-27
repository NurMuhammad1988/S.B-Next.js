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
    const inputRef = useRef<HTMLInputElement>(null);//useref reactdan keladi vazifasi inputga tushgan datalarni qabul qilish va qabul qilganda saytni yoki functionni qayta renderlamaslik yani user inoutga har safar bosganda saytni renderlamaydi Ref - bu DOM elementiga va komponentlarda yaratilgan React elementlariga kirish uchun React tomonidan taqdim etilgan funksiya . Ular rekvizit va holatni ishlatmasdan, biz bolalar komponentining qiymatini o'zgartirmoqchi bo'lgan holatlarda qo'llanilad

    const updateFields = useMutation(api.document.updateFields);//convex/document.ts/updateFields function

    const [title, setTitle] = useState(document.title || "Untitiled");//stateda default holat agar documentni titlesi bor bo'lsa titleni oladi agar yo'q bo'lsa "Untitiled" texti aftamatik tarzda qo'yiladi

    const [isEditing, setIsEditing] = useState(false);//yani title edid qilinayotganda ishlaydigan state boshida fasle bo'ladi chunki o'zidan o'zi o'zgarmaydi ///////////bu holatda bu state shunchaki if elslarni bajartirish uchun yartildi yani masalan boshlang'ich qiymatni fasle qilib agar false bo'lganda bu ishni true bo'lganda bu ishni bajar deyish uchun masalan bu holatda isEditing false va enableInput functionda bu bo'sh setIsEditing ichida true qilindi chunki enableInput functionda documentni titlesini edit qilish bor shu ishlashi uchun enableInputda false truega o'zgartirildi

    const enableInput = () => {//bu holatda enableInput functionda setTitle statedagi birinchi qiymat ovolindi yani documenti titlesi olindi 
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
            {/* agar convex serverdan keladigan documentni icon qiymati bor bo'lsa icon chiqadi yo'q bo'lsa hech narsa chiqmaydi chunki bu operator bitta mantiqqa asoslangan yani "va" yokida esa yo'q yani else yo'q bitta qiymatga bitta holatga ishlaydigan operator */}

            {isEditing ? (//yani agar isEditing true bo'lsa yani inputga bosib titleni o'zgartirishga user harakat qilsa shu input ichidagi functionlar ishlaydi yokida pastdagi button ishlab asl holatida serverdan kelgan holatida  turadi yani "Untitled" texti chiqib turadi
                <Input
                    ref={inputRef}//
                    onClick={enableInput}
                    onBlur={disableInput}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={title}
                    className="h-7 px-2 focus-visible:ring-transparent"
                />
            ) : (
                <Button
                    className="font-normal h-auto p-1 bg-red-900"
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


// 7. Restoring darsi 21:17 da qoldi va shu joydan boshlashdan oldin yuqorida yozilgan hamma kodni tushunib keyin 21:17 dan boshlash kerak