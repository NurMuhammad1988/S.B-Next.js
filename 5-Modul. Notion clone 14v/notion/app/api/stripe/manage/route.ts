import stripe from "@/lib/stirpe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const public_domain = process.env.NEXT_PUBLIC_DOMAIN; //bunda notion loyihani domaini bor hozircha local hostda agar netlify.app yokida vercal.comga qo'yilib domain olinsa shu domain shu process.env.NEXT_PUBLIC_DOMAIN ichida yani env local ichida bo'ladi
        const { email } = await req.json();
        const isExistingCustomer = await stripe.customers.list({ email }); //customers.list lib/stripe.tsdan keldi//yani stripeni bu list metodi bilan payment qilmoqchi bo'lgan userni stipe ichidan izlash yani ro'yhat ichidan izleydi agar bor bo'lsa doim yani muddat tugagancha userga dostup bor bo'ladi agar ro'yhatda yo'q bo'lsa dostup ochilmeydi buni email bilan qiladi yani userni emaili orqali tekshiradi

        let customer;

        if (isExistingCustomer.data.length) {
            //isExistingCustomerda kelgan listda agar email bor bo'lsa yani lenght bor bo'lsa yani nimadur bor bo'lsa let customer; o'zgaruvchiga [0]dan boshlab sovoladi yani bu customer o'zgaruvchi let yani bitta let yani o'zgarmas agar shu isExistingCustomerda length bor bo'lsa customer o'zgaruvchida turadi agar yo'q bo'lsa pastdagi if bilan yangi yaratadi
            //massiv qaytaradi
            customer = isExistingCustomer.data[0];
            const portal = await stripe.billingPortal.sessions.create({
                customer: customer.id,
                return_url: `${public_domain}/documents`,
            });
            return NextResponse.json({status: true, url:portal.url});
        }else{
            return NextResponse.json({status:false , message: "No customer found"})
        }
    } catch (error) {
        return NextResponse.json(
            `Something went wrong. Please try again - ${error} `,
            {
                status: 500,
            }
        );
    }
}
