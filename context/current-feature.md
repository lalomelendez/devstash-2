# Current Feature

## Overview

Set up NextAuth v5 with Prisma adapter and GitHub OAuth. Use NextAuth's default pages for testing.

## Status

Not Started

## Goals

- Install NextAuth v5 (`next-auth@beta`) and `@auth/prisma-adapter`
- Set up split auth config pattern for edge compatibility
- Add GitHub OAuth provider
- Protect `/dashboard/*` routes using Next.js 16 proxy
- Redirect unauthenticated users to sign-in

## Notes

**Key Gotchas:**
- Use `next-auth@beta` (not `@latest` which installs v4)
- Proxy file must be at `src/proxy.ts` (same level as `app/`)
- Use named export: `export const proxy = auth(...)` not default export
- Use `session: { strategy: 'jwt' }` with split config pattern
- Don't set custom `pages.signIn` - use NextAuth's default page

**Files to Create:**
1. `src/auth.config.ts` - Edge-compatible config (providers only, no adapter)
2. `src/auth.ts` - Full config with Prisma adapter and JWT strategy
3. `src/app/api/auth/[...nextauth]/route.ts` - Export handlers from auth.ts
4. `src/proxy.ts` - Route protection with redirect logic
5. `src/types/next-auth.d.ts` - Extend Session type with user.id

**Environment Variables:**
```
AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
```

**Testing:**
1. Go to `/dashboard` - should redirect to sign-in
2. Click "Sign in with GitHub"
3. Verify redirect back to `/dashboard` after auth

**References:**
- Edge compatibility: https://authjs.dev/getting-started/installation#edge-compatibility
- Prisma adapter: https://authjs.dev/getting-started/adapters/prisma

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
