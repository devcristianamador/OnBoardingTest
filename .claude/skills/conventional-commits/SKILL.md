---
name: conventional-commits
description: This skill should be used when creating Git commits and branches to ensure they follow Davivienda's Smart Commits and Smart Branches standards. It provides guidance on commit message structure (with Jira task/HU references), branch naming conventions, and the custom Gitflow (integration → laboratory → main). Use when committing code, creating branches, or reviewing commit/branch naming.
---

# Davivienda - Smart Commits & Smart Branches

This skill provides guidance for writing Git commits and managing branches following Davivienda's internal standards, based on Conventional Commits (v1.0.0) with project-specific extensions.

## When to Use This Skill

Use this skill when:
- Creating Git commits
- Creating or naming Git branches
- Reviewing commit messages or branch names in PRs
- Following the project's Gitflow workflow
- Applying semantic versioning tags

---

## Commit Message Structure

### Format

```
prefijo((PROYECTO-numeroDeTarea) - HU(PROYECTO-numeroDeHU)): descripcion en ingles
```

### Four Parts

1. **Prefijo (type)**: Relates to the activity being performed (see Commit Types below)
2. **PROYECTO-NumeroDeTarea**: The Jira project code followed by a hyphen and the task number (e.g., `OAUTH-2`)
3. **HU(PROYECTO-NumeroDeHistoriaDeUsuario)**: The user story reference in Jira (e.g., `HU(OAUTH-1)`)
4. **Descripcion**: A description in English of the task. May optionally include a git-emoji prefix

### Examples

```
feat((OAUTH-2) - HU(OAUTH-1)): :zap: initial commit
fix((DRDCP-54) - HU(DRDCP-50)): :bug: resolve upload customer documentation
refactor((DRDCP-60) - HU(DRDCP-55)): extract validation logic to service
docs((DRDCP-70) - HU(DRDCP-65)): update API endpoint documentation
```

### When There Is No User Story (HU)

When fixing a bug or working on something not linked to a user story, create a bug-type issue in the Jira board first. That issue becomes the HU reference:

```
fix((DRDCP-57) - HU(DRDCP-57)): :bug: button disable when form filled
```

## Commit Types (Prefijos)

| Type | Description |
|------|-------------|
| **feat** | A new feature |
| **fix** | A bug fix |
| **docs** | Documentation only changes |
| **style** | Changes that don't affect code meaning (whitespace, formatting, missing semicolons, etc.) |
| **refactor** | Code change that neither fixes a bug nor adds a feature |
| **perf** | A code change that improves performance |
| **test** | Adding or correcting tests |
| **chore** | Small changes that don't modify source code logic or production (build process, auxiliary tools) |
| **ci** | Changes to CI configuration files and scripts |
| **build** | Changes that affect the build system or external dependencies (gulp, broccoli, npm) |
| **revert** | Reverts a previous commit |

## Description Rules

- Use imperative, present tense: "add" not "added" or "adds"
- Don't capitalize first letter
- No period (.) at the end
- Keep under 72 characters (ideally under 50)
- Write in English
- Optionally prefix with a git-emoji (e.g., `:zap:`, `:bug:`, `:lipstick:`)

## Body (Optional)

```
feat((OAUTH-2) - HU(OAUTH-1)): :zap: add webhook signature verification

Add HMAC-SHA256 signature verification for all incoming webhooks
to prevent unauthorized access and replay attacks.
```

## Footer (Optional)

### Breaking Changes

```
feat((DRDCP-80) - HU(DRDCP-75))!: change authentication endpoint

BREAKING CHANGE: The /auth endpoint now requires a client_id parameter.
```

### Issue References

```
fix((DRDCP-57) - HU(DRDCP-50)): resolve session timeout bug

Fixes #123
Closes #456
```

---

## Branch Naming Convention

### Long-Lived Branches (Ramas de Larga Duracion)

| Branch | Purpose | Deploys to |
|--------|---------|------------|
| **main** | Production-ready code. Only merges from `laboratory` after full approval | Production (cloud-prod) |
| **laboratory** | Pre-production testing. Stable replica of what will go to production | Laboratory (cloud-laboratory) |
| **integration** | Development integration. Features and hotfixes are merged here first | Integration (cloud-integration) |

**Rules:**
- No direct development on `main`
- All merges require review and approval
- `laboratory` must always be in a functional state
- `integration` must pass CI before merging to `laboratory`
- Apply semantic versioning when merging to `integration`

### Short-Lived Branches (Ramas de Corta Duracion)

#### feature/*
- **Purpose**: New feature development
- **Created from**: `integration`
- **Merged into**: `integration`
- **Naming**: `feature/CODIGO_PROYECTO-NUMERO_HU/nombre-caracteristica`
- **Example**: `feature/DRDCP-51/implemention-prevalidations`

#### hotfix/*
- **Purpose**: Critical production bug fixes
- **Created from**: `main`
- **Merged into**: `main`, `laboratory`, and `integration`
- **Naming**: `hotfix/CODIGO_PROYECTO-NUMERO_BUG/nombre-hotfix`
- **Example**: `hotfix/DRDCP-54/no-upload-customer-documentation`

#### bugfix/*
- **Purpose**: Non-critical bug fixes found during development/integration
- **Created from**: `integration`
- **Merged into**: `integration`
- **Naming**: `bugfix/CODIGO_PROYECTO-NUMERO_BUG/nombre-bugfix`
- **Example**: `bugfix/DRDCP-57/button-disable-form-filled`

---

## Gitflow Workflow

### Flow Direction

```
feature/bugfix → integration → laboratory → main
                                    ↑
hotfix (from main) ────────────────→ main + laboratory + integration
```

### PR Review Requirements

| Target Branch | Required Reviewers |
|---------------|--------------------|
| **integration** | 2 reviews: any combination of developers, architects, DevOps, or agile (different from PR author) |
| **laboratory** | 2 reviews: 1 from team + 1 mandatory from architect or DevOps |
| **main** | 2 reviews: 1 from any developer + 1 from architect and/or DevOps |

### Workflow Steps

1. **Feature Development**:
   - Create `feature/XX-N/name` from `integration`
   - Develop and commit following Smart Commits standard
   - PR to `integration` with semantic version tag (e.g., `v1.1.0`)
   - After approval and merge, validate in cloud-integration

2. **Pre-Production Testing**:
   - PR from `integration` to `laboratory`
   - Architect/DevOps approves deployment to cloud-laboratory
   - Tester validates functionality
   - Once approved, PR to `main`

3. **Production Release**:
   - PR from `laboratory` to `main`
   - After merge, create a git release with the corresponding tag

4. **Bug Found in Testing**:
   - Create `bugfix/XX-N/name` from `integration`
   - Fix the bug, PR to `integration` with patch version (e.g., `v1.1.1`)
   - PR to `laboratory`, re-test, then PR to `main`

5. **Hotfix in Production**:
   - Create `hotfix/XX-N/name` from `main`
   - Fix the critical bug
   - PR to `integration` (ensure no conflicts with parallel development)
   - PR to `laboratory`, then to `main` with patch version tag
   - Merge `integration` into any active feature branches to propagate the fix

### Keeping Branches Updated

When parallel development is happening, developers should pull from long-lived branches to stay current:
```bash
git pull origin main
git pull origin laboratory
git pull origin integration
```

---

## Semantic Versioning

Use semantic versioning for tags when merging to `integration`:
- **MAJOR** (vX.0.0): Breaking changes or major new functionality
- **MINOR** (v0.X.0): New features (`feat`)
- **PATCH** (v0.0.X): Bug fixes (`fix`, `bugfix`, `hotfix`)

Examples:
- New feature: `v1.1.0` → `v1.2.0`
- Bug fix: `v1.1.0` → `v1.1.1`
- Hotfix: `v1.2.0` → `v1.2.1`

---

## Common Git-Emoji References

| Emoji | Code | Usage |
|-------|------|-------|
| :zap: | `:zap:` | Improve performance / initial work |
| :bug: | `:bug:` | Fix a bug |
| :lipstick: | `:lipstick:` | UI/style changes |
| :sparkles: | `:sparkles:` | New feature |
| :memo: | `:memo:` | Documentation |
| :wrench: | `:wrench:` | Configuration |
| :recycle: | `:recycle:` | Refactoring |
| :white_check_mark: | `:white_check_mark:` | Tests |
| :fire: | `:fire:` | Remove code/files |
| :rocket: | `:rocket:` | Deploy |

---

## Best Practices

- Make commits atomic (one logical change per commit)
- Use CommitLint to validate commit messages
- Write descriptions in English
- Reference Jira tasks in every commit
- Break up large changes into multiple commits
- Each commit should leave the code in a working state
- Clean up short-lived branches after merging
- All merges must go through pull requests with code review
- Use CI tools (SonarQube, Veracode, Orca) for automated checks

For detailed examples, see `references/commit-examples.md`.
