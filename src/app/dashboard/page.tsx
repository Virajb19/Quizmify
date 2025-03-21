import { redirect } from "next/navigation"
import HotTopics from "~/components/dashboard/HotTopics"
import RecentActivity from "~/components/dashboard/RecentActivity"
import HistoryCard from "~/components/HistoryCard"
import QuizMeCard from "~/components/QuizMeCard"
import { getServerAuthSession } from "~/server/auth"

export const metadata = {
    title: "Dashboard"
}

export default async function DashBoard() {

  const session = await getServerAuthSession()
  if(!session?.user) return redirect('/')

    return <main id="dashboard" className="px-4 sm:px-8 py-24 mx-auto max-w-7xl z-30">
                <h3 className="font-semibold tracking-tight">Dashboard</h3>
                <div id="cards" className="grid gap-4 mt-4 md:grid-cols-2">
                      <QuizMeCard />
                      <HistoryCard />
                </div>

                <div className="grid mt-4 gap-4 md:grid-cols-2 lg:grid-cols-7">
                   <HotTopics />
                   <RecentActivity />
                </div>
        </main>
}