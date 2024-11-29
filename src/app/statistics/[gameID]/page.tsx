import Link from "next/link"
import { redirect } from "next/navigation"
import { buttonVariants } from "~/components/ui/button"
import { getServerAuthSession } from "~/server/auth"
import { db } from "~/server/db"
import { LucideLayoutDashboard } from 'lucide-react'
import { cn } from "~/lib/utils"
import ResultsCard from "~/components/statistics/ResultsCard"
import AccuracyCard from "~/components/statistics/AccuracyCard"
import TimeTakenCard from "~/components/statistics/TimeTakenCard"
import QuestionsList from "~/components/statistics/QuestionsList"

export default async function statisticsPage({params: {gameID}}: {params: {gameID: string}}) {

    const session = await getServerAuthSession()
    if(!session?.user) return redirect('/')

    const game = await db.game.findUnique({where: {id: gameID}, include: {questions: true}})
    if(!game) return redirect('/')

    let accuracy: number = 0

   if(game.gameType === 'mcq') {
    const totalCorrect = game.questions.reduce((acc,question) => {
         if(question.isCorrect) return acc + 1
         return acc
    },0)

    accuracy = ( totalCorrect / game.questions.length) * 100
 } else if(game.gameType === 'open_ended') {

 }

 accuracy = Math.round(accuracy * 100) / 100

    return <main className="w-full min-h-screen px-16 mb:px-2 py-24">
            <div className="flex justify-between items-center">
                <h2 className="font-bold tracking-tight mb:text-2xl">Summary</h2>
                <Link href={'/dashboard'} className="flex items-center gap-1 font-semibold mb:text-sm bg-black text-white dark:bg-white dark:text-black p-2 rounded-lg">
                <LucideLayoutDashboard strokeWidth={3}/>
                 Back to Dashboard
                </Link>
            </div>

            <div className="grid grid-cols-10 gap-4 mt-4">
                 <ResultsCard accuracy={accuracy}/>
                 <AccuracyCard accuracy={accuracy}/>
                 <TimeTakenCard timeEnded={new Date(game.timeEnded ?? 0)} timeStarted={new Date(game.timeStarted)}/>
            </div>
            
            <QuestionsList questions={game.questions}/>
        </main>
}