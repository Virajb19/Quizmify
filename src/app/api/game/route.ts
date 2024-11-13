import { NextRequest, NextResponse } from "next/server";
import { quizCreationSchema } from "~/lib/zod";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";


export async function POST(req: NextRequest) {
    try {

        const session = await getServerAuthSession()
        if(!session?.user) return NextResponse.json({msg: 'Unauthorized'}, {status: 401})
        const userId = parseInt(session.user.id)

        const parsedData = quizCreationSchema.safeParse(await req.json())
        if(!parsedData.success) return NextResponse.json({msg: 'Invalid inputs', errors: parsedData.error.flatten().fieldErrors}, {status: 400})
        const {topic, type, amount, level} = parsedData.data     

        const game = await db.game.create({data: {topic,gameType: type,timeStarted: new Date(),level,userId}})
        await db.topic_count.upsert({create: {topic,count: 1}, where: {topic}, update: { count: { increment: 1}}})

    } catch(err) {
        console.error(err)
        return NextResponse.json({msg: 'Error creating the game'}, { status: 500})
    }
}