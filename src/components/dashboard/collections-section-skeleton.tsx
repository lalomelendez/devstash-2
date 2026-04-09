import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CollectionsSectionSkeleton() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-24 bg-muted animate-pulse rounded" />
        <div className="h-4 w-16 bg-muted animate-pulse rounded" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-card border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-muted animate-pulse" />
                <div className="h-5 w-32 bg-muted animate-pulse rounded" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-4 w-full bg-muted animate-pulse rounded mb-2" />
              <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
