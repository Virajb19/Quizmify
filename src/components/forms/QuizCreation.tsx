'use client'

import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Separator } from "~/components/ui/separator"
import { useForm } from 'react-hook-form'
import { quizCreationSchema } from "~/lib/zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from "framer-motion";
import { BookOpen, CopyCheck, Loader2 } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Button } from "../ui/button";
import { twMerge } from "tailwind-merge";
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from "axios";
import { useToast } from "~/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { useRouter } from "nextjs-toploader/app";
import { toast as Toast } from 'sonner'
import { useRef, useState } from "react";
import LoadingQuestions from "../LoadingQuestions";

type Input = z.infer<typeof quizCreationSchema>

export default function QuizCreation() {

  const [showLoader, setShowLoader] = useState(false);
  const [finishedLoading, setFinishedLoading] = useState(false);
  // use isPending 

  const { toast } = useToast()
  const router = useRouter()
  const buttonRef = useRef<HTMLButtonElement | null>(null)

   const form = useForm<Input>({
      resolver: zodResolver(quizCreationSchema),
      defaultValues: { topic: "NextJS", type: "mcq", amount: 3, level: "hard"}
   })

   const {mutateAsync: createGame, isPending} = useMutation({
    mutationFn: async (data: Input) => {
        const res = await axios.post('/api/game', data)
        return res.data
    }
   })

  async function onSubmit(data: Input) {

    setShowLoader(true)

    const timer = setTimeout(() => {
        Toast.info('Please wait a little!!!', {duration: 2000})
    }, 2000 * 7);

     await createGame(data,{
        onError: (error) => {
          setShowLoader(false)
          clearTimeout(timer)
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
          setFinishedLoading(true)
          clearTimeout(timer)
          // await new Promise(res => setTimeout(res,2000))
             setTimeout(() => {
                if(form.getValues('type') === 'mcq') {
                    router.push(`/play/mcq/${gameId}`)
                } else {
                  router.push(`/play/open-ended/${gameId}`)
                }
             },2000)
           Toast.success('Successfully created the game', {position: 'bottom-right'})
        } 
      })
   }

   form.watch()

   if(showLoader) return <LoadingQuestions finished={finishedLoading}/>

          return  <div className="relative w-full min-h-screen flex-center overflow-hidden">
            <motion.div initial={{ scale: 0.86, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", bounce: 0.7 }} className="mb:absolute mb:left-5">

             <Card className="mb:w-[90%]">
               <CardHeader className="flex-center">
                   <CardTitle className="text-4xl font-bold">Quiz Creation</CardTitle>
                   <CardDescription className="text-xl">Choose a topic</CardDescription>
                 </CardHeader>
                 <CardContent>

                   <Form {...form}>
                    <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>

                    <FormField  control={form.control} name="topic"
                   render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-lg">Topic</FormLabel>
                    <FormControl>
                      <input placeholder="Enter a topic" {...field} className="input-style"/>
                    </FormControl>
                    <FormDescription className="mb:text-xs text-base">
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
                        <FormLabel className="text-lg">Number of Questions</FormLabel>
                        <FormControl>
                           <input placeholder="How many questions?" type="number" min={1} max={25} className="input-style" {...field} onChange={e => form.setValue("amount", parseInt(e.target.value))} />
                        </FormControl>
                        <FormDescription className="mb:text-xs text-base">
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
                              <FormLabel className="text-lg">Difficulty</FormLabel>
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
                              <FormDescription className="mb:text-sm text-base">
                                 Provide difficulty level
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />


                <div id="buttons" className="flex w-full justify-center">

                   <Button onClick={() => form.setValue('type','mcq')} variant={ form.getValues("type") === "mcq" ? "default" : "secondary"} type="button" className="rounded-none rounded-l-lg text-base font-semibold">
                     <CopyCheck className="ml-2 size-5"/> Multiple Choice
                     </Button>

                    <Separator orientation="vertical"/>

                   <Button onClick={() => form.setValue('type','open_ended')} variant={ form.getValues('type') === 'open_ended' ? "default" : "secondary"} type="button" className="rounded-none rounded-r-lg text-base">
                     <BookOpen className="size-5"/> Open ended
                     </Button>

                </div>

                      <motion.button onKeyDown={(e: React.KeyboardEvent) => {
                        if(e.key === 'Enter' && buttonRef.current && !isPending) {
                            buttonRef.current.click()
                        }
                      }} 
                        ref={buttonRef} disabled={form.formState.isSubmitting} type="submit" whileHover={isPending ? {} : {scale: 1.05}} whileTap={isPending ? {} : {scale: 0.9}}
                        className="bg-black text-white cursor-pointer dark:bg-white dark:text-black rounded-lg text-lg font-semibold w-fit py-1 px-3 flex items-center gap-2 mx-auto mt-10 disabled:opacity-60 disabled:cursor-not-allowed">
                        {form.formState.isSubmitting ? (
                            <>
                              <Loader2 className="animate-spin"/> Please wait
                            </>
                        ) : 'Submit'}
                    </motion.button>
                    
                    </form>
                    </Form>

                 </CardContent>
               </Card>
          </motion.div>
          </div>
}
