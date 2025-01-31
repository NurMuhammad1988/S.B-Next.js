"use client";

import useEditModal from "@/hooks/useEditModal";
import { IUser } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CoverImageUpload from "../shared/cover-image-upload";
import ProfileImageUpload from "../shared/profile-image-upload";
import Modal from "../ui/modal";
import axios from "axios";
import { Loader2 } from "lucide-react";
import EditForm from "../shared/edit-form";

interface Props {
    user: IUser;
}

const EditModal = ({ user }: Props) => {
    const [coverImage, setCoverImage] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const editModal = useEditModal();
    const router = useRouter();

    useEffect(() => {
        setCoverImage(user.coverImage), setProfileImage(user.profileImage);
    }, [user]);//qachonki user qiymatida kelgan IUserdan kelgan user bor bo'lsagina  bu useeffect ishga tushadi va setCoverImage state parametrida asli bo'sh string bo'lgan coverImage statega userni yani umumiy shu joriy userni sovoladi //setProfileImageham huddi yuqoridagiday ishlaydi// va  bu componentda user kelib useEffect ishlaganda pastdagi ikkala jsx faillar yani bodyContent va returnlar ishga tushadi

    const handleImageUpload = async (
        image: string,
        isProfileImage: boolean
    ) => {
        setIsLoading(true);

        try {
            setIsLoading(true);
            await axios.put(`/api/users/${user._id}?type=updateImage`, {//bu put so'rov borgan api typida agar updateImage texti bo'lmasaham ? shu so'rov sabab hato chiqmaydi //bu umumiy image so'rov coverimagefaham profileimageham ishlaydigan so'rov
                [isProfileImage ? "profileImage" : "coverImage"]: image,// bu profileImage va coverImagelar props bilan kelgan IUserni qiymatlari??????
            });
            router.refresh();//yuqoridagi so'rov bajarib bo'lingandan keyin faqat shu event sodir bo'lgan qisimgina refresh bo'ladi
            setIsLoading(false);//loader to'htatiladi
        } catch (error) {
            setIsLoading(false);//error bo'lsaham loader to'htatiladi
        }
    };
    const bodyContent = //alohida function ichida jsx yozish yani bu holatda tsx
    //Edit profile buttoniga bosilganda isOpen true bo'lib shu component ishga tushadi nima uchun ishga tushadi chunki chunki profile-bio.tsxda jsx ichida boshida <EditModal user={user} /> chaqirilgan yani shu component chaqirilgan bu component ishlaganda esa birinchi shu bodyConten jsx failli function ishga tushasdi  va birinchi coverimage bilan userimageni edit qilish va EditForm.tsx componenti chiqib user biolarini datalarini edit qilish imkoniyatlari ochib undan keyin   pastdagi ikkinchi jsx yani return ichidagi modal.tsx component ishga tushadi va user hohlasa biolarini o'zgartiradi yoki create qiladi
        (
            <>
                {isLoading && (
                    <div className="absolute z-10 h-[300px] bg-black opacity-50 left-0 top-12 right-0 flex justify-center ">
                        <Loader2 className="animate-spin text-sky-500" />
                    </div>
                )}
                <CoverImageUpload
                    //userni profileni orqa fonidagi rasimini o'zgartirish uchun component
                    coverImage={coverImage}
                    onChange={(image) => handleImageUpload(image, false)}//boshida image false bo'ladi
                />
                <ProfileImageUpload
                    //userni profileni rasmini o'zgartirish uchun component

                    profileImage={profileImage}
                    onChange={(image) => handleImageUpload(image, true)}//ProfileImageUploadda tru ekanligini sababi user google yoki githubda account create qilganda agar github yoki google accountini profilimagesi bor bo'lsa shuni qo'yadi 
                />

                <EditForm user={user} />
                {/* edit modal buttoni bosilgandan keyin shu edit form componenti ishlab turadi yani kerak bo'lsa ishlatiladi yokida yo'q */}
            </>
        );

    return (
        <Modal
            body={bodyContent}
            isOpen={editModal.isOpen} //bu modal componentda isOpen qiymati bor va bu boolean qiymat bu boolean qiymat va editModal ichida kelganda boshlang'ich holatda false bob turipti va bu fasle qiymat profile-bio.tsxdagi edit profile buttoniga click bo'lganda truega o'zgaradi yani isOpenni true qilib bu modal compnentni ochadigan buyruq profile-biodagi eidt profile buttonida onOpen functioni bilan buyurilgan//onClosedaham huddi shu faqat bu safar isOpenni false qilib modalni yopadi va bu modaldagi onClosega X rasmi berilgan yani x ni bosgnada onclose ishlab modalni yopadi
            onClose={editModal.onClose}
            isEditing //profile bioni o'zgartirishda kerak bo'ladigan scroll
        />
    );
};

export default EditModal;
