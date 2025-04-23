import { Loader } from "@/components/ui/loader";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";

export const Navbar = () => {
    const params = useParams();

    const document = useQuery(api.document.getDocumentById, {
        id: params.documentId as Id<"documents">,
    });

    if (document === undefined) {
        return (
            <nav className="bg-background px-3 py-2 w-full flex items-center justify-between">
                <Loader />
                <div className=" flex items-center gap-x-2">
                    <Loader />
                </div>
            </nav>
        );
    }

    if (document === null) {
        return null;
    }

    return <div>Navbar</div>;
};

7. Restoring darsi 06:25 da qoldi