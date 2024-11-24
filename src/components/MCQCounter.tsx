import { CheckCircle2, XCircle } from "lucide-react";

type Props = {
    correctAnswers: number,
    wrongAnswers: number
}

export default function MCQCounter({correctAnswers, wrongAnswers}: Props) {
    return <div className="flex p-1 gap-1 items-center border-2 rounded-lg">
            <CheckCircle2 color="green"/>
            <span className="text-[green] mx-1 sm:mx-3">{correctAnswers}</span>

            <span className="h-10 w-[0.01rem] bg-zinc-700"></span>

            <span className="text-[red] mx-1 sm:mx-3">{wrongAnswers}</span>
            <XCircle color="red"/>
        </div>
}