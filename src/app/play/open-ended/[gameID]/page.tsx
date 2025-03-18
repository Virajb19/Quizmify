import { notFound, redirect } from "next/navigation";
import OpenEnded from "~/components/OpenEnded";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export default async function OpenEndedPage({params: {gameID}}: {params: {gameID: string}}) {

    const session = await getServerAuthSession()
    if(!session?.user) redirect('/')

    const game = await db.game.findUnique({where: {id: gameID, userId: session.user.id}, include: {questions: {select: {id: true, question: true, correctAnswer: true}}}})

    if(!game || game.gameType === 'mcq') return notFound()

    if(game.timeEnded) return redirect('/quiz')

    return <OpenEnded game={game}/>
}