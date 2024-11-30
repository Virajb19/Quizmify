import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Hourglass } from "lucide-react";
import { formatTimeDelta } from "~/lib/utils";
import { differenceInSeconds } from "date-fns";

type Props = {
    timeEnded: Date;
    timeStarted: Date;
  }
  

export default function TimeTakenCard({timeEnded, timeStarted}: Props) {
    return <Card className="md:col-span-2 col-span-10">
        <CardHeader className="flex flex-row gap-2 items-center justify-between">
        <CardTitle className="font-semibold text-xl md:text-2xl">Time Taken</CardTitle>
        <Hourglass size={25}/>
        </CardHeader>
        <CardContent>
             <div className="text-xl sm:text-4xl">
               {formatTimeDelta(differenceInSeconds(timeEnded,timeStarted))}
             </div>
        </CardContent>
    </Card>
}