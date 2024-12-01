import { redirect } from "next/navigation"
import HistoryComponent from "~/components/HistoryComponent"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { getServerAuthSession } from "~/server/auth"
import { db } from "~/server/db"
import { LucideLayoutDashboard } from "lucide-react";
import Link from "next/link"

export default async function HistoryPage() {

   const session = await getServerAuthSession()
   if(!session?.user) redirect('/')
   const userId = session.user.id

   const user = await db.user.findFirst({where: {OauthId: userId}})

    return <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[90%] sm:w-1/2 lg:w-1/3 max-w-4xl">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-bold text-2xl mb:text-xl">History</CardTitle>
                    <Link href={'/dashboard'} className="flex items-center gap-1 font-semibold mb:text-xs bg-black text-white dark:bg-white dark:text-black p-2 rounded-lg">
                        <LucideLayoutDashboard strokeWidth={3}/>
                        Back to Dashboard
                </Link>
                </CardHeader>
                <CardContent className="max-h-[60vh] overflow-y-scroll scrollbar">
                   <HistoryComponent limit={100} userId={user?.id || parseInt(userId)}/>
                </CardContent>
            </Card>
        </div>
}