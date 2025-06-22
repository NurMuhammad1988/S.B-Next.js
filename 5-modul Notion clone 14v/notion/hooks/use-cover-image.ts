
import { create } from "zustand";

interface CoverImageStore {
    url?: string;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onReplase: (url: string) => void;//cover imageni yangilash uchun
}

export const UseCoverImage = create<CoverImageStore>((set) => ({
    url: undefined,
    isOpen: false,
    onOpen: () => set({ isOpen: true, url: undefined }),
    onClose: () => set({ isOpen: false, url: undefined }),
    onReplase: (url) => set({ isOpen: true, url }),//shu url ishlaganda image replase bo'ladi yani eskisi udalit bo'libyangisi saqlanadi shudna edgestoreda rasim ko'payib ketmeydi va onReplase store sabab edgestoreni image upload qiladigan windowi ochiladi

    //bu store cover-image-modal.tsxda chaqirilib ishlatilgan
}));


//hullas ishlash prinsipi: edgestoreni yuklaymiz serverda ishlaydigan kodlarni yuklaymiz va edgestore.tsx failida chaqirib ishlatamiz ishlashi uchun  usecoverimage nomli hook yani modal uchun store yaratamiz va u storeni  cover-image-modal.tsxda chaqiramiz  eng asosiy layoutda edgestore.tsxda yaratilgan providerni eng asosiy layout.tsx chaqirib provider qilib layoutni o'rab olamiz va real user uchun kerak bo'ladigan failga yani cover.tsx failida chaqirib ishlatamiz +single-image-dropzone.tsx 
//edgestore o'zida ishlatilgan imagelarni o'z serverida saqlab qoladi yani yuklanganda edgestorega serverda saqlaydi va bu holatda convex serverga imageni linkini beradi