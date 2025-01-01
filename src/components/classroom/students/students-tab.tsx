"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface StudentsTabProps {
  classroomId: string;
}

export function StudentsTab({ classroomId }: StudentsTabProps) {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Students</h2>
          <p className="text-muted-foreground">
            Manage your classroom students and their performance
          </p>
        </div>
        <Button>Export Data</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>View and manage student information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Quizzes Completed</TableHead>
                  <TableHead>Average Score</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback>
                            {student.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        {student.name}
                      </div>
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.joinedDate}</TableCell>
                    <TableCell>{student.quizzesCompleted}</TableCell>
                    <TableCell>{student.averageScore}%</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          student.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const students = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    joinedDate: "2024-01-01",
    quizzesCompleted: 8,
    averageScore: 92,
    status: "Active",
    avatar: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    joinedDate: "2024-01-05",
    quizzesCompleted: 7,
    averageScore: 88,
    status: "Active",
    avatar: "/placeholder.svg",
  },
];
