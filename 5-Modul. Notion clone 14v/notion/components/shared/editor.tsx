"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/shadcn/style.css";
import { BlockNoteView } from "@blocknote/shadcn";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";
interface EditorProps {
    onChange?: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
    const { resolvedTheme } = useTheme();

    const { edgestore } = useEdgeStore();

    const handleUpload = async (file: File) => {
        const res = await edgestore.publicFiles.upload({ file });

        return res.url;
    };

    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent
            ? (JSON.parse(initialContent) as PartialBlock[])
            : undefined,

        uploadFile: handleUpload, //bu upload file qayerdan keldi nimaga keldi vazifasi nima?????????????????????
    });

    const uploadToDatabase = () => {
        if (onChange) {
            onChange(JSON.stringify(editor.document, null, 2));
        }
    };

    return (
        <BlockNoteView
            onChange={uploadToDatabase}
            editor={editor}
            editable={editable}
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            // updateFields={handleUpload}//
        />
    );
};

export default Editor;

//bittagina hato borga o'hshaydi lekin hato yo'q yani yani agar user documentni crete qilib uni publish qilib publish qilingan documentni urlini copy qilib shu bu urlga alohida sahifada kirsa o'zi yaratgan documentni hech narsani change qilaolmayapti yani preview sabab va keyn user documenni unPublished qilsaham alohid sahifada ochilgan shu unpublished qilingan document baribir yo'qolib qolmayapti bu esa hatomas chunki user bitta browserdan foydalanayapti browser esa userni datalarini yani idilarini browserni Application sahifasida  Cookieslarda saqlab qolepti shu sabab user bitta browserdan kirganda unpublished qilinsaham documentni boshqa sahifadaham ko'ra olayapti lekin shu documentni unpublisheddan keyin boshqa borowserdan kirib ko'rilganda sahifa hato qaytarayapti chunki boshqa browserda userni cookilari yo'q va preview sabab boshqa userga bu document ko'rinmaydi
