import { NextRequest, NextResponse } from "next/server";
import { strict_output } from "~/lib/gpt";
import { quizCreationSchema } from "~/lib/zod";
import { getServerAuthSession } from "~/server/auth";

export async function POST(req: NextRequest) {
    try {

    const session = await getServerAuthSession()
    if(!session?.user) return NextResponse.json({msg: 'Unauthorized'}, {status: 401})

    const parsedData = quizCreationSchema.safeParse(await req.json())
    if(!parsedData.success) return NextResponse.json({msg: 'Invalid inputs', errors: parsedData.error.flatten().fieldErrors}, {status: 400})
    const {topic, type, amount, level} = parsedData.data
 
    let questions: any
    if (type === "open_ended") {
        questions = await strict_output(
          "You are a helpful AI that is able to generate a pair of question and answers, the length of each answer should not be more than 15 words, store all the pairs of answers and questions in a JSON array.Do not put quotation marks just a array of objects.",
            `You are to generate a random open-ended ${amount} questions about ${topic} with ${level} difficulty`,
        )
      } else if(type === 'mcq') {
        questions = await strict_output(
          "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array",
            `You are to generate a random hard ${amount} mcq questions about ${topic} with 3 options only`,
        )
      }


    return NextResponse.json({msg: 'Questions created successfully',questions},{ status: 200})

    } catch(error) {  
        console.error(error)
        return NextResponse.json({msg: 'An unexpected error occurred'}, {status: 500})
    }
}