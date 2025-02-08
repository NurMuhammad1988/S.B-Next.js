import mongoose from "mongoose";

//Mongus sxemalari - bu sizning hujjatlaringiz qanday ko'rinishini Mongoosega aytishingizdir. Mongoose sxemalari TypeScript interfeyslaridan alohida, shuning uchun siz ham hujjat interfeysini, ham sxemani belgilashingiz kerak; yoki sxema ta'rifidan turni avtomatik ravishda aniqlash uchun Mongoose-ga tayaning.

//bu PostSchema function mongoose kutubhonasi bilan mongodbda user uchun model ochish  uchun kerak masalan bu holatda constructor qilib new qili Schema chaqirildi bu schemada mongooseni schema functioni constructorda yozilgan va chaqirildi  
const PostSchema = new mongoose.Schema({//PostSchema bu biz bergan nom nimaga bergan nom mongooseni Schema fuctionini chaqirgan constimizga bergan nomimiz holos//new kalit so'zidan foydalanib model sinfidan ob'ektni yaratish yani new mongoose.Schema bilan mongodbda object dynamic tarzda yaratiladi
    body: String,//bodyga global String chaqirildi chunki  mongoose.Schema bodyni nima ekanligini bilishi kerak//Mongoose sxemasi -Mongoose modeli uchun konfiguratsiya . Model yaratishdan oldin biz doimo Sxema yaratishimiz kerak. SchemaType berilgan yo'lda qanday turdagi ob'ekt kerakligini belgilaydi. Agar ob'ekt mos kelmasa, u xatoga yo'l qo'yadi. SchemaType quyidagicha e'lon qilinadi
    user: {
        type: mongoose.Schema.Types.ObjectId,//user bu object typi esa mongooseni schema functionidagi typis functioni bilan ishlatiladigan objectid yani bu schema function objectidni ishga tushirib ichidan userni idisiga qarab mongodbgda post yaratadi
        ref: "User",//bu user sabab mongooseni Schema.Types.ObjectId functionlari user modeldan userni topadi //Mongoose'da "ref" - bu havola qilingan hujjatlar yashaydigan MongoDB to'plamini ko'rsatadigan sxema tipidagi xususiyatdir . U MongoDB ma'lumotlar bazasida ikki yoki undan ortiq to'plamlar o'rtasida "munosabat" yaratish uchun ishlatiladi. Misol uchun, sizning MongoDB ma'lumotlar bazasida ikkita to'plamingiz bor deylik: "foydalanuvchilar" va "xabarlar"
    },
    likes: [//postga kimdur like bosishi mumkun shu like bosgan userni aniq topib olish uchun bu likes o'zgaruvchini qiymatlarga type berilishi kerak bo'lmasa mongoose schema nima ekanligini tushunmaydi ref esa qaysi modeldan olish kerakligini aytish uchun masalan "User" bu holatda User modeldan olish kerakligini aytadi
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
}, {timestamps: true});//POST LIKES VA COMMENTSLARNI VAQTINI BELGILASH uchun agar false qilinda atcreated time ishlamaydi bu moshqa modellardaham ishlatilgan masalan user modeldaham chunki userni qachon yaratilganini bilish uchun

//BU MODELLARNI ishlatish uchun hookslar kerak yani shaxsiy hooklar hooks papkani ichida hamma modelalarni ishlatadigan shaxsiy hooklar turipti

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema)//yani
export default Post// mongooseni Schema functionini togridan togri export qilib bolmaydi objectga solib export qilish kerak masalan bu holatda Post nomli functionga solib jo'natildi yani doim shunday tarzda export qilinadi

