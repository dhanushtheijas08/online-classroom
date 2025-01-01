"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart, Clock, FileText, Plus, Search, Users } from "lucide-react";

// Mock data for demonstration
const quizzes = [
  {
    id: 1,
    name: "Algebra Basics",
    status: "active",
    description: "Mathematics - Algebra",
    questions: 10,
    avgScore: 85,
  },
  {
    id: 2,
    name: "World History Quiz",
    status: "completed",
    description: "History - Ancient Civilizations",
    questions: 15,
    avgScore: 78,
  },
  {
    id: 3,
    name: "Chemistry Fundamentals",
    status: "active",
    description: "Science - Chemistry",
    questions: 20,
    avgScore: null,
  },
];

const QuizCard = ({ quiz }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex justify-between items-center">
        {quiz.name}
        <Badge variant={quiz.status === "active" ? "default" : "secondary"}>
          {quiz.status}
        </Badge>
      </CardTitle>
      <CardDescription>{quiz.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <FileText className="mr-2 h-4 w-4" />
          <span>{quiz.questions} questions</span>
        </div>
        {quiz.avgScore && (
          <div className="flex items-center">
            <BarChart className="mr-2 h-4 w-4" />
            <span>Avg. Score: {quiz.avgScore}%</span>
          </div>
        )}
      </div>
      <Button className="w-full mt-4">View Details</Button>
    </CardContent>
  </Card>
);

const QuestionList = () => (
  <ScrollArea className="h-[300px]">
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle className="text-sm">Question {i + 1}</CardTitle>
            <CardDescription>Multiple Choice | 5 points</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">What is the capital of France?</p>
            <div className="flex justify-end mt-2">
              <Button variant="outline" size="sm" className="mr-2">
                Edit
              </Button>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </ScrollArea>
);

const Analytics = () => (
  <div className="space-y-4">
    <Card>
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] bg-muted rounded-md flex items-center justify-center">
          <BarChart className="h-8 w-8 text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">
            Performance chart placeholder
          </span>
        </div>
      </CardContent>
    </Card>
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Completion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">85%</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Average Score</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">78%</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Pass Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">92%</p>
        </CardContent>
      </Card>
    </div>
  </div>
);

const QuizOverview = ({ quiz }) => (
  <Card className="mt-8">
    <CardHeader>
      <CardTitle>{quiz.name}</CardTitle>
      <CardDescription>{quiz.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="space-y-4 mt-4">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p>
                This quiz covers the fundamental concepts of Algebra, including
                linear equations, polynomials, and basic graphing.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Instructions</h3>
              <p>
                Answer all questions to the best of your ability. You may use a
                calculator for computational questions.
              </p>
            </div>
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold mb-2">Duration</h3>
                <p className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" /> 60 minutes
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Questions</h3>
                <p className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" /> {quiz.questions}{" "}
                  questions
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Attempts</h3>
                <p className="flex items-center">
                  <Users className="mr-2 h-4 w-4" /> 45 students
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="questions">
          <div className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Questions</h3>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Question
              </Button>
            </div>
            <QuestionList />
          </div>
        </TabsContent>
        <TabsContent value="analytics">
          <Analytics />
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
);

export default function QuizzesLayout() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const filteredQuizzes = quizzes.filter(
    (quiz) =>
      (activeTab === "all" || quiz.status === activeTab) &&
      quiz.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quizzes & Tests</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Quiz/Test
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search quizzes"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full sm:w-auto"
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredQuizzes.map((quiz) => (
          <div key={quiz.id} onClick={() => setSelectedQuiz(quiz)}>
            <QuizCard quiz={quiz} />
          </div>
        ))}
      </div>

      {selectedQuiz && <QuizOverview quiz={selectedQuiz} />}
    </div>
  );
}
