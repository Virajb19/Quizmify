'use client'

import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "~/components/ui/separator"
import { useForm } from 'react-hook-form'
import { quizCreationSchema } from "~/lib/zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from "framer-motion";
import { BookOpen, CopyCheck, Loader2 } from "lucide-react";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
 } from "~/components/ui/form";
import { Button } from "./ui/button";

type Input = z.infer<typeof quizCreationSchema>

export default function QuizCreation() {

   const form = useForm<Input>({
      resolver: zodResolver(quizCreationSchema),
      defaultValues: { topic: "", type: "mcq", amount: 3}
   })

   function onSubmit(data: Input) {
      alert(JSON.stringify(data))
   }

   form.watch()

    return <main className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 mb:w-[90%]">
               <Card>
               <CardHeader>
                   <CardTitle className="text-2xl font-bold">Quiz Creation</CardTitle>
                   <CardDescription>Choose a topic</CardDescription>
                 </CardHeader>
                 <CardContent>

                   <Form {...form}>
                    <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>

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

                <div id="buttons" className="flex w-full justify-center">

                   <Button onClick={() => form.setValue('type','mcq')} variant={ form.getValues("type") === "mcq" ? "default" : "secondary"} type="button" className="rounded-none rounded-l-lg">
                     <CopyCheck className="ml-2 size-5"/> Multiple Choice
                     </Button>

                    <Separator orientation="vertical"/>

                   <Button onClick={() => form.setValue('type','open_ended')} variant={ form.getValues('type') === 'open_ended' ? "default" : "secondary"} type="button" className="rounded-none rounded-r-lg">
                     <BookOpen className="size-5"/> Open ended
                     </Button>

                </div>

                   
                      <motion.button type="submit" whileHover={{scale: 1.07}} 
                      className="border bg-black text-white dark:bg-white dark:text-black rounded-lg text-lg font-semibold w-fit py-1 px-3 flex items-center gap-1 mx-auto"><Loader2 className="animate-spin"/>Submit</motion.button>
                    
                    </form>
                    </Form>

                 </CardContent>
               </Card>
        </main>
}
