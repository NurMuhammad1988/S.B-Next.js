import { Doc } from "@/convex/_generated/dataModel";
import React from "react";
import { Button } from "../ui/button";
import { Smile, X } from "lucide-react";
import IconPicker from "./icon-picker";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface ToolbarProps {
    document: Doc<"documents">;
    preview?: boolean;
}

function Toolbar({ document, preview }: ToolbarProps) {
    const updateFields = useMutation(api.document.updateFields);

    const onIconChange = (icon: string) => {
        updateFields({
            id: document._id,
            icon,
        });
    };

    const onRemoveIcon = () => {
        updateFields({
            id: document._id,
            icon: "",
        });
    };

    return (
        <div className="pl-[54px] group relative">
            {!!document.icon && !preview && (
                // tailwindda group classlarga nom bersaham bo'ladi bu holatda group classimizni nomi icon>>> group/icon
                <div className="flex items-center gap-x-2 group/icon pt-6">
                    <IconPicker onChange={onIconChange}>
                        <p className="text-6xl hover:opacity-75  transition">
                            {document.icon}
                        </p>
                    </IconPicker>

                    <Button
                        className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
                        variant={"outline"}
                        size={"icon"}
                        onClick={onRemoveIcon}
                    >
                        <X className="h-4 w-4" />
                        {/* document.iscon true bo'lsa bu X icon ishga tushadi yani user create qilgan documentni iconi bor bo'lsa */}
                    </Button>
                </div>
            )}
            {!!document.icon && preview && (
                <p className="text-6xl pt-6">{document.icon}</p>
            )}

            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
                {!document.icon && !preview && (
                    <IconPicker asChild onChange={onIconChange}>
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            className="text-muted-foreground text-xs"
                        >
                            <Smile className="h-4 w-4 mr-2" />
                            <span>Add icon</span>
                        </Button>
                    </IconPicker>
                )}
            </div>
        </div>
    );
}

export default Toolbar;
