import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Doc } from "@/convex/_generated/dataModel";
import React from "react";

//bu publish real user uchun yaratilgan navbar.tsxga jo'natildi

interface PublishProps {
    document: Doc<"documents">; //endi document interfaceda real user uchun yaratilgan navbar.tsx failidagi document o'zgaruvchi ichida kelgan idlar convexda generate qilinadi yani solishtiriladi va nusxalanib bu publish.tsx failidaham ishlatilaveradi yani qaytadan server odlarni yozish shart emas
}

export const Publish = ({ document }: PublishProps) => {
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
            ></PopoverContent>
        </Popover>
    );
};

7. Restoring 23:18 chi minutda qoldi
