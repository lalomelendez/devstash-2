# DevStash

A developer knowledge hub for snippets, commands, prompts, notes, files, images, links and custom types.

## Context Files

Read the following to get the full context of the project:

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

## Commands

- **Dev server**: `npm run dev` (runs on http://localhost:3000)
- **Build**: `npm run build`
- **Production server**: `npm run start`
- **Lint**: `npm run lint`

## Neon MCP Tools

When using any `mcp__neon__*` tools (run_sql, run_sql_transaction, list_projects, describe_project, etc.):

- **Project name**: `devstash-traversy-` (project ID: `withered-waterfall-91301963`)
- **Development branch**: `br-patient-sea-an9sxrpv` (slug: `br-patient-sea-an9sxrpv`)
- **NEVER use production branch** (`br-rapid-tree-anvxbkby`) unless I explicitly ask

Always pass these values:
- `projectId`: `withered-waterfall-91301963`
- `branchId`: `br-patient-sea-an9sxrpv` (for all queries against the dev database)
