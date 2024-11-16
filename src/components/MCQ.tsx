'use client'

import { Game, Question } from "@prisma/client";

type Props = { game: Game & { questions: Pick<Question, "id" | "options" | "question">[] }}  

export default function MCQ({game}: Props) {
    return <main className="flex-center w-full min-h-screen">
           MCQ
        </main>
}