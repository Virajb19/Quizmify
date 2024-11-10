import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { History } from 'lucide-react'

export default function HistoryCard() {
    return <Card className="hover:cursor-pointer hover:opacity-75 dark:hover:border-blue-600 duration-200">
         <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-3xl">History</CardTitle>
            <History size={20} strokeWidth={2.5} />
         </CardHeader>
         <CardContent>
            <p className="text-sm text-muted-foreground text-gray-600 dark:text-gray-400">View past quiz attemps</p>
         </CardContent>
    </Card>
}