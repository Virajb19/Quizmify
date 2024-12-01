'use client'

import { Game, Question } from "@prisma/client";
import { Timer, ArrowRightToLine, Loader2, BarChart  } from "lucide-react";
import { differenceInSeconds } from 'date-fns'
import { cn, formatTimeDelta } from '../lib/utils'
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import MCQCounter from "./MCQCounter";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { motion } from 'framer-motion'
import { useToast } from "~/hooks/use-toast";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { setInterval } from "timers";
import { endGame } from "~/actions/endGame";

type Props = { game: Game & { questions: Pick<Question, "id" | "options" | "question">[] }}  

export default function MCQ({game}: Props) {

    const { toast: Toast } = useToast()

    const [quesIdx, setQuesIdx] = useState<number>(0)
    const [selectedOption, setSelectedOption] = useState<number>(-1)
    const [correctAnswers,setCorrectAnswers] = useState(0)
    const [wrongAnswers,setWrongAnswers] = useState(0)
   //  const [stats, setStats] = useState({
   //    correct_answers: 0,
   //    wrong_answers: 0,
   //  })
    const [hasEnded,setHasEnded] = useState<boolean>(false)
    const [now,setNow] = useState(new Date())

    const [isChecking,setIsChecking] = useState<boolean>(false)

    const currentQuestion = game.questions[quesIdx]

    useEffect(() => {
      let interval: NodeJS.Timeout
      if(!hasEnded) {
         interval = setInterval(() => {
             setNow(new Date())
        },1000)
      }
      return () => clearInterval(interval)
    },[hasEnded])

    async function handleNext() {
            if(selectedOption === -1) {
                toast.error('Please select an option before proceeding!')
                return
            }
            try {
               setIsChecking(true)
              const { data : { isCorrect }} = await axios.post('/api/checkAnswer',{questionId: currentQuestion?.id, userAnswer: currentQuestion?.options[selectedOption]})
               if(isCorrect) {
                setCorrectAnswers(prev => prev + 1)
                Toast({title: 'Correct',description: 'You got it right!', variant: 'success'})
               }
               else {
                setWrongAnswers(prev => prev + 1)
                Toast({title: 'Incorrect',description: 'You got it wrong!', variant: 'destructive'})
               }

              } catch(error) {
                 if(error instanceof AxiosError){
                    toast.error('Something went wrong!!!')
                    return
                 }
              } finally {
                setIsChecking(false)
              }
            
            if(quesIdx === game.questions.length - 1) {
               const res = await endGame(game.id)
               setHasEnded(true)
               return
            }
            
            setQuesIdx(prev => prev + 1)
            setSelectedOption(-1)
          }

          useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
              const key = event.key;
        
              if (key === "1") {
                setSelectedOption(0);
              } else if (key === "2") {
                setSelectedOption(1);
              } else if (key === "3") {
                setSelectedOption(2);
              } else if (key === "Enter") {
                handleNext();
              }
            }
        
            document.addEventListener("keydown", handleKeyDown);
        
            return () => {
              document.removeEventListener("keydown", handleKeyDown);
            }
          }, [handleNext])
         
   if(hasEnded) {
      return <div className="absolute flex flex-col gap-1 items-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
           <div className="border px-4 py-2 font-semibold text-white text-xl sm:text-2xl bg-green-800 rounded-md whitespace-nowrap">
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
                        <MCQCounter correctAnswers={correctAnswers} wrongAnswers={wrongAnswers}/>
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
                <div id="options" className="flex flex-col gap-1 mt-2">
                    {currentQuestion?.options.map((option,i) => {
                          return <Button key={option} onClick={() => setSelectedOption(i)} variant={selectedOption === i ? 'default' : 'outline'} className="mb:text-xs py-8 mb-4 mb:mb-1">
                               <div className="flex items-center justify-start gap-2 w-full">
                                  <span className="px-3 py-2 border-2 font-bold rounded-md">{i + 1}</span>
                                  <p className="font-semibold text-wrap text-left">{option}</p>
                               </div>
                          </Button>
                    })}
                </div>

                <motion.div whileHover={isChecking ? {} : {scale: 1.05}} whileTap={isChecking ? {} : {scale: 0.9}} className={twMerge('group', isChecking && "cursor-not-allowed")}>
                <Button disabled={isChecking || hasEnded} variant={'default'} onClick={handleNext} 
                 className={twMerge("mx-auto flex items-center font-bold mt-1", isChecking && "opacity-50")}>
                {isChecking && <Loader2 className="animate-spin"/>} {isChecking ? 'Checking...' : 'Next'}
                {!isChecking && <ArrowRightToLine strokeWidth={3} className="size-4 group-hover:translate-x-1 duration-200"/>}
                </Button>
                </motion.div>

             </div>
        </div>
}