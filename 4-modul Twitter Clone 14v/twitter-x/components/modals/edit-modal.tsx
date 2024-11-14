"use client";

import useEditModal from "@/hooks/useEditModal";
import { IUser } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CoverImageUpload from "../shared/cover-image-upload";
import ProfileImageUpload from "../shared/profile-image-upload";
import Modal from "../ui/modal";

interface Props {
    user: IUser;
}

const EditModal = ({ user }: Props) => {
    const [coverImage, setCoverImage] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const editModal = useEditModal()
    const router = useRouter()

    useEffect(() => {
        setCoverImage(user.coverImage),
        setProfileImage(user.profileImage)
    },[user])

    const handleImageUpload = (image: string) => {

    }

    const bodyContent = (
        <>
        <CoverImageUpload coverImage={coverImage} onChange={image => handleImageUpload(image)}/>
        <ProfileImageUpload/>
        </>
    )


    return <Modal body={bodyContent} isOpen={editModal.isOpen} onClose={editModal.onClose}/>
};

export default EditModal;
