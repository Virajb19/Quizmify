'use client'

import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "~/components/ui/separator"
import { useForm } from 'react-hook-form'
import { quizCreationSchema } from "~/lib/zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from "framer-motion";
import { BookOpen, CopyCheck } from "lucide-react";
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
      alert('submitted')
   }

    return <main className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 border border-yellow-900">
               <Card className="border border-green-800">
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
                    <FormDescription className="text-xs">
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
                        <FormDescription>
                      You can choose how many questions you would like to be
                      quizzed on here.
                    </FormDescription>
                    <FormMessage />
                     </FormItem>
                 )}
                />

                <div className="flex justify-between gap-2">
                   <Button className="w-1/2">
                     <CopyCheck className="size-4"/> Multiple Choice
                     </Button>

                    <Separator orientation="vertical"/>

                   <Button className="w-1/2">
                     <BookOpen className="size-4"/> Open ended
                     </Button>
                </div>

                   
                      <motion.button type="submit"  whileHover={{scale: 1.05}} whileTap={{scale: 0.9}} 
                      className="border bg-black text-white dark:bg-white dark:text-black rounded-full font-semibold w-fit py-1 px-3 block mx-auto">Submit</motion.button>
                    
                    </form>
                    </Form>

                 </CardContent>
               </Card>
        </main>
}
