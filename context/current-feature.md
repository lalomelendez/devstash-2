# Current Feature

## Status

## Goals

## Notes

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
- **Auth Phase 2 (Credentials)** - Added CredentialsProvider with bcrypt password validation, jwt/session callbacks for user.id propagation, created /api/auth/register route. Email/password authentication now working. GitHub OAuth still blocked by Auth.js v5 iss bug. (Completed)
- **Auth Phase 3 (Auth UI)** - Created custom sign-in (`/sign-in`) and register (`/register`) pages with form validation and error display. GitHub OAuth button included but still blocked by iss bug. Created UserMenu component with click-outside dropdown for sidebar/mobile sidebar bottom section with avatar (image or initials fallback), name, profile link, and sign out. Dashboard now uses auth() session for real user data. (Completed)
