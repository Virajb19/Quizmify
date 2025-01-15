'use server'

import { SignUpSchema } from "~/lib/zod"
import bcrypt from 'bcrypt'
import { db } from "~/server/db"
import { z } from 'zod'
import { getServerAuthSession } from "./auth"

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