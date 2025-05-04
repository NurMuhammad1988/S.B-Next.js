import { create } from "zustand"; //state menejment qilib beadigan kutubhona

interface SearchStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
}
//=> <<return vazifasida {}<< yani bu useSearch function object qaytaradi
//bu useSearchda SearchStore interface chaqirilgani uchun endi shu interfacdagi hamma qiymatlar chaqirilishi kerak bo'lmasa hato qaytaradi ts qoidasi shu
export const useSearch = create<SearchStore>((set, get) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onToggle: () => set({ isOpen: !get().isOpen }), //teskarisiga o'girvolish
}));
