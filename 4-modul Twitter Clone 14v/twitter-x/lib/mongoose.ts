import mongoose, { ConnectOptions } from "mongoose";//mongoDB server mongoose esa shu serverni loyiha bilan ulab ishlatib beradigan mongodbini kutubhonasi

let isConnected: boolean = false;

export const connectToDatabase = async () => {//mongodbdan datalarni kelishi ketishi uchun asosiy function
    mongoose.set("strictQuery", true);//bu serverdan queriy so'rovlar kelishi uchun ypoziladigan query so'rovlar kodi

    if (!process.env.MONGO_URI) {//agarda process.env.MONGO_URI yo'q bolsa yani false bo'lsa "MONGO_URI is not defined"
        return console.log("MONGO_URI is not defined");
    }

    if (isConnected) {//agarda isConnected true bo'lsa bu connectToDatabaseni return qil yani ishlat bo'lmasa hech narsa qaytarma chunki yuqoridagi if bilan hato texti qaytib bo'lgan bo'ladi
        return;
    }

    try {
        const options: ConnectOptions = {//options mongoose kutubhonasidan keladi typi esa ConnectOptions ConnectOption esa mongooseni asosiy functioni va dbname autocreate va hakozo qiymatlarni typi va vazifasi shu functionda yozilgan
            dbName: "twitter-x",//mongodbdagi serverni nomi
            autoCreate: true,//agar bu false bo'lsa hamma narsa qo'lda yozish kerak bo'ladi yani delete updatelarni bu true bo'lishi kerak autoCreate mongooseni boolean typli qiymati hamma narsani autocreate qiladi masalan user account create qilsa post yozsa comment yozsa hammasini aftamatik tarzda serverga jo'natadi yoki dasturchi serverda postlarga yoki datalarga o'zgartirish kiritsa loyihada aftamatik tarzda update boladi shu sabab bu ishlatilishi kerak
        };

        await mongoose.connect(process.env.MONGO_URI, options);//mongoosedan keladigan connect yani ulab berish mongoose mongodbdagi serverga ulab berish uchun keyni talab qiladi .envda esa mongodbdagi serverni keyi yozilgan o'zgaruvchini nomi MONGO_URI ikkinchi parametr esa yuqoridagi options connect ikkita parametr qabul qiladi!!!!!!!!!!!!

        isConnected = true;// bu holatda aslida false bo'lgan isConnected true qilindi yani serverdan datalar kelganda true qilindi shu sabab yuqoridagi ifdagi bu isConnected truega o'zgaradi yani serverdan datalar kelganda ketganda true bo'ladi boshqa payti false bob turadi
        console.log("Connected to database");
    } catch (error) {
        console.log("Error connecting to database");
    }
};
