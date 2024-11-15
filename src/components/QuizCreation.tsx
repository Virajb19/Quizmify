'use client'

import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Separator } from "~/components/ui/separator"
import { useForm } from 'react-hook-form'
import { quizCreationSchema } from "~/lib/zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from "framer-motion";
import { BookOpen, CopyCheck, Loader2 } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Button } from "./ui/button";
import { twMerge } from "tailwind-merge";
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from "axios";
import { useToast } from "~/hooks/use-toast";
import { ToastAction } from "./ui/toast";
import { useRouter } from "nextjs-toploader/app";
import { toast as Toast } from 'sonner'
import { useRef } from "react";

type Input = z.infer<typeof quizCreationSchema>

export default function QuizCreation() {

  const { toast } = useToast()
  const router = useRouter()
  const buttonRef = useRef<HTMLButtonElement | null>(null)

   const form = useForm<Input>({
      resolver: zodResolver(quizCreationSchema),
      defaultValues: { topic: "", type: "mcq", amount: 3, level: "hard"}
   })

   const {mutate: getQuestions, isPending} = useMutation({
    mutationFn: async ({topic,type,amount,level}: Input) => {
        const res = await axios.post('/api/game', {topic,type,amount,level})
        return res.data
    }
   })

   function onSubmit(data: Input) {
      getQuestions(data,{
        onError: (error) => {
           if(error instanceof AxiosError) {
              if(error?.response?.status === 500 || error?.response?.status === 400) {
                  toast({title: 'Error', description: 'Something went wrong!!!. Try again',variant: 'destructive',
                    action: <ToastAction onClick={() => {
                       if(buttonRef.current) buttonRef.current.click()
                    }}  altText="Try again">Try again</ToastAction>})
              }
           }
        },
        onSuccess: ({gameId}: {gameId: string}) => {
             setTimeout(() => {
                if(form.getValues('type') === 'mcq') {
                    router.push(`/play/mcq/${gameId}`)
                } else {
                  router.push(`/play/open-ended/${gameId}`)
                }
             },1000)
           Toast.success('Successfully created the game')
        } 
      })
   }

   form.watch()

          return  <div className="relative w-full min-h-screen">
             <Card className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 mb:w-[90%]">
               <CardHeader className="flex-center">
                   <CardTitle className="text-2xl font-bold">Quiz Creation</CardTitle>
                   <CardDescription>Choose a topic</CardDescription>
                 </CardHeader>
                 <CardContent>

                   <Form {...form}>
                    <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>

                    <FormField  control={form.control} name="topic"
                   render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <input placeholder="Enter a topic" {...field} className="input-style"/>
                    </FormControl>
                    <FormDescription className="mb:text-[0.65rem]">
                      Please provide any topic you would like to be quizzed on
                      here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

                <FormField control={form.control} name="amount" 
                 render={({ field }) => (
                     <FormItem className="flex flex-col gap-1">
                        <FormLabel>Number of Questions</FormLabel>
                        <FormControl>
                           <input placeholder="How many questions?" type="number" min={1} max={10} className="input-style" {...field} onChange={e => form.setValue("amount", parseInt(e.target.value))} />
                        </FormControl>
                        <FormDescription className="mb:text-[0.65rem]">
                      You can choose how many questions you would like to be
                      quizzed on here.
                    </FormDescription>
                    <FormMessage />
                     </FormItem>
                 )}
                />

                        <FormField
                          control={form.control}
                          name="level"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Difficulty</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a verified email to display" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {['easy','medium','hard'].map((level) => {
                                       return <SelectItem key={level} value={level} className={twMerge(
                                           level === 'easy' && "focus:bg-green-700",
                                           level === 'medium' && "focus:bg-yellow-700",
                                           level === 'hard' && "focus:bg-red-700",
                                           "duration-200"
                                       )}>
                                        {level}
                                        </SelectItem>
                                  })}
                                </SelectContent>
                              </Select>
                              <FormDescription className="mb:text-[0.65rem]">
                                 Provide difficulty level
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />


                <div id="buttons" className="flex w-full justify-center">

                   <Button onClick={() => form.setValue('type','mcq')} variant={ form.getValues("type") === "mcq" ? "default" : "secondary"} type="button" className="rounded-none rounded-l-lg">
                     <CopyCheck className="ml-2 size-5"/> Multiple Choice
                     </Button>

                    <Separator orientation="vertical"/>

                   <Button onClick={() => form.setValue('type','open_ended')} variant={ form.getValues('type') === 'open_ended' ? "default" : "secondary"} type="button" className="rounded-none rounded-r-lg">
                     <BookOpen className="size-5"/> Open ended
                     </Button>

                </div>

                      <motion.button onKeyDown={(e: React.KeyboardEvent) => {
                        if(e.key === 'Enter' && buttonRef.current && !isPending) {
                            buttonRef.current.click()
                        }
                      }} 
                        ref={buttonRef} disabled={isPending} type="submit" whileHover={isPending ? {} : {scale: 1.05}} whileTap={isPending ? {} : {scale: 0.9}}
                        className={twMerge("border bg-black text-white cursor-pointer dark:bg-white dark:text-black rounded-lg text-lg font-semibold w-fit py-1 px-3 flex items-center gap-1 mx-auto mt-10", 
                        isPending && "opacity-50 cursor-not-allowed"
                      )}>
                        {isPending && <Loader2 className="animate-spin"/>} {isPending ? 'Please wait' : 'Submit'}
                    </motion.button>
                    
                    </form>
                    </Form>

                 </CardContent>
               </Card>
          </div>
}
