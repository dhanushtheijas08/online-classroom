// "use client";

import QuizClassroomsLayout from "@/components/classroom/classroom-card";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   Bell,
//   Book,
//   Globe,
//   GraduationCap,
//   Lock,
//   Plus,
//   Search,
//   Settings,
//   Users,
// } from "lucide-react";
// import QuizClassroomsLayout from "@/components/classroom/classroom-card";

// const classrooms = [
//   {
//     id: 1,
//     name: "Mathematics 101",
//     type: "public",
//     students: 25,
//     assignments: 2,
//     image: "/placeholder.svg?height=100&width=100",
//     color: "bg-blue-500/10",
//     icon: "M",
//   },
//   {
//     id: 2,
//     name: "Physics Advanced",
//     type: "private",
//     students: 15,
//     assignments: 1,
//     image: "/placeholder.svg?height=100&width=100",
//     color: "bg-purple-500/10",
//     icon: "P",
//   },
//   {
//     id: 3,
//     name: "Literature Classics",
//     type: "public",
//     students: 30,
//     assignments: 3,
//     image: "/placeholder.svg?height=100&width=100",
//     color: "bg-green-500/10",
//     icon: "L",
//   },
// ];

// const ClassroomCard = ({ classroom }) => (
//   <Card className="overflow-hidden transition-all hover:shadow-lg">
//     <div className={`h-32 ${classroom.color} flex items-center justify-center`}>
//       <Avatar className="h-16 w-16">
//         <AvatarImage src={classroom.image} alt={classroom.name} />
//         <AvatarFallback className="text-2xl">{classroom.icon}</AvatarFallback>
//       </Avatar>
//     </div>
//     <CardHeader>
//       <div className="flex justify-between items-start">
//         <CardTitle className="text-xl">{classroom.name}</CardTitle>
//         <Badge variant={classroom.type === "public" ? "secondary" : "outline"}>
//           {classroom.type === "public" ? (
//             <Globe className="mr-1 h-3 w-3" />
//           ) : (
//             <Lock className="mr-1 h-3 w-3" />
//           )}
//           {classroom.type}
//         </Badge>
//       </div>
//       <CardDescription>
//         <div className="flex items-center gap-4 text-sm">
//           <div className="flex items-center">
//             <Users className="mr-1 h-4 w-4" />
//             {classroom.students} students
//           </div>
//           <div className="flex items-center">
//             <Book className="mr-1 h-4 w-4" />
//             {classroom.assignments} assignments
//           </div>
//         </div>
//       </CardDescription>
//     </CardHeader>
//     <CardFooter className="flex justify-between">
//       <Button>View Details</Button>
//       <Button variant="ghost" size="icon">
//         <Settings className="h-4 w-4" />
//       </Button>
//     </CardFooter>
//   </Card>
// );

// const ClassroomDetails = ({ classroom }) => (
//   <Card className="mt-8">
//     <CardHeader>
//       <div className="flex items-center gap-4">
//         <Avatar className="h-20 w-20">
//           <AvatarImage src={classroom.image} alt={classroom.name} />
//           <AvatarFallback className="text-3xl">{classroom.icon}</AvatarFallback>
//         </Avatar>
//         <div>
//           <CardTitle className="text-2xl">{classroom.name}</CardTitle>
//           <CardDescription>Mathematics | Grade 10</CardDescription>
//         </div>
//       </div>
//     </CardHeader>
//     <CardContent>
//       <Tabs defaultValue="overview" className="w-full">
//         <TabsList className="grid w-full grid-cols-4">
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="students">Students</TabsTrigger>
//           <TabsTrigger value="content">Content</TabsTrigger>
//           <TabsTrigger value="analytics">Analytics</TabsTrigger>
//         </TabsList>
//         <TabsContent value="overview" className="space-y-4">
//           <div>
//             <h3 className="font-semibold mb-2">Description</h3>
//             <p className="text-muted-foreground">
//               An introductory course covering fundamental mathematical concepts
//               including algebra, geometry, and basic calculus. Perfect for
//               students beginning their journey in advanced mathematics.
//             </p>
//           </div>
//           <div className="grid gap-4 md:grid-cols-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Quick Actions</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-2">
//                 <Button className="w-full justify-start" variant="outline">
//                   <Plus className="mr-2 h-4 w-4" /> Add Assignment
//                 </Button>
//                 <Button className="w-full justify-start" variant="outline">
//                   <Bell className="mr-2 h-4 w-4" /> Send Announcement
//                 </Button>
//                 <Button className="w-full justify-start" variant="outline">
//                   <GraduationCap className="mr-2 h-4 w-4" /> Create Quiz
//                 </Button>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Class Statistics</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <span className="text-muted-foreground">Total Students</span>
//                   <span className="font-semibold">{classroom.students}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-muted-foreground">
//                     Active Assignments
//                   </span>
//                   <span className="font-semibold">{classroom.assignments}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-muted-foreground">Average Score</span>
//                   <span className="font-semibold">85%</span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </CardContent>
//   </Card>
// );

// export default function ClassroomsLayout() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeTab, setActiveTab] = useState("all");
//   const [selectedClassroom, setSelectedClassroom] = useState(null);

//   const filteredClassrooms = classrooms.filter(
//     (classroom) =>
//       (activeTab === "all" || classroom.type === activeTab) &&
//       classroom.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-4 space-y-8 w-full">
//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Classrooms</h1>
//           <p className="text-muted-foreground">
//             Manage your virtual classrooms and students
//           </p>
//         </div>
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button>
//               <Plus className="mr-2 h-4 w-4" /> Create Classroom
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Create New Classroom</DialogTitle>
//               <DialogDescription>
//                 Set up a new virtual classroom for your students.
//               </DialogDescription>
//             </DialogHeader>
//             {/* Add form fields here */}
//             <DialogFooter>
//               <Button type="submit">Create Classroom</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div className="relative w-full md:w-96">
//           <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search classrooms"
//             className="pl-8"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <Tabs value={activeTab} onValueChange={setActiveTab}>
//           <TabsList>
//             <TabsTrigger value="all">All</TabsTrigger>
//             <TabsTrigger value="public">Public</TabsTrigger>
//             <TabsTrigger value="private">Private</TabsTrigger>
//           </TabsList>
//         </Tabs>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {filteredClassrooms.map((classroom) => (
//           <div
//             key={classroom.id}
//             onClick={() => setSelectedClassroom(classroom)}
//           >
//             <ClassroomCard classroom={classroom} />
//           </div>
//         ))}
//       </div>

//       {selectedClassroom && <ClassroomDetails classroom={selectedClassroom} />}
//     </div>
//   );
// }

const Page = async () => {
  const userData = await auth.api.getSession({
    headers: await headers(),
  });
  if (!userData?.user.id) redirect("/auth/login");
  const classrooms = await prisma.classroom.findMany({
    where: {
      teacherId: userData?.user.id,
    },
  });
  return <QuizClassroomsLayout classrooms={classrooms} />;
};

export default Page;
