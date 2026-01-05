# Cursor Agent Configuration

## Overview

This project uses multiple Cursor configuration methods to ensure all AI agents follow consistent project-level instructions and workflows.

## Configuration Files

### 1. `.cursorrules` (Root Level)

**Location**: `.cursorrules` in project root

**Purpose**: Primary project rules file that Cursor automatically includes in every agent conversation.

**Contents**: 
- Core principles and workflow requirements
- Quick reference commands
- Completion checklists
- Project structure overview

**Usage**: Cursor automatically reads this file and includes it in the context for every agent interaction.

### 2. `.cursor/rules/*.mdc` (Structured Rules)

**Location**: `.cursor/rules/` directory

**Purpose**: Structured rule files with metadata for more granular control.

**Files Created**:
- `iterative-execution.mdc` - Enforces the iterative task execution workflow
- `code-standards.mdc` - Defines code style and standards

**Format**: Each `.mdc` file contains:
- **Metadata block** (YAML frontmatter) with:
  - `description`: Brief overview
  - `globs`: File patterns the rule applies to
  - `alwaysApply`: Whether to always include this rule
- **Content**: The actual instructions

**Example**:
```mdc
---
description: Iterative task execution workflow
globs: ["**/*"]
alwaysApply: true
---

# Instructions here...
```

### 3. `AGENTS.md` (Simple Instructions)

**Location**: `AGENTS.md` in project root

**Purpose**: Simple markdown file with agent instructions (no metadata required).

**Contents**: Quick reference and links to detailed documentation.

**Usage**: Cursor can reference this file for straightforward guidance.

## How Cursor Uses These Files

### Automatic Inclusion

Cursor automatically includes these files in the context for every agent conversation:

1. **`.cursorrules`** - Always included
2. **`.cursor/rules/*.mdc`** - Included based on `alwaysApply` flag and `globs` patterns
3. **`AGENTS.md`** - Referenced when available

### Priority

When multiple files exist, Cursor combines them. The `.cursorrules` file serves as the primary reference, with `.cursor/rules/*.mdc` files providing more specific, structured rules.

## Key Features

### 1. Project-Wide Consistency

All agents receive the same instructions, ensuring:
- Consistent code style
- Consistent workflow
- Consistent validation requirements

### 2. Automatic Context

Agents don't need to be explicitly told to read these files - Cursor includes them automatically in every conversation.

### 3. Version Controlled

All configuration files are in the repository, so:
- Team members share the same rules
- Rules are tracked in git history
- Rules can be reviewed and updated collaboratively

## What Gets Included

When an agent starts working on this project, Cursor automatically provides:

1. **Core Principles**: "Never assume code works - always validate it"
2. **Workflow**: Reference to `docs/iterative-task-execution.md`
3. **Code Standards**: TypeScript conventions, naming, error handling
4. **Validation Requirements**: Commands to run after each change
5. **Completion Criteria**: Checklist for task completion

## Maintenance

### Updating Rules

1. **Update `.cursorrules`** for general project rules
2. **Update `.cursor/rules/*.mdc`** for specific, structured rules
3. **Update `AGENTS.md`** for simple quick-reference instructions
4. **Update `docs/iterative-task-execution.md`** for detailed workflow changes

### Best Practices

- Keep rules focused and specific
- Provide clear examples
- Reference detailed documentation rather than duplicating it
- Update rules when project patterns change
- Test that rules are being applied correctly

## Verification

To verify Cursor is using these rules:

1. Start a new conversation with Cursor
2. Ask: "What are the project rules?"
3. The agent should reference these files and the iterative execution guide

## Related Documentation

- `docs/iterative-task-execution.md` - Complete task execution workflow
- `docs/technical-architecture.md` - System architecture
- `docs/development-setup.md` - Development environment
- `docs/api-specification.md` - API contracts
- `docs/data-models.md` - Data structures
- `docs/design-system.md` - Design guidelines

## Summary

This project uses a multi-layered approach to ensure all AI agents:

1. ✅ Follow the iterative task execution workflow
2. ✅ Validate code after every change
3. ✅ Meet completion criteria before marking tasks done
4. ✅ Follow project code standards
5. ✅ Reference detailed documentation

All configuration is version-controlled and automatically included in every agent conversation.

