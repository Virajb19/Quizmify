'use client'

import {motion} from 'framer-motion'
import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signup } from '~/actions/signup' 
import { toast } from 'sonner'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import Link from 'next/link';
import { useSession } from 'next-auth/react'
import GithubSignInButton from '~/components/GithubSignInButton'
import { z } from 'zod'
import { signUpSchema } from '~/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import GoogleSignInButton from '~/components/GoogleSignInButton'
 
// type SignUpData =  {
//     username: string,
//     email: string,
//     password: string
// }

type SignUpData = z.infer<typeof signUpSchema>

type Error = {
  username?: string[] | undefined;
  email?: string[] | undefined;
  password?: string[] | undefined;
} | undefined

export default function Signup() { 

  const session = useSession()
 if(session?.data) {
     redirect('/')
 }

  const {register, handleSubmit,formState: {errors, isValid}, setError: seterror} = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema)
  })

  const [error,setError] = useState<Error>(undefined)

  const router = useRouter()

  async function onSubmit(data: SignUpData) {
    // alert('submitted')
   const result = await signup(data)
    if(!result?.success && result?.errors) {
       setError(result?.errors) 
    } else if(!result?.success && result?.error) {
       toast.error(result?.error)
    } else {
        toast.success(result?.msg)
        router.push('/signin')
    }

  }

    return <main className="w-full min-h-screen flex-center">
               <div id="signup" className="flex flex-col p-2 gap-1 rounded-xl items-center w-[90%] md:w-1/2 lg:w-[30%] py-5 border dark:bg-card">
                     <h2 className="text-center mb:text-5xl tb:text-6xl mb-2">Sign up</h2>
                     <form className="flex flex-col p-1 gap-1 w-3/4 mb:w-full items-center" onSubmit={handleSubmit(onSubmit)}>
                           <Input text='username' register={register} errors={error?.username || [errors?.username?.message || ""]}/>
                           <Input text='email' register={register} errors={error?.email || [errors?.email?.message || ""]}/>
                           <Input text='password' register={register} errors={error?.password || [errors?.password?.message || ""]}/>
                            <motion.button type='submit' whileHover={{scale: 1.05}} whileTap={{scale: 0.9}} 
                            className="px-7 py-2 bg-white text-black font-bold rounded-full border border-zinc-700 cursor-pointer">Sign up</motion.button>
                     </form>

                     <div className="flex p-1 gap-5 items-center w-3/4 justify-around mt-1">
                         <div className="grow w-10 h-[0.05rem] bg-zinc-600"></div>
                         <h3 className="text-gray-600 text-sm">Or</h3>
                         <div className="grow w-10 h-[0.05rem] bg-zinc-600"></div>
                   </div>
           
                   <GithubSignInButton text="Sign up with Github"/>
                   <GoogleSignInButton text='Sign up with Google'/>

                     <div className='flex p-1 gap-1 text-sm'>
                       <p>Already has an account ?</p>
                       <Link className='text-blue-500 hover:underline hover:underline-offset-2' href='/signin'>Sign in</Link>
                     </div>
               </div>
        </main>
}

function Input({text, register, errors}: {text: string, register: any, errors: string[] | undefined}) {

  const [showPassword,setShowPassword] = useState(false)

    return <div className="relative flex flex-col p-1 gap-1 w-full"> 
      <input {...register(`${text}`)} type={text === 'password' ? (showPassword ? 'text' : 'password') : 'text'} placeholder={text} className="outline-none px-4 py-2 bg-transparent rounded-xl border focus:ring-2 focus:ring-blue-600 focus:border-transparent duration-200" />
      {text === 'password' && <span onClick={() => setShowPassword(!showPassword)} className='absolute p-2 right-2 top-2 cursor-pointer rounded-lg hover:bg-zinc-800 duration-200 text-white'>{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}</span>}
     {errors && 
       <div className='text-red-500 text-left flex flex-col p-1 gap-1 text-sm'>
             {errors?.map((err,i) => {
                return <span key={i}>{err}</span>
             })}
        </div>}
     </div>
}