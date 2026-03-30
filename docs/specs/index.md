---
prev:
  text: "Why Idempotency"
  link: "/why-idempotency"
next: false
---

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

```gherkin
Feature: Idempotency-Key Header Compliance
  As a developer implementing the IETF Idempotency-Key Header specification
  I want to verify my middleware complies with the spec
  So that my API handles idempotent requests correctly

  Background:
    Given a POST endpoint at "/api" that creates an order
    And the SQLite store is clean

  # Header Validation (Section 2.1 - Syntax)

  Scenario: Missing Idempotency-Key header on POST returns 400
    When I send a POST request to "/api" without an Idempotency-Key header
    Then the response status should be 400
    And the response content-type should be "application/problem+json"
    And the response body should contain "section-2.1"

  Scenario: Empty Idempotency-Key header returns 400
    Given an empty Idempotency-Key header
    When I send a POST request to "/api" with body '{"foo":"bar"}'
    Then the response status should be 400
    And the response content-type should be "application/problem+json"
    And the response body should contain "section-2.1"
    And the response body should contain "type"
    And the response body should contain "title"
    And the response body should contain "detail"

  Scenario: Idempotency-Key exceeding 255 characters returns 400
    Given an Idempotency-Key of 256 characters
    When I send a POST request to "/api" with body '{"foo":"bar"}'
    Then the response status should be 400
    And the response content-type should be "application/problem+json"
    And the response body should contain "section-2.1"
    And the response body should contain "type"
    And the response body should contain "title"
    And the response body should contain "detail"

  Scenario: Idempotency-Key with commas returns 400
    Given an Idempotency-Key "key,with,commas,longer-than-twenty-chars"
    When I send a POST request to "/api" with body '{"foo":"bar"}'
    Then the response status should be 400
    And the response content-type should be "application/problem+json"
    And the response body should contain "section-2.1"
    And the response body should contain "type"
    And the response body should contain "title"
    And the response body should contain "detail"

  Scenario: Valid Idempotency-Key is accepted
    Given an Idempotency-Key "8e03978e-40d5-43e8-bc93-6894a57f9324"
    When I send a POST request to "/api" with body '{"foo":"bar"}'
    Then the response status should be 200

  # First Request Handling (Section 2.6 - Idempotency Enforcement)

  Scenario: First request creates idempotency record
    Given an Idempotency-Key "abc123456789012345678"
    When I send a POST request to "/api" with body '{"foo":"bar"}'
    Then an idempotency record should exist with key "abc123456789012345678"
    And the idempotency record status should be "complete"

  Scenario: First request stores response status
    Given an Idempotency-Key "abc123456789012345678"
    When I send a POST request to "/api" with body '{"foo":"bar"}'
    Then the idempotency record response status should be 200

  Scenario: First request stores response body
    Given an Idempotency-Key "abc123456789012345678"
    When I send a POST request to "/api" with body '{"foo":"bar"}'
    Then the idempotency record response body should contain "success"

  Scenario: First request creates expected resource
    Given an Idempotency-Key "abc123456789012345678"
    When I send a POST request to "/api" with body '{"foo":"bar"}'
    Then 1 orders should exist in the database

  Scenario: First request returns correct response body
    Given an Idempotency-Key "abc123456789012345678"
    When I send a POST request to "/api" with body '{"foo":"bar"}'
    Then the response status should be 200
    And the response body should contain "success"

  # Duplicate Request Handling (Section 2.6 - Retry)

  Scenario: Duplicate request returns cached response
    Given an Idempotency-Key "abc123456789012345678"
    And I previously sent a POST request to "/api" with body '{"foo":"bar"}'
    When I send a POST request to "/api" with body '{"foo":"bar"}'
    Then the response status should be 200
    And the response body should contain "success"

  Scenario: Duplicate request sets replay header
    Given an Idempotency-Key "abc123456789012345678"
    And I previously sent a POST request to "/api" with body '{"foo":"bar"}'
    When I send a POST request to "/api" with body '{"foo":"bar"}'
    Then the response should have header "x-idempotent-replayed" with value "true"

  Scenario: Duplicate request does not create additional idempotency records
    Given an Idempotency-Key "abc123456789012345678"
    And I previously sent a POST request to "/api" with body '{"foo":"bar"}'
    When I send a POST request to "/api" with body '{"foo":"bar"}'
    Then 1 idempotency records should exist with key "abc123456789012345678"

  Scenario: Duplicate request does not duplicate resource creation
    Given an Idempotency-Key "abc123456789012345678"
    And I previously sent a POST request to "/api" with body '{"foo":"bar"}'
    When I send a POST request to "/api" with body '{"foo":"bar"}'
    Then 1 orders should exist in the database

  Scenario: Multiple duplicate requests return cached response
    Given an Idempotency-Key "abc123456789012345678"
    And I previously sent a POST request to "/api" with body '{"foo":"bar"}'
    When I send a POST request to "/api" with body '{"foo":"bar"}'
    And I send a POST request to "/api" with body '{"foo":"bar"}'
    And I send a POST request to "/api" with body '{"foo":"bar"}'
    Then the response status should be 200
    And 1 orders should exist in the database

  # Fingerprint Conflict (Section 2.2 - Uniqueness)

  Scenario: Different key with same body returns 409
    Given an Idempotency-Key "key1-12345678901234567"
    And I previously sent a POST request to "/api" with body '{"foo":"bar"}'
    And an Idempotency-Key "key2-12345678901234567"
    When I send a POST request to "/api" with body '{"foo":"bar"}'
    Then the response status should be 409
    And the response content-type should be "application/problem+json"
    And the response body should contain "section-2.2"

  Scenario: Fingerprint conflict response contains error message
    Given an Idempotency-Key "key1-12345678901234567"
    And I previously sent a POST request to "/api" with body '{"foo":"bar"}'
    And an Idempotency-Key "key2-12345678901234567"
    When I send a POST request to "/api" with body '{"foo":"bar"}'
    Then the response status should be 409
    And the response content-type should be "application/problem+json"
    And the response body should contain "section-2.2"
    And the response body should contain "title"

  Scenario: Fingerprint conflict does not create duplicate resources
    Given an Idempotency-Key "key1-12345678901234567"
    And I previously sent a POST request to "/api" with body '{"foo":"bar"}'
    And an Idempotency-Key "key2-12345678901234567"
    When I send a POST request to "/api" with body '{"foo":"bar"}'
    Then the response status should be 409
    And the response content-type should be "application/problem+json"
    And the response body should contain "section-2.2"
    And 1 orders should exist in the database

  # Key Reuse Conflict (Section 2.2 - Uniqueness)

  Scenario: Same key with different body returns 422
    Given an Idempotency-Key "abc123456789012345678"
    And I previously sent a POST request to "/api" with body '{"foo":"bar"}'
    When I send a POST request to "/api" with body '{"baz":"qux"}'
    Then the response status should be 422
    And the response content-type should be "application/problem+json"
    And the response body should contain "section-2.2"

  Scenario: Key reuse conflict response contains error message
    Given an Idempotency-Key "abc123456789012345678"
    And I previously sent a POST request to "/api" with body '{"foo":"bar"}'
    When I send a POST request to "/api" with body '{"baz":"qux"}'
    Then the response status should be 422
    And the response content-type should be "application/problem+json"
    And the response body should contain "section-2.2"
    And the response body should contain "title"

  # Concurrent Request Handling (Section 2.6 - Concurrent Request)

  Scenario: Request during processing returns 409
    Given an Idempotency-Key "abc123456789012345678"
    And the key "abc123456789012345678" is currently being processed
    When I send a POST request to "/api" with body '{"foo":"bar"}'
    Then the response status should be 409
    And the response content-type should be "application/problem+json"
    And the response body should contain "section-2.6"

  Scenario: Concurrent request response contains error message
    Given an Idempotency-Key "abc123456789012345678"
    And the key "abc123456789012345678" is currently being processed
    When I send a POST request to "/api" with body '{"foo":"bar"}'
    Then the response status should be 409
    And the response content-type should be "application/problem+json"
    And the response body should contain "section-2.6"
    And the response body should contain "processed"

  # Error Response Format (Section 2.7 - Error Handling)

  Scenario: Missing key error follows RFC 7807
    When I send a POST request to "/api" without an Idempotency-Key header
    Then the response status should be 400
    And the response content-type should be "application/problem+json"
    And the response body should contain "type"
    And the response body should contain "title"
    And the response body should contain "detail"

  Scenario: Key reuse error follows RFC 7807
    Given an Idempotency-Key "abc123456789012345678"
    And I previously sent a POST request to "/api" with body '{"foo":"bar"}'
    When I send a POST request to "/api" with body '{"baz":"qux"}'
    Then the response status should be 422
    And the response content-type should be "application/problem+json"
    And the response body should contain "type"
    And the response body should contain "title"
    And the response body should contain "detail"

  Scenario: Fingerprint conflict error follows RFC 7807
    Given an Idempotency-Key "key1-12345678901234567"
    And I previously sent a POST request to "/api" with body '{"foo":"bar"}'
    And an Idempotency-Key "key2-12345678901234567"
    When I send a POST request to "/api" with body '{"foo":"bar"}'
    Then the response status should be 409
    And the response content-type should be "application/problem+json"
    And the response body should contain "type"
    And the response body should contain "title"
    And the response body should contain "detail"

  # Edge Cases

  Scenario: GET requests bypass idempotency processing
    Given an Idempotency-Key "abc123456789012345678"
    When I send a GET request to "/api"
    Then the response status should be 200

  Scenario: PUT requests bypass idempotency processing
    Given an Idempotency-Key "abc123456789012345678"
    When I send a PUT request to "/api" with body '{"foo":"bar"}'
    Then the response status should be 200

  Scenario: DELETE requests bypass idempotency processing
    Given an Idempotency-Key "abc123456789012345678"
    When I send a DELETE request to "/api"
    Then the response status should be 200

  Scenario: Empty request body is handled
    Given an Idempotency-Key "abc123456789012345678"
    When I send a POST request to "/api" with empty body
    Then the response status should be 200

  Scenario: PATCH requests are protected by idempotency
    Given a PATCH endpoint at "/api" that creates an order
    And an Idempotency-Key "abc123456789012345678"
    When I send a PATCH request to "/api" with body '{"foo":"bar"}'
    Then the response status should be 200
    And an idempotency record should exist with key "abc123456789012345678"
```
