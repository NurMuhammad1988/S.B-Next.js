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

    const UpdateFields = useMutation(api.document.updateFields);

    const coverImage = UseCoverImage();

    const { edgestore } = useEdgeStore();

    const [file, setFile] = useState<File>(); //File nima?????????????????????????????????????????????????????

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
                options:{replaceTargetUrl: coverImage.url} 

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

// 10. Image upload & Preview 07:47 da qoldi lekin shu 10 va oldingi  9chi darslarga deyarli comment yozilmagan va yahshi tushunilmagan shularni 10 chi dars tugagandan keyin 100 foiz commentlarni yozib qo'y yani 9 va 10 chi darslarni boshidan qaytadan ko'rib commentlar yozib chiq shunda tushunarli bo'ladi
