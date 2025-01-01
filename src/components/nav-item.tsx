"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
type NavItemProps = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const NavItem = ({ label, href, icon: Icon }: NavItemProps) => {
  const pathname = usePathname().split("/")[1];

  return (
    <Link
      key={href}
      href={`/${href}`}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
        pathname === href ? "bg-muted text-primary" : "text-muted-foreground"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
};

export default NavItem;
