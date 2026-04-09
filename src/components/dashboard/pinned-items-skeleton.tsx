import { Card, CardContent } from "@/components/ui/card";

export default function PinnedItemsSkeleton() {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <div className="h-4 w-4 bg-muted animate-pulse rounded" />
        <div className="h-6 w-16 bg-muted animate-pulse rounded" />
      </div>
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-card border-border">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="h-8 w-8 rounded bg-muted animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-48 bg-muted animate-pulse rounded" />
                <div className="h-3 w-32 bg-muted animate-pulse rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
