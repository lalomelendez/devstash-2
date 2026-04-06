import { prisma } from '@/lib/prisma';

export interface CollectionTypeCount {
  name: string;
  color: string;
  count: number;
}

export interface CollectionWithStats {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    items: number;
  };
  dominantType: {
    name: string;
    color: string;
  } | null;
  typeCounts: CollectionTypeCount[];
}

const DEMO_USER_EMAIL = 'demo@devstash.io';

export async function getCollectionsForDashboard(): Promise<CollectionWithStats[]> {
  const demoUser = await prisma.user.findUnique({
    where: { email: DEMO_USER_EMAIL },
  });

  if (!demoUser) {
    console.warn('Demo user not found');
    return [];
  }

  const collections = await prisma.collection.findMany({
    where: { userId: demoUser.id },
    include: {
      _count: {
        select: { items: true },
      },
      items: {
        include: {
          item: {
            include: {
              itemType: true,
            },
          },
        },
      },
    },
    orderBy: { updatedAt: 'desc' },
    take: 6,
  });

  return collections.map((col) => {
    const typeMap = new Map<string, CollectionTypeCount>();

    for (const itemCol of col.items) {
      const type = itemCol.item.itemType;
      if (typeMap.has(type.name)) {
        typeMap.get(type.name)!.count++;
      } else {
        typeMap.set(type.name, {
          name: type.name,
          color: type.color,
          count: 1,
        });
      }
    }

    const typeCounts = Array.from(typeMap.values()).sort((a, b) => b.count - a.count);
    const dominantType = typeCounts[0] ?? null;

    return {
      id: col.id,
      name: col.name,
      description: col.description,
      isFavorite: col.isFavorite,
      createdAt: col.createdAt,
      updatedAt: col.updatedAt,
      _count: col._count,
      dominantType: dominantType
        ? { name: dominantType.name, color: dominantType.color }
        : null,
      typeCounts,
    };
  });
}
