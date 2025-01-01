"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface RecentQuizzesProps {
  classroomId: string;
}

export function RecentQuizzes({ classroomId }: RecentQuizzesProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Quiz Title</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Avg. Score</TableHead>
          <TableHead>Completion</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Mid-term Review</TableCell>
          <TableCell>2024-01-15</TableCell>
          <TableCell>87%</TableCell>
          <TableCell>24/25</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Chapter 5 Quiz</TableCell>
          <TableCell>2024-01-10</TableCell>
          <TableCell>92%</TableCell>
          <TableCell>25/25</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Pop Quiz #3</TableCell>
          <TableCell>2024-01-05</TableCell>
          <TableCell>78%</TableCell>
          <TableCell>23/25</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
