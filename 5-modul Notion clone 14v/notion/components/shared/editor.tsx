"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/shadcn/style.css";
import { BlockNoteView } from "@blocknote/shadcn";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore"; //EdgeStore kontekstini chaqirish uchun kerak. Bu hook yordamida edgestore obyekti olinib, fayllarni yuklash (upload) funksiyasiga murojaat qilinadi
interface EditorProps {
    onChange?: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
}

//bloknotejs.org dan keladigan text va mediya faillar editorini ishlatadigan fail shu!!!
//edgestore bilan coverimageham postda toolbarda ishlatiladigan postga image qo'yishxam edgestore bilan qilindi va hamma qo'yiladigan imagelar edgestore serverda saqlanadi convexda esa faqatimageni urli saqlanadi yani agar imagelar local qo'yilsaham edgestore ularga url beradi va shu urlni convexda saqlaydi imageni o'zini esa edgestore serverda saqlaydi edjestore dashboarda imagelarni ko'rib turishxam mumkun

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
    const { resolvedTheme } = useTheme();

    const { edgestore } = useEdgeStore();

    const handleUpload = async (file: File) => {
        /// Faylni EdgeStore’ga yuklash funksiyasi yani async await yani serverga jo'natadi url bilan yukalagandaham urlni serverga jo'natadi
        const res = await edgestore.publicFiles.upload({ file }); // fayl upload qilish funksiyasiga

        return res.url;
    };

    const editor: BlockNoteEditor = useCreateBlockNote({
        //// Editorni yaratish (boshlang‘ich matn va fayl yuklashni belgilash)
        initialContent: initialContent
            ? (JSON.parse(initialContent) as PartialBlock[])
            : undefined,

        uploadFile: handleUpload, //handleUpload funksiyasi (EdgeStorega yuklash)
    });

    const uploadToDatabase = () => {
        // // Matn o‘zgarganda chaqiriladigan funksiya///uploadToDatabase – bu funksiya har safar editor ichidagi matn o‘zgarganda chaqiriladi. U editor.document (hujjatning hozirgi blokli ko‘rinishi) ni JSON ko‘rinishida ajratib olib, onChange callback orqali tashqi (ota) komponentga uzatadi
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

//Yuqoridagi kodlar yordamida biz Next.js loyihasida BlockNote asosidagi boyitilgan editor komponentini yaratdik. Har bir import qilingan modul o‘ziga xos funksiyani bajaradi: useTheme bilan mavzuni aniqlaymiz, useEdgeStore bilan fayl yuklaymiz, useCreateBlockNote bilan editorni yaratamiz. EditorProps interfeysi yordamida komponentga keladigan parametrlarni belgilaymiz. handleUpload funksiyasi faylni EdgeStore’ga yuklaydi (URL qaytaradi), useCreateBlockNote yordamida editorga boshlang‘ich matn beriladi, uploadToDatabase esa har bir o‘zgarishda JSON matnni ota-komponentga uzatadi yani kutubhonasida turgan ota componentga . BlockNoteView komponenti esa barcha bu parametrlar bilan editor oynasini jsxda chiroyli ko‘rsatib beradi.

//bittagina hato borga o'hshaydi lekin hato yo'q yani yani agar user documentni crete qilib uni publish qilib publish qilingan documentni urlini copy qilib shu bu urlga alohida sahifada kirsa o'zi yaratgan documentni hech narsani change qilaolmayapti yani preview sabab va keyn user documenni unPublished qilsaham alohid sahifada ochilgan shu unpublished qilingan document baribir yo'qolib qolmayapti bu esa hatomas chunki user bitta browserdan foydalanayapti browser esa userni datalarini yani idilarini browserni Application sahifasida  Cookieslarda saqlab qolepti shu sabab user bitta browserdan kirganda unpublished qilinsaham documentni boshqa sahifadaham ko'ra olayapti lekin shu documentni unpublisheddan keyin boshqa borowserdan kirib ko'rilganda sahifa hato qaytarayapti chunki boshqa browserda userni cookilari yo'q va preview sabab boshqa userga bu document ko'rinmaydi
