"use client";

import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import Image from "next/image";
import { MdEdit } from "react-icons/md";
import { IoIosCloudDownload } from "react-icons/io";

//edit profile buttoni bosilganda  birinchi shu component chiqadi yanicover image orqa fon imagesi

interface Props {
    coverImage: string;
    onChange: (coverImage: string) => void; //onChange bu componentga edit-modal.tsxdan shu coverimageupload.tsx componentga props bilan jo'natilgan bu onChange shu failda ishlatilishi va typiham berilishi yani nima maqsadda qanday holatda ishlatilishiham typida aytib qo'yilishi shart// bu onChange qiymatda edit-modal.tsxda yozilgan handleImageUpload functioni bor // coverImageda esa bo'sh state bor boolean qiymati bilan handleImageUpload functiondagi async serverdan so'rov functioni ishlaganda query so'rov natijasiga qarab if else berilgan yani user.id da profilimage qiymati true bo'lsa shu profileImageni ko'rsatadi agar false bo'lsa coverImageni ko'rsatadi //coverImage onChange ichiga tushganda o'zgaradi nima uchun o'zgartirish kerak chunki boshida false bo'b turipti yani userni coverimagesi boshida yo'q shu holatni o'zgartirish uchun o'zgarishi kerak
}

//userni profileni orqa fonidagi rasimini o'zgartirish

const CoverImageUpload = ({ coverImage, onChange }: Props) => {
    const [image, setImage] = useState(coverImage);

    const handleChange = useCallback(
        (coverImage: string) => {
            onChange(coverImage);
        },
        [onChange]
    );

    const handleDrop = useCallback(
        (files: any) => {
            console.log(files);

            const file = files[0];
            const reader = new FileReader();//constructor chaqirildi yani event ichidagi hodisani o'qiydigan consturctor
            reader.onload = (evt: any) => {
                //reader onload bo'lsa yani yuklangan bo'lsa yani rasim skachat qilanadigan joyga qo'yilib skachat qilingan bo'lsa
                setImage(evt.target.result); //shu handleDrop functionda bo'lgan hodisani resultni ko'rsatish uchun
                handleChange(evt.target.result); //yuqoridagi handleChange functionda bo'lgan hodisani resultni ko'rsatish
            };

            reader.readAsDataURL(file);
        },
        [handleChange]
    );

    const { getInputProps, getRootProps } = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        accept: {
            //qanaqa formatdagi imagelarni qabul qilishi aytildi umuman aytilishi shart
            "image/jpeg": [],
            "image/png": [],
        },
    });

    return (
        <div
            {...getRootProps({
                className:
                    "text-white text-center border-none rounded-md w-full h-[200px] bg-neutral-700 cursor-pointer",
            })}
        >
            <input {...getInputProps()} />
            {image ? (//image bor bo'lsa shu classlar bilan qo'yiladi yani qo'yiladigan imagega shu classlar tasir qiladi
                <div className="w-full h-[200px] relative left-0 right-0 ">
                    <Image
                        src={image}
                        fill
                        alt="Uploaded image"
                        style={{ objectFit: "cover" }}
                    />

                    <div className="absolute inset-0 flex justify-center items-center">
                        <MdEdit size={24} className="text-white" />
                        {/* qalamcha icon */}
                        {/* agar user coverimageni o'zgartirmoqchi bo'lsa shu icon orqali o'zgartiradi bu getRootProps chaqirilgan ona divni ichida bo'lgani sababli useDropzone kutubhonsidan kelgan getRootProps functioni sabab ishlayveradi  useDropzone kutubhonasi rasim yuklashlar uchun kerak bo'ladigan kutubhona */}
                    </div>
                </div>
            ) : (//agar image yo'q bo'lsa shu classlar ishlab turadi
                <div className="h-full flex justify-center cursor-pointer flex-col items-center gap-2">
                    <IoIosCloudDownload size={50} />
                    {/* agar image yo'q bo'lsa shu icon bilan pastdagi text chiqadi */}
                    <p>Upload cover image</p>
                </div>
            )}
        </div>
    );
};

export default CoverImageUpload;
