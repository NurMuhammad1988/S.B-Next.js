import stripe from "@/lib/stirpe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const public_domain = process.env.NEXT_PUBLIC_DOMAIN;
        const { email, userId, priceId } = await req.json();
        const isExistingCustomer = await stripe.customers.list({ email }); //customers.list lib/stripe.tsdan keldi

        let customer;

        if (isExistingCustomer.data.length) {
            //massiv qaytaradi
            customer = isExistingCustomer.data[0];
        }

        if (!customer) {
            customer = await stripe.customers.create({
                email,
                metadata: { userId },
            });
        }

        const subscription = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [{ price: priceId, quantity: 1 }],
            customer: customer.id,
            success_url: `${public_domain}/documents?`,
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
