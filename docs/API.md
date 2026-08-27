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
`marfit_token` httpOnly cookie set at login.

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
    "token": "eyJhbGciOiJIUzI1NiIs…"
  }
}
```

`password` must be at least 8 characters. A duplicate email returns **409**.

### `POST /api/auth/login`

Body `{ email, password }`. Same response shape as register.

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

### `GET /api/auth/me` · `PATCH /api/auth/me` · `POST /api/auth/logout`

`me` requires auth. `PATCH` accepts `{ name?, phone? }`.

Credential endpoints are rate-limited to 20 requests per 15 minutes.

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

```jsonc
{
  "data": [
    { "type": "category", "label": "Accessories / Wallets", "slug": "accessories-wallets", "parentSlug": "accessories" },
    { "type": "product",  "label": "Leather Bifold Wallet …", "sku": "WL…", "slug": "…", "imageUrl": "…", "price": 1299 }
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

```jsonc
{
  "id": "cmt8…",
  "slug": "for-men",
  "title": "Shop For Men",
  "subtitle": null,
  "sortOrder": 10,
  "isActive": true,
  "type": "CATEGORY",
  "productLimit": 10,
  "category": { "id": "cmt8…", "name": "Men", "slug": "men" },
  "products": [ /* product objects */ ]
}
```

Two kinds of rail:

- **`MANUAL`** — hand-picked and hand-ordered from the admin app.
  Seeded: `deal-of-the-day`, `trending`, `best-sellers`, `new-arrival`, `shop-all`.
- **`CATEGORY`** — auto-fills from `category`, newest first, capped at
  `productLimit`. Seeded: `for-men`, `for-women`, `luggage`, `accessories`.
  These stay current on their own as products are added.

### `GET /api/banners?placement=hero`

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
state itself.

```jsonc
{
  "data": {
    "id": "cmt8…",
    "items": [
      {
        "id": "cmt8…",
        "productId": "cmt8…",
        "quantity": 2,
        "unitPrice": 3199,
        "lineTotal": 6398,
        "product": { /* full product object */ },
        "sku": "MB2155019BRN", "title": "…", "img": "…", "price": 3199, "oldPrice": null
      }
    ],
    "summary": { "itemCount": 2, "lineCount": 1, "subtotal": 6398, "shipping": 0, "total": 6398 }
  }
}
```

| Method | Path | Body |
|---|---|---|
| `GET` | `/api/cart` | — |
| `POST` | `/api/cart/items` | `{ productId, quantity? }` → **201** |
| `PATCH` | `/api/cart/items` | `{ productId, quantity }` — `0` removes the line |
| `POST` | `/api/cart/items/remove` | `{ productId }` — kept for the existing client |
| `DELETE` | `/api/cart/items/:productId` | preferred form for new code |
| `DELETE` | `/api/cart` | empty the cart |

```bash
curl -X POST http://localhost:4000/api/cart/items \
  -H 'Content-Type: application/json' \
  -c jar -b jar \
  -d '{"productId":"MB2155019BRN","quantity":2}'
```

`productId` accepts an **id, SKU or slug**. Exceeding stock returns **409**:

```json
{ "error": { "message": "Only 25 left in stock for \"Leather Laptop Messenger Bag…\"",
             "code": "CONFLICT", "details": { "productId": "cmt8…", "available": 25 } } }
```

---

## Orders

### `POST /api/orders` — checkout

Builds the order from the caller's current cart.

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

### `GET /api/orders/track?orderNumber=…&email=…`

Public lookup for the Track Order page. A guest order needs the matching email
as a shared secret; a signed-in owner can look up their own without it. A
mismatch returns **404**, never a hint that the order exists.

### `GET /api/orders` · `GET /api/orders/:orderNumber`

The signed-in user's history, and one order (owner only). Both require auth.

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

```json
{ "data": { "dummyMode": false } }
```

Every response also carries an `X-Dummy-Mode: on|off` header, so a test-mode
ribbon can be rendered without an extra request. See
[Dummy mode](../README.md#dummy-mode).

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

`slug` is generated from the title when omitted. Supplying `images` on a `PATCH`
**replaces** the gallery wholesale. Deleting soft-deletes by default
(`isActive: false`) so the product drops out of the storefront while staying
attached to past orders.

### Categories

`GET` / `POST` `/api/admin/categories`, `PATCH` / `DELETE` `/api/admin/categories/:id`.

```bash
curl -X POST http://localhost:4000/api/admin/categories \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"name":"Belts","parentId":"cmt8…","sortOrder":2,"isActive":true}'
```

Deleting a category still referenced by products returns **409** with the count;
pass `?force=true` to unlink them instead.

### Collections

| Method | Path |
|---|---|
| `GET` `POST` | `/api/admin/collections` |
| `PATCH` `DELETE` | `/api/admin/collections/:id` |
| `PUT` | `/api/admin/collections/:id/products` |

```bash
# a category-backed rail that fills itself
curl -X POST http://localhost:4000/api/admin/collections \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"slug":"womens-picks","title":"Women'\''s Picks","type":"CATEGORY",
       "categoryId":"cmt8…","productLimit":10,"sortOrder":5,"isActive":true}'

# hand-picking, in display order
curl -X PUT http://localhost:4000/api/admin/collections/cmt8…/products \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"productIds":["cmt8aaa","cmt8bbb","cmt8ccc"]}'
```

`type: "CATEGORY"` requires `categoryId` (**422** without it). Hand-picking on a
category-backed rail returns **409** — switch it to `MANUAL` first.

### Banners

`GET` / `POST` `/api/admin/banners`, `PATCH` / `DELETE` `/api/admin/banners/:id`.

```bash
curl -X POST http://localhost:4000/api/admin/banners \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"placement":"mid-1","imageUrl":"https://cdn.example.com/banner.jpg",
       "title":"Handcrafted For Him","subtitle":"Genuine leather.",
       "ctaLabel":"Shop Men","linkUrl":"/categories/Men","sortOrder":0,"isActive":true}'
```

`placement` is `hero` · `mid-1` · `mid-2` · `mid-3`.

### Inventory

| Method | Path | Notes |
|---|---|---|
| `GET` | `/api/admin/inventory` | `?stock=all\|in\|low\|out&search=&page=&limit=` |
| `GET` | `/api/admin/inventory/summary` | headline counts |
| `POST` | `/api/admin/inventory/bulk` | up to 200 rows, one transaction |
| `PATCH` | `/api/admin/products/:id/stock` | set or adjust |
| `PATCH` | `/api/admin/products/:id/threshold` | low-stock warning level |
| `GET` | `/api/admin/products/:id/stock-movements` | audit trail |

```bash
# a delivery arrived
curl -X PATCH http://localhost:4000/api/admin/products/cmt8…/stock \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"mode":"adjust","quantity":20,"reason":"RESTOCK","note":"Supplier PO #418"}'

# stocktake correction
curl -X PATCH http://localhost:4000/api/admin/products/cmt8…/stock \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"mode":"set","quantity":12,"reason":"CORRECTION"}'
```

`reason` is `SALE` · `RESTOCK` · `CORRECTION` · `RETURN` · `INITIAL`.

The listing carries a `summary` beside `data`:

```json
{ "data": [ /* products, lowest stock first */ ],
  "total": 101, "page": 1, "limit": 20,
  "summary": { "totalProducts": 101, "outOfStock": 0, "lowStock": 0,
               "unitsInStock": 2525, "stockValue": 6743275 } }
```

Movement history:

```json
{ "data": [ { "id": "cmt8…", "reason": "RESTOCK", "delta": 20, "resulting": 45,
              "note": "Supplier PO #418", "orderId": null, "userId": "cmt8…",
              "createdAt": "2026-08-25T…" } ], "total": 1 }
```

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

### Settings

```bash
curl -X PATCH http://localhost:4000/api/admin/settings \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"dummyMode":true}'
```

```json
{ "data": { "dummyMode": true, "dummyStore": { "carts": 0, "orders": 0, "leads": 0 } } }
```

`POST /api/admin/settings/reset-dummy` wipes the in-memory dummy state.

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
```

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
| `RATE_LIMITED` | 429 | 300 req/min general, 20/15min auth, 10/hour leads |
| `GOOGLE_NOT_CONFIGURED` | 503 | Google sign-in attempted without a client id |
| `INTERNAL_ERROR` | 500 | unexpected — logged server-side with a stack |

A failed request **never** returns a 2xx with an empty list, so an error can
never be mistaken for "no results".
