import { create } from "zustand";
//edit-modal.tsx failni ochib yopadigan zustand kutubhonasida qilingan hook 

interface EditModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useEditModal = create<EditModalStore>((set) => ({//create zustandni functioni set esa create functionni metodi isOpen, onOpen, onClose qiymatlarni set metod bilan false yoki truga o'zgartiradi
    isOpen: false,//boshida false bo'ladi yani edit modal tsx boshida false bob turadi chiqmeydi qachonki onopen qiymati berilsagina isopenni true qiladi yoki qachonki onClose qiymati berilsagini isopenni yana qaytadan false qiladi
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useEditModal