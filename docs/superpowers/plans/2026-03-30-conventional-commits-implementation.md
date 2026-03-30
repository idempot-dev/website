# Conventional Commits Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add conventional commits verification via pre-commit hook (husky) and GitHub workflow

**Architecture:** Mirror idempot-js setup exactly - use commitlint with config-conventional, husky for git hooks

**Tech Stack:** npm, commitlint, husky, GitHub Actions

---

## Chunk 1: Install Dependencies

### Files
- Modify: `package.json`

- [ ] **Step 1: Install commitlint and husky**

```bash
npm install -D @commitlint/cli @commitlint/config-conventional husky
```

- [ ] **Step 2: Verify package.json updated**

Expected: devDependencies includes `@commitlint/cli`, `@commitlint/config-conventional`, `husky`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add commitlint and husky dependencies"
```

---

## Chunk 2: Configure Commitlint

### Files
- Create: `.commitlintrc.json`

- [ ] **Step 1: Create commitlint config**

```json
{
  "extends": ["@commitlint/config-conventional"]
}
```

Save to `.commitlintrc.json`

- [ ] **Step 2: Commit**

```bash
git add .commitlintrc.json
git commit -m "chore: add commitlint config"
```

---

## Chunk 3: Setup Husky

### Files
- Create: `.husky/commit-msg`
- Create: `.git/hooks/commit-msg` (via husky)
- Modify: `package.json` (husky init)

- [ ] **Step 1: Initialize husky**

```bash
npx husky init
```

- [ ] **Step 2: Create commit-msg hook**

Create `.husky/commit-msg`:
```sh
npx --no -- commitlint --edit ${1}
```

- [ ] **Step 3: Make hook executable**

```bash
chmod +x .husky/commit-msg
```

- [ ] **Step 4: Commit**

```bash
git add .husky/ package.json
git commit -m "chore: add husky commit-msg hook"
```

---

## Chunk 4: Add GitHub Workflow

### Files
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Create workflows directory**

```bash
mkdir -p .github/workflows
```

- [ ] **Step 2: Create CI workflow**

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  HUSKY: 0

jobs:
  commitlint:
    name: Commitlint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - name: Install dependencies
        run: npm ci
      - name: Validate commit messages
        run: npx commitlint --from origin/main --to HEAD
```

Save to `.github/workflows/ci.yml`

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add commitlint workflow"
```

---

## Chunk 5: Verify

### Files
- Modify: (verification only)

- [ ] **Step 1: Test pre-commit hook with invalid message**

```bash
echo "bad message" | git commit -m "test" --allow-empty --no-verify 2>&1 || true
# Actually test with proper hook - create temp commit
git commit --allow-empty -m "test: testing" --no-verify
```

Then try valid message:
```bash
git commit --allow-empty -m "feat: valid commit" --no-verify
```

- [ ] **Step 2: Verify hook catches bad message**

Expected: Running `git commit -m "bad message"` should fail with commitlint error

- [ ] **Step 3: Final commit**

```bash
git commit --allow-empty -m "chore: verify conventional commits setup"
```
