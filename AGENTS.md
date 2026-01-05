# Agent Instructions

This file provides project-level instructions for all AI agents working on this codebase.

## Primary Reference

**Before starting any task, read: `docs/iterative-task-execution.md`**

This document contains the complete 8-phase workflow that MUST be followed for every task.

## Quick Start Checklist

1. [ ] Read task requirements completely
2. [ ] Read `docs/iterative-task-execution.md`
3. [ ] Read relevant architecture docs
4. [ ] Plan implementation in small steps
5. [ ] Validate after EVERY change
6. [ ] Test manually before marking complete

## Project Structure

```
clear-value/
├── apps/
│   ├── api/          # Fastify backend (TypeScript)
│   └── web/          # React frontend (TypeScript, Vite)
├── packages/
│   └── shared/       # Shared types and schemas
└── docs/             # Project documentation
```

## Validation Commands

After EVERY code change:

```bash
pnpm typecheck && pnpm lint && pnpm build
```

## Completion Requirements

A task is NOT complete until:
- All code compiles
- All linting passes
- All type checking passes
- Manual testing complete
- All acceptance criteria met
- No regressions

## Key Principles

1. **Never assume code works** - Always validate
2. **Iterative development** - Small changes, validate each
3. **Test incrementally** - Don't wait until the end
4. **Fix errors immediately** - Don't accumulate

See `docs/iterative-task-execution.md` for complete details.

