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
