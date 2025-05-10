import { create } from "zustand"; //state menejment qilib beradigan kutubhona

interface SearchStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
}
//=> <<return vazifasida {}<< yani bu useSearch function object qaytaradi
//bu useSearchda SearchStore interface chaqirilgani uchun endi shu interfacdagi hamma qiymatlar chaqirilishi kerak bo'lmasa hato qaytaradi ts qoidasi shu
//  Get funksiyasi harakatlar ichidagi holatga kirish uchun ishlatiladi.
export const useSearch = create<SearchStore>((set, get) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),//onOpen ishlaganda  boshida false bo'lgan isOpenni true qiladi
    onClose: () => set({ isOpen: false }),//onClose ishlaganda onOpenda true qilingan isOpenni yana qaytadan false qiladi
    onToggle: () => set({ isOpen: !get().isOpen }), //teskarisiga o'girvolish yani onToggle ishlaganda isOpenni get qilishni false qiladi yani isOpenni to'htatadi qachon to'htatadi get ishlaganda getni falsega aylantirib to'htatadi 
}));
