# Project Agent Configuration

## Git Workflow

**Pre-commit Hooks: NEVER Bypass**

Pre-commit hooks perform essential validation including formatting, linting, and commit message checks. These hooks ensure code quality and consistency.

- **Never** use `--no-verify` or `--no-gpg-sign` flags with git commands
- **Never** skip hooks for any commit, including:
  - Regular commits
  - Hotfixes
  - Emergency fixes
  - WIP commits
  - All other commits

If a hook fails, fix the underlying issue rather than bypassing the hook.
