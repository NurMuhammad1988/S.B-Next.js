import Notification from "@/database/notification.model";
import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

//mongoDB bilan ishlash uchun dastur va fronted bilan mongodb serverni ulab hamkorlikda ishlatish uchun doim mongoose kutubhonasi kerak bo'ladi mongoose kutubhonasida fronted va serverni ulab ishlatadigan har hil vazifalarni bajarishga mo'ljallangan ko'plab functionlar bor va bu twitter  web ilovasida ishlash metodi quyidagicha: birinchi o'rinda model yaratiladi yani js bilan yaratiladi ts faillar bilan yani js ichida ts faillar bilan modellar yaratiladi bu modellarni vazifasi backend bilan frontedni hamkorlikda ishlatish keyin esa shu modelni ishlatadigan hooklar qo'lda yoziladi va bu model va hooklar tsx faillarni ishlatadi yani tsx faillardagi functionlardaberilgan buyruqlarga qarab if else metodi bilan ishlatiladi yoki ishlatilmaydi  shundan hulosa qiladigan bo'lsak mongodbda ishlash 3 ta asosiy ishga qaraydi hooklar modellar va fronted qiymatlar 

export async function GET(req: Request, route: { params: { userId: string } }) {
    try {
        await connectToDatabase();
        const { userId } = route.params;

        const notifications = await Notification.find({ user: userId }).sort({//bu Notification model yuqorida import qilingan va mongooseni find functioni shu Notification modeldan user object ichida userIdni find qiladi va  mongooseni sort metodi bilan umumiy qilib hamma notificationslar -1 qilinadi
            createdAt: -1,
        });

        await User.findByIdAndUpdate(userId, {//yani yangiliklar get qilib bo'lingandan keyin user yangiliklarni ochib ko'rib bo'lgandan keyin hasNewNotifications fasle qilinadi yani yangi notificationslar kelguncha false bo'lib turadi
            $set: { hasNewNotifications: false },
        });

        return NextResponse.json(notifications);
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}

export async function DELETE(
    req: Request,
    route: { params: { userId: string } }
) {
    try {
        await connectToDatabase();
        const { userId } = route.params;

        await Notification.deleteMany({ user: userId }); 

        await User.findByIdAndUpdate(userId,
            { $set: { hasNewNotifications: false } },
            { new: true }
        );

        return NextResponse.json({ message: "Notifications deleted" });
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}
