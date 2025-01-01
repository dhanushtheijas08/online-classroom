import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Analytics } from "@/components/classroom/analytics/analytics";
import { QuizzesTab } from "@/components/classroom/quiz/quiz-tab";
import { StudentsTab } from "@/components/classroom/students/students-tab";
import { RecentQuizzes } from "@/components/classroom/quiz/recent-quiz";
import { StudentsList } from "@/components/classroom/students/students-list";

interface PageProps {
  params: {
    classroomId: string;
  };
}

export default async function ClassroomPage({ params }: PageProps) {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Classroom Dashboard
        </h1>
        <p className="text-muted-foreground">
          View classroom analytics, recent quizzes, and manage students
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">
                  +2.5% from last quiz
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Quizzes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">3 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">
                  +4% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Quizzes</CardTitle>
                <CardDescription>
                  Latest quiz activities in your classroom
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentQuizzes classroomId={params.classroomId} />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Students</CardTitle>
                <CardDescription>
                  Students with highest average scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StudentsList classroomId={params.classroomId} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quizzes">
          <QuizzesTab classroomId={params.classroomId} />
        </TabsContent>

        <TabsContent value="students">
          <StudentsTab classroomId={params.classroomId} />
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analytics</CardTitle>
              <CardDescription>
                View detailed performance metrics and trends
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Analytics classroomId={params.classroomId} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
