import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const prisma = new PrismaClient({
  adapter: new PrismaPg(new Pool({ connectionString: process.env.DATABASE_URL })),
});

async function main() {
  console.log('🔍 DevStash Database Demo Data\n');
  console.log('='.repeat(50));

  // Demo User
  const demoUser = await prisma.user.findFirst({
    where: { email: 'demo@devstash.io' },
  });
  if (demoUser) {
    console.log(`\n👤 Demo User: ${demoUser.name} (${demoUser.email})`);
    console.log(`   Pro: ${demoUser.isPro ? '✅' : '❌'}`);
  } else {
    console.log('\n❌ No demo user found');
  }

  // Item Types (system types have no userId)
  console.log('\n📦 Item Types (System)');
  console.log('-'.repeat(40));
  const itemTypes = await prisma.itemType.findMany({
    where: { userId: null },
    orderBy: { name: 'asc' },
  });
  for (const type of itemTypes) {
    console.log(`   ${type.name.padEnd(10)} ${type.icon.padEnd(12)} ${type.color}`);
  }

  // Collections
  console.log('\n📁 Collections');
  console.log('-'.repeat(40));
  const collections = await prisma.collection.findMany({
    where: { userId: demoUser?.id },
    include: {
      _count: { select: { items: true } },
      defaultType: true,
    },
    orderBy: { name: 'asc' },
  });
  for (const col of collections) {
    const typeLabel = col.defaultType ? `[${col.defaultType.name}]` : '';
    console.log(`   ${col.name} ${typeLabel}`);
    console.log(`     ${col._count.items} items | Favorite: ${col.isFavorite ? '⭐' : '—'}`);
  }

  // Items grouped by type
  console.log('\n📝 Items by Type');
  console.log('-'.repeat(40));
  for (const type of itemTypes) {
    const items = await prisma.item.findMany({
      where: { itemTypeId: type.id },
      orderBy: { createdAt: 'desc' },
    });
    if (items.length > 0) {
      console.log(`\n   ${type.name.toUpperCase()} (${items.length})`);
      for (const item of items) {
        const preview = item.content
          ? item.content.substring(0, 50).replace(/\n/g, ' ') + '...'
          : item.url || '';
        console.log(`     • ${item.title}`);
        if (preview) console.log(`       ${preview}`);
      }
    }
  }

  // Tags
  console.log('\n🏷️ Tags');
  console.log('-'.repeat(40));
  const tags = await prisma.tag.findMany({
    include: { _count: { select: { items: true } } },
    orderBy: { name: 'asc' },
  });
  if (tags.length > 0) {
    console.log('   ' + tags.map(t => `${t.name} (${t._count.items})`).join(', '));
  } else {
    console.log('   No tags yet');
  }

  // Pinned & Favorites
  console.log('\n📌 Pinned Items');
  console.log('-'.repeat(40));
  const pinnedItems = await prisma.item.findMany({
    where: { isPinned: true, userId: demoUser?.id },
    include: { itemType: true },
  });
  if (pinnedItems.length > 0) {
    for (const item of pinnedItems) {
      console.log(`   📌 ${item.title} [${item.itemType.name}]`);
    }
  } else {
    console.log('   No pinned items');
  }

  console.log('\n⭐ Favorite Collections');
  console.log('-'.repeat(40));
  const favCollections = collections.filter(c => c.isFavorite);
  if (favCollections.length > 0) {
    for (const col of favCollections) {
      console.log(`   ⭐ ${col.name}`);
    }
  } else {
    console.log('   No favorite collections');
  }

  console.log('\n' + '='.repeat(50));
  console.log('✅ Database demo data loaded successfully!');
}

main()
  .catch((e) => {
    console.error('\n❌ Error:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
