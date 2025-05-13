import { Doc } from "@/convex/_generated/dataModel";
import React from "react";

interface ToolbarProps {
    document: Doc<"documents">;
    preview?: boolean;
}

function Toolbar({ document, preview }: ToolbarProps) {
    return (
        <div className="pl-[54px] group relative">
            {!!document.icon && !preview && (
                // tailwindda group classlarga nom bersaham bo'ladi bu holatda group classimizni nomi icon>>> group/icon
                <div className="flex items-center gap-x-2 group/icon pt-6"></div>
            )}
        </div>
    );
}

export default Toolbar;
