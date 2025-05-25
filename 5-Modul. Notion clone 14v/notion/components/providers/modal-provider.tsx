"use client";
import React, { useEffect, useState } from "react";
import SettingsModal from "../modals/settings-modal";
import CoverImageModal from "../modals/cover-image-modal";

const ModalProvider = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; //mountedda boshida false bor yani useEffect user saytga kirgandan ishlaydi agar user kirmasa faqat null yani hech narsa qaytadi nimaga undefined emas null qaytarish kerak chunki dastur update bo'lmasligi kerak yani shu provider sabab agar setting-modal.tsx kerak bo'lmasa yani useEffect ishlatilmasa yani user bu modalga tegishli item.tsxdagi labelga bosmasa bu component faqat null qaytarib turadi yani umuman update bo'meydi bu esa reactni react qilgan qoidalardan biri hissoblanadi !oooo

    return (
        <>
            <SettingsModal />
            <CoverImageModal/> 
        </>
    );
};

export default ModalProvider;
