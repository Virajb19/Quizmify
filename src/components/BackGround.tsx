'use client'

import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export default function BackGround() {

    const { theme } = useTheme()
    const grid = theme === 'light' ? '/gridLight.svg' : '/grid.svg'

    const pathname = usePathname()
    if(pathname.includes('/statistics')) return null
    
  return <div className="absolute inset-x-0 top-20 bottom-0 flex-center">
       <img src={grid} alt="background" className="w-full h-full object-cover"/>
  </div>
}