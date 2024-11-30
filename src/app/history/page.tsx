import { redirect } from "next/navigation"
import { getServerAuthSession } from "~/server/auth"

export default async function HistoryPage() {

   const session = await getServerAuthSession()
   if(!session?.user) redirect('/')

    return <main className="w-full min-h-screen flex-center">
            History 
        </main>
}