# idempot.dev Umbrella Website Design

## Overview

idempot.dev will serve as the canonical umbrella website for idempotency middleware implementations across multiple languages and frameworks. The site will:

1. Explain the need for idempotency in distributed systems
2. Introduce sub-projects (starting with idempot-js)
3. Host thecanonical Cucumber specifications used by all implementations

## Target Audience

- **Developers**: Implementers looking for ready-to-use idempotency libraries
- **Technical Leaders**: Architects and CTOs evaluating patterns for resilient APIs

## SiteStructure

```
docs/
  index.md                    # Homepage (hero + features + project cards)
  why-idempotency.md          # ~500 word explanation
  specs/
    idempotency.feature       # Cucumber specs (canonical source)
    index.md                  # Rendered view with download link
```

## Homepage Design

### HeroSection

```
idempot.dev
Once is enough.

[Why Idempotency] [View Specs]
```

**Frontmatter:**

```yaml
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
```

### Feature Cards

Three feature cards positioned below the hero:

| Title                  | Details                                                             |
| ---------------------- | ------------------------------------------------------------------- |
| IETF Spec Compliant    | Implements draft-ietf-httpapi-idempotency-key-header-07             |
| Request Fingerprinting | Detects conflicts when same key used with different payloads        |
| Pluggable Storage      | Redis, PostgreSQL, MySQL, SQLite — use your existing infrastructure |

### Project Cards Section

Single page with expandable/scrollable project cards. Each card contains:

- Project name
- One-line description
- Supported frameworks
- Supported runtimes
- Links (GitHub, npm, Docs)

**First Project: idempot-js**
| Field | Value |
|-------|-------|
| Name | idempot-js |
| Description | Idempotency middleware for Hono, Express, and Fastify |
| Frameworks | Hono, Express, Fastify |
| Runtimes | Node.js, Bun, Deno |
| Links | GitHub, npm |

## Navigation

```js
nav: [
  { text: "Home", link: "/" },
  { text: "Why Idempotency", link: "/why-idempotency" },
  { text: "Specs", link: "/specs" }
];
```

## Why Idempotency Page

**URL:** `/why-idempotency`

**Structure (~500 words):**

1. **Opening** (~100 words): Define idempotency and its importance
2. **The Problem** (~150 words): Duplicate requests in distributed systems
   - User behavior (double-clicks)
   - Client retries (timeout handling)
   - Network issues (response lost, request succeeded)
   - Load balancer retries
   - Webhook redelivery
3. **The Pattern** (~150 words): How idempotency keys work
   - Client generates unique key
   - Server stores key + response
   - Duplicate requests return cached response
4. **Benefits** (~100 words): Reliability, fault tolerance, simplified retry logic

**Tone:** Executive summary - accessible to decision-makers while useful to engineers

## Specifications Page

**URL:** `/specs`

**Content Source:** Copy`idempotency.feature` from `../idempot-js/tests/spec/` into`docs/specs/`. This website becomes the canonical source.

**Structure:**

1. Header: "Cucumber Specifications"
2. Description: "RFC 7807-compliant specs for idempotency middleware implementations"
3. Main content: Rendered .feature file with syntax highlighting
4. Download section: Link to raw .feature file

**Spec Categories** (from existing feature file):

- Header Validation (Section 2.1)
- First Request Handling (Section 2.6)
- Duplicate Request Handling (Section 2.6 - Retry)
- Fingerprint Conflict (Section 2.2)
- Key Reuse Conflict (Section 2.2)
- Concurrent Request Handling (Section 2.6)
- Error Response Format (Section 2.7)
- Edge Cases

## VitePress Configuration Updates

**File:** `.vitepress/config.mjs`

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
        items: [{ text: "idempot-js", link: "/projects/idempot-js" }]
      }
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/idempot-dev" }]
  }
});
```

## File Changes

| Action | Path                             |
| ------ | -------------------------------- |
| Modify | `.vitepress/config.mjs`          |
| Modify | `docs/index.md`                  |
| Create | `docs/why-idempotency.md`        |
| Create | `docs/specs/idempotency.feature` |
| Create | `docs/specs/index.md`            |

## Future Considerations

- As new implementations are added (idempot-py, idempot-go, etc.), add project cards to homepage
- Specs page will be the canonical source; sub-projects can sync from here
- Consider adding interactive demo or playground in future
