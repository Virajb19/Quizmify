import { redirect } from "next/navigation"
import HistoryCard from "~/components/HistoryCard"
import QuizMeCard from "~/components/QuizMeCard"
import { getServerAuthSession } from "~/server/auth"
import HotTopics from "./HotTopics"

export const metadata = {
    title: "Dashboard"
}

export default async function DashBoard() {

  const session = await getServerAuthSession()
  if(!session?.user) return redirect('/')

    return <main id="dashboard" className="px-8 py-24 mx-auto max-w-7xl">
                <h3 className="font-semibold tracking-tight">Dashboard</h3>
                <div id="cards" className="grid gap-4 mt-4 md:grid-cols-2">
                      <QuizMeCard />
                      <HistoryCard />
                </div>

                <div className="grid mt-4 gap-4 md:grid-cols-2 lg:grid-cols-7">
                   <HotTopics />
                </div>
        </main>
}