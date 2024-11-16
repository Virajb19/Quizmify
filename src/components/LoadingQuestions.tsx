import Image from "next/image";
import { Progress } from "./ui/progress";
import { useEffect, useState } from "react";

const loadingTexts = [
    "Generating questions...",
    "Unleashing the power of curiosity...",
    "Diving deep into the ocean of questions..",
    "Harnessing the collective knowledge of the cosmos...",
    "Igniting the flame of wonder and exploration...",
  ];
  

export default function LoadingQuestions() {

    const [progess,setProgress] = useState(10)
    const [loadingText,setLoadingText] = useState(loadingTexts[0])

    useEffect(() => {
        const interval = setInterval(() => {
           const randomIdx = Math.floor(Math.random() * loadingTexts.length)
            setLoadingText(loadingTexts[randomIdx])
        },1500)

        return () => clearInterval(interval)
    },[])

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if(prev >= 97) return 97
                if(Math.random() < 0.1) return prev + 5
                return prev + 0.5
            })
        },100)
        
        return () => clearInterval(interval)
    },[])

    return <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex flex-col p-1 items-center gap-2 w-[90vw] md:w-[50vw]">
               <Image src={'/loading.gif'} width={400} height={400} alt="loading"/>
               <Progress value={progess}/>
               <h3 className="sm:text-2xl lg:text-3xl text-lg text-center w-full">{loadingText}</h3>
        </div>
}