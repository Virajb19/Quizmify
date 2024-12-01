import { Card } from "./ui/card";
import { Percent, Target } from "lucide-react";

export default function OpenEndedPercentage({percentage}: {percentage: number}) {
    return <Card className="flex flex-row gap-2 items-center p-1">
            <Target size={20}/>
            <span className="opacity-75">{percentage}</span>
            <Percent size={20}/>
        </Card>
}