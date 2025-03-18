'use client'

import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function BackGround() {

    // theme is undefined initially
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    const pathname = usePathname()

    useEffect(() => {
      setMounted(true)
    }, [])

    if(!mounted || pathname.includes('/statistics')) return null

    const grid = theme === 'light' ? '/gridLight.svg' : '/grid.svg'
    
  return <div className="absolute inset-x-0 top-20 bottom-0 flex-center">
       <img src={grid} alt="background" className="w-full h-full object-cover"/>
  </div>
}