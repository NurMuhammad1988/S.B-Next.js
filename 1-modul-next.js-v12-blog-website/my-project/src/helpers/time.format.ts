export const calculateEstimatedTimeToRead = (text: string) => {
    const wpm = 180; //word per minut yani minutiga nechta so'z o;qishga qarab maqolani nechchi minutda o'qib bo'lish mumkunkigi aftamatik hissoblaydi
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);//JavaScript-da matematika. ceil() funktsiyasi berilgan sondan katta yoki unga teng eng kichik butun sonni qaytaradi . Misol uchun, agar sizda 3.14 raqami bo'lsa, Math. ceil (3.14) 4 ni qaytaradi. yani qoldiqlarni olib tashlab qoldiq o'rniga butun sonni qo'shib qaytaradi
    return time;//time o'zgaruvchidagi words bilan wpm ni ishlatilgan holatda birlashtirib qaytarish//yani bu holatda funksiya maqoladagi so'zlarni sanab nechchi minutda o'qilishini hissoblab aytadi buni maqolani titlega chaqirish kerak yani bu funksiyani>>>>>>calculateEstimatedTimeToRead//export default qilingan shu sabab butun loyiha bo'ylab import qilib ishlatsa bo'ladi
};
