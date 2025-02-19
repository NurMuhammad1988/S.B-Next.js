import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(//constructor// mongoose serverdan datalarni olish va jo'natishi uchun datalarni typi bo'lishi shart yani gloabal typi shu uchu typlar global js objectlar bilan belgilangan
    {
        // bu typlar mongidbga jo'natiladigan datalarni typlari yani shu typlar sabab hamma narsa create bo'ladi
        name: String,
        username: String,
        email: String,
        password: String,
        coverImage: String,
        profileImage: String,
        bio: String,
        location: String,
        following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],//following qilayotgan userni idsi bilan topib olish uchun 
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],//followers qilayotgan userni idsi bilan topib olish uchun 
        //ref: "User" bu adres yani qayse modeldan olish kerakligi yatildi yani followersni qaysi modeldan olish kerakligini aytadi bu holatda User modeldan olinishi kerak 
        hasNewNotifications: Boolean,//bu boolean chunki yangilik bor bo'lishixam yo'q bo'lishixam mumkun
        notifications: [//ko'p bo'lishi mumkun shu sabab  array ichida chaqirdik
            {
                type: mongoose.Schema.Types.ObjectId,//yani ona array notifications o'zi nima degan savolga javob bu notifications mongooseni schema objekti
                ref: "Notification",//yani notification.model.ts failga yo'naltirildi
            },
        ],
    },
    { timestamps: true }//Mongoose sxemalari vaqt belgilarini qo'llab-quvvatlaydi. Agar siz vaqt belgilarini o'rnatsangiz: true yozish kerak , Mongoose sxemangizga Date tipidagi ikkita xususiyatni qo'shadi: createdAt : bu hujjat qachon yaratilganligini bildiruvchi sana . updatedAt: bu hujjat oxirgi marta qachon yangilanganligini bildiruvchi sana shu kod true qilinmasa datalardagi qo'shilish vaqtini bilib bo'lmaydi
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);//agar modellar ichida User nomli model bor bo'lsa Userni qaytar agar yo'q bo'lsa "User" nomli model create qil qayerga UserSchemaga UserSchema esa mongooseni  Schema va model function va metodlari bilan mongodbda object yaratadi u objectni esa stylelarga o'rab ui da ko'rsatiladi

export default User;
