import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
  adapter: new PrismaPg(new Pool({ connectionString: process.env.DATABASE_URL })),
});

// Helper to hash password
async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

// System item types
const systemItemTypes = [
  { name: 'snippet', icon: 'Code', color: '#3b82f6', isSystem: true },
  { name: 'prompt', icon: 'Sparkles', color: '#8b5cf6', isSystem: true },
  { name: 'command', icon: 'Terminal', color: '#f97316', isSystem: true },
  { name: 'note', icon: 'StickyNote', color: '#fde047', isSystem: true },
  { name: 'file', icon: 'File', color: '#6b7280', isSystem: true },
  { name: 'image', icon: 'Image', color: '#ec4899', isSystem: true },
  { name: 'link', icon: 'Link', color: '#10b981', isSystem: true },
];

// Collections to seed
const collectionsData = [
  {
    name: 'React Patterns',
    description: 'Reusable React patterns and hooks',
    items: [
      {
        title: 'useDebounce Hook',
        type: 'snippet',
        language: 'typescript',
        content: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`,
      },
      {
        title: 'useLocalStorage Hook',
        type: 'snippet',
        language: 'typescript',
        content: `import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
}`,
      },
      {
        title: 'Context Provider Pattern',
        type: 'snippet',
        language: 'typescript',
        content: `import { createContext, useContext, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}`,
      },
    ],
  },
  {
    name: 'AI Workflows',
    description: 'AI prompts and workflow automations',
    items: [
      {
        title: 'Code Review Prompt',
        type: 'prompt',
        content: `You are a senior software engineer conducting a thorough code review. Analyze the following code for:

1. **Correctness** - Are there any bugs, edge cases, or logic errors?
2. **Performance** - Any inefficiencies or optimization opportunities?
3. **Security** - Potential vulnerabilities or security concerns?
4. **Readability** - Is the code clear and maintainable?
5. **Best Practices** - Does it follow established patterns and conventions?

Provide specific, actionable feedback with code examples where applicable.

Code to review:
\`\`\`
[paste code here]
\`\`\`

Format your response with clear sections for each area of review.`,
      },
      {
        title: 'Documentation Generation',
        type: 'prompt',
        content: `You are a technical documentation writer. Generate comprehensive documentation for the following code or function.

Include:
- **Overview** - What does this code do and why?
- **Parameters** - All inputs with types and descriptions
- **Return Value** - Output type and description
- **Examples** - Code examples showing usage
- **Edge Cases** - Any special conditions or limitations
- **Related** - Connected functions or related functionality

Code to document:
\`\`\`
[paste code here]
\`\`\`

Use clear, concise language. Include JSDoc comments where appropriate.`,
      },
      {
        title: 'Refactoring Assistance',
        type: 'prompt',
        content: `You are an expert refactoring specialist. Analyze the following code and suggest improvements to make it more:

1. **Maintainable** - Easy to understand and modify
2. **Performant** - Efficient in terms of speed and resources
3. **Testable** - Easy to write tests for
4. **Reusable** - DRY principles applied appropriately

Provide:
- The refactored code with explanations
- Specific changes and why they improve the code
- Any trade-offs or considerations
- Suggestions for testing the refactored code

Code to refactor:
\`\`\`
[paste code here]
\`\`\``,
      },
    ],
  },
  {
    name: 'DevOps',
    description: 'Infrastructure and deployment resources',
    items: [
      {
        title: 'Docker Multi-Stage Build',
        type: 'snippet',
        language: 'dockerfile',
        content: `# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm ci --production

EXPOSE 3000
ENV PORT=3000

CMD ["node", "dist/server.js"]`,
      },
      {
        title: 'Deploy Script',
        type: 'command',
        content: `#!/bin/bash
set -e

# Deploy to production server
echo "Deploying to production..."

git pull origin main
npm ci --production
npm run build
pm2 restart all

echo "Deployment complete!"`,
      },
      {
        title: 'Docker Documentation',
        type: 'link',
        url: 'https://docs.docker.com/',
      },
      {
        title: 'GitHub Actions CI',
        type: 'link',
        url: 'https://docs.github.com/en/actions',
      },
    ],
  },
  {
    name: 'Terminal Commands',
    description: 'Useful shell commands for everyday development',
    items: [
      {
        title: 'Git Reset HEAD~1',
        type: 'command',
        content: `# Undo the last commit but keep changes
git reset --soft HEAD~1

# Undo the last commit and discard changes
git reset --hard HEAD~1

# Undo the last N commits and keep changes
git reset --soft HEAD~N`,
      },
      {
        title: 'Docker Cleanup',
        type: 'command',
        content: `# Remove all stopped containers
docker container prune -f

# Remove all unused images
docker image prune -f

# Remove all unused networks
docker network prune -f

# Full system cleanup
docker system prune -af

# Remove all volumes (careful!)
docker volume prune -f`,
      },
      {
        title: 'Process Management',
        type: 'command',
        content: `# List running processes
ps aux | grep node

# Kill process by port
lsof -ti:3000 | xargs kill -9

# Kill process by name
pkill -f "node server.js"

# View process info
cat /proc/<pid>/status`,
      },
      {
        title: 'Package Manager Commands',
        type: 'command',
        content: `# npm
npm install <package>
npm uninstall <package>
npm update
npm list
npm outdated
npm audit fix

# yarn
yarn add <package>
yarn remove <package>
yarn upgrade
yarn audit

# pnpm
pnpm add <package>
pnpm remove <package>
pnpm update`,
      },
    ],
  },
  {
    name: 'Design Resources',
    description: 'UI/UX resources and references',
    items: [
      {
        title: 'Tailwind CSS',
        type: 'link',
        url: 'https://tailwindcss.com/docs',
      },
      {
        title: 'shadcn/ui Components',
        type: 'link',
        url: 'https://ui.shadcn.com/',
      },
      {
        title: 'Design Systems',
        type: 'link',
        url: 'https://designsystems.com/',
      },
      {
        title: 'Lucide Icons',
        type: 'link',
        url: 'https://lucide.dev/',
      },
    ],
  },
];

async function main() {
  console.log('Starting seed...\n');

  // 1. Seed system item types first
  console.log('Seeding system item types...');
  const itemTypeMap: Record<string, string> = {};

  for (const type of systemItemTypes) {
    const existing = await prisma.itemType.findFirst({
      where: { name: type.name, isSystem: true },
    });

    if (!existing) {
      const created = await prisma.itemType.create({ data: type });
      itemTypeMap[type.name] = created.id;
      console.log(`  Created: ${type.name}`);
    } else {
      itemTypeMap[type.name] = existing.id;
      console.log(`  Already exists: ${type.name}`);
    }
  }

  // 2. Create or update demo user
  console.log('\nSeeding demo user...');
  const hashedPassword = await hashPassword('12345678');

  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@devstash.io' },
    update: {
      name: 'Demo User',
      password: hashedPassword,
      isPro: false,
      emailVerified: new Date(),
    },
    create: {
      email: 'demo@devstash.io',
      name: 'Demo User',
      password: hashedPassword,
      isPro: false,
      emailVerified: new Date(),
    },
  });
  console.log(`  Created/updated: ${demoUser.email}`);

  // 3. Create collections and items
  console.log('\nSeeding collections and items...');

  for (const collectionData of collectionsData) {
    // Create collection
    const collection = await prisma.collection.create({
      data: {
        name: collectionData.name,
        description: collectionData.description,
        userId: demoUser.id,
        defaultTypeId: itemTypeMap[collectionData.items[0].type],
      },
    });
    console.log(`  Created collection: ${collection.name}`);

    // Create items and link to collection
    for (const itemData of collectionData.items) {
      const contentType = itemData.type === 'link' ? 'URL' : 'TEXT';

      const item = await prisma.item.create({
        data: {
          title: itemData.title,
          contentType,
          content: 'content' in itemData ? itemData.content : null,
          url: 'url' in itemData ? itemData.url : null,
          language: 'language' in itemData ? itemData.language : null,
          userId: demoUser.id,
          itemTypeId: itemTypeMap[itemData.type],
        },
      });

      // Link item to collection
      await prisma.itemCollection.create({
        data: {
          itemId: item.id,
          collectionId: collection.id,
        },
      });

      console.log(`    - Created item: ${item.title}`);
    }
  }

  console.log('\nSeeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
