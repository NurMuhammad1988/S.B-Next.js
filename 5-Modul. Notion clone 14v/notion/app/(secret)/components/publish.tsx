import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { Check, Copy, Globe } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

//bu publish real user uchun yaratilgan navbar.tsxga jo'natildi

interface PublishProps {
    document: Doc<"documents">; //endi document interfaceda real user uchun yaratilgan navbar.tsx failidagi document o'zgaruvchi ichida kelgan idlar convexda generate qilinadi yani solishtiriladi va nusxalanib bu publish.tsx failidaham ishlatilaveradi yani qaytadan server odlarni yozish shart emas
}

export const Publish = ({ document }: PublishProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const url = `${process.env.NEXT_PUBLIC_DOMAIN}/preview/${document._id}`; //bu const ni o'zi o'zgaruvchi ekanligini isboti masalan function yozilmadi lekin url nomlli odiy o'zgaruvchiga env.local faildagi qiymat string bilan birga ishlatildi yani bu holadta EXT_PUBLIC_DOMAIN keyi ichidagi localhost:3000 textidan keyin /preview/ stringgi va keyin documentni idisi keladi//yani urlda endi env.local faildagi localhost uchun qilingan urlni yani convexdan olinadigan documentni urli bor har bir documentni ureli endi shu  url function chaqirilgan inputda bo'ladi//

    const updateFields = useMutation(api.document.updateFields); //convex/document.ts/updateFields function

    const onPublish = () => {
        setIsLoading(true);

        const promise = updateFields({
            id: document._id,
            isPublished: true, //bu document.tsda  boolean qiymat qilib berilgan shu sabab faqat true yoki false qabul qiladi
        }).finally(() => setIsLoading(false)); //bu holada promise global objecti chaqirilmasaham promiseni finally metodi ishlatildi bu js loyiha shu uchun ishlayveradi//promise yani serverdan so'rov bajarilib bo'lgandan keyin setIsloading false qilindi chinku loader bor yani finallayda oader to'htashi kerak

        toast.promise(promise, {
            loading: "Publishing...",
            success: "Published!",
            error: "Failed to publish",
        });
    };

    const onUnPublish = () => {
        setIsLoading(true);

        const promise = updateFields({
            id: document._id,
            isPublished: false, //bu document.tsda  boolean qiymat qilib berilgan shu sabab faqat true yoki false qabul qiladi
        }).finally(() => setIsLoading(false)); //bu holada promise global objecti chaqirilmasaham promiseni finally metodi ishlatildi bu js loyiha shu uchun ishlayveradi//promise yani serverdan so'rov bajarilib bo'lgandan keyin setIsloading false qilindi chinku loader bor yani finallayda oader to'htashi kerak

        toast.promise(promise, {
            loading: "Unublishing...",
            success: "Unpublished!",
            error: "Failed to unpublish",
        });
    };

    const onCopy = () => {
        navigator.clipboard.writeText(url); //bu navigator jsda ts bilan yozilgan lcal functionyani jsniki vazifasi clipboard va writetext qiymati va metodi bilan parametriga tishgan url functionda kelgan string typli textlarni copy qilish
        setCopied(true); //copied state boshida fasle edi oncopy function ishlaganda true bo'ladiyani oncopyga ruhsat beradi bu state shunchaki if else uchun qilingan endi setCopied true yanu copied state  chaqirilgan joda endi true qiymati bo'ladi shu uchun Check iconi ishlaydi yani copy qilib bo'lgandan keyin Check iconi ishlaydi

        setTimeout(() => setCopied(false), 2000);//fu function ichida true qilingan setCopied endi 2 millisundddan keyin yana qaytadan false qilinadi
    };

    return (
        <Popover>
            <PopoverTrigger>
                <Button size={"sm"} variant={"ghost"}>
                    Share
                    {/* Share buttonga clickqilinganda yoki onPublish function ishlaydi yoki !document.isPublished && (divi ishlaydi) */}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-72"
                align="end"
                alignOffset={8}
                forceMount
            >
                {!document.isPublished ? ( //agar document: Doc<"documents">; bilan convexdagi umumiy yaratilgan docmentda isPublished qiymati yo'q bo'lsa yani userni yaratgan documentlari yo'q bo'lsa yani publish qilinmagan bo'lsa yani fasle bo'lsa shu div ishlaydi qachin ishlaydi yuqoridagi buttondagi "Share" buttonini bosganda ishlaydi
                    <div className="flex flex-col items-center justify-center">
                        <Globe className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium mb-2">
                            Publish this document
                        </p>
                        <span className="text-xs text-muted-foreground mb-4">
                            Share your work with others.
                        </span>
                        <Button
                            size={"sm"}
                            className="w-full text-sm"
                            onClick={onPublish}
                            disabled={isLoading} //publish buttonoga click bo'lganda isloading disablet qilinadi yani qotiriladi chunki onPublish function ishlab so'rov ketishi kerak
                        >
                            Publish
                        </Button>
                    </div>
                ) : (
                    ////agar document: Doc<"documents">; bilan convexdagi umumiy yaratilgan docmentda isPublished qiymati bor bo'lsa yani document publish qilinda shu div ishlaydi bu holatda if else teskari ishlatlepti masalan boshiga ! belgisi qo'yilib false qilinepti shu sabab edi bu falseda document.isPublished true bo'lsagina shu div ishlaydi// bu p tegidagi "This note is live on web." textiham "Share" buttonoga click bo'lganda ishlayveradi yani yana popover componentlar sabab!!! yani forceMount qiymati sabab!!
                    <div className="space-y-4">
                        <div className="flex items-center gap-x-2">
                            <Globe className="text-sky-500 animate-pulse h-4 w-4" />
                            <p className="text-xs font-medium text-sky-500">
                                This note is live on web.
                            </p>
                        </div>

                        <div className="flex items-center">
                            <input
                                disabled //inputni ishlatmasdan qotirib qo'yish uchun
                                value={url}
                                className="flex-1 px-2 text-xs border rounded-1-md h-8 bg-muted truncate"
                            />
                            {/*  share texriga bosganda chiqadigan Publish textlibuttonga click qilinagandan keyin chiqadigan bu divga input ichida url o'zgaruvchi chaqirldi  yani endi document.isPublished har safar true bo'lganda shu input chiqadi */}

                            <Button
                                disabled={copied}//bu holatda copied state disabled qilib qo'yildi yani inout ichidakelganurlni shunchaki mishka bilan belgilab cipy qilib bo'lmasligini taminlashuchun masalanusr qo'lda shunday copy qilganda urlni birirta harfi yoki belgisi copy qilinmasdan qolib ketishi mumkun shu uchun copy qilish uchunham alohida function yozildi
                                onClick={onCopy}
                                className="h-8 rounded-1-none"
                            >
                                {/*  share texriga bosganda chiqadigan Publish textlibuttonga click qilinagandan keyin chiqadigan bu divga input ichida url o'zgaruvchi chaqirldi  yani endi document.isPublished har safar true bo'lgadna inputdan keyin shu button chiqadi agar copied true bo'lsa Check icon chiqadi agar false bo'lsa Copy iconi chiqadi copy iconiga click qilinganda documentni urli copy qilinishikerak masalan user o'z documentini yoki boshqa userni documentini ssilkasni copy qilib boshqalarga jo'natish uchun kerak*/}

                                {copied ? (//bu buttonga click bo'lganda agar ichida onCopy functionda yozilgan copied true bo'lsa yani setCopieddan true kelib tushgan bo'lsa yani onCopy function ishlab url copy qilingan bo'lsa chek icon bo'lmasa copy icon ishlab turadi// yani user kirganda birinchi fasle bo'lib turadi  buttonga onclick bo'lgandan keyin copy icon ishlab turadi copy iconga click bo'lgadnan keyin copied state falsega aylanadi va check icon ishga tushadi
                                    <Check className="h-4 w-4" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>


                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
};
