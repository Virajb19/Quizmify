import { NextRequest, NextResponse } from "next/server";
import { checkAnswerSchema } from "~/lib/zod";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export async function POST(req: NextRequest) {
  try{
    const session = await getServerAuthSession()
    if(!session?.user) return NextResponse.json({msg: 'Unauthorized'}, {status: 401})

    await new Promise(res => setTimeout(res,800))

    const parsedData = checkAnswerSchema.safeParse(await req.json())
    if(!parsedData.success) return NextResponse.json({msg: 'Invalid inputs', errors: parsedData.error.flatten().fieldErrors}, {status: 400})
    const { questionId, userAnswer} = parsedData.data

    const question = await db.question.findUnique({where: {id: questionId}})
    if(!question) return NextResponse.json({msg: 'Question not found'},{status: 404})
        
    await db.question.update({where: {id: question.id}, data: {userAnswer}})
    if(question.questionType === 'mcq') {
        const isCorrect = question.correctAnswer.toLowerCase().trim() === userAnswer.toLowerCase().trim()
        await db.question.update({where: {id: question.id}, data: {isCorrect}})

        return NextResponse.json({msg: 'Checked the answer', isCorrect},{status: 200})
    } else if(question.questionType === 'open_ended') {
      
    }

  } catch (err) {
    console.error(err)
    return NextResponse.json({msg: 'Error checking answer'}, {status: 500})
  }
}