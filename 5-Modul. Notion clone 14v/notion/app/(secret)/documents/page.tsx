"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

const DocumentPage = () => {
    const { user } = useUser();
    const createDocument = useMutation(api.documents.createDocument);

    const onCreateDocument = () => {
      createDocument({
        title: "Untitled"
      })
    };

    return (
        <div className="h-screen w-full flex justify-center items-center space-y-4 flex-col">
            <Image
                src={"/note.svg"}
                alt="Notion loyihasi logosi"
                width={300}
                height={300}
                // dark: hidden yani agar mode-toggle.tsx sabab thema dark bo'lsa bu svg icon hidden bo'ladi yani ko'rinmaydi o'rniga boshqa svg ko'rinadi// birinchi ligh note ichon
                className="object-cover dark:hidden"
            />

            <Image
                src={"/note-dark.svg"}
                alt="Notion loyihasi logosi"
                width={300}
                height={300}
                //  hidden dark:block yani light bo'ganda hidden bo'ladi dark bo'lganda ko'rinadi //ikkinchi dark note icon
                className="object-cover hidden dark:block"
            />

            <h2 className="text-lg font-bold ">
                Welcome to {user?.firstName}`s docume t page!
            </h2>
            <Button onClick={onCreateDocument}>
                <Plus className="h-4 w-4 mr-2" />
                Create a blank
            </Button>
        </div>
    );
};

export default DocumentPage;

