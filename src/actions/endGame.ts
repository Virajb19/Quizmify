'use server'

import { getServerAuthSession } from "~/server/auth"
import { db } from "~/server/db"

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