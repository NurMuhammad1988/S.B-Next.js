import User from "@/database/user.model"
import { authOptions } from "@/lib/auth-options"
import { connectToDatabase } from "@/lib/mongoose"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function PUT(req:Request) {
    try {
        await connectToDatabase()
        const {currentUser}: any = await getServerSession(authOptions)
        const {userId} = await req.json()

        await User.findByIdAndUpdate()

    } catch (error) {

        const result = error as Error
        return NextResponse.json({error: result.message}, {status: 400})
        
    }
}