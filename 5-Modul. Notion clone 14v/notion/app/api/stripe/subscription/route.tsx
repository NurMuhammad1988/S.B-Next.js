import stripe from "@/lib/stirpe";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    
    try {
        const {email, userId, priceId} = await req.json()
        const isExistingCustomer  = await stripe.customers.list({email})//customers.list lib/stripe.tsdan keldi

        let customer;

    } catch (error) {

        return NextResponse.json("Something went wrong. Please try again.", {status: 500})
        
    }

}

