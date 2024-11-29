'use client'

import UserAccountNav from "./UserAccountNav"
import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'


export default function Navbar() { 

    const {data: session, status} = useSession()
    const isAuth = !!session

    const pathname = usePathname()

    return <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{duration: 0.5, type: 'spring', damping: 10, stiffness: 100}} 
              className="fixed top-0 inset-x-0 z-[999] flex justify-between items-center backdrop-blur-sm px-1 py-2 border-b border-zinc-700">

               <h3 className="text-xl font-bold tracking-wide border border-b-4 border-r-4 hover:translate-y-1 translate-x-7 mb:translate-x-3 duration-200 border-blue-800 w-fit px-3 py-1 rounded-lg">Quizmify</h3>
               
               <div id="usericon" className="flex p-1 gap-2 items-center mr-1 md:mr-10">
                <ThemeToggle />
               { !['/signin', '/signup'].includes(pathname) && 
               (status === 'loading' ? ( <Loader2 className="mr-1 md:mr-10 animate-spin"/>) : ( isAuth ? <UserAccountNav /> : <Link href={'/signin'} className="bg-blue-900 px-3 py-2 rounded-lg mb:text-sm mr-5 mb:mr-1 text-white">Sign in</Link>))}
            </div>

        </motion.nav>
}