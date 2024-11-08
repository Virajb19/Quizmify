import { FaGithub } from "react-icons/fa";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { signIn } from 'next-auth/react'
import { useState } from "react";
import { twMerge } from "tailwind-merge";


export default function GithubSignInButton() {

const [loading,setLoading] = useState(false)
    
  return (
    <motion.button
      id="github"
      onClick={async () => {
        try {
          setLoading(true)
          await signIn("github", { callbackUrl: "/" });
          toast.success("Signed in successfully");
        } catch (error) {
          toast.error("Something went wrong !!!");
          setLoading(false)
        }
      }}
      disabled={loading}
      whileHover={{ scale: 1.03 }}
      className={twMerge("flex-center gap-5 w-3/4 rounded-xl border px-4 py-2 mb:text-sm", loading && "cursor-not-allowed text-zinc-600 border-zinc-600")}
    >
      Sign in with Github
      <FaGithub className="size-7 text-green-500" />
    </motion.button>
  );
}
