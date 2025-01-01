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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart, Calendar, Users, Plus, Search, X } from "lucide-react";

// Mock data for demonstration
const mockAssignments = [
  {
    id: 1,
    title: "Essay on World War II",
    description: "Write a 1000-word essay on the causes of World War II",
    dueDate: "2023-12-15",
    status: "active",
    submissions: 15,
    avgScore: 85,
  },
  {
    id: 2,
    title: "Math Problem Set",
    description: "Complete problems 1-20 in Chapter 5",
    dueDate: "2023-12-10",
    status: "completed",
    submissions: 30,
    avgScore: 92,
  },
  {
    id: 3,
    title: "Science Lab Report",
    description: "Write a lab report on the photosynthesis experiment",
    dueDate: "2023-12-05",
    status: "overdue",
    submissions: 25,
    avgScore: 78,
  },
];

// AssignmentCard Component
const AssignmentCard = ({ assignment, onView }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex justify-between items-center">
        {assignment.title}
        <Badge
          variant={
            assignment.status === "active"
              ? "default"
              : assignment.status === "completed"
              ? "secondary"
              : "destructive"
          }
        >
          {assignment.status}
        </Badge>
      </CardTitle>
      <CardDescription>{assignment.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          <span>Due: {assignment.dueDate}</span>
        </div>
        <div className="flex items-center">
          <Users className="mr-2 h-4 w-4" />
          <span>{assignment.submissions} submissions</span>
        </div>
        <div className="flex items-center">
          <span>Avg. Score: {assignment.avgScore}%</span>
        </div>
      </div>
      <div className="flex justify-between">
        <Button onClick={() => onView(assignment)}>View</Button>
        <Button variant="outline">Edit</Button>
        <Button variant="destructive">Delete</Button>
      </div>
    </CardContent>
  </Card>
);

// AssignmentDetails Component
const AssignmentDetails = ({ assignment, onClose }) => (
  <DialogContent className="max-w-4xl">
    <DialogHeader>
      <DialogTitle>{assignment.title}</DialogTitle>
      <DialogDescription>{assignment.description}</DialogDescription>
    </DialogHeader>
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <strong>Due Date:</strong> {assignment.dueDate}
        </div>
        <div>
          <strong>Status:</strong> {assignment.status}
        </div>
      </div>
      <div>
        <strong>Instructions:</strong>
        <p>
          Complete the assignment as per the given guidelines. Submit your work
          before the due date.
        </p>
      </div>
      <div>
        <strong>Submission Guidelines:</strong>
        <p>
          Submit your work in PDF format. Ensure your name and student ID are
          clearly mentioned.
        </p>
      </div>
      <div>
        <strong>Submissions:</strong>
        <SubmissionsTable />
      </div>
    </div>
    <Button onClick={onClose} variant="outline" className="mt-4">
      <X className="mr-2 h-4 w-4" />
      Close
    </Button>
  </DialogContent>
);

// SubmissionsTable Component
const SubmissionsTable = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Student Name</TableHead>
        <TableHead>Submission Date</TableHead>
        <TableHead>Score</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {[...Array(5)].map((_, i) => (
        <TableRow key={i}>
          <TableCell>Student {i + 1}</TableCell>
          <TableCell>2023-12-01</TableCell>
          <TableCell>{Math.floor(Math.random() * 41) + 60}%</TableCell>
          <TableCell>
            <Button variant="outline" size="sm" className="mr-2">
              View
            </Button>
            <Button variant="outline" size="sm">
              Feedback
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

// AnalyticsOverview Component
const AnalyticsOverview = () => (
  <Card className="mt-8">
    <CardHeader>
      <CardTitle>Analytics Overview</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">85%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Submission Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">92%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>On-Time Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">88%</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 h-[200px] bg-muted rounded-md flex items-center justify-center">
        <BarChart className="h-8 w-8 text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">
          Performance chart placeholder
        </span>
      </div>
    </CardContent>
  </Card>
);

// Main AssignmentsLayout Component
export default function AssignmentsLayout() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const filteredAssignments = mockAssignments.filter(
    (assignment) =>
      (activeTab === "all" || assignment.status === activeTab) &&
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Assignments</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Assignment
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assignments"
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
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAssignments.map((assignment) => (
          <Dialog key={assignment.id}>
            <DialogTrigger asChild>
              <div>
                <AssignmentCard
                  assignment={assignment}
                  onView={setSelectedAssignment}
                />
              </div>
            </DialogTrigger>
            {selectedAssignment && (
              <AssignmentDetails
                assignment={selectedAssignment}
                onClose={() => setSelectedAssignment(null)}
              />
            )}
          </Dialog>
        ))}
      </div>

      <AnalyticsOverview />
    </div>
  );
}
