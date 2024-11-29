import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Target } from "lucide-react";

export default function AccuracyCard({accuracy}: {accuracy: number}) {
    return <Card className="md:col-span-3 col-span-10">
        <CardHeader>
         <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">Average Accuracy <Target /></CardTitle>
        </CardHeader>
        <CardContent>
        <div className="text-lg sm:text-3xl font-medium">{accuracy.toString() + "%"}</div>        
        </CardContent>
    </Card>
}