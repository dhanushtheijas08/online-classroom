"use client";

import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Globe,
  Lock,
  Users,
  FileQuestion,
  PlusCircle,
  MoreVertical,
  Eye,
  Edit,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ClassroomModal from "./classroom-modal";
import { Classroom as ClassroomType } from "@prisma/client";
import Link from "next/link";

// Define classroom type for type safety
interface Classroom {
  id: number;
  name: string;
  type: "public" | "private";
  subject: string;
  students: number;
  quizzes: number;
  recentQuizzes: string[];
  image: string;
  icon: string;
  tags: string[];
}

// ClassroomCard component
const ClassroomCard: FC<{ classroom: ClassroomType }> = ({ classroom }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/classroom/${classroom.id}`}>
      <Card
        className="overflow-hidden transition-all duration-300 hover:shadow-md group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="max-w-[95%] mx-auto mt-2.5">
          <div className="relative h-48 overflow-hidden rounded-md">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
              style={{
                backgroundImage: `url(${classroom.classroomProfile})`,
                filter: "brightness(0.7)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {classroom.name}
                </h3>
                <p className="text-sm text-gray-300">
                  {classroom.classroomSubject}
                </p>
              </div>
              <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                <AvatarImage alt={classroom.name} />
                <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                  {classroom.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4 gap-5">
            <Badge
              variant={
                classroom.classroomType.toLocaleUpperCase() === "public"
                  ? "secondary"
                  : "outline"
              }
              className="px-3 py-1"
            >
              {classroom.classroomType.toLocaleUpperCase() === "public" ? (
                <Globe className="mr-2 h-4 w-4" />
              ) : (
                <Lock className="mr-2 h-4 w-4" />
              )}
              {classroom.classroomType.toLocaleUpperCase()}
            </Badge>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                {/* <span className="font-medium">{classroom} Students</span> */}
              </div>
              <div className="flex items-center">
                <FileQuestion className="mr-2 h-4 w-4 text-muted-foreground" />
                {/* <span className="font-medium">{classroom.quizzes} Quizzes</span> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-nowrap">Related Tags:</h3>
            {/* <div className="flex gap-2">
            {classroom.tags.map((tag, index) => (
              <Badge
                key={index}
                variant={classroom.type === "public" ? "outline" : "secondary"}
                className="px-3 py-1"
              >
                {tag}
              </Badge>
            ))}
          </div> */}
          </div>
          <div className="flex justify-between items-center w-full mt-6">
            <Button variant="default" size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Quiz
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  View Quizzes
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Classroom
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Classroom
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

// Main Layout
const QuizClassroomsLayout = ({
  classrooms,
}: {
  classrooms: ClassroomType[];
}) => {
  // const classrooms: Classroom[] = [
  //   {
  //     id: 1,
  //     name: "Mathematics 101",
  //     type: "public",
  //     subject: "Algebra & Geometry",
  //     students: 25,
  //     quizzes: 8,
  //     recentQuizzes: [
  //       "Quadratic Equations",
  //       "Trigonometry Basics",
  //       "Geometry Fundamentals",
  //     ],
  //     image:
  //       "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80",
  //     icon: "https://api.dicebear.com/6.x/initials/svg?seed=Math",
  //     tags: ["Algebra", "Geometry"],
  //   },
  //   {
  //     id: 2,
  //     name: "Physics Advanced",
  //     type: "private",
  //     subject: "Mechanics & Thermodynamics",
  //     students: 15,
  //     quizzes: 12,
  //     recentQuizzes: ["Newton's Laws", "Fluid Dynamics", "Thermodynamics I"],
  //     image:
  //       "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=2104&q=80",
  //     icon: "https://api.dicebear.com/6.x/initials/svg?seed=Phys",
  //     tags: ["Mechanics", "Thermodynamics"],
  //   },
  //   {
  //     id: 3,
  //     name: "Literature Classics",
  //     type: "public",
  //     subject: "19th Century Novels",
  //     students: 30,
  //     quizzes: 6,
  //     recentQuizzes: ["Pride and Prejudice", "Great Expectations", "Jane Eyre"],
  //     image:
  //       "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80",
  //     icon: "https://api.dicebear.com/6.x/initials/svg?seed=Lit",
  //     tags: ["Classics", "Novels"],
  //   },
  // ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold mb-6">Your Quiz Classrooms</h1>
        <ClassroomModal>
          <Button size="sm">Create New Class</Button>
        </ClassroomModal>
      </div>

      {classrooms.length < 1 ? (
        <p className="text-center mt-40 text-xl">No Class Found</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {classrooms.map((classroom) => (
            <ClassroomCard key={classroom.id} classroom={classroom} />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizClassroomsLayout;
