'use client'

import { Game, Question } from "@prisma/client";
import { useState } from "react";
import { useToast } from "~/hooks/use-toast";

type Props = { game: Game & { questions: Pick<Question, "id" | "options" | "question">[] }}  

export default function OpenEnded({game}: Props) {

    const { toast: Toast } = useToast()

    const [quesIdx, setQuesIdx] = useState<number>(0)
    const [hasEnded,setHasEnded] = useState(false)
    const [now, setNow] = useState(new Date());


    const currentQuestion = game.questions[quesIdx]

    return <div className="flex-center w-full min-h-screen">
               Open Ended
               {/* <pre>{JSON.stringify(game,null,2)}</pre> */}
        </div>
}