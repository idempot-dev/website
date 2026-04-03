# Learn Section Import Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Import the /learn/ section from idempot-js VitePress site, replacing the existing "Why Idempotency" page.

**Architecture:** Add mermaid plugin support to VitePress, copy 5 learn pages from idempot-js with context modifications for framework-specific code, convert sidebar from array to object format for path-specific sidebars, update navigation to replace "Why Idempotency" with "Learn".

**Tech Stack:** VitePress 2.0, vitepress-plugin-mermaid 2.0.17, Markdown, Mermaid diagrams

---

## Task 1: Add Mermaid Plugin Dependency

**Files:**

- Modify: `package.json`

- [ ] **Step 1: Add vitepress-mermaid-renderer dependency**

Open `package.json` and add the mermaid plugin to devDependencies after vitepress:

```json
"devDependencies": {
  "@commitlint/cli": "^20.5.0",
  "@commitlint/config-conventional": "^20.5.0",
  "@eslint/js": "^10.0.1",
  "eslint": "^10.1.0",
  "eslint-config-prettier": "^10.1.8",
  "globals": "^17.4.0",
  "husky": "^9.1.7",
  "lint-staged": "^16.4.0",
  "prettier": "^3.8.1",
  "vitepress": "^2.0.0-alpha.17",
  "vitepress-mermaid-renderer": "^1.1.20"
}
```

Note: Using vitepress-mermaid-renderer instead of vitepress-plugin-mermaid for VitePress 2.x compatibility.

- [ ] **Step 2: Install dependencies**

Run: `npm install`

Expected: Dependencies install successfully, package-lock.json updates.

- [ ] **Step 3: Verify installation**

Run: `grep vitepress-mermaid-renderer package-lock.json`

Expected: Shows vitepress-mermaid-renderer entry with version 1.1.20.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add vitepress-plugin-mermaid dependency"
```

---

## Task 2: Configure Mermaid in VitePress

**Files:**

- Create: `.vitepress/theme/index.js`

- [ ] **Step 1: Create theme directory**

Run: `mkdir -p .vitepress/theme`

- [ ] **Step 2: Create theme/index.js**

Create `.vitepress/theme/index.js` with the following content:

```javascript
import { h, nextTick, watch } from "vue";
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
import { createMermaidRenderer } from "vitepress-mermaid-renderer";

export default {
  extends: DefaultTheme,
  Layout: () => {
    const { isDark } = useData();

    const initMermaid = () => {
      const mermaidRenderer = createMermaidRenderer({
        theme: isDark.value ? "dark" : "forest"
      });
    };

    // initial mermaid setup
    nextTick(() => initMermaid());

    // on theme change, re-render mermaid charts
    watch(
      () => isDark.value,
      () => {
        initMermaid();
      }
    );

    return h(DefaultTheme.Layout);
  }
};
```

- [ ] **Step 3: Verify configuration loads**

Run: `npm run dev`

Expected: Development server starts without errors.

- [ ] **Step 4: Stop dev server**

Press: `Ctrl+C`

- [ ] **Step 5: Commit**

```bash
git add .vitepress/theme/index.js
git commit -m "feat: configure mermaid renderer in vitepress theme"
```

Note: Using vitepress-mermaid-renderer with theme-based configuration (compatible with VitePress 2.x) instead of vitepress-plugin-mermaid (requires VitePress 1.x).

---

## Task 3: Create Learn Directory and Index Page

**Files:**

- Create: `docs/learn/index.md`

- [ ] **Step 1: Create learn directory**

Run: `mkdir -p docs/learn`

- [ ] **Step 2: Create index.md**

Read source: `~/code/idempot-dev/idempot-js/docs/learn/index.md`

Create `docs/learn/index.md` with identical content (no modifications needed for index):

```markdown
# Learn

Idempotency is essential for reliable distributed systems. When networks fail and clients retry requests, idempotency prevents duplicate transactions—no double charges, no duplicate orders.

## Key Concepts

### Why Idempotency Matters

Every API that processes payments, creates orders, or modifies state needs idempotency. Without it, network failures and client retries create duplicate transactions. **[Learn why →](/learn/why)**

### Duplicated vs Repeated Operations

Idempotency protects against duplicates from retries while allowing legitimate repeated operations. Use a different idempotency key for each distinct business operation. **[Learn the difference →](/learn/duplicated-vs-repeated)**

### Client Key Strategies

How should you generate idempotency keys? Learn patterns for managing keys in your client applications. **[See strategies →](/learn/client-key-strategies)**

### IETF Specification

This library implements the IETF draft standard for idempotency keys. Understanding the spec helps you implement idempotency correctly and interoperate with other systems. **[Read the spec compliance guide →](/learn/spec)**

## What You'll Learn

- The problem duplicates create in distributed systems
- How the idempotency-key pattern works
- What the IETF specification requires
- Implementation details for each requirement
```

- [ ] **Step 3: Verify file created**

Run: `ls -la docs/learn/`

Expected: Shows `index.md` file.

- [ ] **Step 4: Commit**

```bash
git add docs/learn/index.md
git commit -m "docs: add learn section index page"
```

---

## Task 4: Create Why Idempotency Page with Diagrams

**Files:**

- Create: `docs/learn/why.md`

- [ ] **Step 1: Copy source file**

Run: `cp ~/code/idempot-dev/idempot-js/docs/learn/why.md docs/learn/why.md`

Expected: File copied successfully.

- [ ] **Step 2: Verify file exists**

Run: `ls -la docs/learn/why.md`

Expected: Shows file details, file exists.

- [ ] **Step 3: Verify content preserved**

Run: `grep -c "mermaid" docs/learn/why.md`

Expected: Returns 2 (two mermaid diagrams present).

Run: `grep -c "youtube" docs/learn/why.md`

Expected: Returns 1 (YouTube embed present).

- [ ] **Step 4: Commit**

```bash
git add docs/learn/why.md
git commit -m "docs: add why idempotency page with mermaid diagrams"
```

---

## Task 5: Create Duplicated vs Repeated Page with Context

**Files:**

- Create: `docs/learn/duplicated-vs-repeated.md`

- [ ] **Step 1: Copy source file**

Run: `cp ~/code/idempot-dev/idempot-js/docs/learn/duplicated-vs-repeated.md docs/learn/duplicated-vs-repeated.md`

Expected: File copied successfully.

- [ ] **Step 2: Add context note before Hono example**

Use the edit tool to insert the context note after the "## Server Implementation" heading.

The file currently has:

````markdown
## Server Implementation

```javascript
import { Hono } from "hono";
```
````

Change it to:

````markdown
## Server Implementation

**Note:** The following example uses idempot-js middleware with the Hono framework. For framework-specific implementations, see the [idempot-js documentation](https://github.com/idempot-dev/idempot-js).

```javascript
import { Hono } from "hono";
```
````

- [ ] **Step 3: Verify edit**

Run: `grep -A 2 "## Server Implementation" docs/learn/duplicated-vs-repeated.md`

Expected: Shows the heading followed by the context note.

- [ ] **Step 4: Commit**

```bash
git add docs/learn/duplicated-vs-repeated.md
git commit -m "docs: add duplicated vs repeated page with framework context"
```

---

## Task 6: Create Client Key Strategies Page

**Files:**

- Create: `docs/learn/client-key-strategies.md`

- [ ] **Step 1: Copy source file**

Run: `cp ~/code/idempot-dev/idempot-js/docs/learn/client-key-strategies.md docs/learn/client-key-strategies.md`

Expected: File copied successfully.

- [ ] **Step 2: Verify file exists**

Run: `ls -la docs/learn/client-key-strategies.md`

Expected: Shows file details, file exists.

- [ ] **Step 3: Verify content**

Run: `grep "Strategy" docs/learn/client-key-strategies.md | head -n 2`

Expected: Shows "Strategy 1: Random Keys" and "Strategy 2: Database ID as Key".

- [ ] **Step 4: Commit**

```bash
git add docs/learn/client-key-strategies.md
git commit -m "docs: add client key strategies page"
```

---

## Task 7: Create Spec Compliance Page

**Files:**

- Create: `docs/learn/spec.md`

- [ ] **Step 1: Copy source file**

Run: `cp ~/code/idempot-dev/idempot-js/docs/learn/spec.md docs/learn/spec.md`

Expected: File copied successfully.

- [ ] **Step 2: Add context note at start of requirements section**

Use the edit tool to insert the context note after the "## Implemented Requirements" heading.

The file currently has:

```markdown
## Implemented Requirements

### MUST Requirements (Required)
```

Change it to:

```markdown
## Implemented Requirements

**Note:** This page describes idempot-js implementation of the IETF specification. For other implementations, refer to your framework's documentation.

### MUST Requirements (Required)
```

- [ ] **Step 3: Verify edit**

Run: `grep -A 3 "## Implemented Requirements" docs/learn/spec.md`

Expected: Shows the heading followed by the context note.

- [ ] **Step 4: Commit**

```bash
git add docs/learn/spec.md
git commit -m "docs: add IETF spec compliance page with implementation context"
```

---

## Task 8: Update Navigation and Sidebar

**Files:**

- Modify: `.vitepress/config.mjs`

- [ ] **Step 1: Update navigation**

Replace the nav section to change "Why Idempotency" to "Learn":

```javascript
nav: [
  { text: "Home", link: "/" },
  { text: "Learn", link: "/learn/" },
  { text: "Specs", link: "/specs" }
];
```

- [ ] **Step 2: Convert sidebar to object format**

Replace the entire sidebar array with object format for path-specific sidebars:

```javascript
sidebar: {
  "/learn/": [
    {
      text: "Learn",
      items: [
        { text: "Overview", link: "/learn/" },
        { text: "Why Idempotency", link: "/learn/why" },
        { text: "Duplicated vs Repeated", link: "/learn/duplicated-vs-repeated" },
        { text: "Client Key Strategies", link: "/learn/client-key-strategies" },
        { text: "Spec Compliance", link: "/learn/spec" }
      ]
    }
  ],
  "/": [
    {
      text: "Documentation",
      items: [
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
  ]
}
```

Note: "Why Idempotency" is removed from Documentation section since it's now under Learn.

- [ ] **Step 3: Verify configuration**

Run: `npm run dev`

Navigate to `http://localhost:5173/learn/`

Expected: Learn index page loads with correct sidebar.

- [ ] **Step 4: Stop dev server**

Press: `Ctrl+C`

- [ ] **Step 5: Commit**

```bash
git add .vitepress/config.mjs
git commit -m "feat: update navigation to add learn section, remove why-idempotency"
```

---

## Task 9: Delete Old Why Idempotency Page

**Files:**

- Delete: `docs/why-idempotency.md`

- [ ] **Step 1: Delete file**

Run: `rm docs/why-idempotency.md`

- [ ] **Step 2: Verify deletion**

Run: `git status`

Expected: Shows `deleted: docs/why-idempotency.md`

- [ ] **Step 3: Commit**

```bash
git add docs/why-idempotency.md
git commit -m "docs: remove old why-idempotency page (replaced by learn section)"
```

---

## Task 10: Run Tests and Verify

**Files:**

- None (testing only)

- [ ] **Step 1: Start development server**

Run: `npm run dev`

- [ ] **Step 2: Test learn index page**

Navigate to: `http://localhost:5173/learn/`

Expected: Learn index page loads with sidebar showing all 5 pages.

- [ ] **Step 3: Test mermaid diagrams**

Navigate to: `http://localhost:5173/learn/why`

Expected: Two sequence diagrams render correctly after "The Problem" and "The Pattern" sections.

- [ ] **Step 4: Test YouTube embed**

On `/learn/why`, scroll to bottom.

Expected: YouTube video embed appears and can be played.

- [ ] **Step 5: Test sidebar navigation**

Click each sidebar link:

- Overview → /learn/
- Why Idempotency → /learn/why
- Duplicated vs Repeated → /learn/duplicated-vs-repeated
- Client Key Strategies → /learn/client-key-strategies
- Spec Compliance → /learn/spec

Expected: Each page loads correctly.

- [ ] **Step 6: Test internal links**

On `/learn/`, click "Learn why →"

Expected: Navigates to `/learn/why`

- [ ] **Step 7: Test code examples with syntax highlighting**

Navigate to: `http://localhost:5173/learn/duplicated-vs-repeated`

Expected: JavaScript/Hono code examples display with syntax highlighting.

- [ ] **Step 8: Test top navigation**

Click "Learn" in top nav.

Expected: Navigates to `/learn/`

- [ ] **Step 9: Stop dev server**

Press: `Ctrl+C`

- [ ] **Step 10: Build for production**

Run: `npm run build`

Expected: Build completes successfully without errors.

- [ ] **Step 11: Preview production build**

Run: `npm run preview`

Navigate to: `http://localhost:4173/learn/`

Expected: Production build works correctly with all pages accessible.

- [ ] **Step 12: Stop preview**

Press: `Ctrl+C`

---

## Task 11: Final Verification

- [ ] **Step 1: Check git status**

Run: `git status`

Expected: Working tree clean (all changes committed).

- [ ] **Step 2: Review commit history**

Run: `git log --oneline -n 10`

Expected: See all 9 commits in order:

1. chore: add vitepress-plugin-mermaid dependency
2. feat: configure mermaid diagram support in vitepress
3. docs: add learn section index page
4. docs: add why idempotency page with mermaid diagrams
5. docs: add duplicated vs repeated page with framework context
6. docs: add client key strategies page
7. docs: add IETF spec compliance page with implementation context
8. feat: update navigation to add learn section, remove why-idempotency
9. docs: remove old why-idempotency page (replaced by learn section)

- [ ] **Step 3: Verify file structure**

Run: `find docs/learn -type f`

Expected:

```
docs/learn/client-key-strategies.md
docs/learn/duplicated-vs-repeated.md
docs/learn/index.md
docs/learn/spec.md
docs/learn/why.md
```

- [ ] **Step 4: Confirm old file deleted**

Run: `ls docs/why-idempotency.md`

Expected: `No such file or directory`

---

## Success Criteria

✓ All 5 learn pages accessible at /learn/\* paths
✓ Mermaid diagrams render correctly
✓ YouTube video embeds properly
✓ Navigation works for both desktop and mobile
✓ Internal links between learn pages work correctly
✓ Code examples display with syntax highlighting
✓ Production build succeeds
✓ All 9 commits in logical order with descriptive messages
