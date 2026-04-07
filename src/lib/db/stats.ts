import { prisma } from '@/lib/prisma';

const DEMO_USER_EMAIL = 'demo@devstash.io';

export async function getStats() {
  const demoUser = await prisma.user.findUnique({
    where: { email: DEMO_USER_EMAIL },
  });

  if (!demoUser) {
    return { totalItems: 0, totalCollections: 0, favoriteItems: 0, favoriteCollections: 0 };
  }

  const [totalItems, totalCollections, favoriteItems, favoriteCollections] = await Promise.all([
    prisma.item.count({ where: { userId: demoUser.id } }),
    prisma.collection.count({ where: { userId: demoUser.id } }),
    prisma.item.count({ where: { userId: demoUser.id, isFavorite: true } }),
    prisma.collection.count({ where: { userId: demoUser.id, isFavorite: true } }),
  ]);

  return { totalItems, totalCollections, favoriteItems, favoriteCollections };
}

export async function getSidebarData() {
  const demoUser = await prisma.user.findUnique({
    where: { email: DEMO_USER_EMAIL },
  });

  if (!demoUser) {
    return {
      user: null,
      itemTypes: [],
      favoriteCollections: [],
      recentCollections: [],
      allCollections: [],
    };
  }

  // Get system item types with counts
  const itemTypes = await prisma.itemType.findMany({
    where: { isSystem: true },
    include: {
      _count: { select: { items: true } },
    },
  });

  // Get collections with item counts and dominant types
  const collections = await prisma.collection.findMany({
    where: { userId: demoUser.id },
    include: {
      _count: { select: { items: true } },
      items: {
        include: { item: { include: { itemType: true } } },
      },
    },
    orderBy: { updatedAt: 'desc' },
  });

  const enrichedCollections = collections.map((col) => {
    const typeMap: Record<string, { name: string; color: string; count: number }> = {};
    for (const ic of col.items) {
      const t = ic.item.itemType;
      if (typeMap[t.name]) typeMap[t.name].count++;
      else typeMap[t.name] = { name: t.name, color: t.color, count: 1 };
    }
    const types = Object.values(typeMap).sort((a, b) => b.count - a.count);
    return {
      id: col.id,
      name: col.name,
      isFavorite: col.isFavorite,
      itemCount: col._count.items,
      dominantType: types[0] ?? null,
    };
  });

  const favoriteCollections = enrichedCollections.filter((c) => c.isFavorite);
  const recentCollections = enrichedCollections.slice(0, 3);

  return {
    user: { name: demoUser.name, email: demoUser.email },
    itemTypes,
    favoriteCollections,
    recentCollections,
    allCollections: enrichedCollections,
  };
}
