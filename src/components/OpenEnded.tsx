'use client'

import { Game, Question } from "@prisma/client";

type Props = { game: Game & { questions: Pick<Question, "id" | "options" | "question">[] }}  

export default function OpenEnded({game}: Props) {
    return <main className="flex-center w-full min-h-screen">
               Open Ended
               {/* <pre>{JSON.stringify(game,null,2)}</pre> */}
        </main>
}