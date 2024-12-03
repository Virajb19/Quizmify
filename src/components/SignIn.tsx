'use client'

import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { signIn } from 'next-auth/react'
import { useRouter } from 'nextjs-toploader/app'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import GithubSignInButton from './GithubSignInButton'
import { signInSchema } from '~/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TriangleAlert } from 'lucide-react';


type SignInData =  {
    email: string,
    password: string
}

export default function SignIn() {

    const {register, handleSubmit, formState: {errors}} = useForm<SignInData>({
        // resolver: zodResolver(signInSchema)
    })

    const router = useRouter()

    const [loading,setLoading] = useState(false)

    async function OnSubmit(data: SignInData) {
        setLoading(true)
        const result = await signIn('credentials',{email: data.email, password: data.password, redirect: false})
        setLoading(false)
        if(!result?.error || result.ok) {
            toast.success('Signed in successfully')
            router.push('/')
        } else toast.error(result?.error, {duration: 3000})
    }
    
    return <main className="w-full min-h-screen flex-center">
               <div id="signup" className="flex flex-col p-2 gap-3 rounded-xl items-center w-[30%] mb:w-[90%] tb:w-1/2 py-5 border dark:bg-card">
                     <h2 className="text-center mb:text-5xl tb:text-6xl">Sign in</h2>
                     <form className="flex flex-col p-1 gap-3 w-3/4 mb:w-full items-center" onSubmit={handleSubmit(OnSubmit)}>
                           <Input text='email' register={register} error={errors.email?.message}/>
                           <Input text='password' register={register} error={errors.password?.message}/>
                            <motion.button disabled={loading} type='submit' whileHover={{scale: 1.05}} whileTap={{scale: 0.9}} 
                            className={twMerge("px-7 py-2 bg-white text-black font-bold rounded-full border border-zinc-700 cursor-pointer", loading && "cursor-not-allowed text-zinc-600")}>Sign in</motion.button>
                     </form>

                     <div className="flex p-1 gap-5 items-center w-3/4 justify-around mt-1">
                         <div className="grow w-10 h-[0.05rem] bg-zinc-600"></div>
                         <h3 className="text-gray-600 text-sm">Or</h3>
                         <div className="grow w-10 h-[0.05rem] bg-zinc-600"></div>
                   </div>
           
                   <GithubSignInButton text='Sign in with Github'/>

                     <div className='flex p-1 gap-1 text-sm'>
                         <p className=''>Don't have an account ?</p>
                         <Link className='text-blue-500 hover:underline hover:underline-offset-2 duration-100' href='/signup'>Sign up</Link>
                     </div>
               </div>
        </main>
}

function Input({text, register, error}: {text: string, register: any, error?: string}) {

    const [showPassword,setShowPassword] = useState(false)

    return <div className="relative flex flex-col p-1 gap-1 w-full"> 
      <input {...register(`${text}`)} type={text === 'password' ? (showPassword ? 'text' : 'password') : 'text'} placeholder={text} 
      className={twMerge("outline-none px-4 py-2 bg-transparent rounded-xl border focus:ring-2 focus:ring-blue-600 focus:border-transparent duration-200", error && "focus:ring-red-700 duration-200")} />
      {text === 'password' && <span onClick={() => setShowPassword(!showPassword)} className='absolute p-2 right-2 top-2 cursor-pointer rounded-lg hover:bg-zinc-800 duration-200 text-white'>{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}</span>}
      {error && <p className='text-red-700 text-sm mt-1 flex gap-1 items-center'><TriangleAlert />{error}</p>}
     </div>
}