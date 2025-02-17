import { useEffect, useState } from "react";

//global windowga false tru hodisasini ilish

export const useScrolled = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        //yani useeffect ishlaganda ichidagi handleScroll function o'zgaruvchi ishlab agar global windowni y o'qi bo'yicha scroll qiymati 10dan katta bo'lsa boshida false bo;lib turgan setscrolled stateni true qiladi agar boshqa holat bo'lsa false qiladi masalan 10 dan kam bo'lsaham false qiladi (shu true false ushlab olib hodisa ilamiz) va global windowga hodisa ilinib "scroll" qiymati ishlaganda handleScroll functionini ishlat yokida agar ishlatilmasa hodisani "scroll" qiymati va handleScroll functionni ishlashini to'htat

        //shunda endi bu hook hissoblanadi vazifasi windowda true falselik hodisa yaratib shu hodisaga qiymat qilib class berish bu navbar.tsxda ishlatilgan yani windowdagi hodisa ishlab true bo'lganda default classlarga yangi class hodisasi qo'shiladi bu uchun navbarda shadcnda yozilgan cn functionidan foydalanildi

        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return scrolled;
};
