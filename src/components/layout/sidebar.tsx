"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link as LinkIcon,
  Settings,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link: LinkIcon,
};

interface CollectionItem {
  id: string;
  name: string;
  isFavorite: boolean;
  itemCount: number;
  dominantType: { name: string; color: string } | null;
}

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  user: { name: string | null; email: string | null } | null;
  itemTypes: {
    id: string;
    name: string;
    icon: string;
    color: string;
    _count: { items: number };
  }[];
  favoriteCollections: CollectionItem[];
  recentCollections: CollectionItem[];
  allCollections: CollectionItem[];
}

export default function Sidebar({
  isCollapsed,
  onToggle,
  user,
  itemTypes,
  favoriteCollections,
  recentCollections,
  allCollections,
}: SidebarProps) {
  const [favoritesExpanded, setFavoritesExpanded] = useState(true);
  const [recentExpanded, setRecentExpanded] = useState(true);
  const [allExpanded, setAllExpanded] = useState(true);

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border bg-card transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header with toggle button */}
      <div className="flex h-14 items-center justify-between border-b border-border px-4">
        {!isCollapsed && (
          <span className="text-sm font-medium text-muted-foreground">
            Navigation
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8"
        >
          {isCollapsed ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Types Section */}
        <div className="space-y-1">
          {!isCollapsed && (
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Types
            </h3>
          )}
          {itemTypes.map((type) => {
            const Icon = ICON_MAP[type.icon as keyof typeof ICON_MAP] ?? Code;

            return (
              <Link
                key={type.id}
                href={`/items/${type.name}s`}
                className={cn(
                  "flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent",
                  isCollapsed && "justify-center"
                )}
                title={isCollapsed ? type.name : undefined}
              >
                <Icon className="h-4 w-4" style={{ color: type.color }} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 capitalize">{type.name}s</span>
                    {(type.name === "file" || type.name === "image") && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-semibold">
                        PRO
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {type._count.items}
                    </span>
                  </>
                )}
              </Link>
            );
          })}
        </div>

        {/* Collections Section */}
        {!isCollapsed && (
          <div className="space-y-1">
            <h3 className="mb-2 px-2 pt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Collections
            </h3>

            {/* Favorites */}
            <div className="space-y-1">
              <button
                onClick={() => setFavoritesExpanded(!favoritesExpanded)}
                className="flex w-full items-center gap-2 px-2 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                {favoritesExpanded ? (
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                ) : (
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
                Favorites
              </button>
              {favoritesExpanded && favoriteCollections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.id}`}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent"
                >
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: collection.dominantType?.color ?? '#6b7280' }}
                  />
                  <span className="flex-1 truncate">{collection.name}</span>
                  <span className="text-xs text-muted-foreground">{collection.itemCount}</span>
                </Link>
              ))}
            </div>

            {/* Recent */}
            <div className="space-y-1">
              <button
                onClick={() => setRecentExpanded(!recentExpanded)}
                className="flex w-full items-center gap-2 px-2 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                {recentExpanded ? (
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                ) : (
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
                Recent
              </button>
              {recentExpanded && recentCollections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.id}`}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent"
                >
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: collection.dominantType?.color ?? '#6b7280' }}
                  />
                  <span className="flex-1 truncate">{collection.name}</span>
                  <span className="text-xs text-muted-foreground">{collection.itemCount}</span>
                </Link>
              ))}
            </div>

            {/* All Collections */}
            <div className="space-y-1">
              <button
                onClick={() => setAllExpanded(!allExpanded)}
                className="flex w-full items-center gap-2 px-2 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                {allExpanded ? (
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                ) : (
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
                All Collections
              </button>
              {allExpanded && allCollections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.id}`}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent"
                >
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: collection.dominantType?.color ?? '#6b7280' }}
                  />
                  <span className="flex-1 truncate">{collection.name}</span>
                  <span className="text-xs text-muted-foreground">{collection.itemCount}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User section at bottom */}
      <div className="border-t border-border p-4">
        {isCollapsed ? (
          <div className="flex justify-center">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                {user?.name?.split(" ").map((n) => n[0]).join("") ?? "DU"}
              </AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                {user?.name?.split(" ").map((n) => n[0]).join("") ?? "DU"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{user?.name ?? "Demo User"}</p>
              <p className="truncate text-xs text-muted-foreground">{user?.email ?? "demo@devstash.io"}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
}
