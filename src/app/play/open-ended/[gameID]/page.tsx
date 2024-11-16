import { redirect } from "next/navigation";
import OpenEnded from "~/components/OpenEnded";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export default async function OpenEndedPage({params: {gameID}}: {params: {gameID: string}}) {

    const session = await getServerAuthSession()
    if(!session?.user) redirect('/')

    const game = await db.game.findUnique({where: {id: gameID}, include: {questions: {select: {id: true, question: true, options: true}}}})

    if(!game || game.gameType === 'mcq') redirect('/quiz')

    return <OpenEnded game={game}/>
}