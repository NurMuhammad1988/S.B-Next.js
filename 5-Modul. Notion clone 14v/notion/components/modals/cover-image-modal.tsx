import { api } from "@/convex/_generated/api";
import { UseCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { SingleImageDropzone } from "../shared/single-image-dropzone";
import { Id } from "@/convex/_generated/dataModel";

const CoverImageModal = () => {
    const params = useParams(); //idni ovolish uchun

    const UpdateFields = useMutation(api.document.updateFields); //agar cover image qo'yilsa shu updateFieldsga patchga borib tushadi

    const coverImage = UseCoverImage(); //cover imageni upload qilish uchun ochilib yopilishi kerak bo'lgan hook

    const { edgestore } = useEdgeStore(); //edgestoreni ishlatadigan provider file

    const [file, setFile] = useState<File>(); //File nima File bu tsni typlari shu Fail ichida yo'q typlar edgestore tomonidan qabul qilinmeydi yani faqat ts tekshirividan o'tadigan fallarni yuklashga ruhsat beradi

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onClose = () => {
        setFile(undefined);
        setIsSubmitting(false); //close ishlagandan keyin SingleImageDropzoneni disablet qiymatini ishlatish uchun yani SingleImageDropzone ishlashdan to'htaydi
        coverImage.onClose(); //store (zustand)ni ishlatadi shu faildagi ona onClose function
    };

    const onChange = async (file?: File) => {
        if (file) {
            //agar file bor bo'lsa yani SingleImageDropzone inputiga qo'yilgan narsa yani user cover imagega qo'ymoqchi bo'letgan fail typi  ts bilan belgilangan ts ruhsat bergan type bo'lsa ishlaydi
            setIsSubmitting(true); //yani SingleImageDropzone failini disablet qiymatida chaqirilgan///boshoda false qilingan isSubmitting tru qilinadi yani SingleImageDropzoneni disablet holati o'chiriladi va ichida File yani typlar bor setFile chaqiriladi shunda user imageni upload qiletganda fail typi tekshiriladi
            setFile(file);

            const res = await edgestore.publicFiles.upload({
                //edge store bilan qo'lda upload qilish
                file,
                options: { replaceTargetUrl: coverImage.url }, //edgestore bilan link orqali upload qilish yani ikkita functionga emas bitta functionda options bilan qilindi//shu url ishlaganda image replase bo'ladi yani eskisi udalit bo'libyangisi saqlanadi shudna edgestoreda rasim ko'payib ketmeydi//eski image joyini yangisiga almashtirish
            });

            await UpdateFields({
                //bu onChange function ishlaganda server bilanaloq qilinadi yani updatefields patch bilan ishlanadi convexga coverimage upload bo'ladi params bilan document idisi olinadi qachonki user real bo'lsa yani updatefiedsda tekshirilgan user mavjud bo'lsa va ohiri const coverImage = UseCoverImage()dan kelgan onClose store(zustand) ishlab windowni yopadi
                id: params.documentId as Id<"documents">,
                coverImage: res.url,
            });
            onClose();
        }
    };

    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            {/* coverImage.onClose yani o'zgargandan keyin yopilishi kerak */}
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg  font-semibold">
                        Cover Image
                    </h2>
                </DialogHeader>
                <SingleImageDropzone
                    // coverimage uchun madal ochilganda shu component chiqadi bu edgestoreni componenti yani user coverimageni uplad qiletganda shu fail bilan ui ochiladi
                    className="w-full outline-none"
                    disabled={isSubmitting}
                    value={file} //ts typlar
                    onChange={onChange}
                />
            </DialogContent>
        </Dialog>
    );
};

export default CoverImageModal;

//hullas ishlash prinsipi: edgestoreni yuklaymiz serverda ishlaydigan kodlarni yuklaymiz va edgestore.tsx failida chaqirib ishlatamiz ishlashi uchun  usecoverimage nomli hook yani modal uchun store yaratamiz va u storeni  cover-image-modal.tsxda chaqiramiz  eng asosiy layoutda edgestore.tsxda yaratilgan providerni eng asosiy layout.tsx chaqirib provider qilib layoutni o'rab olamiz va real user uchun kerak bo'ladigan failga yani cover.tsx failida chaqirib ishlatamiz +single-image-dropzone.tsx
//edgestore o'zida ishlatilgan imagelarni o'z serverida saqlab qoladi yani yuklanganda edgestorega serverda saqlaydi va bu holatda convex serverga imageni linkini beradi
