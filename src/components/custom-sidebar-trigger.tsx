"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronRightCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function CustomSidebarTrigger() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleSidebar}
      className="rounded-full h-8 w-8 border-2 absolute -left-4 top-2 z-10"
    >
      <ChevronLeft
        className={cn(
          "transition-transform duration-300",
          !open && "-rotate-180"
        )}
      />
    </Button>
  );
}
