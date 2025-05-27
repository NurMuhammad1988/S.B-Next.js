'use client';

//edgestore kutubhonasini nastroykasi yani app papkadagi asosiy layout.tsx failida provider sifatida chaqirilishi kerak aks holda cover imageni o'zgartirayotganda chiqadigan shu kutubhonadan keladigan image ozgartiradigan yani compdan yokida likn bilan keladigan imageni qo'yish uchun ishlatiladigan component ishlamaydi YANI NEXT JS UCHUN FAILLARNI YUKALAGNDA KERAK BO'LADIGAN KUTUBHONA

//EdgeStore buNext.js loyihalarida fayllarni yuklashni soddalashtiradigan turdagi xavfsiz npm paketi. U fayllarni boshqarish vositalarini, jumladan, sozlanishi mumkin bo'lgan fayllarni tekshirishni, loyiha va fayllarni boshqarish uchun asboblar panelini va CloudFront orqali CDN tarqatishni taqdim etadi. EdgeStore shuningdek, parallel yuklash uchun navbatda turish va eskizlarni avtomatik yaratish kabi xususiyatlarni taklif etadi. 

import { type EdgeStoreRouter } from '../app/api/edgestore/[...edgestore]/route';
import { createEdgeStoreProvider } from '@edgestore/react';

const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<EdgeStoreRouter>();

export { EdgeStoreProvider, useEdgeStore };