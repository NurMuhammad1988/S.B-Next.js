import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Doc } from "@/convex/_generated/dataModel";
import { Globe } from "lucide-react";
import React from "react";

//bu publish real user uchun yaratilgan navbar.tsxga jo'natildi

interface PublishProps {
    document: Doc<"documents">; //endi document interfaceda real user uchun yaratilgan navbar.tsx failidagi document o'zgaruvchi ichida kelgan idlar convexda generate qilinadi yani solishtiriladi va nusxalanib bu publish.tsx failidaham ishlatilaveradi yani qaytadan server odlarni yozish shart emas
}

export const Publish = ({ document }: PublishProps) => {

    const onPublish = () => {}

    return (
        <Popover>
            <PopoverTrigger>
                <Button size={"sm"} variant={"ghost"}>
                    Share
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-72"
                align="end"
                alignOffset={8}
                forceMount
            >
                {!document.isPublished && (//agar document: Doc<"documents">; bilan convexdagi umumiy yaratilgan docmentda isPublished qiymati yo'q bo'lsa yani userni yaratgan documentlari yo'q bo'lsa yani publish qilinmagan bo'lsa yani fasle bo'lsa shu div ishlaydi qachin ishlaydi yuqoridagi buttondagi "Share" buttonini bosganda ishlaydi 
                    <div className="flex flex-col items-center justify-center">
                        <Globe className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium mb-2">
                            Publish this document
                        </p>
                        <span className="text-xs text-muted-foreground mb-4">
                            Share your work with others.
                        </span>
                        <Button size={"sm"} className="w-full text-sm" onClick={onPublish} disabled={false}>
                            Publish
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
};
