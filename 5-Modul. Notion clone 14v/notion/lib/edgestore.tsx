"use client";

//npm>>> npm install @edgestore/server @edgestore/react zod

//edgestore kutubhonasini nastroykasi yani app papkadagi asosiy layout.tsx failida provider sifatida chaqirilishi kerak aks holda cover imageni o'zgartirayotganda chiqadigan shu kutubhonadan keladigan image ozgartiradigan yani compdan yokida link bilan keladigan imageni qo'yish uchun ishlatiladigan component ishlamaydi YANI NEXT JS UCHUN FAILLARNI YUKALAGNDA KERAK BO'LADIGAN KUTUBHONA

//EdgeStore bu Next.js loyihalarida fayllarni yuklashni soddalashtiradigan turdagi xavfsiz npm paketi. U fayllarni boshqarish vositalarini, jumladan, sozlanishi mumkin bo'lgan fayllarni tekshirishni, loyiha va fayllarni boshqarish uchun asboblar panelini va CloudFront orqali CDN tarqatishni taqdim etadi. EdgeStore shuningdek, parallel yuklash uchun navbatda turish va eskizlarni avtomatik yaratish kabi xususiyatlarni taklif etadi.

//EdgeStore yordamida fayllarga quyidagi usullarda cheklov qo‘yish mumkin:
//Faqat login bo‘lgan foydalanuvchi ko‘rsin.
//Ma'lum rollarga ega foydalanuvchilar (masalan, admin) kirishi mumkin.
//Fayl biror vaqt oralig‘ida ko‘rinadigan bo‘lishi mumkin. preview qiymati shu bilan ishlatilgan desaham bo'ladi

//buni .env.localda keyi bo'ladi shu key bilan edgestore.dev saytidan faqat bitta loyihaga tekin key olib ishlatish mumkun

//asosiy server nastroyka app/api/edgestore/[...edgestore]/route.ts failida shu nastroykani bu provider componentga ulab bu componentni provider sifatida eng asosiy ildiz layout tsx falni childrenlarni o'rab olish kerak shunda edgestore to'g'ri ishlaydi

//hullas ishlash prinsipi: edgestoreni yuklaymiz serverda ishlaydigan kodlarni yuklaymiz va edgestore.tsx failida chaqirib ishlatamiz ishlashi uchun  usecoverimage nomli hook yani modal uchun store yaratamiz va u storeni  cover-image-modal.tsxda chaqiramiz  eng asosiy layoutda edgestore.tsxda yaratilgan providerni eng asosiy layout.tsx chaqirib provider qilib layoutni o'rab olamiz va real user uchun kerak bo'ladigan failga yani cover.tsx failida chaqirib ishlatamiz +single-image-dropzone.tsx

//edgestore o'zida ishlatilgan imagelarni o'z serverida saqlab qoladi yani yuklanganda edgestorega serverda saqlaydi va bu holatda convex serverga imageni linkini beradi

import { type EdgeStoreRouter } from "../app/api/edgestore/[...edgestore]/route";
import { createEdgeStoreProvider } from "@edgestore/react";

const { EdgeStoreProvider, useEdgeStore } =
    createEdgeStoreProvider<EdgeStoreRouter>();

export { EdgeStoreProvider, useEdgeStore };
