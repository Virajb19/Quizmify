import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Award, Trophy } from "lucide-react";

export default function ResultsCard({accuracy}: {accuracy: number}) {
    return <Card className="md:col-span-5 col-span-10">
        <CardHeader>
            <CardTitle className="flex gap-1 items-center text-xl sm:text-2xl"> Results <Award /> </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row justify-between items-center">
           {accuracy > 75 ? (
            <>
            <Trophy size={50} stroke="gold"/>
            <div className="flex flex-col text-2xl md:text-4xl font-semibold text-yellow-400">
             <span>!Impressive</span>
             <span className="text-sm md:text-lg opacity-50">{"> 75% Accuracy"}</span>
            </div>
            </>
           ): accuracy > 25 ? (
            <>
            <Trophy size={50} stroke="silver"/>
            <div className="flex flex-col text-2xl md:text-4xl font-semibold text-stone-400">
             <span>!Good Job</span>
             <span className="text-sm md:text-lg opacity-50">{"> 25% Accuracy"}</span>
            </div>
            </>
           ): (
            <>
            <Trophy size={50} stroke="brown"/>
            <div className="flex flex-col text-2xl md:text-4xl font-semibold text-yellow-800">
             <span>!Nice Try</span>
             <span className="text-sm md:text-lg opacity-50">{"< 25% Accuracy"}</span>
            </div>
            </>
           )}
        </CardContent>
    </Card>
}