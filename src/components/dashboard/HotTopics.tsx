import CustomWordCloud from "~/components/CustomWordCloud";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { db } from "~/server/db";

export default async function HotTopics() {

    const topics = await db.topic_count.findMany({})

    const formattedTopics = topics.map((topic) => {
        return {text: topic.topic, value: topic.count}
    })

    return <Card className="col-span-4 z-20">
         <CardHeader>
            <CardTitle className="text-3xl">Hot Topics</CardTitle>
            <CardDescription className="text-base">Click on a topic to start a quiz on it.</CardDescription>
         </CardHeader>
         <CardContent className="pl-2">
             <CustomWordCloud formattedTopics={formattedTopics}/>
         </CardContent>
    </Card>
}