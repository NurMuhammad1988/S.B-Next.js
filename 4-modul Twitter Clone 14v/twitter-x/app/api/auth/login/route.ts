import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";//aasas
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

//log in qilish uchun kerak bo'ladigan server uchun kodlar

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const { email, password } = await req.json();

        const isExistingUser = await User.findOne({ email });//connectToDatabasedan keladigan User mongoose modeldan keladi

        if (!isExistingUser) {//agar email false bo'lsa shu hatoni qaytaradi
            return NextResponse.json(
                { error: "Email does not exist" },
                { status: 400 }
            );
        }

        const isPasswordValid = await compare(//bcrypt kutubhonadan keladigan function vazifasi  da connectToDatabase keladigan User modeldagi userni parolini tekshiradi va pastdagi if bilan tekshirib agar parol togri bo'lsa kiritadi hato bo'lsa kiritmaydi
            password,
            isExistingUser.password
        );

        if (!isPasswordValid) {//yani isPasswordValidda chaqirilgan compare false bo'lsa shu errorni qaytaradi
            return NextResponse.json(
                { error: "Password is incorrect" },
                { status: 400 }
            );
        }

        return NextResponse.json({ success: true, user: isExistingUser });//agar hammasi togri bo'lsa user modelga ichida Userni emaili orqali topilgan userni isExistingUser bilan jo'natildi
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}
