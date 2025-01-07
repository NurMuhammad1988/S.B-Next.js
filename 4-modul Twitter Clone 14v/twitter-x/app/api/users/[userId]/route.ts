import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function PUT(req: Request, route: { params: { userId: string } }) {
    try {
        await connectToDatabase();
        const body = await req.json();
        const { userId } = route.params;

        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type"); //edit-modal.ts va edit-form.ts faillaridan keladigan so'rovlarni querylarini tanib olish uchun  kerak bo'ladigan node,jsni get functioni endi type o'zgaruvchi ichida "type" ni taniydigan solishtiradigan get functioni bor

        if (type === "updateImage") {
            //agar ichida query so'rovni taniydigan get  functioni bor type o'zgaruvchi teng bo'lsa updateImagega yani edit-modal.tsxdan keladigan so'rov queriysi typida (?type=updateImage!!!!!!!!!!!!!!!!!!!) shu updateImage texsi bor bo'lsa
            //updateImage edit-modal.tsxdan keletgan query so'rovga javob
            //agar edit-modal.tsxda axiosda yozilgan so'rov kelganda agar querysida updateImage texti bor bo'lsa update bo'ladi  va User updated successfully texti chiqadi
            await User.findByIdAndUpdate(userId, body, { new: true }); //yani bodyda nima bor bo'lsa o'sha o'zgaradi bodyda esa profileimage bor bu so'rov edit-modal.tsxda yozilgan handleImageUpload function ishlaganda bajariladigan PUT so'rov!!!!!!!
            //yani orqa fon rasmi qo'yiladi

            return NextResponse.json({ message: "User updated successfully" });
        } else if (type === "updateFields") {
            //updateFields edit-form.tsxdan keletgan query so'rovga javob
            ///agar ichida query so'rovni taniydigan get  functioni bor type o'zgaruvchi teng bo'lsa updateFiledsga yani edit-form.tsxdan keladigan so'rov queriysi typida (?type=updateFields!!!!!!!!!!!!!!!!!!!) shu updateFields texsi bor bo'lsa existUser nomli o'zgaruvchi ichidagi mongoseni functioni ishlab userni idisga qarab topvoladi va  shu idli userni username qiymati agar current userni usernamesi bilan bir hil bo'lsa userNameExist o'zgaruvchida chaqirilgan mongooseni exists function ishlab solishtiradi yani endi agar userNameExist true bo'lsa yani exists function bajarilgan bo'lsa va usernamelar bir hil degan javobni serverdan olib kelgan bo'lsa  Username already exists texti chiqadi

            const existUser = await User.findById(userId);

            if (body.username !== existUser.username) {
                //agar body yani current username teng bo'lmasa existUser o'zgaruvchida kelgan usernamega userNameExist o'zgaruvchi ishlab usernamega bodydagi yani current userni usernamesini qo'yadi yokida userNameExist true bo'lsa yani avvaldan bu username bor bo'lsa "Username already exists" textini chiqaradi yani usernamelar bir hil bo'lmasligi kerak
                const userNameExist = await User.exists({
                    username: body.username,
                });

                //usernameni bu imagelar bor do'rovga bitta qib yozilganini sababi ozi ikkitagina shi so'rov borligi uchun va  bular ko'plkda yozilgan!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! yani coverimage provileimage uchunham(updateImage)  va biodagi datalar uchunham(updateFields)

                if (userNameExist) {
                    return NextResponse.json(
                        { error: "Username already exists" },
                        { status: 400 }
                    );
                }
            }
        }

        await User.findByIdAndUpdate(userId, body, { new: true });
        return NextResponse.json({ message: "User updated successfully" });
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}
