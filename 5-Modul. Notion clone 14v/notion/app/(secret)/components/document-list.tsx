"use client";

import { Id } from "@/convex/_generated/dataModel";
import React from "react";

interface DocumentListProps {
    parentDocumentId?: Id<"documents">; //document idisi?????????
    level?: number;
}

export const DocumentList = ({
    level,
    parentDocumentId,
}: DocumentListProps) => {
    return <div>DocumentList</div>;
};
