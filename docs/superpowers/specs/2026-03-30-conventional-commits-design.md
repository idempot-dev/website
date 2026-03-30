# Conventional Commits Setup

## Goal

Add conventional commits verification via pre-commit hook and GitHub workflow.

## Approach

Mirror idempot-js setup exactly.

## Implementation

### 1. Dependencies

Add to `package.json`:

- `@commitlint/cli`
- `@commitlint/config-conventional`
- `husky`
- `@husky/pre-push`

Run `npm install` to install and generate lockfile.

### 2. Commitlint Config

Create `.commitlintrc.json`:

```json
{
  "extends": ["@commitlint/config-conventional"]
}
```

### 3. Husky Setup

Initialize husky: `npx husky init`

This creates `.husky/` directory with `pre-commit` hook.

Add `commit-msg` hook at `.husky/commit-msg`:

```sh
npx --no -- commitlint --edit ${1}
```

### 4. GitHub Workflow

Create `.github/workflows/ci.yml`:

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

## Verification

- Pre-commit: Try committing with non-conforming message → should fail
- GitHub: Open PR with non-conforming message → job should fail
