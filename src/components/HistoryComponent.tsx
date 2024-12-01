import { db } from "~/server/db"
import { Clock, CopyCheck, Edit2 } from "lucide-react";
import Link from "next/link";


export default async function HistoryComponent({limit, userId}: {limit: number, userId: number}) {

 const games = await db.game.findMany({take: limit, where: {userId}, orderBy: {timeStarted: 'desc'}})

 if(games.length === 0) return <h3 className="opacity-50">Create a Quiz</h3>

    return <div className="space-y-1">
               {games.map((game,i) => {
                return <div className="flex gap-7 p-1 items-center">
                     {game.gameType === 'mcq' ? <CopyCheck /> : <Edit2 />}
                     <div key={i} className="flex flex-col p-1 gap-2 items-start">
                         <Link className="text-sm font-semibold leading-none underline" href={`/statistics/${game.id}`}>{game.topic}</Link>
                         <span className="flex gap-1 items-center text-xs bg-slate-800 text-white p-1 rounded-lg">
                            <Clock className="size-5"/>
                            {new Date(game.timeEnded ?? 0).toLocaleDateString()}
                         </span>
                         <span className="text-xs text-muted-foreground">{game.gameType === 'mcq' ? 'Multiple Choice' : 'Open ended'}</span>
                     </div>
                </div>
               })}
        </div>
}