"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  name: string | null;
  email: string | null;
  image: string | null;
  collapsed?: boolean;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function UserMenu({ name, email, image, collapsed = false }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSignOut() {
    await signOut({ callbackUrl: "/sign-in" });
  }

  if (collapsed) {
    return (
      <div className="flex justify-center">
        <Link href="/profile">
          <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80">
            {image ? (
              <AvatarImage src={image} alt={name ?? "User"} />
            ) : (
              <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                {name ? getInitials(name) : "DU"}
              </AvatarFallback>
            )}
          </Avatar>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-3 rounded-lg p-1 hover:bg-accent transition-colors"
      >
        <Avatar className="h-8 w-8">
          {image ? (
            <AvatarImage src={image} alt={name ?? "User"} />
          ) : (
            <AvatarFallback className="bg-primary text-xs text-primary-foreground">
              {name ? getInitials(name) : "DU"}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1 overflow-hidden text-left">
          <p className="truncate text-sm font-medium">{name ?? "User"}</p>
          <p className="truncate text-xs text-muted-foreground">{email}</p>
        </div>
        <Settings className="h-4 w-4 text-muted-foreground" />
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-full rounded-lg border bg-card shadow-lg">
          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors rounded-t-lg"
          >
            <Settings className="h-4 w-4" />
            Profile
          </Link>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-accent transition-colors rounded-b-lg"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
