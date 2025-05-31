import { NextResponse } from "next/server";

export async function POST(req:Request) {
    
    try {
        const {email, userId, priceId} = await req.json()
    } catch (error) {

        return NextResponse.json("Something went wrong. Please try again.", {status: 500})
        
    }

}