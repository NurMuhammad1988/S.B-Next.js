import mongoose from "mongoose";

//Mongus sxemalari - bu sizning hujjatlaringiz qanday ko'rinishini Mongoosega aytishingiz. Mongoose sxemalari TypeScript interfeyslaridan alohida, shuning uchun siz ham hujjat interfeysini, ham sxemani belgilashingiz kerak; yoki sxema ta'rifidan turni avtomatik ravishda aniqlash uchun Mongoose-ga tayaning.

//bu PostSchema function mongoose kutubhonasi bilan mongodbda user uchun model ochish  uchun kerak masalan bu holatda constructor qilib new qili Schema chaqirildi bu schemada mongooseni schema functioni constructorda yozilgan va chaqirildi  
const PostSchema = new mongoose.Schema({//new kalit so'zidan foydalanib model sinfidan ob'ektni yaratish yani new mongoose.Schema bilan mongodbda object dynamic tarzda yaratiladi
    body: String,//bodyga global String chaqirildi chunki 
    user: {
        type: mongoose.Schema.Types.ObjectId,//user bu object typi esa mongooseni schema functionidagi typis functioni bilan ishlatiladigan objectid yani bu schema function objectidni ishga tushirib ichidan userni idisiga qarab mongodbgda post yaratadi
        ref: "User",//bu user sabab mongooseni Schema.Types.ObjectId functionlari user modeldan userni topadi //Mongoose'da "ref" - bu havola qilingan hujjatlar yashaydigan MongoDB to'plamini ko'rsatadigan sxema tipidagi xususiyatdir . U MongoDB ma'lumotlar bazasida ikki yoki undan ortiq to'plamlar o'rtasida "munosabat" yaratish uchun ishlatiladi. Misol uchun, sizning MongoDB ma'lumotlar bazasida ikkita to'plamingiz bor deylik: "foydalanuvchilar" va "xabarlar"
    },
    likes: [
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
}, {timestamps: true});//POST LIKES VA COMMENTSLARNI VAQTINI BELGILASH uchun

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema)
export default Post