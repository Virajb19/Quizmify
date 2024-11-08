import { getServerAuthSession } from "~/server/auth"
import UserAccountNav from "./UserAccountNav"
import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"

export default async function Navbar() {

    const session = await getServerAuthSession()

    console.log('in Navbar.tsx',session)

    return <nav className="absolute top-0 inset-x-0 flex justify-between items-center px-1 py-3 border-b border-zinc-700">
               <h3 className="text-xl font-medium border border-b-4 border-r-4 hover:translate-y-1 translate-x-7 mb:translate-x-3 duration-200 border-green-600 w-fit px-3 py-1 rounded-lg">Quizmify</h3>
               <div id="usericon" className="flex p-1 gap-2 items-center">
                <ThemeToggle />
               { session?.user ? <UserAccountNav user={session?.user}/> : <button className="border px-2 py-1 rounded-lg mb:text-xs mr-5 mb:mr-1 hover:border-b-[2.5px] hover:border-r-[2.5px] hover:border-green-600 duration-100"><Link href="/signin">Sign in</Link></button>}
            </div>
        </nav>
}