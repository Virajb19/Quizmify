import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export default async function HomePage() {

    return <main className="w-full min-h-screen flex-center dark:bg-black">
               <Card className="mb:w-[90%] w-[30%] tb:w-1/2">
                   <CardHeader>
                      <CardTitle className="text-xl">Welcome to Quizmify !</CardTitle>
                      <CardDescription>Quizmify is an quiz app that allows you to create and share quizzes with your friends</CardDescription>
                   </CardHeader>
                   <CardContent>

                   </CardContent>
               </Card>
        </main>
}