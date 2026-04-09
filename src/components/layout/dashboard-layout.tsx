"use client";

import { useState } from "react";
import TopBar from "@/components/layout/top-bar";
import Sidebar from "@/components/layout/sidebar";
import MobileSidebar from "@/components/layout/mobile-sidebar";

interface SidebarData {
  user: { name: string | null; email: string | null } | null;
  itemTypes: {
    id: string;
    name: string;
    icon: string;
    color: string;
    _count: { items: number };
  }[];
  favoriteCollections: {
    id: string;
    name: string;
    isFavorite: boolean;
    itemCount: number;
    dominantType: { name: string; color: string } | null;
  }[];
  recentCollections: {
    id: string;
    name: string;
    isFavorite: boolean;
    itemCount: number;
    dominantType: { name: string; color: string } | null;
  }[];
  allCollections: {
    id: string;
    name: string;
    isFavorite: boolean;
    itemCount: number;
    dominantType: { name: string; color: string } | null;
  }[];
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarData: SidebarData;
}

export default function DashboardLayout({ children, sidebarData }: DashboardLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col">
      <TopBar onMenuClick={() => setIsMobileSidebarOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            {...sidebarData}
          />
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          sidebarData={sidebarData}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
