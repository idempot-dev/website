# Learn Section Import Design

## Overview

Import the `/learn/` section from the idempot-js VitePress site into idempot.dev, replacing the existing "Why Idempotency" page.

## Goals

- Replace the simple "Why Idempotency" page with a comprehensive learn section
- Preserve all content including mermaid diagrams and YouTube embed
- Maintain site coherence while acknowledging framework-specific examples

## Scope

**Import:** 5 pages from idempot-js/docs/learn/:

- index.md (overview)
- why.md (with mermaid diagrams, YouTube video)
- duplicated-vs-repeated.md (with code examples)
- client-key-strategies.md (JavaScript patterns)
- spec.md (IETF compliance)

**Replace:** Current docs/why-idempotency.md

## Architecture

### File Structure

```
docs/
  ├── learn/
  │   ├── index.md
  │   ├── why.md
  │   ├── duplicated-vs-repeated.md
  │   ├── client-key-strategies.md
  │   └── spec.md
  ├── index.md (existing)
  └── specs/ (existing)

Delete: docs/why-idempotency.md
```

### Navigation

**Top nav:** Simple link to /learn/ (not a dropdown)

```javascript
{ text: "Learn", link: "/learn/" }
```

**Sidebar:** Context-aware sidebar for /learn/ section

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
  // other paths...
}
```

## Technical Changes

### Dependencies

Add to package.json:

```json
"vitepress-plugin-mermaid": "^2.0.17"
```

### VitePress Configuration

```javascript
import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(
  defineConfig({
    srcDir: "docs",
    markdown: { mermaid: true },
    vite: {
      optimizeDeps: {
        include: [
          "dayjs",
          "@braintree/sanitize-url",
          "debug",
          "cytoscape",
          "cytoscape-cose-bilkent"
        ]
      }
    },
    themeConfig: {
      nav: [
        { text: "Home", link: "/" },
        { text: "Learn", link: "/learn/" },
        { text: "Specs", link: "/specs" }
      ],
      sidebar: {
        "/learn/": [
          /* learn sidebar items */
        ]
        // existing sidebars...
      }
    }
  })
);
```

## Content Adaptations

### Framework Examples

Keep framework-specific code (Hono, Redis, etc.) but add context:

**Example note to add:**

```markdown
**Note:** This example uses idempot-js middleware with the Hono framework.
See [idempot-js documentation](https://github.com/idempot-dev/idempot-js)
for framework-specific implementations.
```

### Content Placement

Add notes in these files:

- `duplicated-vs-repeated.md` - Before Hono code example
- `client-key-strategies.md` - At start of strategy examples
- `spec.md` - At start of implementation section

### YouTube Video

Keep the video embed in `why.md` as-is (relevant general content about idempotency).

### Mermaid Diagrams

Preserve sequence diagrams in `why.md` without modification.

## Implementation Plan

**Commit 1: Add mermaid infrastructure**

- Add vitepress-plugin-mermaid to package.json
- Update .vitepress/config.mjs with mermaid plugin
- Add vite optimizeDeps configuration

**Commit 2: Copy and adapt learn pages**

- Create docs/learn/ directory
- Copy 5 markdown files from idempot-js
- Add context notes to framework-specific sections

**Commit 3: Update navigation**

- Replace "Why Idempotency" with "Learn" in nav
- Add "/learn/" sidebar configuration
- Remove "Why Idempotency" from existing sidebar

**Commit 4: Remove old file**

- Delete docs/why-idempotency.md

## Testing

After implementation:

1. Run `npm run dev` - verify site starts
2. Navigate to /learn/ - verify index loads
3. Check mermaid diagrams render in /learn/why
4. Verify YouTube video embed works
5. Test sidebar navigation through all learn pages
6. Verify code examples display correctly
7. Run `npm run build` - verify production build succeeds

## Success Criteria

- All 5 learn pages accessible at /learn/\* paths
- Mermaid diagrams render correctly
- YouTube video embeds properly
- Navigation works for both desktop and mobile
- No broken links
- Production build succeeds
