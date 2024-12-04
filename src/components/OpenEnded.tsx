'use client'

import { Game, Question } from "@prisma/client";
import { differenceInSeconds } from "date-fns";
import { ArrowRightToLine, BarChart, Loader2, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "~/hooks/use-toast";
import { cn, formatTimeDelta } from "~/lib/utils";
import OpenEndedPercentage from "./OpenEndedPercentage";
import { motion } from 'framer-motion'
import { twMerge } from "tailwind-merge";
import { Button, buttonVariants } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import BlankAnswerInput from "./BlankAnswerInput";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { endGame } from "~/actions/endGame";

type Props = { game: Game & { questions: Pick<Question, "id" | "correctAnswer" | "question">[] }}  

export default function OpenEnded({game}: Props) {

    const { toast: Toast } = useToast()

    const [quesIdx, setQuesIdx] = useState<number>(0)
    const [hasEnded,setHasEnded] = useState(false)
    const [now, setNow] = useState(new Date())

    const [blankAnswer, setBlankAnswer] = useState("")
    const [averagePercentage, setAveragePercentage] = useState(0)

    const [isChecking,setIsChecking] = useState<boolean>(false)

    const currentQuestion = game.questions[quesIdx]

    async function handleNext() {
        let filledAnswer = blankAnswer
        document.querySelectorAll('#user-blank-input').forEach((Input) => {

            const input = Input as HTMLInputElement
            filledAnswer = filledAnswer.replace('_____', input.value)
            input.value = ""
        })

        try {
        setIsChecking(true)
         const { data: { percentageSimilar }} = await axios.post('/api/checkAnswer', {questionId: currentQuestion?.id, userAnswer: filledAnswer})
         Toast({title: `Your answer is ${percentageSimilar}% similar to correct answer`, variant: 'success'})
          setAveragePercentage(prev => {
            return ( prev + percentageSimilar) / (quesIdx + 1)
          })

        } catch(err) {
           if(err instanceof AxiosError) {
             toast.error(err.response?.data.msg, { position: 'bottom-right'})
             return
           }
        } finally {
           setIsChecking(false)
        }
      
        if(quesIdx === game.questions.length - 1) {
            await endGame(game.id)
            setHasEnded(true)
            return
        }

        setQuesIdx(prev => prev + 1)
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          const key = event.key;
          if (key === "Enter") {
            handleNext();
          }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
      }, [handleNext]);

    useEffect(() => {
      let interval: NodeJS.Timeout | null = null
        if (!hasEnded) {
           interval = setInterval(() => {
            setNow((prev) => new Date())
          }, 1000)
        }
        return () => {
          if(interval) clearInterval(interval)
        }
      }, [hasEnded]);

    if(hasEnded) {
        return <div className="absolute flex flex-col gap-1 items-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
             <div className="border px-4 py-2 font-semibold text-white text-lg sm:text-2xl bg-green-800 rounded-md whitespace-nowrap">
                You Completed in {" "}
                {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
             </div>
             <Link href={`/statistics/${game.id}`} className={cn(buttonVariants(), "mt-2 dark:font-semibold text-xl")}> 
             View Statistics <BarChart className="size-4" strokeWidth={4}/>
           </Link>
        </div>
     }

    return <div className="flex-center w-full min-h-screen">
               <div className="flex flex-col gap-1 p-1 w-[90vw] md:w-[80vw] lg:w-1/2 max-w-5xl mb:text-sm">
               <div className="flex justify-between">
                   <div id="timer" className="flex flex-col gap-1">
                        <p className="flex flex-wrap justify-start gap-2">
                            <span className="dark:text-slate-400">Topic</span>
                            <span className="bg-black dark:bg-white dark:text-black dark:font-semibold rounded-lg px-2 py-1 text-white">{game.topic}</span>
                        </p>
                        <div className="flex gap-1 text-slate-400 mt-2 items-center">
                            <Timer />
                            {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
                        </div>
                   </div>
                        <OpenEndedPercentage percentage={averagePercentage}/>
                </div>

                <Card className="w-full mt-1">
                   <CardHeader className="flex flex-row gap-1 items-center">
                      <CardTitle className="flex flex-col items-center gap-1 w-fit">
                          <span className="border-b-2 border-zinc-600">Q.{quesIdx + 1}</span>
                          <span className="text-slate-500">{game.questions.length}</span>
                      </CardTitle>
                      <CardDescription className="mb:w-full">{currentQuestion?.question}</CardDescription>
                   </CardHeader>
                </Card>

                 <BlankAnswerInput answer={currentQuestion?.correctAnswer as string} setBlankAnswer={setBlankAnswer}/>

                <motion.div whileHover={isChecking ? {} : {scale: 1.05}} whileTap={isChecking ? {} : {scale: 0.9}} className={twMerge('group', isChecking && "cursor-not-allowed")}>
                <Button disabled={isChecking || hasEnded} variant={'default'} onClick={handleNext} 
                 className={twMerge("mx-auto flex items-center font-bold mt-2", isChecking && "opacity-50")}>
                {isChecking && <Loader2 className="animate-spin"/>} {isChecking ? 'Checking...' : 'Next'}
                {!isChecking && <ArrowRightToLine strokeWidth={3} className="size-4 group-hover:translate-x-1 duration-200"/>}
                </Button>
                </motion.div>

               </div>
        </div>
}