import { Card, CardContent } from "@/components/ui/card";
import { Star, MoreHorizontal, Code, Sparkles, Terminal, StickyNote, File, Image, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CollectionWithStats } from "@/lib/db/collections";

const TYPE_ICONS = {
  snippet: Code,
  prompt: Sparkles,
  command: Terminal,
  note: StickyNote,
  file: File,
  image: Image,
  link: Link,
};

interface CollectionCardProps {
  collection: CollectionWithStats;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const { dominantType, typeCounts } = collection;

  return (
    <Card
      className="group relative bg-card border-border hover:border-muted-foreground/50 transition-colors"
      style={{
        borderLeftWidth: dominantType ? '4px' : '1px',
        borderLeftColor: dominantType?.color ?? undefined,
      }}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">{collection.name}</h3>
            {collection.isFavorite && (
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {collection._count.items} items
        </p>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {collection.description}
        </p>
        <div className="mt-3 flex items-center gap-2">
          {typeCounts.slice(0, 4).map((type) => {
            const Icon = TYPE_ICONS[type.name as keyof typeof TYPE_ICONS] ?? Code;
            return (
              <Icon
                key={type.name}
                className="h-4 w-4"
                style={{ color: type.color }}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
