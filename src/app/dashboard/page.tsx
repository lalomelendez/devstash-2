import { Suspense } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import StatsCards from "@/components/dashboard/stats-cards";
import StatsCardsSkeleton from "@/components/dashboard/stats-cards-skeleton";
import CollectionsSection from "@/components/dashboard/collections-section";
import CollectionsSectionSkeleton from "@/components/dashboard/collections-section-skeleton";
import PinnedItems from "@/components/dashboard/pinned-items";
import PinnedItemsSkeleton from "@/components/dashboard/pinned-items-skeleton";
import RecentItems from "@/components/dashboard/recent-items";
import RecentItemsSkeleton from "@/components/dashboard/recent-items-skeleton";
import { getSidebarData } from "@/lib/db/stats";

export default async function DashboardPage() {
  const sidebarData = await getSidebarData();

  return (
    <DashboardLayout sidebarData={sidebarData}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Your developer knowledge hub</p>
        </div>

        {/* Stats Cards */}
        <Suspense fallback={<StatsCardsSkeleton />}>
          <StatsCards />
        </Suspense>

        {/* Collections */}
        <Suspense fallback={<CollectionsSectionSkeleton />}>
          <CollectionsSection />
        </Suspense>

        {/* Pinned Items */}
        <Suspense fallback={<PinnedItemsSkeleton />}>
          <PinnedItems />
        </Suspense>

        {/* Recent Items */}
        <Suspense fallback={<RecentItemsSkeleton />}>
          <RecentItems />
        </Suspense>
      </div>
    </DashboardLayout>
  );
}
