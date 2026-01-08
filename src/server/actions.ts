'use server'

import { SignUpSchema } from "~/lib/zod"
import bcrypt from 'bcrypt'
import { db } from "~/server/db"
import { z } from 'zod'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { getServerAuthSession } from "./auth"
import { groq } from "@ai-sdk/groq";
import { generateText } from "ai"

type formData = z.infer<typeof SignUpSchema>

export async function signup(formData: formData) {
 try {
    const parsedData = SignUpSchema.safeParse(formData)
    if(!parsedData.success) return {success: false, errors: parsedData.error.flatten().fieldErrors}
    const {username, email, password} = parsedData.data

    const userExists = await db.user.findFirst({where: {OR: [{email}, {username}]}})
    if(userExists) return {success: false, error: 'user already exists'}

    const hashedPassword = await bcrypt.hash(password,10)
    await db.user.create({data: {username,email,password: hashedPassword}})

    return {success: true, msg: 'Signed up successfully. Welcome to Quizmify !!!'}
} catch(e) {
    console.error(e)
    return {success: false, error: 'Something went wrong !'}
 }

}

export async function endGame(gameId: string) {
    try {

    const session = await getServerAuthSession()
    if(!session || !session.user) return { error: 'Unauthorized'}

    const game = await db.game.findUnique({where: {id: gameId}})
    if(!game) return {msg: 'Game not found'}

    await db.game.update({where: {id: game.id}, data: {timeEnded: new Date()}})

    return { msg: 'Game ended successfully'}

    } catch(err) {
        console.error('Error ending game',err)
        return {error: 'Error while ending game'}
    }
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash'
})

const responseSchema = z.enum(['yes', 'no'])

export async function validateWordWithGemini(topic: string): Promise<boolean> {
    try {
      const prompt = `Is '${topic}' a meaningFul topic to create a quiz on? Respond with 'yes' or 'no' only.`
      // const { response } = await model.generateContent([prompt])
      const { text } = await generateText({
      model: groq("llama-3.1-8b-instant") as any,
      temperature: 0, // important for deterministic yes/no
      messages: [
        {
          role: "system",
          content:
            'You are a strict validator. Respond with exactly "yes" or "no". Do not add any other text.',
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    })
      const answer = text.trim().toLowerCase()
      const result = responseSchema.safeParse(answer)
      if(!result.success) throw new Error('Invalid answer')
      return result.data === 'yes'
    } catch (error) {
      console.error('Error validating word with Gemini:', error)
      return false
    }
  }
  