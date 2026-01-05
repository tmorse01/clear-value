# Iterative Task Execution Guide

## Overview

This document provides a systematic, iterative approach for executing any development task in this project. **Every agent must follow this process** to ensure code quality, correctness, and completeness. **Never assume code works - always validate it.**

## Core Principles

1. **Iterative Development**: Build in small, testable increments
2. **Validation First**: Test and verify at every step
3. **Build Verification**: Ensure code compiles and runs
4. **Completion Criteria**: Know when the task is truly done
5. **Documentation**: Document decisions and changes

---

## Task Execution Workflow

### Phase 1: Understanding & Planning

#### Step 1.1: Read Task Requirements

- [ ] Read the task description completely
- [ ] Identify all acceptance criteria
- [ ] Note any dependencies or prerequisites
- [ ] Review related documentation:
  - `docs/technical-architecture.md`
  - `docs/api-specification.md` (if API work)
  - `docs/data-models.md` (if data work)
  - `docs/design-system.md` (if frontend work)
  - `docs/development-setup.md`

#### Step 1.2: Understand Current State

- [ ] Search codebase for related existing code
- [ ] Identify files that need modification
- [ ] Identify files that need creation
- [ ] Check for existing tests
- [ ] Review similar implementations for patterns

#### Step 1.3: Plan Implementation

- [ ] Break task into small, incremental steps
- [ ] Identify dependencies between steps
- [ ] List all files to create/modify
- [ ] Identify test cases needed
- [ ] Note any shared types/schemas needed

**Output**: A clear plan with steps and file list

---

### Phase 2: Environment Setup

#### Step 2.1: Verify Prerequisites

```bash
# Check Node.js version
node --version  # Should be 22.x

# Check pnpm version
pnpm --version  # Should be 8.0.0+

# Verify dependencies installed
pnpm install

# Build shared package (if working with types)
pnpm --filter @clearvalue/shared build
```

- [ ] All prerequisites met
- [ ] Dependencies installed
- [ ] Shared package built (if needed)

#### Step 2.2: Verify Development Environment

```bash
# Type check everything
pnpm typecheck

# Lint check
pnpm lint

# Start dev servers (if needed for testing)
pnpm dev
```

- [ ] No type errors
- [ ] No linting errors
- [ ] Dev servers start successfully (if applicable)

---

### Phase 3: Iterative Implementation

**For each incremental step:**

#### Step 3.1: Make Small Changes

- [ ] Make ONE focused change
- [ ] Follow project code style
- [ ] Use shared types from `@clearvalue/shared`
- [ ] Add proper error handling
- [ ] Add comments for complex logic

#### Step 3.2: Immediate Validation

**After each change, validate:**

```bash
# Type check
pnpm typecheck

# Lint check
pnpm lint

# Build affected packages
pnpm --filter <package-name> build
```

- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Code compiles successfully

#### Step 3.3: Test the Change

**For Backend Changes:**

```bash
# Start API server
cd apps/api
pnpm dev

# Test endpoint manually (curl, Postman, or browser)
# OR run unit tests if they exist
```

**For Frontend Changes:**

```bash
# Start web server (should auto-start with pnpm dev)
# Open browser and test manually
# Check browser console for errors
```

**For Shared Package Changes:**

```bash
# Rebuild shared package
pnpm --filter @clearvalue/shared build

# Rebuild dependent packages
pnpm --filter @clearvalue/api build
pnpm --filter @clearvalue/web build
```

- [ ] Code runs without runtime errors
- [ ] Functionality works as expected
- [ ] No console/terminal errors

#### Step 3.4: Fix Issues Immediately

- [ ] If errors found, fix them before proceeding
- [ ] Re-validate after fixes
- [ ] Don't accumulate errors

**Repeat Steps 3.1-3.4 for each incremental change**

---

### Phase 4: Testing & Validation

#### Step 4.1: Manual Testing

**For API Endpoints:**

```bash
# Test with curl
curl -X POST http://localhost:3000/api/v1/endpoint \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'

# Or use Postman/Thunder Client
# Test all success cases
# Test all error cases
# Test edge cases
```

**For Frontend Components:**

- [ ] Open in browser
- [ ] Test all user interactions
- [ ] Test error states
- [ ] Test loading states
- [ ] Test responsive behavior
- [ ] Check browser console for errors
- [ ] Check Network tab for API calls

**For Services/Utilities:**

- [ ] Test with various inputs
- [ ] Test edge cases
- [ ] Test error handling
- [ ] Verify output format

#### Step 4.2: Integration Testing

- [ ] Test full user flow (if applicable)
- [ ] Test with real data
- [ ] Test error scenarios
- [ ] Verify data flows correctly between components

#### Step 4.3: Edge Case Testing

- [ ] Empty/null inputs
- [ ] Invalid inputs
- [ ] Boundary values
- [ ] Missing optional data
- [ ] Network failures (if applicable)
- [ ] Large data sets (if applicable)

---

### Phase 5: Build Verification

#### Step 5.1: Full Build

```bash
# Build all packages
pnpm build

# Verify no build errors
```

- [ ] All packages build successfully
- [ ] No TypeScript compilation errors
- [ ] No missing dependencies

#### Step 5.2: Production Build Test

```bash
# Build for production
pnpm build

# Test production build (if applicable)
cd apps/api
pnpm start  # Test production API

cd apps/web
pnpm preview  # Test production frontend
```

- [ ] Production builds succeed
- [ ] Production builds run correctly
- [ ] No runtime errors in production mode

---

### Phase 6: Code Quality Checks

#### Step 6.1: Linting

```bash
# Run linter
pnpm lint

# Fix all linting errors
```

- [ ] No linting errors
- [ ] Code follows project style guide

#### Step 6.2: Type Checking

```bash
# Type check all packages
pnpm typecheck
```

- [ ] No type errors
- [ ] All types properly defined
- [ ] No `any` types (unless necessary)

#### Step 6.3: Code Review Checklist

- [ ] Code follows project patterns
- [ ] Error handling is comprehensive
- [ ] Input validation is present
- [ ] Comments explain complex logic
- [ ] No hardcoded values (use config/env)
- [ ] No console.logs in production code
- [ ] No commented-out code
- [ ] Proper use of shared types

---

### Phase 7: Completion Verification

#### Step 7.1: Acceptance Criteria Check

Review original task requirements:

- [ ] All acceptance criteria met
- [ ] All required features implemented
- [ ] All required files created/modified
- [ ] All integrations working

#### Step 7.2: Functionality Verification

- [ ] Feature works end-to-end
- [ ] Error cases handled gracefully
- [ ] Edge cases handled
- [ ] Performance is acceptable
- [ ] No regressions introduced

#### Step 7.3: Documentation

- [ ] Code is self-documenting
- [ ] Complex logic has comments
- [ ] API endpoints documented (if applicable)
- [ ] README updated (if needed)
- [ ] Any breaking changes documented

---

### Phase 8: Final Validation

#### Step 8.1: Clean State Test

```bash
# Clean build artifacts
pnpm clean  # If available, or manually remove dist folders

# Fresh install and build
pnpm install
pnpm --filter @clearvalue/shared build
pnpm build
```

- [ ] Clean build succeeds
- [ ] No missing dependencies
- [ ] No build artifacts in source

#### Step 8.2: Integration with Existing Code

- [ ] Doesn't break existing functionality
- [ ] Works with other features
- [ ] Follows existing patterns
- [ ] Uses existing utilities where appropriate

#### Step 8.3: Final Checklist

- [ ] All code committed (or ready to commit)
- [ ] All tests pass (if tests exist)
- [ ] Build succeeds
- [ ] Linting passes
- [ ] Type checking passes
- [ ] Manual testing complete
- [ ] Acceptance criteria met
- [ ] Documentation updated

---

## Task-Specific Guidelines

### Backend API Tasks

**Additional Steps:**

1. **Route Registration**

   - [ ] Route registered in `apps/api/src/index.ts` or appropriate router
   - [ ] Route follows Fastify plugin pattern
   - [ ] Route has proper error handling

2. **Validation**

   - [ ] Request validation with Zod schemas
   - [ ] Response validation (if applicable)
   - [ ] Error responses follow API specification

3. **Testing**

   - [ ] Test with valid inputs
   - [ ] Test with invalid inputs
   - [ ] Test authentication (if applicable)
   - [ ] Test rate limiting (if applicable)
   - [ ] Verify response format matches spec

4. **Service Layer**
   - [ ] Business logic in service layer
   - [ ] Route handlers are thin
   - [ ] Services are testable

### Frontend Component Tasks

**Additional Steps:**

1. **Component Structure**

   - [ ] Component follows project patterns
   - [ ] Uses Material UI components
   - [ ] Proper TypeScript types
   - [ ] Proper error boundaries

2. **State Management**

   - [ ] Uses TanStack Query for server state
   - [ ] Uses React Context for global UI state
   - [ ] Local state for component-specific state

3. **Styling**

   - [ ] Follows design system
   - [ ] Responsive design
   - [ ] Accessible (ARIA labels, keyboard navigation)

4. **Testing**
   - [ ] Component renders correctly
   - [ ] User interactions work
   - [ ] Error states display
   - [ ] Loading states display
   - [ ] API integration works

### Shared Package Tasks

**Additional Steps:**

1. **Type Definitions**

   - [ ] Types are exported properly
   - [ ] Types are well-documented
   - [ ] Types match actual usage

2. **Schemas**

   - [ ] Zod schemas for validation
   - [ ] Schemas match types
   - [ ] Schemas have proper error messages

3. **Rebuild & Propagation**
   - [ ] Rebuild shared package after changes
   - [ ] Rebuild dependent packages
   - [ ] Verify no breaking changes

### Database/Prisma Tasks

**Additional Steps:**

1. **Schema Changes**

   - [ ] Prisma schema updated
   - [ ] Migration created: `pnpm db:migrate --name <name>`
   - [ ] Migration applied successfully
   - [ ] Prisma client regenerated: `pnpm db:generate`

2. **Testing**
   - [ ] Test migration up
   - [ ] Test migration down (if applicable)
   - [ ] Test with seed data
   - [ ] Verify data integrity

---

## Common Validation Commands

### Quick Validation (After Each Change)

```bash
# Type check current package
cd apps/api && pnpm typecheck
cd apps/web && pnpm typecheck

# Lint current package
cd apps/api && pnpm lint
cd apps/web && pnpm lint

# Build current package
cd apps/api && pnpm build
cd apps/web && pnpm build
```

### Full Validation (Before Completion)

```bash
# From root directory

# Install dependencies
pnpm install

# Build shared package
pnpm --filter @clearvalue/shared build

# Type check all
pnpm typecheck

# Lint all
pnpm lint

# Build all
pnpm build

# Start dev servers
pnpm dev
```

### Testing API Endpoints

```bash
# Start API server
cd apps/api
pnpm dev

# In another terminal, test endpoint
curl -X GET http://localhost:3000/api/v1/health
curl -X POST http://localhost:3000/api/v1/endpoint \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'
```

### Testing Frontend

```bash
# Start web server (usually auto-starts with pnpm dev)
# Open browser to http://localhost:5173
# Check browser console
# Check Network tab
# Test all interactions
```

---

## Error Resolution Process

### When Errors Occur

1. **Read the Error Message**

   - Understand what the error says
   - Identify the file and line number
   - Check error type (TypeScript, runtime, build, etc.)

2. **Search for Similar Issues**

   - Search codebase for similar patterns
   - Check documentation
   - Review related code

3. **Fix Incrementally**

   - Make minimal changes to fix
   - Re-validate after each fix
   - Don't introduce new errors

4. **Verify Fix**
   - Run validation commands
   - Test functionality
   - Ensure no regressions

### Common Error Types

**TypeScript Errors:**

- Missing types
- Type mismatches
- Missing imports
- **Fix**: Add proper types, fix imports, check type definitions

**Build Errors:**

- Missing dependencies
- Syntax errors
- Configuration issues
- **Fix**: Install dependencies, fix syntax, check config

**Runtime Errors:**

- Null/undefined access
- Missing environment variables
- API failures
- **Fix**: Add null checks, set env vars, handle errors

**Linting Errors:**

- Code style violations
- Unused variables
- Missing return types
- **Fix**: Follow style guide, remove unused code, add types

---

## Completion Criteria

A task is **NOT complete** until:

- [ ] All code compiles without errors
- [ ] All linting passes
- [ ] All type checking passes
- [ ] Code has been manually tested
- [ ] All acceptance criteria are met
- [ ] No regressions introduced
- [ ] Documentation updated (if needed)
- [ ] Code follows project patterns
- [ ] Error handling is comprehensive
- [ ] Build succeeds in production mode

**Never mark a task as complete without running all validation steps.**

---

## Iteration Checklist Template

For each task, use this checklist:

```
Task: [Task Name]

Phase 1: Understanding & Planning
[ ] Requirements understood
[ ] Current state analyzed
[ ] Implementation plan created

Phase 2: Environment Setup
[ ] Prerequisites verified
[ ] Environment ready

Phase 3: Iterative Implementation
[ ] Step 1: [Description] - [ ] Done - [ ] Validated
[ ] Step 2: [Description] - [ ] Done - [ ] Validated
[ ] Step 3: [Description] - [ ] Done - [ ] Validated
...

Phase 4: Testing & Validation
[ ] Manual testing complete
[ ] Integration testing complete
[ ] Edge cases tested

Phase 5: Build Verification
[ ] Full build succeeds
[ ] Production build tested

Phase 6: Code Quality
[ ] Linting passes
[ ] Type checking passes
[ ] Code review checklist complete

Phase 7: Completion Verification
[ ] Acceptance criteria met
[ ] Functionality verified
[ ] Documentation updated

Phase 8: Final Validation
[ ] Clean build succeeds
[ ] Integration verified
[ ] Final checklist complete
```

---

## Best Practices

### DO

✅ **Validate after every change** - Don't accumulate errors  
✅ **Test incrementally** - Test each piece as you build it  
✅ **Fix errors immediately** - Don't leave errors for later  
✅ **Build frequently** - Ensure code compiles  
✅ **Test manually** - Don't assume it works  
✅ **Follow patterns** - Use existing code as reference  
✅ **Use shared types** - Don't duplicate type definitions  
✅ **Handle errors** - Always handle error cases  
✅ **Document decisions** - Comment complex logic

### DON'T

❌ **Don't skip validation** - Always check after changes  
❌ **Don't assume it works** - Test everything  
❌ **Don't accumulate errors** - Fix as you go  
❌ **Don't ignore linting** - Fix all lint errors  
❌ **Don't use `any` types** - Use proper types  
❌ **Don't hardcode values** - Use config/env  
❌ **Don't leave console.logs** - Remove debug code  
❌ **Don't skip error handling** - Always handle errors  
❌ **Don't break existing code** - Test integration

---

## Troubleshooting

### Build Fails

1. Check TypeScript errors: `pnpm typecheck`
2. Check for missing dependencies
3. Verify shared package is built
4. Check for syntax errors
5. Review recent changes

### Tests Fail

1. Check test output for specific failures
2. Verify test data is correct
3. Check for environment variable issues
4. Verify dependencies are installed
5. Check for timing issues in tests

### Runtime Errors

1. Check browser/terminal console
2. Verify environment variables set
3. Check API endpoints are running
4. Verify database connection (if applicable)
5. Check for null/undefined access

### Integration Issues

1. Verify shared package rebuilt
2. Check type compatibility
3. Verify API contracts match
4. Check for breaking changes
5. Review recent changes to dependencies

---

## Summary

**Remember**: This is an iterative process. Don't try to build everything at once. Make small changes, validate each one, test it, then move to the next step. Only mark a task as complete when ALL validation steps pass and ALL acceptance criteria are met.

**Key Rule**: **Never assume code works - always validate it.**

---

## Quick Reference

```bash
# After each change
pnpm typecheck && pnpm lint && pnpm build

# Full validation
pnpm install
pnpm --filter @clearvalue/shared build
pnpm typecheck
pnpm lint
pnpm build
pnpm dev  # Test manually

# Test API
curl http://localhost:3000/api/v1/health

# Test Frontend
# Open http://localhost:5173 in browser
```

---

**This document should be referenced for EVERY task. Follow it systematically to ensure quality and completeness.**
