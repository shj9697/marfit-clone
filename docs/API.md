<!--
  GENERATED — do not edit here.

  The source of truth is marfit-api/docs/API.md, which lives beside the routes
  it documents. Refresh this copy with:

      cd ../marfit-api && npm run docs:sync

  Edits made directly to this file will be overwritten.
-->

# Marfit API reference

Base URL in development: `http://localhost:4000/api`

Every example below is a real request against a seeded database. Payloads are
truncated where noted with `…`, never reshaped.

- [Conventions](#conventions)
- [Identity](#identity)
- [Auth](#auth)
- [Products](#products)
- [Categories](#categories)
  - [The category tree](#the-category-tree)
  - [One category](#one-category)
  - [**Subcategories**](#subcategories)
  - [Filter options](#filter-options)
  - [Products in a category](#products-in-a-category)
  - [Products in a subcategory](#products-in-a-subcategory)
  - [Listing query parameters](#listing-query-parameters)
- [Homepage content](#homepage-content)
- [Cart](#cart)
- [Orders](#orders)
- [Payments (Razorpay)](#payments-razorpay)
- [Wishlist](#wishlist)
- [Saved addresses](#saved-addresses)
- [Leads](#leads)
- [Settings](#settings)
- [Admin](#admin)
- [Images](#images)
- [Uploads](#uploads)
- [Error reference](#error-reference)

## Every endpoint at a glance

| Method | Path | Section |
|---|---|---|
| GET | `/api/health` | — |
| GET | `/api/settings` | [Settings](#settings) |
| GET | `/api/auth/providers` | [Auth](#auth) |
| POST | `/api/auth/register` · `/api/auth/login` · `/api/auth/google` · `/api/auth/logout` | [Auth](#auth) |
| POST | `/api/auth/refresh` | [Refreshing the access token](#post-apiauthrefresh) |
| GET PATCH | `/api/auth/me` | [Auth](#auth) |
| GET | `/api/products` | [Products](#products) |
| GET | `/api/products/search` | [Products](#products) |
| GET | `/api/products/:identifier` | [Products](#products) |
| GET | `/api/products/:identifier/related` | [Products](#products) |
| GET | `/api/categories` | [The category tree](#the-category-tree) |
| GET | `/api/categories/:slug` | [One category](#one-category) |
| GET | `/api/categories/:slug/:subSlug` | [**Subcategories**](#subcategories) |
| GET | `/api/categories/:slug/filters` | [Filter options](#filter-options) |
| GET | `/api/categories/:slug/products` | [Products in a category](#products-in-a-category) |
| GET | `/api/categories/:slug/:subSlug/products` | [Products in a subcategory](#products-in-a-subcategory) |
| GET | `/api/home` | [Homepage content](#homepage-content) |
| GET | `/api/collections` · `/api/collections/:slug` | [Homepage content](#homepage-content) |
| GET | `/api/banners` | [Homepage content](#homepage-content) |
| GET | `/api/pincodes/:code` | [Homepage content](#homepage-content) |
| GET POST PATCH DELETE | `/api/cart` · `/api/cart/items` | [Cart](#cart) |
| POST | `/api/orders` | [Orders](#orders) |
| GET | `/api/orders` · `/api/orders/track` · `/api/orders/:orderNumber` | [Orders](#orders) |
| GET | `/api/payments/config` | [Payments](#payments-razorpay) |
| POST | `/api/payments/razorpay/order` · `/api/payments/razorpay/verify` | [Payments](#payments-razorpay) |
| POST | `/api/payments/razorpay/webhook` | [Payments](#payments-razorpay) — called by Razorpay |
| GET POST DELETE | `/api/wishlist` · `/api/wishlist/:productId` | [Wishlist](#wishlist) |
| GET POST PATCH DELETE | `/api/addresses` · `/api/addresses/:id` | [Saved addresses](#saved-addresses) |
| POST | `/api/leads` | [Leads](#leads) |
| — | `/api/admin/*` | [Admin](#admin) |
| GET | `/images/...` | [Images](#images) |
| — | `/api/admin/uploads` | [Uploads](#uploads) |

---

## Conventions

**Success** — the payload is under `data`; list metadata sits beside it.

```jsonc
{
  "data": [ /* … */ ],
  "totalProducts": 101,   // duplicate of `total`, kept for the existing client
  "total": 101,
  "page": 1,
  "limit": 20,
  "totalPages": 6
}
```

**Failure** — any non-2xx response:

```jsonc
{ "error": { "message": "Product \"NOPE\" does not exist", "code": "NOT_FOUND" } }
```

Validation failures add `details`:

```jsonc
{
  "error": {
    "message": "Request validation failed",
    "code": "VALIDATION_ERROR",
    "details": [
      { "field": "email", "message": "Invalid email" },
      { "field": "price", "message": "Number must be greater than or equal to 0" }
    ]
  }
}
```

Prices are **whole rupees** as integers — `3199` means ₹3,199. There are no
decimals anywhere in the API.

`compareAtPrice` is the MRP. When it is set and above `price`, the API also
returns `discountPercent` and a ready-made `discount` label (`"57% OFF"`); when
it is null both are `0`/`null` and the storefront shows a flat price. The label
is always computed from the two prices, never stored, so it cannot drift.

Writes need `Content-Type: application/json`. Anything touching a cart or a
session needs `credentials: "include"`.

---

## Identity

Two kinds of caller, and most endpoints accept either.

**Guests** get a `marfit_sid` cookie on their first request. It is also echoed
as an `x-session-id` response header and accepted back as a request header, for
clients that cannot use cookies. The cart hangs off it.

**Signed-in users** send a JWT, either as `Authorization: Bearer <token>` or the
`marfit_access` httpOnly cookie set at login.

The JWT is the **access token** and is short-lived (`ACCESS_TOKEN_TTL_MINUTES`, 30
by default). Sign-in also returns a **refresh token**, valid for
`REFRESH_TOKEN_TTL_MINUTES` (10080, i.e. 7 days, by default). When the access token expires, trade the
refresh token for a new access token at
[`POST /api/auth/refresh`](#post-apiauthrefresh) instead of sending the user back
to the login page. The refresh token is never replaced, so the sign-in ends when
it expires.

In the examples below, `$TOKEN` is the access token returned by
[login](#post-apiauthlogin), sent as `Authorization: Bearer $TOKEN`.

On login or registration the guest cart is merged into the user's cart —
quantities are summed per product and the guest cart is deleted.

---

## Auth

### `GET /api/auth/providers`

Which sign-in methods this server offers. Use it to decide whether to render the
Google button.

```bash
curl http://localhost:4000/api/auth/providers
```

```json
{ "data": { "email": true, "google": false, "googleClientId": null } }
```

### `POST /api/auth/register`

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"buyer@example.com","password":"hunter2hunter2","name":"Asha"}'
```

```jsonc
{
  "data": {
    "user": {
      "id": "cmt8…", "email": "buyer@example.com", "name": "Asha",
      "phone": null, "avatarUrl": null, "role": "USER",
      "provider": "EMAIL", "hasPassword": true,
      "createdAt": "2026-08-25T15:51:35.448Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIs…",
    "refreshToken": "Yk3r9Qe…"
  }
}
```

`token` is the access token; `refreshToken` renews it (see
[below](#post-apiauthrefresh)). Both are also set as httpOnly cookies —
`marfit_access`, and `marfit_refresh` scoped to `/api/auth`.

`password` must be at least 8 characters. A duplicate email returns **409**.

### `POST /api/auth/login`

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"asha@example.com","password":"hunter2hunter2"}'
```

```jsonc
// 200
{
  "data": {
    "user": {
      "id": "cmuvbl6sn00006bdl8swhyt8f", "email": "asha@example.com", "name": "Asha Roy",
      "phone": null, "avatarUrl": null, "role": "USER",
      "provider": "EMAIL", "hasPassword": true,
      "createdAt": "2026-10-05T14:03:16.007Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIs…",
    "refreshToken": "4AQOehS4oq4bjB2w7mS3DGqA…"
  }
}
```

A Google-only account returns **400** with a deliberately specific message, so
the UI can point at the right button:

```json
{ "error": { "message": "This account uses Google sign-in. Continue with Google instead.",
             "code": "BAD_REQUEST", "details": { "provider": "GOOGLE" } } }
```

Wrong credentials return a generic **401** `Invalid email or password`, so the
endpoint cannot be used to enumerate accounts.

### `POST /api/auth/google`

`credential` is the ID token from Google Identity Services in the browser.

```bash
curl -X POST http://localhost:4000/api/auth/google \
  -H 'Content-Type: application/json' \
  -d '{"credential":"<google-id-token>"}'
```

The server verifies signature, audience, issuer and expiry against Google's
public keys, rejects unverified email addresses, then issues **its own** JWT —
the Google token is never used as a session token.

A Google address matching an existing email/password account is **linked** to
it, not duplicated; that account keeps its password and can use either method.

Requires `GOOGLE_CLIENT_ID`; without it the endpoint returns **503**
`GOOGLE_NOT_CONFIGURED`.

Register, login and Google all return the same `{ user, token, refreshToken }`.

### `POST /api/auth/refresh`

Trades a refresh token for a **new access token**. The refresh token itself is
not replaced.

```bash
curl -X POST http://localhost:4000/api/auth/refresh \
  -H 'Content-Type: application/json' \
  -d '{"refreshToken":"4AQOehS4oq4bjB2w7mS3DGqA…"}'
```

```jsonc
// 200 — a new access token; keep using the same refresh token
{
  "data": {
    "user": { "id": "cmuvbl6sn00006bdl8swhyt8f", "email": "asha@example.com", "name": "Asha Roy", … },
    "token": "eyJhbGciOiJIUzI1NiIs…"
  }
}
```

```jsonc
// 401 — missing, unknown, expired or revoked
{ "error": { "message": "Your session has expired, please sign in again", "code": "UNAUTHORIZED" } }
```

The body is optional — without it, the `marfit_refresh` cookie is used:

```bash
curl -X POST http://localhost:4000/api/auth/refresh -b jar -c jar
```

The refresh token keeps the expiry it was issued with, so refreshing never
extends the sign-in: `REFRESH_TOKEN_TTL_MINUTES` after login the user has to sign
in again. An access token issued here is capped to expire no later than the
refresh token.

Any failure — missing, unknown, expired or revoked — is a **401** with the same
message. On a 401, clear the stored tokens and send the user to sign in.

A typical client wrapper:

```js
async function authFetch(url, options = {}) {
  let res = await fetch(url, withBearer(options, tokenStore.getAccess()));
  if (res.status !== 401 || !tokenStore.getRefresh()) return res;

  const refreshed = await fetch("/api/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: tokenStore.getRefresh() }),
  });
  if (!refreshed.ok) { tokenStore.clear(); return res; }   // signed out

  const { data } = await refreshed.json();
  tokenStore.saveAccess(data.token);                       // the refresh token is unchanged
  return fetch(url, withBearer(options, data.token));      // retry once
}
```

### `POST /api/auth/logout`

Body `{ refreshToken? }` (or the cookie). Revokes the refresh token, then clears
both cookies. An access token
already handed out keeps working until it expires, which is why it is kept short.

```bash
curl -X POST http://localhost:4000/api/auth/logout \
  -H 'Content-Type: application/json' \
  -d '{"refreshToken":"nr-YPD8Rn3dMKpg3O1lbu9s…"}'
```

```json
{ "data": { "loggedOut": true } }
```

### `GET /api/auth/me`

The signed-in user. Requires auth.

```bash
curl http://localhost:4000/api/auth/me -H "Authorization: Bearer $TOKEN"
```

```json
{ "data": { "id": "cmuvbl6sn00006bdl8swhyt8f", "email": "asha@example.com", "name": "Asha Roy",
            "phone": null, "avatarUrl": null, "role": "USER", "provider": "EMAIL",
            "hasPassword": true, "createdAt": "2026-10-05T14:03:16.007Z" } }
```

### `PATCH /api/auth/me`

Accepts `{ name?, phone? }` and returns the updated user.

```bash
curl -X PATCH http://localhost:4000/api/auth/me \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"phone":"9876543210"}'
```

```json
{ "data": { "id": "cmuvbl6sn00006bdl8swhyt8f", "email": "asha@example.com", "name": "Asha Roy",
            "phone": "9876543210", "avatarUrl": null, "role": "USER", "provider": "EMAIL",
            "hasPassword": true, "createdAt": "2026-10-05T14:03:16.007Z" } }
```

Register, login and Google sign-in are rate-limited to 20 requests per 15
minutes.

---

## Products

### `GET /api/products`

```bash
curl 'http://localhost:4000/api/products?category=Men&sort=price-low-to-high&limit=2'
```

One product, in full — note the legacy aliases at the bottom, which let the
existing storefront components render an API response unchanged:

```jsonc
{
  "id": "cmt8wm9ar00jzv7coitlchki7",
  "sku": "MB2155019BRN",
  "slug": "marfit-leather-laptop-messenger-bag-for-men-mb2155019brn",
  "title": "Leather Laptop Messenger Bag for Men MB2155019",
  "description": "Marfit Premium Genuine Leather Laptop Messenger Bag – …",
  "price": 3199,
  "compareAtPrice": null,
  "discountPercent": 0,
  "imageUrl": "https://cdn.shopify.com/s/files/…/11.jpg?width=1000&height=1000&crop=center",
  "images": [
    { "id": "cmt8…", "url": "https://cdn.shopify.com/…/11.jpg?…", "alt": "… — view 1" },
    { "id": "cmt8…", "url": "https://cdn.shopify.com/…/12.jpg?…", "alt": "… — view 2" }
    // 5 per product
  ],
  "isEmbossable": false,
  "isActive": true,
  "inStock": true,
  "stockQty": 25,
  "lowStockThreshold": 5,
  "isLowStock": false,
  "categoryRef":    { "id": "cmt8…", "name": "Men", "slug": "men" },
  "subcategoryRef": { "id": "cmt8…", "name": "Laptop Messenger Bags", "slug": "men-laptop-messenger-bags" },

  // legacy aliases — same values, the field names the old arrays used
  "img": "https://cdn.shopify.com/…/11.jpg?…",
  "oldPrice": null,
  "discount": null,
  "off": null,
  "parent": "Men",
  "subcategory": "Laptop Messenger Bags",
  "productId": "MB2155019BRN"
}
```

| Param | Notes |
|---|---|
| `page`, `limit` | `limit` max 100, default 20 |
| `category`, `subcategory` | slug **or** display name; `all` means no filter |
| `search` / `q` | matches title, SKU, description |
| `sort` | `relevance` · `newest` · `price-low-to-high` · `price-high-to-low` · `name-a-z` · `name-z-a` |
| `minPrice`, `maxPrice` | whole rupees |
| `embossable` | `true` / `false` — powers the Emboss page |
| `inStock` | `true` / `false` |
| `collection` | narrow to a rail's members, e.g. `deal-of-the-day` |

### `GET /api/products/:identifier`

Accepts an **id, SKU or slug** — the storefront's routes pass all three.

```bash
curl http://localhost:4000/api/products/MB2155019BRN
```

Returns a single product object. Unknown or hidden → **404**.

### `GET /api/products/:identifier/related?limit=10`

Both product-page rails at once, guaranteed not to overlap:

```bash
curl 'http://localhost:4000/api/products/MB2155019BRN/related?limit=2'
```

```jsonc
{
  "data": {
    "similar":        [ /* same subcategory — substitutes */ ],
    "youMayAlsoLike": [ /* same category, different subcategory — cross-sell */ ]
  }
}
```

`youMayAlsoLike` is topped up with recent products when the category is too thin
to fill it, so the rail never renders nearly empty.

### `GET /api/products/search?q=wallet`

Navbar suggestions — categories first, then products.

```bash
curl 'http://localhost:4000/api/products/search?q=wallet'
```

```jsonc
{
  "data": [
    { "type": "category", "label": "Accessories / Wallets", "slug": "accessories-wallets", "parentSlug": "accessories" },
    { "type": "category", "label": "Accessories / Card Holders & Mini Wallets",
      "slug": "accessories-card-holders-and-mini-wallets", "parentSlug": "accessories" },
    { "type": "product", "label": "Black Genuine Leather Note Case Wallet for Men – …", "sku": "MF5287774",
      "slug": "marfit-black-genuine-leather-note-case-wallet-…", "imageUrl": "https://cdn.shopify.com/…", "price": 1799 },
    …
  ],
  "query": "wallet"
}
```

Fewer than 2 characters returns an empty array rather than the whole catalogue.

---

## Categories

The tree here **is** the storefront's navigation — add a category in the admin
app and the navbar dropdown, category pages and listing filters all follow.
Nothing is hardcoded in the frontend.

Two levels only: parent categories (Men, Women, …) each holding subcategories
(Briefcase, Trolley Bags, …).

| I want… | Use |
|---|---|
| the whole nav tree | [`GET /api/categories`](#the-category-tree) |
| one parent category | [`GET /api/categories/:slug`](#one-category) |
| **one subcategory** | [`GET /api/categories/:slug/:subSlug`](#subcategories) |
| the sidebar filter options | [`GET /api/categories/:slug/filters`](#filter-options) |
| every product in a category | [`GET /api/categories/:slug/products`](#products-in-a-category) |
| **products in one subcategory** | [`GET /api/categories/:slug/:subSlug/products`](#products-in-a-subcategory) |

Everywhere a category is named in a path, it accepts a **slug, a display name,
or an id** — so the storefront's existing URLs
(`/categories/Luggage%20%26%20SuitCase`) work unchanged.

### The category tree

`GET /api/categories`

```bash
curl http://localhost:4000/api/categories
```

```jsonc
{
  "data": [
    {
      "id": "cmt8…", "name": "Men", "slug": "men",
      "imageUrl": "https://cdn.shopify.com/…?width=700&height=700&crop=center",
      "sortOrder": 0, "parentId": null,
      "children": [
        { "id": "cmt8…", "name": "Briefcase", "slug": "men-briefcase", "imageUrl": "…", "sortOrder": 0, "children": [] },
        { "id": "cmt8…", "name": "Laptop Messenger Bags", "slug": "men-laptop-messenger-bags", "imageUrl": "…", "sortOrder": 1, "children": [] }
      ]
    }
    // Women, Luggage & SuitCase, Accessories
  ],
  "total": 4
}
```

Subcategory slugs are namespaced by parent (`men-briefcase`), so the same name
can appear under more than one parent.

### One category

`GET /api/categories/:slug`

```bash
curl 'http://localhost:4000/api/categories/Men'
```

Returns the [detail payload](#the-detail-payload) below — its subcategory tiles
in `children`, a preview of `latestProducts`, and a `productCount`.

### Subcategories

`GET /api/categories/:slug/:subSlug`  ·  `GET /api/categories/:subcategorySlug`

**A subcategory returns exactly the same payload as a parent category**, so one
component can render either page.

```bash
curl 'http://localhost:4000/api/categories/Men/Briefcase'      # parent + subcategory
curl 'http://localhost:4000/api/categories/men/men-briefcase'  # by slugs
curl 'http://localhost:4000/api/categories/men-briefcase'      # directly, no parent
```

The two-segment form mirrors the storefront's own route
(`/categories/:parentId/:subId`), so a page can pass its params straight
through:

```jsx
const { parentId, subId } = useParams();
const res = await fetch(`/api/categories/${encodeURIComponent(parentId)}/${encodeURIComponent(subId)}`);
```

A subcategory addressed under the wrong parent is a broken URL, not an empty
page:

```json
{ "error": { "message": "\"Trolley Bags\" is not a subcategory of \"Men\"", "code": "NOT_FOUND" } }
```

#### The detail payload

Returned by both `/:slug` and `/:slug/:subSlug`:

```jsonc
{
  "data": {
    "id": "cmt8…",
    "name": "Briefcase",
    "slug": "men-briefcase",
    "imageUrl": "https://cdn.shopify.com/…",
    "sortOrder": 0,
    "parentId": "cmt8…",

    "isSubcategory": true,
    "parent":   { "id": "cmt8…", "name": "Men", "slug": "men", … },  // null at top level
    "children": [ ],          // a parent's subcategory tiles; empty for a subcategory
    "siblings": [ { "name": "Laptop Messenger Bags", … } ],
    "productCount": 9,        // matches the total from …/products
    "latestProducts": [ /* up to 12 product objects */ ]
  }
}
```

| Field | What it is |
|---|---|
| `isSubcategory` | `true` when it sits under a parent |
| `parent` | the parent, or `null` at top level |
| `children` | its subcategory tiles — empty for a subcategory |
| `siblings` | the other categories at the same level, for sideways navigation |
| `productCount` | products beneath it, matching `…/products` `total` |
| `latestProducts` | newest 12, for a preview rail |

### Filter options

`GET /api/categories/:slug/filters`

Sidebar options derived from live data rather than a hardcoded array:

```bash
curl http://localhost:4000/api/categories/Men/filters
```

```jsonc
{
  "data": {
    "subcategories": [ { "label": "Briefcase", "value": "men-briefcase" }, … ],
    "priceRange": { "min": 799, "max": 7999 },
    "availability": [
      { "label": "Embose", "value": "embossable", "count": 46 },
      { "label": "Out Of Stock", "value": "out-of-stock", "count": 0 }
    ],
    "sortOptions": [ { "label": "PRICE LOW TO HIGH", "value": "price-low-to-high" }, … ]
  }
}
```

Feed the values straight back as [query parameters](#listing-query-parameters)
on the listing endpoints below.

### Products in a category

`GET /api/categories/:slug/products`

**Every product in a category, including all of its subcategories** — the whole
department in one call.

```bash
curl 'http://localhost:4000/api/categories/Men/products?limit=20'
```

```jsonc
{
  "data": [ /* product objects */ ],
  "totalProducts": 32,
  "total": 32,
  "page": 1,
  "limit": 20,
  "totalPages": 2,
  // The resolved category, so a listing page gets its heading and breadcrumb
  // without a second request.
  "category":    { "id": "cmt8…", "name": "Men", "slug": "men", "imageUrl": "…" },
  "subcategory": null
}
```

A parent returns its own products **and** every subcategory's, so `Men` gives you
briefcases and messenger bags together — its `total` equals the sum of its
subcategories' totals. Passing `all` as the slug returns the whole catalogue.

### Products in a subcategory

`GET /api/categories/:slug/:subSlug/products`

```bash
curl 'http://localhost:4000/api/categories/Men/Briefcase/products?sort=price-low-to-high'
```

Same envelope as above, with `subcategory` filled in as well as `category`.
`all` in either position widens the scope, so `/categories/Men/all/products` is
identical to `/categories/Men/products`.

### Listing query parameters

Both listing endpoints take the same filters as [`GET /api/products`](#products),
minus `category` and `subcategory`, which come from the path:

| Param | Notes |
|---|---|
| `page`, `limit` | `limit` max 100, default 20 |
| `search` / `q` | matches title, SKU **and description** |
| `sort` | `relevance` · `newest` · `price-low-to-high` · `price-high-to-low` · `name-a-z` · `name-z-a` |
| `minPrice`, `maxPrice` | whole rupees |
| `embossable` | `true` / `false` |
| `inStock` | `true` / `false` |

```bash
curl 'http://localhost:4000/api/categories/Men/products?search=briefcase&minPrice=4000&sort=price-high-to-low&page=2&limit=12'
```

An unsupported `sort` is rejected with **422** rather than silently ignored.

### When a category endpoint 404s

A category that does not exist returns **404**, not an empty list — a listing
page has to tell "no products here yet" apart from "this URL is wrong":

```json
{ "error": { "message": "Category \"does-not-exist\" does not exist", "code": "NOT_FOUND" } }
```

A subcategory filed under a different parent is likewise a broken URL:

```bash
curl 'http://localhost:4000/api/categories/Men/Trolley%20Bags/products'
```

```json
{ "error": { "message": "\"Trolley Bags\" is not a subcategory of \"Men\"", "code": "NOT_FOUND" } }
```

---

## Homepage content

### `GET /api/home`

Everything the homepage needs in one request — banners keyed by placement, every
rail with its products, and the nav tree.

```bash
curl http://localhost:4000/api/home
```

```jsonc
{
  "data": {
    "banners": {
      "hero":  [ { /* banner */ }, { /* banner */ } ],   // array — the slider
      "mid-1": { /* banner */ },                         // one banner, or null
      "mid-2": { /* banner */ },                         // one banner, or null
      "mid-3": { "left": { /* banner */ },               // the About block's
                 "right": { /* banner */ } },            // two flanking images
      "mid-4": { /* banner */ }                          // one banner, or null
    },
    "collections": [ { "slug": "deal-of-the-day", "products": [ … ] }, … ],
    "categories":  [ /* the tree from GET /api/categories */ ]
  }
}
```

Rails with no products are omitted, so an emptied rail cannot render as a broken
section.

### `GET /api/collections` · `GET /api/collections/:slug`

Every active rail, or one by slug.

```bash
curl http://localhost:4000/api/collections          # { "data": [ …rails ], "total": 7 }
curl http://localhost:4000/api/collections/luggage  # one rail
```

```jsonc
{
  "data": {
    "id": "cmt8uwv6l005uv74wi77l3wo1",
    "slug": "luggage",
    "title": "Luggage & Suitcases",
    "subtitle": null,
    "sortOrder": 12,
    "isActive": true,
    "type": "CATEGORY",
    "productLimit": 10,
    "category": { "id": "cmt8wm8hj000bv7coujzf6im8", "name": "Luggage & SuitCase", "slug": "luggage-and-suitcase" },
    "products": [ /* product objects */ ]
  }
}
```

An unknown slug returns **404**.

Two kinds of rail:

- **`MANUAL`** — hand-picked and hand-ordered from the admin app.
  Seeded: `deal-of-the-day`, `trending`, `best-sellers`, `new-arrival`, `shop-all`.
- **`CATEGORY`** — auto-fills from `category`, newest first, capped at
  `productLimit`. Seeded: `for-men`, `for-women`, `luggage`, `accessories`.
  These stay current on their own as products are added.

### `GET /api/banners?placement=hero`

`placement` is optional; without it every active banner is returned.

```bash
curl 'http://localhost:4000/api/banners?placement=mid-1'
```

```jsonc
{
  "data": [
    {
      "id": "cmt8…",
      "placement": "mid-1",
      "imageUrl": "https://www.marfit.in/cdn/shop/files/RMP_9931.jpg?width=1600&height=400&crop=center",
      "alt": "Leather bags for men",
      "title": "Handcrafted For Him",
      "subtitle": "Briefcases, messenger bags and wallets in genuine leather.",
      "ctaLabel": "Shop Men",
      "linkUrl": "/categories/Men",
      "hasCta": true,
      "sortOrder": 0,
      "isActive": true
    }
  ],
  "total": 1
}
```

| Placement | Storefront section | Shape in `/api/home` |
|---|---|---|
| `hero` | the rotating slider | **array**, ordered by `sortOrder` |
| `mid-1` | one full-width banner after the first rail | **object**, or `null` |
| `mid-2` | one full-width banner further down | **object**, or `null` |
| `mid-3` | the About block — two tall images flanking the brand panel | **`{ left, right }`**, either may be `null` |
| `mid-4` | one full-width banner near the bottom | **object**, or `null` |

The shape follows what the page renders, so a consumer never writes `[0]` for a
case that cannot happen. Every placement key is always present, so
`banners["mid-2"].left` can be read without checking anything exists first.

For `mid-3`, `sortOrder` **is the side**: `0` is left, `1` is right. Banners in a
paired placement also carry `side: "left" | "right"` in their payload.

```jsx
<HeroSection banners={content.banners.hero} />          {/* array  */}
<Banner  banner={content.banners["mid-1"]} />           {/* object */}
<Banner2 banner={content.banners["mid-2"]} />           {/* object */}
<About
  left={content.banners["mid-3"].left}
  right={content.banners["mid-3"].right}
/>
<Banner3 banner={content.banners["mid-4"]} />           {/* object */}
```

The admin API enforces every capacity: a second banner in any single slot, a
third in `mid-3`, or moving one onto an occupied half, all return **409** rather
than being accepted and silently never rendered. An unknown placement is
rejected with **422**.

A slot with no banner comes back as `null` (or a `{ left: null, right: null }`
pair), so the frontend can skip that section. Set one in the admin app.

`GET /api/banners` is unchanged — it is a list endpoint and always returns an
array.

`hasCta` is `true` only when **both** `ctaLabel` and `linkUrl` are set; render a
button then, otherwise a plain clickable image. `linkUrl` accepts an in-app path
(`/categories/Men`) or a full URL.

### `GET /api/pincodes/:code`

```bash
curl http://localhost:4000/api/pincodes/700016
```

```json
{ "data": { "pincode": "700016", "serviceable": true, "city": "Kolkata",
            "state": "West Bengal", "etaDays": 3,
            "message": "Delivery within Aug 28, 2026 - Aug 29, 2026." } }
```

Not serviceable returns **200** with `serviceable: false` — it is an answer, not
an error. A non-6-digit code returns **400**.

---

## Cart

All six endpoints return the **whole cart**, so the client never has to merge
state itself. A guest's cart follows the `marfit_sid` cookie (`-b jar -c jar`
below); a signed-in user's follows their token.

| Method | Path | Body |
|---|---|---|
| `GET` | `/api/cart` | — |
| `POST` | `/api/cart/items` | `{ productId, quantity? }` → **201** |
| `PATCH` | `/api/cart/items` | `{ productId, quantity }` — `0` removes the line |
| `POST` | `/api/cart/items/remove` | `{ productId }` — kept for the existing client |
| `DELETE` | `/api/cart/items/:productId` | preferred form for new code |
| `DELETE` | `/api/cart` | empty the cart |

`productId` accepts an **id, SKU or slug**.

### `POST /api/cart/items` — add

Adds to the quantity already in the cart.

```bash
curl -X POST http://localhost:4000/api/cart/items \
  -H 'Content-Type: application/json' \
  -b jar -c jar \
  -d '{"productId":"MB2155019BRN","quantity":2}'
```

```jsonc
// 201
{
  "data": {
    "id": "cmuvbl6v500086bdl1fon7cva",
    "items": [
      {
        "id": "cmuvbl6v6000a6bdlxq3dowgr",
        "productId": "cmt8wm9ar00jzv7coitlchki7",
        "quantity": 2,
        "unitPrice": 3199,
        "lineTotal": 6398,
        "product": { /* full product object */ },
        "sku": "MB2155019BRN", "title": "Leather Laptop Messenger Bag for Men MB2155019",
        "img": "https://cdn.shopify.com/…", "price": 3199, "oldPrice": 7499
      }
    ],
    "summary": { "itemCount": 2, "lineCount": 1, "subtotal": 6398, "shipping": 0, "total": 6398 }
  }
}
```

Exceeding stock returns **409**:

```json
{ "error": { "message": "Only 25 left in stock for \"Leather Laptop Messenger Bag…\"",
             "code": "CONFLICT", "details": { "productId": "cmt8…", "available": 25 } } }
```

### `GET /api/cart`

```bash
curl http://localhost:4000/api/cart -b jar -c jar
```

Same shape as above. A visitor with no cart yet gets an empty one, not a 404:

```json
{ "data": { "id": null, "items": [],
            "summary": { "itemCount": 0, "lineCount": 0, "subtotal": 0, "shipping": 0, "total": 0 } } }
```

### `PATCH /api/cart/items` — set a quantity

Sets the quantity outright (rather than adding). `0` removes the line.

```bash
curl -X PATCH http://localhost:4000/api/cart/items \
  -H 'Content-Type: application/json' -b jar -c jar \
  -d '{"productId":"MB2155019BRN","quantity":3}'
```

```jsonc
{
  "data": {
    "id": "cmuvbl6v500086bdl1fon7cva",
    "items": [ { "productId": "cmt8wm9ar00jzv7coitlchki7", "quantity": 3, "unitPrice": 3199, "lineTotal": 9597, … } ],
    "summary": { "itemCount": 3, "lineCount": 1, "subtotal": 9597, "shipping": 0, "total": 9597 }
  }
}
```

### `DELETE /api/cart/items/:productId` — remove a line

```bash
curl -X DELETE http://localhost:4000/api/cart/items/MB2155019BRN -b jar -c jar
```

```json
{ "data": { "id": "cmuvbl6v500086bdl1fon7cva", "items": [],
            "summary": { "itemCount": 0, "lineCount": 0, "subtotal": 0, "shipping": 0, "total": 0 } } }
```

A product that is not in the cart returns **404**. The older
`POST /api/cart/items/remove` does the same with the id in the body:

```bash
curl -X POST http://localhost:4000/api/cart/items/remove \
  -H 'Content-Type: application/json' -b jar -c jar \
  -d '{"productId":"MB2155019BRN"}'
```

### `DELETE /api/cart` — empty it

```bash
curl -X DELETE http://localhost:4000/api/cart -b jar -c jar
```

```json
{ "data": { "id": "cmuvbl6v500086bdl1fon7cva", "items": [],
            "summary": { "itemCount": 0, "lineCount": 0, "subtotal": 0, "shipping": 0, "total": 0 } } }
```

---

## Orders

### `POST /api/orders` — checkout

Builds the order from the caller's current cart. This is **cash on delivery**:
the order is placed straight away with `payment.status: "PENDING"`. For online
payment use [Razorpay](#payments-razorpay) instead.

```bash
curl -X POST http://localhost:4000/api/orders \
  -H 'Content-Type: application/json' -c jar -b jar \
  -d '{"email":"buyer@example.com","customerName":"Asha Roy","phone":"9876543210",
       "addressLine1":"12 Park Street","city":"Kolkata","state":"West Bengal","pincode":"700016"}'
```

```jsonc
{
  "data": {
    "id": "cmt8…",
    "orderNumber": "MRF-260825-8182",
    "status": "PENDING",
    "email": "buyer@example.com",
    "customerName": "Asha Roy",
    "address": { "line1": "12 Park Street", "line2": null, "city": "Kolkata",
                 "state": "West Bengal", "pincode": "700016" },
    "subtotal": 6398, "shipping": 0, "total": 6398,
    "payment": { "method": "COD", "status": "PENDING", "razorpayOrderId": null,
                 "razorpayPaymentId": null, "paidAt": null, "note": null },
    "items": [ { "sku": "MB2155019BRN", "title": "…", "price": 3199, "quantity": 2, "lineTotal": 6398 } ],
    "createdAt": "2026-08-25T…"
  }
}
```

Inside one transaction, checkout snapshots title/SKU/price onto the order,
decrements stock (writing a `SALE` row to the stock ledger) and empties the
cart — so a later product edit or deletion never rewrites history. An empty cart
returns **400**; insufficient stock returns **409**.

`pincode` must be 6 digits. All the address fields above are required.

A signed-in customer can send `{ "addressId": "…" }` instead of the address
fields, to use a [saved address](#saved-addresses). Its email falls back to the
account email when the address has none. Any field sent alongside `addressId`
overrides the saved one for this order. Someone else's `addressId` returns
**404**; a guest sending one gets **401**.

```bash
curl -X POST http://localhost:4000/api/orders \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"addressId":"cmuvbl6w3000i6bdl7rbayhgn"}'
```

```jsonc
// 201 — the address and email came from the saved address and the account
{
  "data": {
    "id": "cmuvbl6xc000s6bdlsht816ok",
    "orderNumber": "MRF-261005-8287",
    "status": "PENDING",
    "email": "asha@example.com",
    "phone": "9876543210",
    "customerName": "Asha Roy",
    "address": { "line1": "12 Park Street", "line2": "Flat 4B", "city": "Kolkata",
                 "state": "West Bengal", "pincode": "700016" },
    "subtotal": 3199, "shipping": 0, "total": 3199,
    "payment": { "method": "COD", "status": "PENDING", "razorpayOrderId": null,
                 "razorpayPaymentId": null, "paidAt": null, "note": null },
    "items": [
      { "id": "cmuvbl6xc000u6bdlhsp11hej", "productId": "cmt8wm9ar00jzv7coitlchki7",
        "sku": "MB2155019BRN", "title": "Leather Laptop Messenger Bag for Men MB2155019",
        "price": 3199, "quantity": 1, "imageUrl": "https://cdn.shopify.com/…", "lineTotal": 3199 }
    ],
    "createdAt": "2026-10-05T14:03:16.176Z",
    "updatedAt": "2026-10-05T14:03:16.176Z"
  }
}
```

Every order carries `payment.method` (`COD` | `RAZORPAY`) and `payment.status`
(`PENDING` | `PAID`), including in the admin order list.

### `GET /api/orders/track?orderNumber=…&email=…`

Public lookup for the Track Order page. A guest order needs the matching email
as a shared secret; a signed-in owner can look up their own without it. A
mismatch returns **404**, never a hint that the order exists.

```bash
curl 'http://localhost:4000/api/orders/track?orderNumber=MRF-261005-8287&email=asha@example.com'
```

Returns the order, in the same shape as checkout. A wrong email:

```json
{ "error": { "message": "No order found for those details", "code": "NOT_FOUND" } }
```

### `GET /api/orders`

The signed-in user's history, newest first. Requires auth.

```bash
curl http://localhost:4000/api/orders -H "Authorization: Bearer $TOKEN"
```

```jsonc
{
  "data": [
    { "orderNumber": "MRF-261005-8287", "status": "PENDING", "total": 3199,
      "payment": { "method": "COD", "status": "PENDING", … }, "items": [ … ], … }
  ],
  "total": 1
}
```

### `GET /api/orders/:orderNumber`

One order, owner only. Someone else's order number returns **404**.

```bash
curl http://localhost:4000/api/orders/MRF-261005-8287 -H "Authorization: Bearer $TOKEN"
```

Returns the order in the same shape as checkout.

---

## Payments (Razorpay)

Online checkout takes two calls. The order is **only written once the payment is
confirmed**, so a customer who abandons the payment leaves no order behind, holds
no stock, and keeps their cart.

```
POST /api/payments/razorpay/order   → open Razorpay Checkout with the result
          ↓ customer pays
POST /api/payments/razorpay/verify  → the placed order
```

### `GET /api/payments/config`

Which payment options to offer.

```bash
curl http://localhost:4000/api/payments/config
```

```json
{ "data": { "cod": true, "razorpay": true, "razorpayKeyId": "rzp_test_1DP5mmOlF5G5ag" } }
```

### `POST /api/payments/razorpay/order` — step 1

Same body as [`POST /api/orders`](#post-apiorders--checkout): the address fields,
or `{ addressId }`. The amount is taken from the cart on the server, never from
the client.

```bash
# with the address typed in
curl -X POST http://localhost:4000/api/payments/razorpay/order \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"email":"asha@example.com","customerName":"Asha Roy","phone":"9876543210",
       "addressLine1":"12 Park Street","addressLine2":"Flat 4B","city":"Kolkata",
       "state":"West Bengal","pincode":"700016"}'

# or with a saved address
curl -X POST http://localhost:4000/api/payments/razorpay/order \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"addressId":"cmuvbl6w3000i6bdl7rbayhgn"}'
```

```jsonc
// 201
{
  "data": {
    "paymentId": "cmuvbl6xu00106bdlnx76vjzw",
    "keyId": "rzp_test_1DP5mmOlF5G5ag",
    "razorpayOrderId": "order_PbL6xMn1kQ7zTd",
    "amount": 6398,          // whole rupees, like every price here
    "currency": "INR",
    "name": "Marfit",
    "prefill": { "name": "Asha Roy", "email": "asha@example.com", "contact": "9876543210" }
  }
}
```

Hand it to [Razorpay Checkout](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/).
There is no need to pass `amount`, because Checkout reads it from the order:

```js
const { data } = await (await fetch("/api/payments/razorpay/order", { … })).json();

new Razorpay({
  key: data.keyId,
  order_id: data.razorpayOrderId,
  name: data.name,
  prefill: data.prefill,
  handler: async (response) => {
    // response = { razorpay_order_id, razorpay_payment_id, razorpay_signature }
    const res = await fetch("/api/payments/razorpay/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(response),
    });
    const { data: order } = await res.json();   // → order confirmation page
  },
}).open();
```

Errors are the same as checkout: **400** for an empty cart, **409** for stock.
This endpoint is rate-limited to 30 requests per 15 minutes.

### `POST /api/payments/razorpay/verify` — step 2

Post the object Razorpay Checkout passes to `handler`, unchanged:

```bash
curl -X POST http://localhost:4000/api/payments/razorpay/verify \
  -H 'Content-Type: application/json' \
  -d '{"razorpay_order_id":"order_PbL6xMn1kQ7zTd",
       "razorpay_payment_id":"pay_PbL6zR8sVn2kJm",
       "razorpay_signature":"ee2eb7e436a7c8aca83614d9f1c3c68933474ed524fc99e629f21876bfd10336"}'
```

The signature is checked with the key secret. If it is valid, the order is placed
in one transaction: lines snapshotted, stock deducted with `SALE` ledger rows, and
the bought items removed from the cart. The response is the
[order](#post-apiorders--checkout) with `payment.method: "RAZORPAY"` and
`payment.status: "PAID"`:

```jsonc
// 200
{
  "data": {
    "id": "cmuvbl6xy00126bdl7f82q4pn",
    "orderNumber": "MRF-261005-4002",
    "status": "PENDING",
    "email": "asha@example.com",
    "customerName": "Asha Roy",
    "address": { "line1": "12 Park Street", "line2": "Flat 4B", "city": "Kolkata",
                 "state": "West Bengal", "pincode": "700016" },
    "subtotal": 6398, "shipping": 0, "total": 6398,
    "payment": {
      "method": "RAZORPAY",
      "status": "PAID",
      "razorpayOrderId": "order_PbL6xMn1kQ7zTd",
      "razorpayPaymentId": "pay_PbL6zR8sVn2kJm",
      "paidAt": "2026-10-05T14:03:16.197Z",
      "note": null
    },
    "items": [ { "sku": "MB2155019BRN", "title": "…", "price": 3199, "quantity": 2, "lineTotal": 6398, … } ],
    …
  }
}
```

`status` is the fulfilment status, which starts at `PENDING` for every order;
`payment.status` is what says it has been paid. A signature that does not match:

```json
{ "error": { "message": "Payment could not be verified", "code": "PAYMENT_VERIFICATION_FAILED" } }
```

| Status | When |
|---|---|
| 200 | the order — also on a repeat call, which returns the same order |
| 400 `PAYMENT_VERIFICATION_FAILED` | the signature does not match |
| 404 | no checkout was started for that `razorpay_order_id` |

If the last unit sells to someone else while the customer is paying, their
payment has already been taken, so the order is **still placed**. Stock is left
untouched, and `payment.note` tells an admin to restock or refund.

### `POST /api/payments/razorpay/webhook`

Called by Razorpay, not the storefront. It is the backstop for a customer who
pays and closes the tab before `verify` runs. In the Razorpay dashboard, under
**Webhooks**, add `https://<api host>/api/payments/razorpay/webhook` with the
events `payment.captured`, `order.paid` and `payment.failed`, and put the secret
in `RAZORPAY_WEBHOOK_SECRET`.

Razorpay signs the raw body with that secret and sends it in
`X-Razorpay-Signature`. A `payment.captured` delivery looks like this (trimmed):

```bash
curl -X POST http://localhost:4000/api/payments/razorpay/webhook \
  -H 'Content-Type: application/json' \
  -H 'X-Razorpay-Signature: 5b0f9c…' \
  -d '{"entity":"event","event":"payment.captured","contains":["payment"],
       "payload":{"payment":{"entity":{"id":"pay_PbL9Qw4tXy1aBc","entity":"payment",
         "amount":319900,"currency":"INR","status":"captured",
         "order_id":"order_PbL7Fq2hYw9cRs","method":"upi"}}}}'
```

```json
{ "data": { "received": true } }
```

To test it locally, compute the signature yourself:

```bash
BODY='{"event":"payment.captured","payload":{"payment":{"entity":{"id":"pay_X","order_id":"order_PbL7Fq2hYw9cRs"}}}}'
SIG=$(printf '%s' "$BODY" | openssl dgst -sha256 -hmac "$RAZORPAY_WEBHOOK_SECRET" | sed 's/^.* //')
curl -X POST http://localhost:4000/api/payments/razorpay/webhook \
  -H 'Content-Type: application/json' -H "X-Razorpay-Signature: $SIG" -d "$BODY"
```

The webhook and `verify` can arrive in either order; whichever comes first places
the order and the other returns it. `payment.failed` is recorded, but a later
successful retry in the same Checkout still wins. Every genuine event is
acknowledged with **200**, including events for orders this server didn't
create. A bad signature:

```json
{ "error": { "message": "Invalid webhook signature", "code": "BAD_REQUEST" } }
```

### Configuration

| Variable | |
|---|---|
| `RAZORPAY_KEY_ID` · `RAZORPAY_KEY_SECRET` | Dashboard → API Keys. Use `rzp_test_` keys in development. |
| `RAZORPAY_WEBHOOK_SECRET` | The secret entered when creating the webhook |
| `STORE_NAME` | Merchant name in the Checkout modal (default `Marfit`) |

Without the keys, `config` reports `razorpay: false` and the other endpoints
return **503** `PAYMENTS_NOT_CONFIGURED`. COD checkout is unaffected. Payments
are treated as paid once captured, so leave **automatic capture** on in the
Razorpay dashboard (the default).

In dummy mode, Razorpay is never contacted. `order` returns `isDummy: true` and
`keyId: null`; skip the Checkout modal and call `verify` directly with any
`razorpay_payment_id` and `razorpay_signature`.

---

## Wishlist

Requires a signed-in user (**401** otherwise). Each entry is a **full product
object**, the same shape as `/api/products` with legacy aliases, plus `addedAt`,
so a wishlist renders with the same product card as any listing. Newest first.

| Method | Path | Body |
|---|---|---|
| `GET` | `/api/wishlist` | — |
| `POST` | `/api/wishlist` | `{ productId }` → **201** if added, **200** if already saved |
| `DELETE` | `/api/wishlist/:productId` | idempotent, no error if it was not saved |
| `DELETE` | `/api/wishlist` | empty it |

Every call returns the whole wishlist. `productId` accepts an **id, SKU or slug**.
Unknown products return **404**, and a deactivated product **409**. Out-of-stock
products can be saved; check `inStock` on each entry.

### `POST /api/wishlist` — save a product

```bash
curl -X POST http://localhost:4000/api/wishlist \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"productId":"MB2155019BRN"}'
```

```jsonc
// 201 — or 200, with the same body, if it was already saved
{
  "data": [
    {
      "id": "cmt8wm9ar00jzv7coitlchki7",          // the product's id
      "sku": "MB2155019BRN",
      "title": "Leather Laptop Messenger Bag for Men MB2155019",
      "price": 3199,
      "img": "https://cdn.shopify.com/…",
      /* …every other product field… */
      "addedAt": "2026-10-05T14:03:16.151Z"
    }
  ],
  "total": 1
}
```

### `GET /api/wishlist`

```bash
curl http://localhost:4000/api/wishlist -H "Authorization: Bearer $TOKEN"
```

Same shape as above. Without a token:

```json
{ "error": { "message": "Authentication required", "code": "UNAUTHORIZED" } }
```

### `DELETE /api/wishlist/:productId` — remove one

```bash
curl -X DELETE http://localhost:4000/api/wishlist/MB2155019BRN \
  -H "Authorization: Bearer $TOKEN"
```

```json
{ "data": [], "total": 0 }
```

### `DELETE /api/wishlist` — empty it

```bash
curl -X DELETE http://localhost:4000/api/wishlist -H "Authorization: Bearer $TOKEN"
```

```json
{ "data": [], "total": 0 }
```

---

## Saved addresses

The signed-in user's address book (**401** for guests). Field names match the
checkout body, so a saved address can go straight into
[`POST /api/orders`](#post-apiorders--checkout) or the Razorpay order call,
either spread in or by `addressId`.

| Method | Path | Body |
|---|---|---|
| `GET` | `/api/addresses` | — default first, then newest |
| `GET` | `/api/addresses/:id` | — |
| `POST` | `/api/addresses` | address fields (`label`, `email`, `addressLine2`, `isDefault` optional) → **201** |
| `PATCH` | `/api/addresses/:id` | any subset |
| `DELETE` | `/api/addresses/:id` | returns the remaining list |

A user has at most one default. Their first address becomes it automatically,
`isDefault: true` on create or `PATCH` moves it, and deleting the default hands
it to the newest remaining address. Validation matches checkout, so `pincode`
must be 6 digits. Another user's address id returns **404**.

### `POST /api/addresses` — add one

```bash
curl -X POST http://localhost:4000/api/addresses \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"label":"Home","customerName":"Asha Roy","phone":"9876543210",
       "addressLine1":"12 Park Street","addressLine2":"Flat 4B",
       "city":"Kolkata","state":"West Bengal","pincode":"700016"}'
```

```jsonc
// 201
{
  "data": {
    "id": "cmuvbl6w3000i6bdl7rbayhgn",
    "label": "Home",                // optional nickname
    "customerName": "Asha Roy",
    "phone": "9876543210",
    "email": null,                  // optional; checkout falls back to the account email
    "addressLine1": "12 Park Street",
    "addressLine2": "Flat 4B",
    "city": "Kolkata",
    "state": "West Bengal",
    "pincode": "700016",
    "isDefault": true,              // the first address becomes the default
    "createdAt": "2026-10-05T14:03:16.132Z",
    "updatedAt": "2026-10-05T14:03:16.132Z"
  }
}
```

A field that fails validation:

```json
{ "error": { "message": "Request validation failed", "code": "VALIDATION_ERROR",
             "details": [ { "field": "pincode", "message": "Pincode must be 6 digits" } ] } }
```

### `GET /api/addresses` — list

```bash
curl http://localhost:4000/api/addresses -H "Authorization: Bearer $TOKEN"
```

```jsonc
{
  "data": [
    { "id": "cmuvbl6w3000i6bdl7rbayhgn", "label": "Home", "isDefault": true, … },
    { "id": "cmuvbl6w6000k6bdli19411cb", "label": "Office", "isDefault": false,
      "email": "asha.work@example.com", "addressLine1": "4 Camac Street", "pincode": "700017", … }
  ],
  "total": 2
}
```

### `GET /api/addresses/:id` — one

```bash
curl http://localhost:4000/api/addresses/cmuvbl6w3000i6bdl7rbayhgn \
  -H "Authorization: Bearer $TOKEN"
```

Returns a single address, in the same shape as the create response.

### `PATCH /api/addresses/:id` — edit, or make it the default

```bash
curl -X PATCH http://localhost:4000/api/addresses/cmuvbl6w6000k6bdli19411cb \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"isDefault":true,"phone":"9123456780"}'
```

```jsonc
{
  "data": {
    "id": "cmuvbl6w6000k6bdli19411cb",
    "label": "Office",
    "phone": "9123456780",
    "isDefault": true,              // "Home" is no longer the default
    "updatedAt": "2026-10-05T14:03:16.142Z",
    …
  }
}
```

### `DELETE /api/addresses/:id`

```bash
curl -X DELETE http://localhost:4000/api/addresses/cmuvbl6w6000k6bdli19411cb \
  -H "Authorization: Bearer $TOKEN"
```

Returns what is left. The deleted address was the default, so "Home" took over:

```jsonc
{
  "data": [ { "id": "cmuvbl6w3000i6bdl7rbayhgn", "label": "Home", "isDefault": true, … } ],
  "total": 1
}
```

---

## Leads

### `POST /api/leads`

One endpoint behind all three storefront forms — Franchise, Bulk and Contact
differ only by `type`.

```bash
curl -X POST http://localhost:4000/api/leads \
  -H 'Content-Type: application/json' \
  -d '{"type":"BULK","name":"Asha","email":"asha@example.com",
       "phone":"9876543210","company":"Acme","message":"200 units","sku":"MB2155019BRN"}'
```

```json
{ "data": { "id": "cmt8…", "type": "BULK", "name": "Asha", "email": "asha@example.com",
            "phone": "9876543210", "company": "Acme", "message": "200 units",
            "sku": "MB2155019BRN", "status": "NEW", "createdAt": "2026-08-25T…" } }
```

`type` is `FRANCHISE` · `BULK` · `CONTACT`. Rate-limited to 10 per hour.

---

## Settings

### `GET /api/settings`

Public runtime flags, read by the storefront on boot.

```bash
curl http://localhost:4000/api/settings
```

```json
{ "data": { "dummyMode": false } }
```

Every response also carries an `X-Dummy-Mode: on|off` header, so a test-mode
ribbon can be rendered without an extra request. See
[Dummy mode](../README.md#dummy-mode).

### `GET /api/health`

Liveness check, including a round trip to the database.

```bash
curl http://localhost:4000/api/health
```

```json
{ "data": { "status": "ok", "uptime": 5321 } }
```

---

## Admin

Everything under `/api/admin` requires a token whose user has `role: "ADMIN"`.
Missing token → **401**; a customer's token → **403**.

```bash
TOKEN=$(curl -s -X POST http://localhost:4000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@marfit.local","password":"admin12345"}' \
  | node -pe "JSON.parse(require('fs').readFileSync(0)).data.token")

curl http://localhost:4000/api/admin/stats -H "Authorization: Bearer $TOKEN"
```

### `GET /api/admin/stats`

```json
{ "data": {
  "products":  { "total": 101, "active": 101, "outOfStock": 0, "lowStock": 0 },
  "inventory": { "totalProducts": 101, "outOfStock": 0, "lowStock": 0,
                 "unitsInStock": 2525, "stockValue": 6743275 },
  "orders":    { "total": 0, "pending": 0, "revenue": 0 },
  "leads":     { "total": 0, "new": 0 },
  "users":     { "total": 1 }
} }
```

### Products

| Method | Path | Notes |
|---|---|---|
| `GET` | `/api/admin/products` | `page`, `limit`, `search`, `sort` |
| `POST` | `/api/admin/products` | → **201** |
| `PATCH` | `/api/admin/products/:id` | partial |
| `DELETE` | `/api/admin/products/:id` | soft delete; `?hard=true` really removes |

List, including inactive products:

```bash
curl 'http://localhost:4000/api/admin/products?search=briefcase&limit=2' \
  -H "Authorization: Bearer $TOKEN"
```

```jsonc
{
  "data": [ { "id": "cmt8wm9a400jlv7co3qt5tp2r", "sku": "BC1149002TAN", "title": "Premium Genuine Leather Laptop Briefcase…", "price": 4799, … }, … ],
  "total": 16, "totalProducts": 16, "page": 1, "limit": 2
}
```

Create:

```bash
curl -X POST http://localhost:4000/api/admin/products \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{
    "sku": "WL0001BRN",
    "title": "Leather Bifold Wallet",
    "price": 1299,
    "compareAtPrice": 1999,
    "imageUrl": "https://cdn.example.com/wallet-1.jpg",
    "images": [
      { "url": "https://cdn.example.com/wallet-1.jpg", "alt": "front" },
      { "url": "https://cdn.example.com/wallet-2.jpg", "alt": "open" }
    ],
    "categoryId": "cmt8…",
    "subcategoryId": "cmt8…",
    "stockQty": 40,
    "isEmbossable": true,
    "isActive": true
  }'
```

```jsonc
// 201
{
  "data": {
    "id": "cmuvbl71m001l6bdl8iq9nfby",
    "sku": "WL0001BRN",
    "slug": "leather-bifold-wallet",          // generated from the title
    "title": "Leather Bifold Wallet",
    "price": 1299, "compareAtPrice": 1999, "discountPercent": 35, "discount": "35% OFF",
    "imageUrl": "https://cdn.example.com/wallet-1.jpg",
    "images": [
      { "id": "cmuvbl71m001m6bdlxs9qvg16", "url": "https://cdn.example.com/wallet-1.jpg", "alt": "front" },
      { "id": "cmuvbl71m001n6bdldjv10y7c", "url": "https://cdn.example.com/wallet-2.jpg", "alt": "open" }
    ],
    "isEmbossable": true, "isActive": true,
    "stockQty": 40, "inStock": true, "lowStockThreshold": 5, "isLowStock": false,
    "categoryRef":    { "id": "cmt8wm8gq0001v7co93yzonry", "name": "Men", "slug": "men" },
    "subcategoryRef": { "id": "cmt8wm8gv0003v7coym9yikoy", "name": "Briefcase", "slug": "men-briefcase" },
    …
  }
}
```

Update — send only the fields that change:

```bash
curl -X PATCH http://localhost:4000/api/admin/products/cmuvbl71m001l6bdl8iq9nfby \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"price":1199,"compareAtPrice":1999}'
```

```jsonc
{ "data": { "id": "cmuvbl71m001l6bdl8iq9nfby", "sku": "WL0001BRN", "price": 1199, "discountPercent": 40, … } }
```

Delete:

```bash
curl -X DELETE http://localhost:4000/api/admin/products/cmuvbl71m001l6bdl8iq9nfby \
  -H "Authorization: Bearer $TOKEN"
```

```jsonc
// the product, now hidden from the storefront
{ "data": { "id": "cmuvbl71m001l6bdl8iq9nfby", "sku": "WL0001BRN", "isActive": false, … } }
```

`slug` is generated from the title when omitted. Supplying `images` on a `PATCH`
**replaces** the gallery wholesale. Deleting soft-deletes by default
(`isActive: false`) so the product drops out of the storefront while staying
attached to past orders.

### Categories

| Method | Path | Notes |
|---|---|---|
| `GET` | `/api/admin/categories` | the full tree, inactive included |
| `POST` | `/api/admin/categories` | → **201**; `parentId` makes it a subcategory |
| `PATCH` | `/api/admin/categories/:id` | partial |
| `DELETE` | `/api/admin/categories/:id` | `?force=true` unlinks its products |

```bash
curl http://localhost:4000/api/admin/categories -H "Authorization: Bearer $TOKEN"
```

```jsonc
{
  "data": [
    {
      "id": "cmt8wm8gq0001v7co93yzonry", "name": "Men", "slug": "men",
      "imageUrl": "https://cdn.shopify.com/…", "sortOrder": 0, "parentId": null,
      "children": [
        { "id": "cmt8wm8gv0003v7coym9yikoy", "name": "Briefcase", "slug": "men-briefcase",
          "sortOrder": 0, "parentId": "cmt8wm8gq0001v7co93yzonry", "children": [] },
        …
      ]
    },
    …
  ],
  "total": 4
}
```

```bash
curl -X POST http://localhost:4000/api/admin/categories \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"name":"Belts","parentId":"cmt8wm8gq0001v7co93yzonry","sortOrder":9,"isActive":true}'
```

```json
{ "data": { "id": "cmuvbl72e001p6bdl44hc16u1", "name": "Belts", "slug": "belts", "imageUrl": null,
            "sortOrder": 9, "parentId": "cmt8wm8gq0001v7co93yzonry", "children": [] } }
```

```bash
curl -X PATCH http://localhost:4000/api/admin/categories/cmuvbl72e001p6bdl44hc16u1 \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"name":"Leather Belts","sortOrder":4}'
```

```json
{ "data": { "id": "cmuvbl72e001p6bdl44hc16u1", "name": "Leather Belts", "slug": "belts", "imageUrl": null,
            "sortOrder": 4, "parentId": "cmt8wm8gq0001v7co93yzonry", "children": [] } }
```

Renaming keeps the slug, so existing links keep working.

```bash
curl -X DELETE http://localhost:4000/api/admin/categories/cmuvbl72e001p6bdl44hc16u1 \
  -H "Authorization: Bearer $TOKEN"
```

```json
{ "data": { "id": "cmuvbl72e001p6bdl44hc16u1", "deleted": true } }
```

Deleting a category still referenced by products returns **409** with the count;
pass `?force=true` to unlink them instead:

```json
{ "error": { "message": "33 product(s) still use this category. Reassign them, or pass ?force=true to unlink.",
             "code": "CONFLICT", "details": { "productCount": 33 } } }
```

### Collections

| Method | Path |
|---|---|
| `GET` `POST` | `/api/admin/collections` |
| `PATCH` `DELETE` | `/api/admin/collections/:id` |
| `PUT` | `/api/admin/collections/:id/products` |

```bash
curl http://localhost:4000/api/admin/collections -H "Authorization: Bearer $TOKEN"
```

```jsonc
{
  "data": [
    { "id": "cmt8uwv61005ov74wve8wqsfs", "slug": "deal-of-the-day", "title": "Deal Of The Day",
      "sortOrder": -1, "isActive": true, "type": "MANUAL", "productLimit": 10, "category": null,
      "products": [ /* product objects */ ] },
    …
  ],
  "total": 7
}
```

Create:

```bash
# a hand-picked rail
curl -X POST http://localhost:4000/api/admin/collections \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"slug":"gift-picks","title":"Gift Picks","subtitle":"Under ₹2,000",
       "type":"MANUAL","sortOrder":20,"isActive":true}'
```

```json
{ "data": { "id": "cmuvbl730001q6bdlsi18g5sn", "slug": "gift-picks", "title": "Gift Picks",
            "subtitle": "Under ₹2,000", "sortOrder": 20, "isActive": true, "type": "MANUAL",
            "productLimit": 10, "category": null, "products": [] } }
```

```bash
# a category-backed rail that fills itself
curl -X POST http://localhost:4000/api/admin/collections \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"slug":"womens-picks","title":"Women'\''s Picks","type":"CATEGORY",
       "categoryId":"cmt8…","productLimit":10,"sortOrder":5,"isActive":true}'
```

Set the products of a `MANUAL` rail — the full list, in display order:

```bash
curl -X PUT http://localhost:4000/api/admin/collections/cmuvbl730001q6bdlsi18g5sn/products \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"productIds":["cmt8wm99u00jev7coyhc31l3p","cmt8wm9a400jlv7co3qt5tp2r","cmt8wm9ah00jsv7cobbjy7veo"]}'
```

```jsonc
{
  "data": {
    "id": "cmuvbl730001q6bdlsi18g5sn", "slug": "gift-picks", "title": "Gift Picks", …,
    "products": [
      { "id": "cmt8wm99u00jev7coyhc31l3p", "sku": "BC1149002BRN", … },
      { "id": "cmt8wm9a400jlv7co3qt5tp2r", "sku": "BC1149002TAN", … },
      …
    ]
  }
}
```

Update:

```bash
curl -X PATCH http://localhost:4000/api/admin/collections/cmuvbl730001q6bdlsi18g5sn \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"title":"Gifts Under ₹2,000","isActive":false}'
```

```jsonc
{ "data": { "id": "cmuvbl730001q6bdlsi18g5sn", "title": "Gifts Under ₹2,000", "isActive": false, … } }
```

Delete — the products themselves are untouched:

```bash
curl -X DELETE http://localhost:4000/api/admin/collections/cmuvbl730001q6bdlsi18g5sn \
  -H "Authorization: Bearer $TOKEN"
```

```json
{ "data": { "id": "cmuvbl730001q6bdlsi18g5sn", "deleted": true } }
```

`type: "CATEGORY"` requires `categoryId` (**422** without it). Hand-picking on a
category-backed rail returns **409** — switch it to `MANUAL` first.

### Banners

| Method | Path | Notes |
|---|---|---|
| `GET` | `/api/admin/banners` | every banner, inactive included, grouped by placement |
| `POST` | `/api/admin/banners` | → **201** |
| `PATCH` | `/api/admin/banners/:id` | partial |
| `DELETE` | `/api/admin/banners/:id` | |

```bash
curl http://localhost:4000/api/admin/banners -H "Authorization: Bearer $TOKEN"
```

```jsonc
{
  "data": [
    { "id": "cmt94mw2x0000v7swxb6kdav9", "placement": "hero",
      "imageUrl": "http://localhost:4000/uploads/b309917cd67077c2da90f8daf6f8be20.webp",
      "alt": "MARFIT genuine leather", "title": null, "subtitle": null, "ctaLabel": null,
      "linkUrl": null, "hasCta": false, "sortOrder": 0, "side": null, "isActive": true },
    …
  ],
  "total": 6
}
```

```bash
curl -X POST http://localhost:4000/api/admin/banners \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"placement":"hero","imageUrl":"https://cdn.example.com/diwali.jpg","alt":"Diwali sale",
       "title":"Diwali Sale","subtitle":"Up to 60% off leather",
       "ctaLabel":"Shop Now","linkUrl":"/collections/deal-of-the-day","sortOrder":9,"isActive":true}'
```

```json
{ "data": { "id": "cmuvbl73f001r6bdl7zj6i6rr", "placement": "hero",
            "imageUrl": "https://cdn.example.com/diwali.jpg", "alt": "Diwali sale",
            "title": "Diwali Sale", "subtitle": "Up to 60% off leather",
            "ctaLabel": "Shop Now", "linkUrl": "/collections/deal-of-the-day", "hasCta": true,
            "sortOrder": 9, "side": null, "isActive": true } }
```

```bash
curl -X PATCH http://localhost:4000/api/admin/banners/cmuvbl73f001r6bdl7zj6i6rr \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"subtitle":"Up to 70% off leather","isActive":false}'
```

```jsonc
{ "data": { "id": "cmuvbl73f001r6bdl7zj6i6rr", "subtitle": "Up to 70% off leather", "isActive": false, … } }
```

```bash
curl -X DELETE http://localhost:4000/api/admin/banners/cmuvbl73f001r6bdl7zj6i6rr \
  -H "Authorization: Bearer $TOKEN"
```

```json
{ "data": { "id": "cmuvbl73f001r6bdl7zj6i6rr", "deleted": true } }
```

`mid-1`, `mid-2` and `mid-4` hold one banner each and `mid-3` a left/right pair,
so adding to a full slot returns **409**.

`placement` is `hero` · `mid-1` · `mid-2` · `mid-3` · `mid-4`.

### Inventory

| Method | Path | Notes |
|---|---|---|
| `GET` | `/api/admin/inventory` | `?stock=all\|in\|low\|out&search=&page=&limit=` |
| `GET` | `/api/admin/inventory/summary` | headline counts |
| `POST` | `/api/admin/inventory/bulk` | up to 200 rows, one transaction |
| `PATCH` | `/api/admin/products/:id/stock` | set or adjust |
| `PATCH` | `/api/admin/products/:id/threshold` | low-stock warning level |
| `GET` | `/api/admin/products/:id/stock-movements` | audit trail |

`reason` is `SALE` · `RESTOCK` · `CORRECTION` · `RETURN` · `INITIAL`.

#### The stock list

```bash
curl 'http://localhost:4000/api/admin/inventory?stock=low&limit=20' -H "Authorization: Bearer $TOKEN"
```

The listing carries a `summary` beside `data`:

```jsonc
{ "data": [ /* products, lowest stock first */ ],
  "total": 102, "page": 1, "limit": 20,
  "summary": { "totalProducts": 102, "outOfStock": 0, "lowStock": 0,
               "unitsInStock": 2560, "stockValue": 6771940 } }
```

The same headline counts on their own:

```bash
curl http://localhost:4000/api/admin/inventory/summary -H "Authorization: Bearer $TOKEN"
```

```json
{ "data": { "totalProducts": 102, "outOfStock": 0, "lowStock": 0, "unitsInStock": 2560, "stockValue": 6771940 } }
```

#### Changing one product's stock

```bash
# a delivery arrived: add 20
curl -X PATCH http://localhost:4000/api/admin/products/cmt8wm9ar00jzv7coitlchki7/stock \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"mode":"adjust","quantity":20,"reason":"RESTOCK","note":"Supplier PO #418"}'
```

```jsonc
// the product, with its new level
{ "data": { "id": "cmt8wm9ar00jzv7coitlchki7", "sku": "MB2155019BRN",
            "stockQty": 40, "inStock": true, "lowStockThreshold": 5, "isLowStock": false, … } }
```

```bash
# stocktake correction: there are actually 12
curl -X PATCH http://localhost:4000/api/admin/products/cmt8wm9ar00jzv7coitlchki7/stock \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"mode":"set","quantity":12,"reason":"CORRECTION"}'
```

```jsonc
{ "data": { "id": "cmt8wm9ar00jzv7coitlchki7", "sku": "MB2155019BRN", "stockQty": 12, … } }
```

Going below zero is refused:

```json
{ "error": { "message": "That would take \"Leather Laptop Messenger Bag for Men MB2155019\" to -38. Stock cannot go below zero.",
             "code": "CONFLICT",
             "details": { "productId": "cmt8wm9ar00jzv7coitlchki7", "current": 12, "attempted": -38 } } }
```

#### Low-stock threshold

```bash
curl -X PATCH http://localhost:4000/api/admin/products/cmt8wm9ar00jzv7coitlchki7/threshold \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"lowStockThreshold":8}'
```

```jsonc
{ "data": { "id": "cmt8wm9ar00jzv7coitlchki7", "stockQty": 12, "lowStockThreshold": 8, "isLowStock": false, … } }
```

#### Many products at once

One transaction: if any row fails, none are applied. `productId` here is the
product **id**, not the SKU.

```bash
curl -X POST http://localhost:4000/api/admin/inventory/bulk \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"mode":"adjust","reason":"RESTOCK","note":"Weekly delivery",
       "updates":[{"productId":"cmt8wm99u00jev7coyhc31l3p","quantity":10},
                  {"productId":"cmt8wm9a400jlv7co3qt5tp2r","quantity":10}]}'
```

```json
{ "data": { "updated": 2 },
  "summary": { "totalProducts": 102, "outOfStock": 0, "lowStock": 0, "unitsInStock": 2572, "stockValue": 6842328 } }
```

#### Movement history

Newest first; `?limit=` defaults to 50, at most 100.

```bash
curl http://localhost:4000/api/admin/products/cmt8wm9ar00jzv7coitlchki7/stock-movements \
  -H "Authorization: Bearer $TOKEN"
```

```jsonc
{
  "data": [
    { "id": "cmuvbl748001v6bdli12mcquf", "reason": "CORRECTION", "delta": -28, "resulting": 12,
      "note": null, "orderId": null, "userId": "cmt8ubw0a0000v7mcwpykfsr9",
      "createdAt": "2026-10-05T14:03:16.424Z", "productId": "cmt8wm9ar00jzv7coitlchki7" },
    { "id": "cmuvbl744001t6bdlensrhvyy", "reason": "RESTOCK", "delta": 20, "resulting": 40,
      "note": "Supplier PO #418", "orderId": null, "userId": "cmt8ubw0a0000v7mcwpykfsr9",
      "createdAt": "2026-10-05T14:03:16.420Z", "productId": "cmt8wm9ar00jzv7coitlchki7" },
    …
  ],
  "total": 6
}
```

A `SALE` row carries the `orderId` it came from and a null `userId`.

Two rules the service enforces: stock **never goes below zero** (an adjustment
that would is rejected with **409**, not clamped), and **every** change is
written to the ledger — including checkout, inside the order transaction.

### Orders and leads

| Method | Path |
|---|---|
| `GET` | `/api/admin/orders` — `?status=&search=&page=&limit=` |
| `PATCH` | `/api/admin/orders/:id/status` — `{ status }` |
| `GET` | `/api/admin/leads` — `?status=&type=&page=&limit=` |
| `PATCH` | `/api/admin/leads/:id/status` — `{ status }` |

Order statuses: `PENDING` · `CONFIRMED` · `SHIPPED` · `DELIVERED` · `CANCELLED`.
Lead statuses: `NEW` · `CONTACTED` · `CLOSED`.

```bash
curl 'http://localhost:4000/api/admin/orders?status=PENDING&limit=1' -H "Authorization: Bearer $TOKEN"
```

```jsonc
{
  "data": [
    {
      "id": "cmuvbl6yb001c6bdlmespj9i8",
      "orderNumber": "MRF-261005-9585",
      "status": "PENDING",
      "email": "asha@example.com",
      "customerName": "Asha Roy",
      "total": 3199,
      "payment": { "method": "RAZORPAY", "status": "PAID", "razorpayOrderId": "order_PbL7Fq2hYw9cRs",
                   "razorpayPaymentId": "pay_PbL9Qw4tXy1aBc", "paidAt": "2026-10-05T14:03:16.210Z", "note": null },
      "items": [ … ],
      …
    }
  ],
  "total": 4, "page": 1, "limit": 1
}
```

`search` matches the order number or the email.

```bash
curl -X PATCH http://localhost:4000/api/admin/orders/cmuvbl6xc000s6bdlsht816ok/status \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"status":"SHIPPED"}'
```

```jsonc
{ "data": { "id": "cmuvbl6xc000s6bdlsht816ok", "orderNumber": "MRF-261005-8287", "status": "SHIPPED", … } }
```

```bash
curl 'http://localhost:4000/api/admin/leads?type=BULK&limit=1' -H "Authorization: Bearer $TOKEN"
```

```json
{ "data": [ { "id": "cmuvbl6z3001h6bdl3h94vlhg", "type": "BULK", "name": "Rahul Mehta",
              "email": "rahul@acme.in", "phone": "9811122233", "company": "Acme Corp",
              "message": "Need 200 laptop bags for our offsite.", "sku": "MB2155019BRN",
              "status": "NEW", "createdAt": "2026-10-05T14:03:16.240Z" } ],
  "total": 1, "page": 1, "limit": 1 }
```

```bash
curl -X PATCH http://localhost:4000/api/admin/leads/cmuvbl6z3001h6bdl3h94vlhg/status \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"status":"CONTACTED"}'
```

```jsonc
{ "data": { "id": "cmuvbl6z3001h6bdl3h94vlhg", "type": "BULK", "name": "Rahul Mehta", "status": "CONTACTED", … } }
```

### Settings

```bash
curl http://localhost:4000/api/admin/settings -H "Authorization: Bearer $TOKEN"
```

```json
{ "data": { "dummyMode": false,
            "dummyStore": { "carts": 0, "wishlists": 0, "payments": 0, "orders": 0, "leads": 0 } } }
```

```bash
curl -X PATCH http://localhost:4000/api/admin/settings \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"dummyMode":true}'
```

```json
{ "data": { "dummyMode": true,
            "dummyStore": { "carts": 0, "wishlists": 0, "payments": 0, "orders": 0, "leads": 0 } } }
```

`dummyStore` counts what dummy mode is holding in memory. Wipe it with:

```bash
curl -X POST http://localhost:4000/api/admin/settings/reset-dummy -H "Authorization: Bearer $TOKEN"
```

```json
{ "data": { "reset": true,
            "dummyStore": { "carts": 0, "wishlists": 0, "payments": 0, "orders": 0, "leads": 0 } } }
```

---

## Images

Product photography comes from the live store's CDN. The API also **draws**
artwork on demand, which is what dummy mode uses and what any product without a
photo falls back to.

These are assets, not API data: they live at `/images` (not `/api/images`), are
public, immutable, cached for a year, and sit in front of the rate limiter —
a listing page requests dozens at once.

```
GET /images/product/:sku/:view.svg?title=…&category=…&subcategory=…&dummy=1
GET /images/category/:name.svg?subcategory=…
GET /images/banner/:seed.svg?title=…&subtitle=…&cta=…&w=1600&h=500
```

`:view` is `front` · `side` · `back` · `interior` · `detail` — five visibly
different renderings, so a gallery's thumbnails are not the same picture five
times.

```bash
curl 'http://localhost:4000/images/product/MB2155019BRN/front.svg?category=Men&subcategory=Laptop%20Messenger%20Bags'
curl 'http://localhost:4000/images/category/Men.svg?subcategory=Wallets'
curl 'http://localhost:4000/images/banner/diwali.svg?title=Diwali%20Sale&subtitle=Up%20to%2060%25%20off&cta=Shop%20Now'
```

Each returns an `image/svg+xml` document, not JSON.

---

## Uploads

Admin-only. Lets someone add an image from their own machine instead of hosting
it somewhere and pasting a URL.

### `POST /api/admin/uploads`

`multipart/form-data`, one or more `files` fields, up to 10 per request and 8MB
each.

```bash
curl -X POST http://localhost:4000/api/admin/uploads \
  -H "Authorization: Bearer $TOKEN" \
  -F 'files=@./bag-front.jpg' \
  -F 'files=@./bag-side.jpg'
```

```jsonc
{
  "data": [
    {
      "filename": "c414cd0e204de974f73753c7e28d7638.jpg",
      "url": "http://localhost:4000/uploads/c414cd0e204de974f73753c7e28d7638.jpg",
      "mime": "image/jpeg",
      "extension": "jpg",
      "bytes": 148213,
      "originalName": "bag-front.jpg"
    }
  ],
  "total": 1
}
```

Drop `url` straight into a product's `images[]`, a banner's `imageUrl`, or a
category tile.

For a single file there is `POST /api/admin/uploads/single`, which takes one
`file` field and returns the object rather than a list:

```bash
curl -X POST http://localhost:4000/api/admin/uploads/single \
  -H "Authorization: Bearer $TOKEN" \
  -F 'file=@./bag-front.png'
```

```json
{ "data": { "filename": "c414cd0e204de974f73753c7e28d7638.png",
            "url": "http://localhost:4000/uploads/c414cd0e204de974f73753c7e28d7638.png",
            "mime": "image/png", "extension": "png", "bytes": 70, "originalName": "bag-front.png" } }
```

Accepted: **JPG, PNG, GIF, WebP, AVIF**.

Three things worth knowing, because they are deliberate:

- **The filename is generated**, never taken from the upload — it is a hash of
  the contents. A name like `../../../.env` is discarded, and identical bytes
  are stored once, so uploading the same photo to five products does not make
  five copies.
- **The bytes decide the format**, not the `Content-Type` header or the
  extension. HTML renamed to `.jpg` and sent as `image/jpeg` is rejected.
- **SVG is refused.** It is a real image format, but it can carry script, and
  serving it from our own origin would turn an upload into stored XSS. Raster
  formats only.

Files are served from `/uploads/…` with `nosniff`, a restrictive CSP and a
one-year immutable cache (safe, since the URL is a content hash).

### `GET /api/admin/uploads`

Lists what this server has stored, newest first, along with the limits:

```bash
curl http://localhost:4000/api/admin/uploads -H "Authorization: Bearer $TOKEN"
```

```jsonc
{
  "data": [ { "filename": "…", "url": "…", "bytes": 148213, "uploadedAt": "2026-08-25T…" } ],
  "total": 1,
  "accepts": ["jpg", "png", "gif", "webp", "avif"],
  "maxBytes": 8388608,
  "maxFiles": 10
}
```

### `DELETE /api/admin/uploads/:filename`

```bash
curl -X DELETE http://localhost:4000/api/admin/uploads/c414cd0e204de974f73753c7e28d7638.png \
  -H "Authorization: Bearer $TOKEN"
```

```json
{ "data": { "filename": "c414cd0e204de974f73753c7e28d7638.png", "deleted": true, "wasInUse": 0 } }
```

Refuses with **409** while anything still points at the file, since deleting it
would leave a broken image on the storefront:

```json
{ "error": { "message": "That image is still used in 2 places. Replace it there first, or pass ?force=true.",
             "code": "CONFLICT",
             "details": { "products": 1, "images": 1, "categories": 0, "banners": 0, "url": "…" } } }
```

Pass `?force=true` to delete anyway.

### Storage

Files live in `uploads/` at the project root — gitignored, and configurable with
`UPLOAD_DIR`. `MAX_UPLOAD_BYTES` sets the per-file cap.

For a deployed setup set `PUBLIC_BASE_URL` so returned URLs are absolute against
the right host. Moving to S3 or similar means replacing `save()` and `remove()`
in `src/uploads/storage.js`; nothing else knows where the bytes live.

---

## Error reference

| Code | HTTP | When |
|---|---|---|
| `BAD_REQUEST` | 400 | malformed input the schema cannot express |
| `UNAUTHORIZED` | 401 | missing, expired or invalid token |
| `FORBIDDEN` | 403 | authenticated, but not an admin |
| `NOT_FOUND` | 404 | no such record, or no route |
| `CONFLICT` | 409 | duplicate key, insufficient stock, category still in use |
| `VALIDATION_ERROR` | 422 | schema failure — carries `details[]` |
| `RATE_LIMITED` | 429 | 300 req/min general, 20/15min sign-in, 30/15min payment starts, 10/hour leads |
| `PAYMENT_VERIFICATION_FAILED` | 400 | a Razorpay signature did not match |
| `PAYMENT_GATEWAY_ERROR` | 502 | Razorpay could not be reached or refused the order |
| `GOOGLE_NOT_CONFIGURED` | 503 | Google sign-in attempted without a client id |
| `PAYMENTS_NOT_CONFIGURED` | 503 | Razorpay endpoints called without keys / webhook secret |
| `INTERNAL_ERROR` | 500 | unexpected — logged server-side with a stack |

A failed request **never** returns a 2xx with an empty list, so an error can
never be mistaken for "no results".
