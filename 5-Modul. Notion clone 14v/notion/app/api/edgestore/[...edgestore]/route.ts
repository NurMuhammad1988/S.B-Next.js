import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";

//hullas ishlash prinsipi: edgestoreni yuklaymiz serverda ishlaydigan kodlarni yuklaymiz va edgestore.tsx failida chaqirib ishlatamiz ishlashi uchun  usecoverimage nomli hook yani modal uchun store yaratamiz va u storeni  cover-image-modal.tsxda chaqiramiz  eng asosiy layoutda edgestore.tsda yaratilgan providerni eng asosiy layout.tsx chaqirib provider qilib layoutni o'rab olamiz va real user uchun kerak bo'ladigan failga yani cover.tsx failida chaqirib ishlatamiz +single-image-dropzone.tsx

////edgestore o'zida ishlatilgan imagelarni o'z serverida saqlab qoladi yani yuklanganda edgestorega serverda saqlaydi va bu holatda convex serverga imageni linkini beradi

//edgestore server uchun nastroyka va papkalar faillar nomlari aynan shunday bo'lishi kerak yani next.jsda shunaqa qoidalar bor papkalar nomi juda juda muhum bo'masa loyiha buzulib ketadi

const es = initEdgeStore.create();

/**
 * This is the main router for the EdgeStore buckets.
 */
const edgeStoreRouter = es.router({
    publicFiles: es.fileBucket().beforeDelete(() => {
        return true;
    }),
});

const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
});

export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;//shu type sabab ts bilan upload qilinadigan faillar himoyalanadi yani inputiga qo'yiladigan faillarni typiga qarab yoki qabul qiladi yoki yo'q
