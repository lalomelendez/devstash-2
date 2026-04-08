# where wi will load new features


## Current Feature

# Add Pro Badge to Sidebar

## Overview

Add a pro badge to the files and images type in the sidebar

## Requirements

- Use ShadCN UI badge component
- Make badge clean and subtle
- Make PRO all uppercase

## Status

Complete

## Goals

- Add PRO badge next to "Files" item type in sidebar
- Add PRO badge next to "Images" item type in sidebar
- Badge should use ShadCN UI badge component
- Badge should be subtle and clean
- "PRO" text should be all uppercase

## Notes

- Files and Images are Pro-only features according to project-overview.md
- The badge should be positioned next to the type name in the sidebar



## History
- **Initial Setup** - Next.js 16, Tailwind CSS v4, TypeScript configured (Completed)
- **Dashboard UI Phase 1** - ShadCN UI initialization, dashboard route at /dashboard, main layout with dark mode, top bar with search and buttons, sidebar and main placeholders (Completed)
- **Dashboard UI Phase 2** - Collapsible sidebar with item type navigation, favorite and recent collections, user avatar area, mobile drawer, and responsive behavior (Completed)
- **Dashboard UI Phase 3** - Main content area with stats cards (items count, collections count, favorite items, favorite collections), recent collections display, pinned items section, and 10 recent items list using mock data (Completed)
- **Prisma + Neon PostgreSQL Setup** - Installed Prisma 7 with @prisma/adapter-pg for PostgreSQL, created schema with User, Account, Session, VerificationToken, Item, ItemType, Collection, ItemCollection, and Tag models, created initial migration, seeded system item types (snippet, prompt, command, note, file, image, link) (Completed)
- **Seed Data Specification** - Created comprehensive seed script with demo user (demo@devstash.io), 5 collections (React Patterns, AI Workflows, DevOps, Terminal Commands, Design Resources), and 17 items (snippets, prompts, commands, links) (Completed)
- **Dashboard Collections (DB)** - Replaced mock data with real Prisma data. Created `src/lib/db/collections.ts` with `getCollectionsForDashboard()`. Collection cards now show dynamic border colors based on most-used item type, and type icons reflect actual item types in each collection. (Completed)
- **Dashboard Items (DB)** - Replaced mock data with real Prisma data. Created `src/lib/db/items.ts` with `getPinnedItems()` and `getRecentItems()`. ItemCard now uses itemType relation directly instead of mock lookup. Pinned and Recent sections now fetch from database. (Completed)
- ****EXTRA** - Updated seed data to add `isPinned: true` to 3 items (useDebounce Hook, Deploy Script, Git Reset HEAD~1) so pinned section displays on dashboard. (Completed)
- **Stats & Sidebar (DB)** - Created `src/lib/db/stats.ts` with `getStats()` and `getSidebarData()`. StatsCards now shows actual DB counts. Sidebar now displays item types from DB with counts, favorite/recent/all collections with dominant type colored circles. Each collection sub-section (Favorites, Recent, All Collections) is independently collapsible. Dashboard page fetches sidebar data server-side and passes to client components. (Completed)
