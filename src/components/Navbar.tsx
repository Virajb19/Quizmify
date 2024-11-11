'use client'

import UserAccountNav from "./UserAccountNav"
import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"

export default function Navbar() {

    const {data: session} = useSession()
    const isAuth = !!session

    const pathname = usePathname()
    if(['/signin', '/signup'].includes(pathname)) return null

    return <nav className="fixed top-0 inset-x-0 z-[999] flex justify-between items-center backdrop-blur-sm px-1 py-2 border-b border-zinc-700">
               <h3 className="text-xl font-bold tracking-wide border border-b-4 border-r-4 hover:translate-y-1 translate-x-7 mb:translate-x-3 duration-200 border-blue-800 w-fit px-3 py-1 rounded-lg">Quizmify</h3>
               <div id="usericon" className="flex p-1 gap-2 items-center">
                <ThemeToggle />
               { isAuth ? <UserAccountNav /> : <Link href={'/signin'} className="bg-blue-900 px-3 py-2 rounded-lg mb:text-sm mr-5 mb:mr-1 text-white">Sign in</Link>}
            </div>
        </nav>
}