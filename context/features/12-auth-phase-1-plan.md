# Auth Setup Plan - NextAuth v5 + GitHub Provider

## Context

Phase 1 of authentication setup requires installing NextAuth v5 beta with GitHub OAuth provider and basic route protection. The Prisma schema already has User, Account, Session, and VerificationToken models ready. The dashboard currently uses a hardcoded demo user that needs to be replaced with real session-based auth.

## Files to Create

| File | Purpose |
|------|---------|
| `src/auth.config.ts` | Edge-compatible config with GitHub provider + callbacks |
| `src/auth.ts` | Full config with PrismaAdapter + JWT strategy |
| `src/app/api/auth/[...nextauth]/route.ts` | Exports GET/POST handlers |
| `src/proxy.ts` | Route protection middleware |
| `src/types/next-auth.d.ts` | Extends Session with user.id |

## Files to Modify

| File | Change |
|------|--------|
| `package.json` | Add `next-auth@beta` and `@auth/prisma-adapter` |
| `.env` | Add `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET` |

## Implementation Steps

### 1. Install Dependencies
```bash
npm install next-auth@beta @auth/prisma-adapter
```

### 2. Create `src/auth.config.ts`
Edge-compatible config with GitHub provider and auth callbacks for route protection.

### 3. Create `src/auth.ts`
Full NextAuth config with PrismaAdapter, JWT strategy, and exports for handlers/auth/signIn/signOut.

### 4. Create `src/app/api/auth/[...nextauth]/route.ts`
Simple route handler exporting GET/POST from auth.ts.

### 5. Create `src/proxy.ts`
Middleware export for route protection on `/dashboard/*`.

### 6. Create `src/types/next-auth.d.ts`
Extends NextAuth Session type to include user.id.

### 7. Update `.env`
Add required environment variables:
```
AUTH_SECRET=<generate with: openssl rand -base64 32>
AUTH_GITHUB_ID=<from GitHub OAuth App>
AUTH_GITHUB_SECRET=<from GitHub OAuth App>
```

### 8. Generate AUTH_SECRET
Run: `openssl rand -base64 32`

## Key Design Decisions

- **Split config pattern**: auth.config.ts (edge-compatible) + auth.ts (full adapter) to support edge middleware while using Prisma in API routes
- **JWT strategy**: Using `session: { strategy: 'jwt' }` since we need user.id in session
- **No custom sign-in page**: Use NextAuth's default page (don't set pages.signIn)
- **Named proxy export**: `export const proxy = auth(...)` not default export
- **Dashboard route protection**: proxy.ts matcher targets `/dashboard/:path*`

## Testing

1. Run `npm run dev`
2. Navigate to `/dashboard` - should redirect to NextAuth sign-in
3. Click "Sign in with GitHub" - redirects to GitHub OAuth
4. After authorization, redirect back to `/dashboard`
5. Verify session contains user.id

## References

- Edge compatibility: https://authjs.dev/getting-started/installation#edge-compatibility
- Prisma adapter: https://authjs.dev/getting-started/adapters/prisma
