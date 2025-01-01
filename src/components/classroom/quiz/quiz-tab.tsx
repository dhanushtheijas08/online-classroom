import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/db";
import { Question, QuestionType, Quiz } from "@prisma/client";
import { Brain, Clock, PlusCircle, Users, Wand2 } from "lucide-react";
import Link from "next/link";

interface QuizzesTabProps {
  classroomId: string;
}

export async function QuizzesTab({ classroomId }: QuizzesTabProps) {
  const quiz = await prisma.quiz.findMany({
    where: { classId: classroomId },
    include: { questions: true, Response: true },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quizzes</h2>
          <p className="text-muted-foreground">
            Create and manage your classroom quizzes
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Quiz
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create New Quiz</DialogTitle>
              <DialogDescription>
                Create a new quiz for your students. You can add questions
                manually or generate them using AI.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 md:grid-cols-2">
              <Link href={`/quiz/manual?classroomId=${classroomId}`}>
                <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <PlusCircle className="h-10 w-10 text-primary" />
                    <CardTitle className="text-2xl">Manual Creation</CardTitle>
                    <CardDescription>
                      Create a quiz by adding questions manually
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Perfect for customized quizzes tailored to your specific
                      needs. Add multiple-choice questions, set correct answers,
                      and assign point values.
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href={`/quiz/ai-generated?classroomId=${classroomId}`}>
                <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <Wand2 className="h-10 w-10 text-primary" />
                    <CardTitle className="text-2xl">AI Generation</CardTitle>
                    <CardDescription>
                      Generate a quiz using AI assistance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Quickly create quizzes by providing a topic and letting
                      our AI generate relevant questions. Review and edit the
                      generated quiz before finalizing.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Quizzes
            </CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Duration
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 min</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Attempts
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Quizzes</CardTitle>
          <CardDescription>
            View and manage all your classroom quizzes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="space-y-4">
              {quiz
                .filter(
                  (quiz) =>
                    quiz.startsAt.getTime() <= Date.now() &&
                    quiz.endsAt.getTime() >= Date.now()
                )
                .map((quiz) => (
                  <QuizCard
                    key={quiz.id}
                    quiz={quiz}
                    totalQuestions={quiz.questions.length}
                  />
                ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {quiz
                .filter((quiz) => quiz.endsAt.getTime() < Date.now())
                .map((quiz) => (
                  <QuizCard
                    key={quiz.id}
                    quiz={quiz}
                    totalQuestions={quiz.questions.length}
                  />
                ))}
            </TabsContent>

            <TabsContent value="draft" className="space-y-4">
              {quiz
                .filter((quiz) => quiz.startsAt.getTime() > Date.now())
                .map((quiz) => (
                  <QuizCard
                    key={quiz.id}
                    quiz={quiz}
                    totalQuestions={quiz.questions.length}
                  />
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function QuizCard({
  quiz,
  totalQuestions,
}: {
  quiz: Quiz;
  totalQuestions: number;
}) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div className="space-y-1">
          <h3 className="font-medium">{quiz.title}</h3>
          <div className="text-sm text-muted-foreground">
            {totalQuestions} questions · {quiz.totalDuration} minutes
          </div>
        </div>
        <div className="space-y-1 text-right">
          {/* <div className="text-sm text-muted-foreground">
            {quiz.attempts} attempts
          </div>
          <div className="font-medium">{quiz.averageScore}% avg. score</div> */}
        </div>
      </CardContent>
    </Card>
  );
}
