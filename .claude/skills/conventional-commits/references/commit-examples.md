# Davivienda - Smart Commits & Branches Examples

A comprehensive collection of commit message and branch naming examples following Davivienda's internal standards.

## Commit Format Reminder

```
prefijo((PROYECTO-tarea) - HU(PROYECTO-hu)): descripcion en ingles
```

---

## Features (feat)

### Simple Feature

```
feat((DRDCP-51) - HU(DRDCP-48)): :sparkles: add prevalidation module
```

### Feature with Body

```
feat((OAUTH-2) - HU(OAUTH-1)): :zap: add JWT token generation

Implement JWT-based authentication with refresh token support.
Tokens expire after 1 hour with configurable TTL.
```

### Feature with Issue Reference

```
feat((DRDCP-65) - HU(DRDCP-60)): add webhook signature verification

Add HMAC-SHA256 signature verification for all incoming
webhooks from external services.

Closes #456
```

### Breaking Change Feature

```
feat((DRDCP-80) - HU(DRDCP-75))!: redesign authentication flow

BREAKING CHANGE: The authentication endpoint now requires
OAuth 2.0 instead of API keys. All clients must migrate
to the new OAuth flow.

Migration guide: docs/oauth-migration.md
```

## Bug Fixes (fix)

### Simple Bug Fix

```
fix((DRDCP-57) - HU(DRDCP-57)): :bug: button disable when form filled
```

### Bug Fix with Detailed Explanation

```
fix((DRDCP-62) - HU(DRDCP-58)): :bug: resolve concurrent login race condition

Add pessimistic locking to prevent race condition when
multiple login attempts occur simultaneously for the
same user account.

Fixes #789
```

### Critical Security Fix

```
fix((DRDCP-90) - HU(DRDCP-90)): prevent SQL injection in search

Sanitize user input before constructing SQL queries.
Replaces string interpolation with parameterized queries.

SECURITY: This fixes a critical SQL injection vulnerability.
```

## Documentation (docs)

### Simple Documentation Update

```
docs((DRDCP-70) - HU(DRDCP-65)): :memo: update API endpoint documentation
```

### Comprehensive Documentation

```
docs((DRDCP-72) - HU(DRDCP-65)): :memo: add code review guidelines

Add detailed guidelines for code reviewers covering:
- Security review checklist
- Performance considerations
- Test coverage requirements
- Commit message standards
```

## Refactoring (refactor)

### Simple Refactoring

```
refactor((DRDCP-60) - HU(DRDCP-55)): :recycle: extract validation logic to service
```

### Large Refactoring

```
refactor((DRDCP-63) - HU(DRDCP-55)): :recycle: migrate to Result pattern

Convert all service objects to return explicit Result
objects instead of raising exceptions for control flow.

No behavior changes - pure refactoring.
```

## Performance (perf)

### Simple Performance Improvement

```
perf((DRDCP-75) - HU(DRDCP-70)): :zap: add database index for user lookups
```

### Performance with Details

```
perf((DRDCP-76) - HU(DRDCP-70)): :zap: eliminate N+1 queries in artifacts index

Add eager loading for associated records when fetching artifacts.
Reduces database queries from ~500 to 3 for a typical page load.

Before: 2.3s page load time
After: 0.3s page load time
```

## Tests (test)

### Simple Test Addition

```
test((DRDCP-82) - HU(DRDCP-78)): :white_check_mark: add specs for user authentication
```

### Comprehensive Test Suite

```
test((DRDCP-83) - HU(DRDCP-78)): :white_check_mark: add complete coverage for CreateOrderService

Add unit tests covering:
- Successful order creation
- Validation failures
- Payment processing errors
- Concurrent order handling

Increases coverage from 67% to 95%.
```

## Chores (chore)

### Dependency Update

```
chore((DRDCP-85) - HU(DRDCP-85)): bump angular from 17.0.0 to 18.0.0
```

### CI Configuration

```
ci((DRDCP-88) - HU(DRDCP-85)): add security scanning to CI pipeline

Add SonarQube and Veracode scanning. Scans run on
every PR and integration branch push.
```

## Style (style)

### Code Formatting

```
style((DRDCP-91) - HU(DRDCP-88)): :lipstick: just align text
```

### UI Updates

```
style((DRDCP-92) - HU(DRDCP-88)): :lipstick: update button spacing and colors

Align button styles with design system:
- Increase padding from 8px to 12px
- Update primary color to brand blue
```

## Build (build)

```
build((DRDCP-95) - HU(DRDCP-90)): :wrench: configure Docker for production
```

## Revert (revert)

### Simple Revert

```
revert((DRDCP-98) - HU(DRDCP-95)): revert "feat: add export feature"

This reverts commit a1b2c3d4.
```

### Revert with Explanation

```
revert((DRDCP-99) - HU(DRDCP-95)): revert "perf: add caching layer"

This reverts commit a1b2c3d4.

The caching implementation caused data inconsistency issues
in multi-tenant environments. Reverting until we can implement
tenant-aware cache invalidation.
```

---

## Branch Naming Examples

### Feature Branches

```
feature/DRDCP-51/implemention-prevalidations
feature/DRDCP-65/add-webhook-verification
feature/OAUTH-10/jwt-token-generation
```

### Hotfix Branches

```
hotfix/DRDCP-54/no-upload-customer-documentation
hotfix/DRDCP-90/fix-sql-injection-search
hotfix/v1.2.0
```

### Bugfix Branches

```
bugfix/DRDCP-57/button-disable-form-filled
bugfix/DRDCP-62/concurrent-login-race-condition
bugfix/OAUTH-15/token-refresh-failure
```

---

## Workflow Examples with Versioning

### Example 1: Successful Feature Flow

```bash
# 1. Create feature branch from integration
git checkout integration
git pull origin integration
git checkout -b feature/DRDCP-51/implemention-prevalidations

# 2. Develop and commit
git commit -m "feat((DRDCP-51) - HU(DRDCP-48)): :sparkles: add prevalidation module"

# 3. PR to integration (tag v1.1.0)
# 4. After approval, PR to laboratory (same tag)
# 5. Tester approves, PR to main (same tag)
# 6. Create git release with tag v1.1.0
```

### Example 2: Bug Found in Testing

```bash
# 1. Tester finds bug in laboratory
# 2. Create bugfix branch from integration
git checkout integration
git pull origin integration
git checkout -b bugfix/DRDCP-57/button-disable-form-filled

# 3. Fix and commit
git commit -m "fix((DRDCP-57) - HU(DRDCP-57)): :bug: button disable when form filled"

# 4. PR to integration (tag v1.1.1)
# 5. PR to laboratory, re-test
# 6. PR to main with tag v1.1.1
```

### Example 3: Hotfix in Production

```bash
# 1. Critical bug found in production
# 2. Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/DRDCP-90/fix-sql-injection-search

# 3. Fix and commit
git commit -m "fix((DRDCP-90) - HU(DRDCP-90)): prevent SQL injection in search"

# 4. PR to integration (tag v1.2.1)
# 5. PR to laboratory, validate
# 6. PR to main with tag v1.2.1
# 7. Create git release

# 8. Other developers update their branches
git pull origin integration
```

---

## Anti-Patterns (Avoid These)

### Bad Commit Messages

```
# Missing Jira reference
feat: add user profile

# Past tense
feat((DRDCP-51) - HU(DRDCP-48)): added prevalidation module

# Capitalized first letter
feat((DRDCP-51) - HU(DRDCP-48)): Add prevalidation module

# Period at end
feat((DRDCP-51) - HU(DRDCP-48)): add prevalidation module.

# Vague description
fix((DRDCP-57) - HU(DRDCP-57)): fix stuff

# Description in Spanish
feat((DRDCP-51) - HU(DRDCP-48)): agregar modulo de prevalidacion

# Multiple unrelated changes
feat((DRDCP-51) - HU(DRDCP-48)): add profile, fix login, update readme
```

### Bad Branch Names

```
# Missing project code
feature/add-prevalidations

# Missing issue number
feature/DRDCP/prevalidations

# Wrong separator (underscore instead of hyphen)
feature/DRDCP_51/prevalidations

# No descriptive name
feature/DRDCP-51

# Spaces in name
feature/DRDCP-51/add prevalidation module
```

### Correct Versions

```
# Good commits
feat((DRDCP-51) - HU(DRDCP-48)): :sparkles: add prevalidation module
fix((DRDCP-57) - HU(DRDCP-57)): :bug: button disable when form filled

# Good branches
feature/DRDCP-51/implemention-prevalidations
bugfix/DRDCP-57/button-disable-form-filled
hotfix/DRDCP-90/fix-sql-injection-search
```

---

## Quick Reference

**Commit Format:**
```
prefijo((PROYECTO-tarea) - HU(PROYECTO-hu)): descripcion en ingles
```

**Branch Format:**
```
feature/PROYECTO-N/nombre-descriptivo
bugfix/PROYECTO-N/nombre-descriptivo
hotfix/PROYECTO-N/nombre-descriptivo
```

**Flow:**
```
feature/bugfix → integration → laboratory → main
hotfix (from main) → main + laboratory + integration
```

**Semantic Versioning:**
- New feature: vX.Y.0 (minor bump)
- Bug fix: vX.Y.Z (patch bump)
- Breaking change: vX.0.0 (major bump)
