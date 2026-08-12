# PawStore

A full-stack pet store e-commerce app: a Spring Boot REST API (`backend_petStore`) and a vanilla HTML/CSS/JS frontend (`frontend_petStore`) that consumes it.

> This README covers setup and technical decisions. For a walkthrough of the app's features (shopping, checkout, admin panel), see the [User Manual](USER_MANUAL.md).

## Project structure

```
backend_petStore/petStore/petStore/   Spring Boot 4 + Spring Data JPA + H2 API
frontend_petStore/                    Static multi-page frontend (no build step)
```

## Running the backend

Requirements: JDK 17+.

```bash
cd backend_petStore/petStore/petStore
./gradlew bootRun
```

The API starts on `http://localhost:8080`. It uses an in-memory H2 database (schema is recreated on every restart — no persistence between runs), reachable at `http://localhost:8080/h2-console` (JDBC URL `jdbc:h2:mem:petstore`, user `sa`, no password).

On first startup a manager account is seeded automatically so the admin panel is testable immediately:

- **Email:** `admin@petstore.com`
- **Password:** `Admin123`

### API overview

| Resource | Routes |
|---|---|
| Auth/Users | `POST /user/login`, `POST /user/{role}` (register; role = `customer`\|`employee`\|`manager`), `GET /user/{role}/{id}`, `GET /user/{role}` |
| Products | `GET /product`, `GET /product/{id}`, `POST /product`, `PUT /product/{id}` |
| Cart | `GET /cart/{id}`, `POST /cart` |
| Cart items | `POST /cartItem` |
| Orders | `GET /order/{id}`, `GET /order`, `POST /order` |

All errors are returned as JSON: `{"status": <code>, "message": "..."}`. CORS is open to any origin for local development.

## Running the frontend

`frontend_petStore` is static HTML/CSS/JS — no build step, no `node_modules`. Serve it with any static file server, for example:

```bash
npx serve frontend_petStore
```

or the VS Code "Live Server" extension, or any equivalent. Open the served `index.html` in a browser. The backend must be running on `http://localhost:8080` for the app to work — this is configured in [`frontend_petStore/config.js`](frontend_petStore/config.js), which is the single place to change if the backend's host/port differs.

### Golden path to try it

1. Open the frontend, click **Sign up**, create a customer account.
2. Browse the catalog, add a couple of products to the cart.
3. Go to the cart, then **Continue to checkout**, fill in the shipping form, and **Confirm purchase**.
4. Log out, log back in with the seeded admin (`admin@petstore.com` / `Admin123`).
5. Open **Admin** in the header → edit a product's price/stock, add a new product, and view the recent sales table.

## Technical decisions

**Backend fixes.** The original backend failed to start with a `BeanCreationException`. Investigation found several independent bugs, not one: `Employee`/`Manager` were missing `@Entity` (required for `JOINED` inheritance subclasses), `Cart.items` had no JPA relationship mapping, `Cart`/`Product` used `@GeneratedValue(IDENTITY)` on `String` primary keys (only valid for numeric columns), every controller had two `@GetMapping`s on the same path (ambiguous mapping), and the `User` entity's default table name (`user`) collided with an H2 reserved keyword. All of these were fixed; IDs for string-keyed entities are now generated server-side with `UUID.randomUUID()` rather than requiring the client to invent one.

**REST design for a browser client.** GET-by-id endpoints originally expected `@RequestBody`, which the Fetch API cannot send on a GET request at all. These were changed to `@PathVariable`-based routes (`/product/{id}` etc.), and duplicate `@GetMapping`s were split into distinct list/detail routes.

**Authentication.** There is no Spring Security in this project — `POST /user/login` does a direct email/password comparison against the `Customer`/`Employee`/`Manager` tables. This matches the project's current scope (a course/portfolio-sized app with no other security requirements) rather than adding a disproportionately large auth framework. The "session" is just the JSON response from login/register, held in `localStorage` on the frontend; there is no server-side session or token.

**Frontend architecture.** Plain multi-page app, no framework, no bundler — per the assignment's constraints (HTML5, CSS Grid/Flexbox, vanilla JS, `rem`/`em`/`%`/`vh`/`vw` only, no `px`). The JS is layered to keep API logic separate from DOM manipulation, per the "modularity" requirement:

- `js/api/*` — only `fetch` calls and response/error normalization. Never touches `document`.
- `js/ui/*` — only DOM creation/updates. Never calls `fetch`.
- `js/state/*` — the only modules that touch `localStorage` (`session.js` for the logged-in user, `cart.js` for the shopping cart).
- `js/utils/*` — pure helpers: form validation (regex-based, no DOM), route guards, formatting, HTML-escaping.
- `js/pages/*.page.js` — one composition-root controller per HTML page; the only files allowed to import from `api`, `ui`, and `state` together.

**Session & cart persistence.** `localStorage` keys: `petstore_session` (`{id, name, lastName, email, role, ...}`, written on login/register) and `petstore_cart` (`{cartId, items: [{productId, name, image, price, quantity}]}`). The local cart is the source of truth for the UI; it's best-effort synced to the backend (`POST /cart`) when the cart page loads, and checkout builds the `POST /order` payload directly from the local cart items — so checkout still works even if that sync failed. A small `sessionStorage` snapshot (`petstore_last_order`) carries line-item names/prices from checkout to the confirmation page, since the backend's order response only stores `productId`, not a product name.

**Validation & error handling.** All forms validate client-side (regex for email, minimum password length, phone format, required fields, numeric checks for the admin product form) before any network call. Every `fetch` failure — validation errors, 404s, network errors — surfaces as a visible banner or inline field error, never just a console log.

## Known limitations / possible follow-ups

- H2 is in-memory: all data is lost on backend restart. Swap `spring.datasource.url` in `application.properties` for a persistent database (e.g. Postgres) for anything beyond local development.
- No password hashing — passwords are stored and compared in plain text. Acceptable for this project's scope; would need `BCryptPasswordEncoder` (and likely Spring Security) before any real deployment.
- There's no endpoint to fetch a customer's own order history after checkout; the confirmation page relies on `GET /order/{id}` plus the `sessionStorage` snapshot described above.
