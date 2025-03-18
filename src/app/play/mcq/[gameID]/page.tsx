import { notFound, redirect } from "next/navigation"
import MCQ from "~/components/MCQ"
import { getServerAuthSession } from "~/server/auth"
import { db } from "~/server/db"

export default async function MCQpage({params: {gameID}}: {params: {gameID: string}}) {

    const session = await getServerAuthSession()
    if(!session?.user) redirect('/')

    const game = await db.game.findUnique({where: {id: gameID, userId: session.user.id}, include: {questions: {select: {id: true, question: true, options: true}}}})

    if(!game || game.gameType === 'open_ended') return notFound()

    if(game.timeEnded) return redirect('/quiz')

    return <MCQ game={game}/>

}