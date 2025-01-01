"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StudentsListProps {
  classroomId: string;
}

export function StudentsList({ classroomId }: StudentsListProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/01.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium leading-none">John Doe</p>
              <p className="text-sm text-muted-foreground">95%</p>
            </div>
            <Progress value={95} className="h-2" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/02.png" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium leading-none">Jane Smith</p>
              <p className="text-sm text-muted-foreground">92%</p>
            </div>
            <Progress value={92} className="h-2" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/03.png" />
            <AvatarFallback>RJ</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium leading-none">Robert Johnson</p>
              <p className="text-sm text-muted-foreground">88%</p>
            </div>
            <Progress value={88} className="h-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
