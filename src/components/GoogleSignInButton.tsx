import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { signIn } from 'next-auth/react'
import { useState } from "react";
import { twMerge } from "tailwind-merge";


export default function GoogleSignInButton({text} : {text: string}) {

const [loading,setLoading] = useState(false)
    
  return (
    <motion.button
      id="google"
      onClick={() => {
        try {
          setLoading(true)
          signIn("google", { callbackUrl: "/" });
          toast.success("Signed in successfully");
        } catch (error) {
          toast.error("Something went wrong !!!");
          setLoading(false)
        }
      }}
      disabled={loading}
      whileHover={{ scale: 1.03 }}
      className={twMerge("flex-center gap-5 w-3/4 rounded-xl border px-4 py-2 mb:text-sm mb:w-[90%]", loading && "cursor-not-allowed text-zinc-600 border-zinc-600")}
    >
       {text}
      <FcGoogle className="size-7 text-blue-500" />
    </motion.button>
  );
}
