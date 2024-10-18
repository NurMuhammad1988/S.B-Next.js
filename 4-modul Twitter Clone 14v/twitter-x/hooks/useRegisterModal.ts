// modalni ochib yopishga kerak bo'ladigan malumotlar

import { create } from "zustand"; //npm i zustand// state managment reduxga o'hshaydi va reduxdan oson providerlarsiz ishlaydi {create} esa zustandni funksiyasi vazifasi
//Zustand Reduxdan tezroqmi? Redux o'lchami ishlash uchun muhim bo'lgan veb-ilovalar uchun ham tashvish tug'dirishi mumkin. Keng xususiyatlar to'plami tufayli u katta to'plam hajmi bilan birga keladi. Zustand yengil (gzip hajmi 1 KB dan kam) boʻlib, toʻplamingiz hajmini nazorat qilishda yordam beradi, bu esa tezroq yuklash vaqtini va yaxshi ishlashni taʼminlaydi .

//Zustand do'koni hookdir,  create bu state yaratish uchun ishlatiladigan metod function. state har bir komponent baham ko'radigan haqiqatning yagona manbaidir. Funktsiyalar to'plami o'zgaruvchi yoki ob'ekt holatini o'zgartirish uchun ishlatiladi . Get funksiyasi harakatlar ichidagi holatga kirish uchun ishlatiladi.


interface RegisterModalStore {
    isOpen: boolean; //modal ochiq yoki yopiq boolean qiymat qaytaradi
    onOpen: () => void; //modalni ochadi
    onClose: () => void; // modalni yopadi
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
    // bu qiymatlar RegisterModalStore interfaceda kelgani uchun shu uchchala qiymat hamasi chaqirilmasa hato chiqadi chunki RegisterModalStore interfaceda qiymatlar ohirida ? belgisi yo'q yani endi bu qiymatlar hammasi chaqirilishi shart
    isOpen: false, // boshlang'ich qiymat huddi react redux darslariday
    onOpen: () => set({ isOpen: true }),// boshlang'ich qiymat bu holatda onOpen qiymatiga set qilib yani o'rnatildi isOpenni true qilindi yani onOpenni boshlang'ich qiymati isOpenni true qilish  
    onClose: () => set({ isOpen: false }),// boshlang'ich qiymat bu holatda onClose qiymatiga set qilib yani o'rnatildi isOpenni false qilindi yani onCloseni boshlang'ich qiymati isOpenni false qilish 
}));

export default useRegisterModal;
