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

// BITTAGINA HATO BOR YANI DOCUMENT CREATE QILINGANDAN KEYIN UNPUBLISHED QILINSAHAM SHARED QILINGAN LINKDA UNPUBLISHED QILINGAN DOCUMENT UDALIT BO'LMAYAPTI FAQAT QACHONKI TRASH PAPKADAN UDALIT QILINSAGINA LINKDAGI DOCUMENT KEYIN HATO BEREPTI!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
