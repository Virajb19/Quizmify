'use client'

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { History } from 'lucide-react'
import { useRouter } from "nextjs-toploader/app";

export default function HistoryCard() {

   const router = useRouter()

    return <Card onClick={() => router.push('/history')} className="hover:cursor-pointer z-20 hover:opacity-75 hover:border-blue-600 border-2 duration-200">
         <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-3xl">History</CardTitle>
            <History size={20} strokeWidth={2.5} />
         </CardHeader>
         <CardContent>
            <p className="text-base text-muted-foreground text-gray-600 dark:text-gray-400">View past quiz attemps</p>
         </CardContent>
    </Card>
}