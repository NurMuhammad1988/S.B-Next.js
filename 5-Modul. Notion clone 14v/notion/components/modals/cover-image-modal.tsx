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

    const { edgestore } = useEdgeStore();//edgestoreni ishlatadigan provider file

    const [file, setFile] = useState<File>(); //File nima File bu tsni typlari shu Fail ichida yo'q typlar edgestore tomonidan qabul qilinmeydi yani faqat ts tekshirividan o'tadigan fallarni yuklashga ruhsat beradi

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onClose = () => {
        setFile(undefined);
        setIsSubmitting(false);
        coverImage.onClose();
    };

    const onChange = async (file?: File) => {
        if (file) {
            setIsSubmitting(true);
            setFile(file);

            const res = await edgestore.publicFiles.upload({
                file,
                options: { replaceTargetUrl: coverImage.url },
            });

            await UpdateFields({
                id: params.documentId as Id<"documents">,
                coverImage: res.url,
            });
            onClose();
        }
    };

    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg  font-semibold">
                        Cover Image
                    </h2>
                </DialogHeader>
                <SingleImageDropzone
                    className="w-full outline-none"
                    disabled={isSubmitting}
                    value={file}
                    onChange={onChange}
                />
            </DialogContent>
        </Dialog>
    );
};

export default CoverImageModal;
