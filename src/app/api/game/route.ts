import { NextRequest, NextResponse } from "next/server";
import { quizCreationSchema } from "~/lib/zod";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { getQuestions } from "~/lib/getQuestions";

type Question = {
  question: string,
  answer: string
  options?: string[]
}


export async function POST(req: NextRequest) {
    try {

        const session = await getServerAuthSession()
        if(!session?.user) return NextResponse.json({msg: 'Unauthorized'}, {status: 401})
        const userId = session.user.id

         // OR FIND USER WITH ID OR: [{OAUTH}, {ID}] JUST USE user.id
        const user = await db.user.findFirst({where: {OauthId: userId, OauthProvider: { in: ['GITHUB','GOOGLE']}}})
        // if(!user) return

        await new Promise(res => setTimeout(res,5000))

        const parsedData = await quizCreationSchema.safeParseAsync(await req.json())
        if(!parsedData.success) return NextResponse.json({msg: 'Invalid inputs', errors: parsedData.error.flatten().fieldErrors}, {status: 400})
        const {topic, type, amount, level} = parsedData.data  

        const game = await db.game.create({data: {topic,gameType: type,timeStarted: new Date(),level,userId: user?.id || parseInt(userId)}})
        await db.topic_count.upsert({create: {topic,count: 1}, where: {topic}, update: { count: { increment: 1}}})

        const questions = await getQuestions(topic,amount,type,level)

        await db.question.createMany({
            data: questions.map((question: Question) => {

                if(question.options) {
                    question.options.sort(() => Math.random() - 0.5)
                }

                return {
                    question: question.question,
                    questionType: type,
                    correctAnswer: question.answer,
                    options: question.options || [],
                    gameId: game.id
                }
            })
        })

        return NextResponse.json({msg: 'Quiz game generated successfully',gameId: game.id}, {status: 200})

    } catch(err) {
        console.error(err)
        return NextResponse.json({msg: 'Error creating the game'}, { status: 500})
    }
}

export async function GET() {

}