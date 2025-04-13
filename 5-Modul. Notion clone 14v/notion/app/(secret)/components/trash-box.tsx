import ConfirmModal from "@/components/modals/confirm-modal";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const TrashBox = () => {
    const router = useRouter();

    const documents = useQuery(api.document.getTrashDocuments); //convex/document.ts/getTrashDocuments functionni convexda chaqirilishi
    const remove = useMutation(api.document.remove); //convex/document.ts/remove functioni
    const [search, setSearch] = useState("");

    if (documents === undefined) {
        //agar documents o'zgaruvchida chaqirilgan getTrashDocuments function teng bo'lsa undefinedga pastdagi loader chiqadi lg classi bilan
        return (
            <div className="h-full flex  items-center justify-center p-4">
                <Loader size={"lg"} />
            </div>
        );
    }

    const filtredDocuments = documents.filter((document) => {
        //filtredDocuments ni ichida documents yani ichida useQuery(api.document.getTrashDocuments) bor documents o'zgaruvchi bor shu sabab endi  filtredDocumentsda //convex/document.ts/getTrashDocuments dagi getTrashDocuments function bor yani convexdagi trash papkaga tushgan documentlarni oladi bu filtredDocuments map qilinib bu trash-box.tsx fail bilan birga sidebar.tsx failiga props bilan jo'natilgan

        return document.title.toLowerCase().includes(search.toLowerCase()); // documentsni document nomli parametr o'zgaruvchi ichidagi documentga solib documentsi titelini search bo'sh state massivga solib kichkina harifli qiladi va setSearchga natijani solib jsx ichidagi inputga soladi
    });

    const onRemove = (documentId: Id<"documents">) => {
        //bu function ConfirmModal component ichida chaqirilgan documentId: bu oddiy nom Id<"documents"> esa documenti idisi va ssilkasi
        //documenti idisini bildirish uchun
        //bu holatda onRemove function pastdagi Trash iconga click bo'lganda ishlaydi documentId: Id<"documents"> sabab click qiletgan user shu remove qilinetgan postlarni create qilgan user bo'lsagina ishlaydi bu onRemove ichida yaratilgan promise o'zgaruvchi ichida convex/document.ts da yozilgan remove functioni chaqirilgan va click bo'lganda pastdagi toastdagi holatlardan biri vaziyatga qarab ishlaydi

        const promise = remove({ id: documentId }); ////convex/document.ts/remove functonni promise nomli o'zgaruvchida chaqirilishi

        toast.promise(promise, {
            //toast sooner nomli kutubhonadan kelgan toaster
            loading: "Removing document...",
            success: "Removed document!",
            error: "Failed to remove document",
        });
    };

    return (
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2">
                <Search className="w-4 h-4 " />
                <Input
                    className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
                    placeholder="Filter by page title ..."
                    value={search} //bu serach statedan keladigan massiv yani filtredDocumentsda datalar filter qilinib shu bo'sh searchga solingan va inputga value qilib berilgan va inputga onchange bo'lganda setSearch searchdan kelgan valelarni oladi va input classlari bilan userga beradi
                    onChange={(e) => setSearch(e.target.value)} //ochange bo'lganda yani massiv ichida o'zgarish sodir bo'lganda setSearchga shu o'zgarishni soladi va shu inputga berilgan classlar bilan uiga chiqaradi
                />
            </div>
            {/*  bu page sidebarda chaqirilgan udalit qilingan documentlar saqlanadigan joy  */}
            <div className="mt-2 px-1 pb-1">
                {/* agar yuqoridagi inputdagi value ishlamasa bu p tegidagi text ishlaydi */}
                <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
                    No documents in trash
                </p>

                {filtredDocuments.map(
                    (
                        document //filtredDocuments bu convex/document.ts/getTrashDocumentsdan keladigan datalar jsni filter metodi bilan filter qilingan holatda parametrda esa umumiy document bor yani shu loyihadagi umumiy document bor bu key uchun va ichidagi idilarni olish uchun bu holatda faqat title olindi yani documentni titeli va titledan keyin 2 ta icon qo'yildi va shu titlega qarab filtredDocuments documentlarni search qiladi bu document >>>const documents = useQuery(api.document.getTrashDocuments) shu document shu ichun idni taniydi
                    ) => (
                        <div
                            key={document._id}
                            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
                            role="button"
                            onClick={()=> router.push(`/documents/${document._id}`)}// trashbxga tushgan documentlar titiliga click bo'lganda router bilan aynan shu documentniidisga qarab document ichiga olib push qiladi
                        >
                            <span className="truncate pl-2">
                                {document.title}
                            </span>

                            <div className="flex items-center">
                                <div
                                    className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                                    role="button"
                                >
                                    <Undo className="h-4 w-4 text-muted-foreground" />
                                    {/* bu undo iconi ↶ shu icon yani bu trash-boxga items.tsx failidagi  onArchive va ichidagi primise archive functioni sabab arhivga olingan documentlar tushadi ba bu iconga bosilganda yana arhivdan chiqib asosiy documentlarga qo'shilshi mumkun yani udalit bo'b ketmasligi kerak user hohlasa yana tiklab olishi kerak va pastda trash iconiham bor yani user hohasa docuentni qayta asosiy papkaga olib chiqishi yoki buunlay udalit qilishixam mumkun shu uchun ikkala icon yonmayon qo'yildi */}
                                </div>

                                <ConfirmModal
                                    onConfirm={() => onRemove(document._id)} //umumiy documentdagi idini olib remove qiladi bu document >>>const documents = useQuery(api.document.getTrashDocuments) shu document
                                >
                                    <div
                                        role="button"
                                        className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                                    >
                                        <Trash className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                </ConfirmModal>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default TrashBox;

