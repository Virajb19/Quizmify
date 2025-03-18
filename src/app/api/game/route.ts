import { NextRequest, NextResponse } from "next/server";
import { quizCreationSchema } from "~/lib/zod";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { getQuestions } from "~/lib/getQuestions";

// type Question = {
//   question: string,
//   answer: string
//   options?: string[]
// }

export async function POST(req: NextRequest) {
    try {

        const session = await getServerAuthSession()
        if(!session?.user) return NextResponse.json({msg: 'Unauthorized'}, {status: 401})
        const userId = session.user.id
    
        const parsedData = await quizCreationSchema.safeParseAsync(await req.json())
        if(!parsedData.success) return NextResponse.json({msg: 'Invalid inputs', errors: parsedData.error.flatten().fieldErrors}, {status: 400})
        const {topic, type, amount, level} = parsedData.data  

        // await new Promise(r => setTimeout(r,9000))

        // getQuestions must be called before creating a game in DB
        const questions = await getQuestions(topic,amount,type,level)

        const game = await db.game.create({data: {topic,gameType: type,timeStarted: new Date(),level,userId}})
        await db.topic_count.upsert({create: {topic,count: 1}, where: {topic}, update: { count: { increment: 1}}})

        await db.question.createMany({
            data: questions.map((question) => {

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
        console.error('Error creating the game',err)
        return NextResponse.json({msg: 'Error creating the game'}, { status: 500})
    }
}

export async function GET(req: NextRequest) {
   try{

    const session = await getServerAuthSession()
    if(!session?.user) return NextResponse.json({msg: 'Unauthorized'}, {status: 401})

    const url = new URL(req.url)
    const gameId = url.searchParams.get('gameID')
    if(!gameId) return NextResponse.json({msg: 'Provide a game id'}, {status: 400})

    const game = db.game.findUnique({where: {id: gameId}, include: {questions: true}})
    if(!game) return NextResponse.json({msg: 'Game not found'}, {status: 404})

    return NextResponse.json({game}, {status: 200})

   } catch(err) {
      console.error('Error getting the game',err)
      return NextResponse.json({msg: 'Error getting game'}, {status: 500})
   }
}