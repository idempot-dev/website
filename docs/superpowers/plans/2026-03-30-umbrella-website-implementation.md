# Umbrella Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the VitePress site into an umbrella website for idempotency projects with a hero section, feature cards, project cards, and cucumber specs hosting.

**Architecture:** VitePress static site with custom frontmatter for hero/features, plus markdown pages for why-idempotency and specs. Feature cards use VitePress built-in `features` frontmatter; project cards use a custom markdown section.

**Tech Stack:** VitePress 2.0, Markdown

---

## File Changes

| Action | Path                             |
| ------ | -------------------------------- |
| Modify | `.vitepress/config.mjs`          |
| Modify | `docs/index.md`                  |
| Create | `docs/why-idempotency.md`        |
| Create | `docs/specs/idempotency.feature` |
| Create | `docs/specs/index.md`            |

---

## Chunk 1: VitePress Configuration

### Task 1: Update VitePress Config

**File:** `.vitepress/config.mjs`

- [ ] **Step 1: Read current config**

Read: `.vitepress/config.mjs`

- [ ] **Step 2: Update config with new navigation and sidebar**

Replace the entire config with:

```js
import { defineConfig } from "vitepress";

export default defineConfig({
  srcDir: "docs",

  title: "idempot.dev",
  description: "Idempotency middlewares for resilient APIs",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Why Idempotency", link: "/why-idempotency" },
      { text: "Specs", link: "/specs" }
    ],
    sidebar: [
      {
        text: "Documentation",
        items: [
          { text: "Why Idempotency", link: "/why-idempotency" },
          { text: "Specifications", link: "/specs" }
        ]
      },
      {
        text: "Projects",
        items: [
          {
            text: "idempot-js",
            link: "https://github.com/idempot-dev/idempot-js"
          }
        ]
      }
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/idempot-dev" }]
  }
});
```

Note: Projects sidebar links externally to GitHub since there's no local project docs yet.

- [ ] **Step 3: Commit**

```bash
git add .vitepress/config.mjs
git commit -m "feat(config): update navigation and sidebar for umbrella site"
```

---

## Chunk 2: Homepage

### Task 2: Update Homepage with Hero and Features

**File:** `docs/index.md`

- [ ] **Step 1: Read current homepage**

Read: `docs/index.md`

- [ ] **Step 2: Replace with new homepage content**

Replace entire file with:

```markdown
---
layout: home

hero:
  name: "idempot.dev"
  text: "Idempotency middlewares"
  tagline: Once is enough.
  actions:
    - theme: brand
      text: Why Idempotency
      link: /why-idempotency
    - theme: alt
      text: View Specs
      link: /specs

features:
  - title: IETF Spec Compliant
    details: Implements draft-ietf-httpapi-idempotency-key-header-07
  - title: Request Fingerprinting
    details: Detects conflicts when the same key is used with different payloads
  - title: Pluggable Storage
    details: Redis, PostgreSQL, MySQL, SQLite — use your existing infrastructure
---

## Projects

### idempot-js

Idempotency middleware for Hono, Express, and Fastify.

**Frameworks:** Hono, Express, Fastify
**Runtimes:** Node.js, Bun, Deno

[GitHub](https://github.com/idempot-dev/idempot-js) · [npm](https://www.npmjs.com/package/@idempot/core)
```

- [ ] **Step 3: Commit**

```bash
git add docs/index.md
git commit -m "feat(homepage): add hero, features, and project cards"
```

---

## Chunk 3: Why Idempotency Page

### Task 3: Create Why Idempotency Page

**File:** `docs/why-idempotency.md`

- [ ] **Step 1: Create why-idempotency.md**

Create: `docs/why-idempotency.md`

```markdown
# Why Idempotency Matters

In distributed systems, requests fail. Networks timeout, load balancers retry, users double-click. Without protection, these failures create duplicate transactions—double charges, duplicate orders, inconsistent state.

## The Problem

Duplicate requests happen more often than you'd think:

| Cause            | Example                               |
| ---------------- | ------------------------------------- |
| User behavior    | Double-clicking a submit button       |
| Client retries   | Automatic retry on connection timeout |
| Network issues   | Request succeeds but response is lost |
| Load balancers   | Backend timeout triggers retry        |
| Webhook delivery | Provider retries failed deliveries    |

Each duplicate request can create unintended side effects: duplicate payments, multiple orders, inconsistent data.

## The Pattern

Major APIs like Stripe and PayPal use a simple pattern to solve this:

1. **Client generates a unique key** — typically a UUID for each unique operation
2. **Key sent as header** — `Idempotency-Key: <uuid>`
3. **Server stores key + response** — in your database or cache
4. **On duplicate request** — server returns cached response instead of reprocessing

This makes any request safely retryable. The server either processes it once and caches the result, or recognizes the key and returns the previous result.

## Benefits

- **Fault tolerance**: Network interruptions don't cause duplicate transactions
- **Simplified retry logic**: Clients can safely retry without complex deduplication
- **Better UX**: Users don't wonder "did that go through?"
- **API reliability**: Stripe, PayPal, and major processors all use this pattern

The IETF is standardizing this pattern in [draft-ietf-httpapi-idempotency-key-header-07](https://datatracker.ietf.org/doc/html/draft-ietf-httpapi-idempotency-key-header-07).
```

- [ ] **Step 2: Commit**

```bash
git add docs/why-idempotency.md
git commit -m "feat(docs): add why-idempotency page"
```

---

## Chunk 4: Specifications Page

### Task 4: Copy Cucumber Spec File

**File:** `docs/specs/idempotency.feature`

- [ ] **Step 1: Create specs directory**

```bash
mkdir -p docs/specs
```

- [ ] **Step 2: Copy feature file**

```bash
cp ../idempot-js/tests/spec/idempotency.feature docs/specs/idempotency.feature
```

- [ ] **Step 3: Commit**

```bash
git add docs/specs/idempotency.feature
git commit -m "feat(specs): add canonical cucumber spec from idempot-js"
```

### Task 5: Create Specs Index Page

**File:** `docs/specs/index.md`

- [ ] **Step 1: Create specs index page**

Create: `docs/specs/index.md`

Note: VitePress doesn't have built-in file inclusion. We'll display the feature file content directly with a link to download the raw file.

```markdown
# Cucumber Specifications

RFC 7807-compliant specifications for idempotency middleware implementations.

## Overview

These specifications define the expected behavior for idempotency middleware implementations. They cover:

- **Header Validation** (Section 2.1) — Syntax and key format requirements
- **First Request Handling** (Section 2.6) — Processing and storing new requests
- **Duplicate Request Handling** (Section 2.6 - Retry) — Returning cached responses
- **Fingerprint Conflict** (Section 2.2) — Detecting same body, different key
- **Key Reuse Conflict** (Section 2.2) — Detecting same key, different body
- **Concurrent Request Handling** (Section 2.6) — Handling in-flight requests
- **Error Response Format** (Section 2.7) — RFC 7807 Problem Details format

## Download

[Download idempotency.feature](/specs/idempotency.feature) — Use in your test suite

## Specification

The full specification is available in the [idempotency.feature](https://github.com/idempot-dev/website/blob/main/docs/specs/idempotency.feature) file.
```

- [ ] **Step 2: Commit**

```bash
git add docs/specs/index.md
git commit -m "feat(specs): add specs index page"
```

---

## Verification

### Task 6: Verify Build

- [ ] **Step 1: Build the site**

```bash
npm run build
```

- [ ] **Step 2: Preview the site**

```bash
npm run preview
```

- [ ] **Step 3: Check all pages**

Open browser and verify:

- `/` — Hero, features, project cards visible
- `/why-idempotency` — Content renders correctly
- `/specs` — Feature file embedded or displayed

- [ ] **Step 4: Run linting**

```bash
npm run lint
npm run format:check
```

---

## Final Commit

- [ ] **Step 1: Push changes**

```bash
git push origin main
```
