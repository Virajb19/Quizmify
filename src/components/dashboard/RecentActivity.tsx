import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "~/components/ui/card";

export default function RecentActivity() {
    return <Card className="col-span-4 lg:col-span-3">
           <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <Link href="/history">Recent Activity</Link>
        </CardTitle>
        <CardDescription>
          You have played a total of quizzes.
        </CardDescription>
      </CardHeader>
    </Card>
}