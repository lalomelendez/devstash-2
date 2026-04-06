import { prisma } from '@/lib/prisma';

const DEMO_USER_EMAIL = 'demo@devstash.io';

export async function getPinnedItems() {
  const demoUser = await prisma.user.findUnique({
    where: { email: DEMO_USER_EMAIL },
  });

  if (!demoUser) {
    return [];
  }

  return prisma.item.findMany({
    where: { userId: demoUser.id, isPinned: true },
    include: { itemType: true, tags: true },
    orderBy: { updatedAt: 'desc' },
  });
}

export async function getRecentItems(limit = 10) {
  const demoUser = await prisma.user.findUnique({
    where: { email: DEMO_USER_EMAIL },
  });

  if (!demoUser) {
    return [];
  }

  return prisma.item.findMany({
    where: { userId: demoUser.id },
    include: { itemType: true, tags: true },
    orderBy: { updatedAt: 'desc' },
    take: limit,
  });
}
