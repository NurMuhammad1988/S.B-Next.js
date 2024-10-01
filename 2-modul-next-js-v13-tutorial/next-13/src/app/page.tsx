import Home from "@/component/home";

////next js app router sistemasi src/app ni ichida turgan page.tsx agar biror papkani ichida turmasa yani alohida tursa bu nextda bosh sahifa hissoblanadi va agar app papkani ichida papka ochib ichiga page.tsx yoki js deb nom berilsa bu asosiymasu lekin yana bitta sahifa hissoblanadi va bu aftamatik routega o'ralgan bo'ladi bu app router pathod hissoblanadi  nextni app router padhodidan foydalanish uchun bu page.tsx kalit so'z hissoblanadi boshqacha nom bilan file ochilsa uni routeri ishlamay qoladi  //////////////////////////va yana nextda page router padhodham bor bu padhod bilan 1-modulda loyiha qilingan huddi appga o'hshaydi faqat src papkani ichida pages papka bo'ladi pagesni ichidagi index.jsx yoki js asosiy papka hissoblanadi  va pages papkani ichida papka ochilib ichiga faqat index.tsx yoki js deb yoziladi va buham saytda alohida sahifa hissoblanadi lekin app router padhod routerlash uchun qulayroq hissoblanadi
const HomePage = () => {
    //// bu homepage yani asosiy layout pagemas shu loyihaani asosiy sahifasi yani bosh sahifa yani shablon emas shablon appni ichidagi ona papkasiz alohida turgan layout.tsx hissoblanadi shablonda  navbar  foouter sahifalari chaqirib qo'yilgan yani har qanday sahifaga o'tsaham tepada navbar pastda footer sahifalari ishlab turadi chunki layout shablon bu homepage esa shablonmas oddiy asosiy sahifa yani user kirganda birinchi ko'rinadigan sahifa shablonham birinchi ko'rinadi
    //// bu asosiy sahifa SSR buni ichida chaqirilgan component papkani ichidago Home.tsx esa CSR shu sabab asosiy sahifa refrash qilinganda home.tsxda yozilgan Loading... ishlayapti yani moounting bo'lepti shablonga aloqador navbar va footerlar esa refresh bo'mepti chunki layout va shablonham SSRda yozilgan
    return (
        <div style={{ paddingTop: "20px" }}>
            <Home />
        </div>
    );
};

export default HomePage;
