# where wi will load new features


## Current Feature

# Quick Fixes - Code Quality Improvements

## Overview

Fix 5 low-risk code quality issues identified during codebase review.

## Requirements

1. **Remove `console.warn`** in `src/lib/db/collections.ts` line 34
2. **Add `url = env("DATABASE_URL")`** to Prisma datasource in `prisma/schema.prisma`
3. **Add `@@index([userId, isPinned])`** to items model in Prisma schema
4. **Extract `ICON_MAP`** to shared file `src/lib/constants/icons.ts`
5. **Fix MobileSidebar** to use real database data instead of mock data

## Status

Complete

## Goals

- Improve code quality with minimal risk
- Ensure mobile and desktop sidebars show consistent data
- Prepare database schema for better query performance

## Notes

- These are low-risk, high-impact fixes
- No auth integration required
- Index migration requires `npx prisma migrate dev`

## Todo

### 1. Remove console.warn
- File: `src/lib/db/collections.ts`
- Remove or replace `console.warn('Demo user not found')` with silent return

### 2. Add Prisma datasource url
- File: `prisma/schema.prisma`
- Add `url = env("DATABASE_URL")` to datasource block

### 3. Add isPinned index (Migration Required)
- File: `prisma/schema.prisma`
- Add `@@index([userId, isPinned])` to Item model
- **Development**: Run `npx prisma migrate dev --name add_isPinned_index`
- **Production**: Run `npx prisma migrate deploy` after merging

### Database Migration Workflow
Since this feature includes a schema change, follow the migration workflow:
1. Schema changes must NEVER use `prisma db push` - always use migrations
2. **Development**: `npx prisma migrate dev --name <migration_name>` creates migration files locally
3. **Production**: `npx prisma migrate deploy` applies pending migrations before app starts
4. Verify migration status with `npx prisma migrate status` before committing
5. Migration files must be committed to git and applied in order across environments

### 4. Extract ICON_MAP to shared constants
- File: `src/lib/constants/icons.ts` (new)
- Move `ICON_MAP` from `sidebar.tsx` and `mobile-sidebar.tsx` to shared file
- Export and import in both components

### 5. Fix MobileSidebar to use sidebarData
- File: `src/components/layout/mobile-sidebar.tsx`
- Add `SidebarData` interface (already exists in dashboard-layout.tsx)
- Accept `sidebarData` prop instead of importing mock data
- File: `src/components/layout/dashboard-layout.tsx`
- Pass `sidebarData` to `MobileSidebar` component

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
- Added a pro badge to the files and images type in the sidebar
- **Quick Fixes - Code Quality Improvements** - Removed console.warn, added DB indexes for isPinned/isFavorite/updatedAt, extracted ICON_MAP to shared constants, fixed MobileSidebar to use sidebarData prop, added Suspense boundaries with skeleton loading states. (Completed)
