import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function getQuestions(topic: string, amount: number, type: "mcq" | "open_ended", level: "easy" | "medium" | "hard") {
      try {
        let questions: any

        if (type === "open_ended") {
            questions = await generateQuestions(
              "You are a helpful AI that is able to generate a pair of question and answers, the length of each answer should not be more than 15 words, store all the pairs of answers and questions in a JSON array.Do not put quotation marks just a array of objects.",
               amount === 1 
               ? `Generate one open-ended question about ${topic} with ${level} difficulty. Only provide one question as a JSON array of one object.` 
               : `You are to generate a random open-ended ${amount} questions about ${topic} with ${level} difficulty`,
            )
          } else if(type === 'mcq') {
            questions = await generateQuestions(
              "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array",
              amount === 1 
              ? `You are to generate a random ${amount} single mcq question about ${topic} with 3 options only with ${level} difficulty` 
              : `You are to generate a random ${amount} mcq questions about ${topic} with 3 options only with ${level} difficulty`,
            )
          }
    
          return questions

      } catch(err) {
        console.error('Error getting questions',err)
      }
} 

export async function generateQuestions(system_prompt: string,user_prompt: string | string[]){
   try {

    const { text } = await generateText({
                temperature: 1,
                model: google('gemini-1.5-flash'),
                messages: [
                  {
                      role: 'user',
                      content: user_prompt.toString()
                  },
                  {
                      role: 'assistant',
                      content: system_prompt
                  }
                ],
          })
 
          const cleanData = text.replace(/```json\s*|\s*```/g, '').trim(); 
          const questions = JSON.parse(cleanData)
          return questions

   } catch(err) {
       console.error('Error generating questions', err)
   }
}

