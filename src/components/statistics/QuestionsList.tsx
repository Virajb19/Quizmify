import { Question } from "@prisma/client";
import { twMerge } from "tailwind-merge";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "~/components/ui/table";

export default function QuestionsList({questions}: { questions: Question[]}) {
    return <Table className="border border-blue-700 mt-4">
     <TableCaption>End of list.</TableCaption>
     <TableHeader>
          <TableHead className="w-[10px]">No.</TableHead>
          <TableHead>Question</TableHead>
          <TableHead>Correct Answer</TableHead>
          <TableHead>Your Answer</TableHead>
     </TableHeader>
     <TableBody>
         <>
           {questions.map(({correctAnswer, question, questionType,userAnswer, percentageCorrect, isCorrect}, i) => {
             return <TableRow key={i}>
                   <TableCell className="font-medium">{i + 1} .</TableCell>
                   <TableCell>
                     {question} <br />
                   </TableCell>
                   <TableCell>
                     <span className="opacity-60 font-semibold">{correctAnswer}</span>
                   </TableCell>
                    {questionType === 'mcq' ? (
                       <TableCell className={twMerge(isCorrect ? 'text-green-700': 'text-red-700')}>
                            {userAnswer}
                       </TableCell>
                    ): (
                        <></>
                    )}
             </TableRow>
           })}
         </>
     </TableBody>
    </Table>
}