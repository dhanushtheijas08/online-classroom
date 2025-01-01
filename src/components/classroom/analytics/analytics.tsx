"use client";

// import {
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  {
    date: "Jan 01",
    avgScore: 85,
    participation: 95,
  },
  {
    date: "Jan 05",
    avgScore: 78,
    participation: 92,
  },
  {
    date: "Jan 10",
    avgScore: 92,
    participation: 100,
  },
  {
    date: "Jan 15",
    avgScore: 87,
    participation: 96,
  },
];

interface AnalyticsProps {
  classroomId: string;
}

export function Analytics({ classroomId }: AnalyticsProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
          <CardDescription>
            Average scores and participation rates over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="avgScore"
                  stroke="#8884d8"
                  name="Average Score"
                />
                <Line
                  type="monotone"
                  dataKey="participation"
                  stroke="#82ca9d"
                  name="Participation %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div> */}
          <div>hi</div>
        </CardContent>
      </Card>
    </div>
  );
}
