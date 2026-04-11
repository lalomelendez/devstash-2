# Current Feature

## Overview

Add Credentials provider for email/password authentication with registration.

## Status

Not Started

## Goals

- Use bcryptjs for hashing (already installed)
- Add password field to User model via migration if not already there
- Update `auth.config.ts` with Credentials provider placeholder
- Update `auth.ts` to override Credentials with bcrypt validation
- Create registration API route at `/api/auth/register`

## Notes

**Key Requirements:**
- Registration API route: `POST /api/auth/register`
- Accept: name, email, password, confirmPassword
- Validate passwords match
- Check if user already exists
- Hash password with bcryptjs
- Create user in database

**Credentials Provider in Split Pattern:**
- `auth.config.ts`: Add Credentials provider with `authorize: () => null` placeholder
- `auth.ts`: Override the Credentials provider with actual bcrypt validation logic

**Testing:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password123","confirmPassword":"password123"}'
```

**References:**
- Credentials provider: https://authjs.dev/getting-started/authentication/credentials

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
- **Auth Phase 1 (NextAuth v5)** - Created NextAuth v5 beta config with GitHub OAuth, proxy middleware for /dashboard protection, JWT session strategy. Blocked by Auth.js v5 beta bug where GitHub OAuth callback fails with "unexpected iss issuer" validation error - Auth.js v5 incorrectly treats GitHub as OIDC provider. (Blocked - Awaiting alternative auth solution)
