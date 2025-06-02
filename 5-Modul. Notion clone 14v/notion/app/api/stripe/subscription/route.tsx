import stripe from "@/lib/stirpe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const public_domain = process.env.NEXT_PUBLIC_DOMAIN;
        const { email, userId, priceId } = await req.json();
        const isExistingCustomer = await stripe.customers.list({ email }); //customers.list lib/stripe.tsdan keldi//yani stripeni bu list metodi bilan payment qilmoqchi bo'lgan userni stipe ichidan izlash yani ro'yhat ichidan izleydi agar bor bo'lsa doim yani muddat tugagancha userga dostup bor bo'ladi agar ro'yhatda yo'q bo'lsa dostup ochilmeydi buni email bilan qiladi yani userni emaili orqali tekshiradi

        let customer;

        if (isExistingCustomer.data.length) {
            //isExistingCustomerda kelgan listda agar email bor bo'lsa yani lenght bor bo'lsa yani nimadur bor bo'lsa let customer; o'zgaruvchiga [0]dan boshlab sovoladi yani bu customer o'zgaruvchi let yani bitta let yani o'zgarmas agar shu isExistingCustomerda length bor bo'lsa customer o'zgaruvchida turadi agar yo'q bo'lsa pastdagi if bilan yangi yaratadi
            //massiv qaytaradi
            customer = isExistingCustomer.data[0];
        }

        if (!customer) {
            //yani agar isExistingCustomerda listda kelgan data lengthda kelgan datalarni o'ziga yuklab oleydigan customer o'zgaruvchi false bo'lsa yani ichida hech narsa bo'lmasa stripeni create metodi bilan  emailini va metadatda kelgan userId ga qarab useridni olib yangi create qiladi bu holatda userId req:Request bilan kelgan
            customer = await stripe.customers.create({
                email,
                metadata: { userId }, //Bu yerda  Stripedagi customer ID orqali userIdni qayta olamiz. Bu bizga Stripeda ro'yhatdan o'tgan foydalanuvchini ilovadagi foydalanuvchi bilan bog'lashga yordam beradi.
            });
        }

        const subscription = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [{ price: priceId, quantity: 1 }],
            customer: customer.id,
            success_url: `${public_domain}/documents?`, //yani checkout qilinagndan keyin agar user to'lov qilgan bo'lsa userni (secret) papka ichidagi documents papkaga jo'natadi yani user uchun dostup ochiladi
            cancel_url: `${public_domain}`,
        });

        return NextResponse.json(subscription.url);
    } catch (error) {
        return NextResponse.json(
            `Something went wrong. Please try again - ${error} `,
            {
                status: 500,
            }
        );
    }
}
