'use client'

import { motion } from 'framer-motion'
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { FaGithub} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export const DemarcationLine = () => (
    <div className="flex items-center my-4">
      <div className="flex-grow h-px bg-gray-300" />
      <span className="px-4 text-sm text-gray-500">or continue with</span>
      <div className="flex-grow h-px bg-gray-300" />
    </div>
  )

export function OAuthButton({label, provider}: {label: string, provider: string}) {
    const [loading,setLoading] = useState(false)
    
  return (
    <motion.button
      onClick={() => {
        try {
          setLoading(true)
          signIn(provider, { callbackUrl: "/" });
          toast.success("Signed in successfully");
        } catch (error) {
          toast.error("Something went wrong !!!");
          setLoading(false)
        }
      }}
      disabled={loading}
      className={twMerge("flex-center gap-4 w-full sm:w-fit mx-auto rounded-xl px-4 py-2 mb-2 text-base border-[3px] dark:border-transparent disabled:cursor-not-allowed disabled:opacity-60",
        provider === 'github' ? 'bg-white/10' : 'bg-white text-black font-semibold'
      )}
    >
       {label}
       {provider === 'github' ? <FaGithub className='size-8'/> : <FcGoogle className='size-8'/>}

    </motion.button>
  )
}
  