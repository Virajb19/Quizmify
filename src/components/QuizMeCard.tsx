'use client'

import { useRouter } from "nextjs-toploader/app";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BrainCircuit } from 'lucide-react'

export default function QuizMeCard() {

  const router = useRouter()

    return <Card onClick={() => router.push('/quiz')} className="hover:cursor-pointer z-20 hover:opacity-75 hover:border-blue-600 border-2 duration-200">
        <CardHeader className="flex flex-row items-center justify-between">
         <CardTitle className="text-3xl">Quiz me!</CardTitle>
         <BrainCircuit size={20} strokeWidth={2.5} />
        </CardHeader>
        <CardContent>
          <p className="text-base text-muted-foreground text-gray-600 dark:text-gray-400">Challenge yourself with a quiz</p>
        </CardContent>
    </Card>
}