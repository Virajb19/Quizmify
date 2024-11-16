import { redirect } from "next/navigation"
import QuizCreation from "~/components/forms/QuizCreation"
import { getServerAuthSession } from "~/server/auth"

export const metadata = { title: 'Quiz'}

export default async function QuizPage() {

  const session = await getServerAuthSession()
  if(!session?.user) return redirect('/')

    return <QuizCreation />
}