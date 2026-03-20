# API & Interface Design Skill

You are an expert in designing clean, consistent, and evolvable APIs and TypeScript interfaces. Apply the following principles whenever designing or reviewing API contracts, REST endpoints, TypeScript types, or module boundaries.

---

## 1. Contract-First Design

Define the interface before the implementation.

- Write the TypeScript interface or OpenAPI/JSON Schema spec **before** writing any implementation code
- The contract is the source of truth — implementation must conform to it, never the reverse
- Treat every exported function signature, REST route, and type as a public contract
- Document intent, not mechanics: describe *what* a field means, not how it's stored

```typescript
// Define the contract first
interface CreatorAnalyticsResponse {
  /** Gravity Score on a 0–100 scale, updated daily */
  gravityScore: number;
  /** ISO 8601 timestamp of last platform data sync */
  lastSyncedAt: string;
  /** Normalized engagement rate across all connected platforms */
  engagementRate: number;
  platforms: PlatformBreakdown[];
}

// Then implement against it
async function getCreatorAnalytics(creatorId: string): Promise<CreatorAnalyticsResponse> { ... }
```

---

## 2. Consistent Error Semantics

Errors must be predictable, typed, and actionable.

- Use a **single error envelope** across all API responses — never mix ad-hoc error shapes
- Include: `code` (machine-readable), `message` (human-readable), `details` (optional context)
- Map HTTP status codes consistently: 400 = client error, 401 = unauthenticated, 403 = unauthorized, 404 = not found, 409 = conflict, 422 = validation failure, 429 = rate limited, 500/502/503 = server error
- Never expose internal stack traces or database error messages to clients
- Validation errors (422) must identify **which field** failed and **why**

```typescript
// Standard error envelope
interface ApiError {
  code: string;           // e.g. "PLATFORM_NOT_CONNECTED", "RATE_LIMIT_EXCEEDED"
  message: string;        // Human-readable, safe to display
  field?: string;         // For validation errors: which field failed
  details?: Record<string, unknown>; // Optional structured context
  requestId?: string;     // For support/debugging correlation
}

// HTTP 422 example
{
  "code": "VALIDATION_ERROR",
  "message": "Invalid niche selection",
  "field": "niche",
  "details": { "allowed": ["fitness", "lifestyle", "wellness", "nutrition"] }
}
```

---

## 3. Boundary Validation

Validate everything that crosses a system boundary.

- Validate **all** external inputs: API request bodies, query params, path params, webhook payloads, OAuth callbacks
- Validate **at the boundary**, not deep in business logic
- Use explicit allow-lists, not block-lists (prefer `allowedNiches.includes(value)` over `!bannedNiches.includes(value)`)
- Sanitize strings that will appear in HTML, SQL, or shell contexts
- Set explicit min/max constraints on numeric fields, string lengths, array lengths
- Reject unknown fields on write endpoints (strict mode) — accept unknown fields on read responses (forward compatibility)

```typescript
// Boundary validation pattern for Next.js API route
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return errorResponse(400, 'INVALID_JSON', 'Request body must be valid JSON');

  const { platform, code, state } = body;

  if (!platform || typeof platform !== 'string') {
    return errorResponse(422, 'VALIDATION_ERROR', 'platform is required', 'platform');
  }
  if (!ALLOWED_PLATFORMS.has(platform)) {
    return errorResponse(422, 'VALIDATION_ERROR', `platform must be one of: ${[...ALLOWED_PLATFORMS].join(', ')}`, 'platform');
  }
  if (!code || typeof code !== 'string' || code.length > 512) {
    return errorResponse(422, 'VALIDATION_ERROR', 'code is required and must be a string ≤512 chars', 'code');
  }
  // proceed with validated inputs...
}
```

---

## 4. Additive-Only Interface Changes

Never make breaking changes to a published interface.

- **Adding** fields, endpoints, enum values = non-breaking ✅
- **Removing** or **renaming** fields, changing types, removing endpoints = breaking ❌
- Mark deprecated fields with `@deprecated` JSDoc and a migration path — don't delete them
- When a breaking change is unavoidable, version the API (`/v2/`) and maintain both versions during a deprecation window
- New optional fields must have sensible defaults — never require clients to send new fields
- Treat every TypeScript `export`ed type as a public contract even in internal modules

```typescript
// Safe: add optional field
interface GravityScoreResponse {
  score: number;
  trend: 'rising' | 'stable' | 'declining';
  /** @deprecated Use `componentBreakdown` instead. Removed in v3. */
  components?: LegacyComponents;
  componentBreakdown?: ComponentBreakdown; // new, optional
}

// Unsafe: changing existing field type (breaking)
// score: string  ← never do this if score was previously number
```

---

## 5. REST Resource Patterns

Design resources around nouns, not verbs.

- **Resources** are nouns: `/creators`, `/platforms`, `/insights`
- **Actions** use HTTP methods: GET (read), POST (create), PUT/PATCH (update), DELETE (remove)
- Use sub-resources for relationships: `/creators/{id}/platforms`, `/creators/{id}/gravity-score`
- Non-CRUD actions that don't fit: use POST with a verb noun — `/creators/{id}/gravity-score/recalculate`
- Plural resource names consistently: `/creators` not `/creator`
- Nest at most 2 levels deep: `/creators/{id}/platforms` ✅ — `/creators/{id}/platforms/{pid}/metrics/{mid}` ❌ (flatten instead)
- IDs in paths are always strings (never assume numeric); use opaque prefixed IDs: `usr_01ABC`, `conn_XYZ`

```
GET    /v1/creators/{id}                    → fetch creator profile
PATCH  /v1/creators/{id}                    → update creator fields
GET    /v1/creators/{id}/analytics          → unified analytics overview
GET    /v1/creators/{id}/gravity-score      → current Gravity Score + history
POST   /v1/creators/{id}/platforms          → connect a new platform
DELETE /v1/creators/{id}/platforms/{pid}    → disconnect a platform
GET    /v1/creators/{id}/insights           → list AI coaching insights
POST   /v1/creators/{id}/insights/generate  → trigger new insight generation
```

---

## 6. Pagination

All list endpoints must paginate.

- Default to **cursor-based pagination** for real-time/frequently-updated data (content, metrics)
- Use **offset pagination** only for stable, infrequently-changing data (user lists, platform configs)
- Always return: `data[]`, `nextCursor` (or `null`), `hasMore`, optionally `total`
- Cap `limit` server-side — never trust client-supplied limits unbounded
- Cursors must be opaque to clients (base64-encode the internal pointer)
- Document default and maximum page sizes in the API spec

```typescript
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    nextCursor: string | null;  // null when no more pages
    hasMore: boolean;
    limit: number;              // actual limit used (may differ from requested)
  };
}

// Usage
GET /v1/creators/{id}/content?limit=20&cursor=eyJpZCI6IjEyMyJ9
```

---

## 7. TypeScript Interface Conventions

Write types that are self-documenting and safe.

- Prefer `interface` over `type` for object shapes (better error messages, extensible)
- Use `type` for unions, intersections, and mapped types
- Never use `any` — use `unknown` and narrow explicitly
- Make illegal states unrepresentable: use discriminated unions instead of optional boolean flags
- Use branded/nominal types for IDs to prevent mixing up `creatorId` and `platformId`
- Export types alongside implementations — consumers should not have to import from deep paths
- Use `Readonly<T>` for data that flows downstream and should not be mutated

```typescript
// Discriminated union — illegal states unrepresentable
type PlatformConnection =
  | { status: 'active'; handle: string; lastSynced: string; tokenExpiresAt: string }
  | { status: 'syncing'; handle: string; startedAt: string }
  | { status: 'error'; handle: string; errorCode: string; errorMessage: string }
  | { status: 'disconnected' };

// Branded ID type — prevents mixing creatorId and platformId
type CreatorId = string & { readonly __brand: 'CreatorId' };
type PlatformConnectionId = string & { readonly __brand: 'PlatformConnectionId' };

// Never use `any`
function parseWebhookPayload(raw: unknown): WebhookEvent {
  if (!isWebhookEvent(raw)) throw new Error('Invalid webhook payload');
  return raw;
}
```

---

## 8. Applying This Skill to Orbit

When working on the Orbit codebase specifically:

- All `/api/*` routes must validate inputs at the route boundary before calling any service logic
- API responses must use the standard error envelope (`{ code, message, field?, details? }`)
- Platform OAuth tokens must never appear in API responses or logs — treat as write-only secrets
- The `ANTHROPIC_API_KEY` must only be read server-side (API routes), never in client components
- TypeScript interfaces for API responses must be defined in `src/types/` and shared between client and server
- New platforms added to `PLATFORM_CONFIG` in the connect route must also be reflected in `auth-context.tsx`'s `Platform` type — keep these in sync
- Cursor-based pagination required for: `/api/content`, `/api/notifications`, `/api/insights`
