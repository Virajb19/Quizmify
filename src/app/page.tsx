import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { getServerAuthSession } from "~/server/auth";
import { ArrowRightIcon} from 'lucide-react'

export default async function HomePage() {

    const session = await getServerAuthSession()
    const isAuth = !!session?.user

    return <main className="w-full min-h-screen flex-center dark:bg-black">
               <Card className="mb:w-[90%] w-[30%] tb:w-1/2">
                   <CardHeader>
                      <CardTitle className="text-xl">Welcome to Quizmify !</CardTitle>
                      <CardDescription>Quizmify is an quiz app that allows you to create and share quizzes with your friends</CardDescription>
                   </CardHeader>
                   <CardContent>
                        <Link className="text-sm flex items-center px-3 py-2 gap-3 w-fit rounded-lg group bg-blue-900 text-white" href={isAuth ? '/dashboard': '/signup'}>{isAuth ? 'Go to dashboard' : 'Sign up to get started!'}<ArrowRightIcon className="size-5 group-hover:translate-x-2 duration-200"/></Link>
                   </CardContent>
               </Card>
        </main>
}