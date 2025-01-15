import Link from "next/link";
import { redirect } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "~/components/ui/card";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import HistoryComponent from "../HistoryComponent";

export default async function RecentActivity() {

  const session = await getServerAuthSession()
  if(!session?.user) redirect('/')
  const userId = session.user.id

  const games_count = await db.game.count({where: {userId}})

    return <Card className="col-span-4 lg:col-span-3 z-20">
           <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <Link href="/history">Recent Activity</Link>
        </CardTitle>
        <CardDescription className="text-base">
          You have played a total of {games_count} quizzes.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[600px] overflow-y-scroll scrollbar">
          <HistoryComponent limit={10} userId={userId}/>
      </CardContent>
    </Card>
}