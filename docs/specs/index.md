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

[Download idempotency.feature (raw)](https://raw.githubusercontent.com/idempot-dev/website/main/docs/specs/idempotency.feature) — Use in your test suite

## Specification

The full specification is available in the [idempotency.feature](https://github.com/idempot-dev/website/blob/main/docs/specs/idempotency.feature) file on GitHub.
