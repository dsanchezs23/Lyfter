# PawStore — User Manual

This guide explains how to use the PawStore web app: browsing products, creating an account, shopping, and — if you're an administrator — managing the product catalog.

> Looking for setup/run instructions instead? See [README.md](README.md).

## Contents

1. [Getting around the site](#1-getting-around-the-site)
2. [Creating an account](#2-creating-an-account)
3. [Logging in and out](#3-logging-in-and-out)
4. [Browsing and searching products](#4-browsing-and-searching-products)
5. [Shopping cart](#5-shopping-cart)
6. [Checkout](#6-checkout)
7. [Order confirmation](#7-order-confirmation)
8. [Administrator guide](#8-administrator-guide)
9. [Messages and errors](#9-messages-and-errors)
10. [Quick reference](#10-quick-reference)

---

## 1. Getting around the site

The header at the top of every page shows:

- **PawStore logo** — click it anytime to return to the home page.
- **Home / Products** — main navigation links.
- **Admin** — only visible if you're logged in as a Manager or Employee.
- On the right: either a **Log in** button (if you're signed out), or your name, a **cart icon** with a number badge, and a **Log out** button (if you're signed in).

You don't need an account to browse the home page or the product catalog. An account is required to use the cart, check out, or place an order.

## 2. Creating an account

1. Click **Log in** in the header, then **Create an account** (or go directly to the registration page).
2. Fill in the form:
   - First name, last name
   - Email address
   - Password (at least 8 characters, with letters and numbers) and confirm it
   - Phone number (digits only)
   - Date of birth
   - Shipping address
3. Click **Sign up**.

If anything is missing or invalid, the field turns red with a message explaining what to fix — correct it and submit again. On success you're automatically logged in and taken to the product catalog.

> New accounts created through this form are always regular **customer** accounts. Administrator accounts are set up separately (see [Administrator guide](#8-administrator-guide)).

## 3. Logging in and out

**To log in:** click **Log in** in the header, enter your email and password, and click **Log in**. If the credentials are wrong, you'll see a "Credentials incorrect" message — double-check and try again.

**To log out:** click **Log out** in the header. This clears your session and your cart on this device.

Your login session and cart are stored locally in your browser (not shared across devices or browsers). If you clear your browser data, you'll need to log in again and your cart will be empty.

## 4. Browsing and searching products

Open **Products** in the header to see the full catalog as a grid of cards. Each card shows the product's photo, name, price, and stock status:

- **"X in stock"** — available.
- **"Only X left"** — low stock (shown in a warning color).
- **"Out of stock"** — cannot be added to the cart; the **Add** button is disabled.

At the top of the catalog you can:

- **Search** by typing part of a product's name or category — the grid filters as you type.
- **Show available only** — check this box to hide out-of-stock products.

If no products match your search/filters, or the catalog is empty, you'll see a message instead of a blank page.

Click **View details** on any product to open its full page: a larger photo, description, price, and a quantity selector next to **Add to cart**.

## 5. Shopping cart

You can add a product to your cart from either the catalog grid (**Add** button, quantity 1) or the product detail page (choose a quantity first, then **Add to cart**). A confirmation message appears each time.

Click the **cart icon** in the header (or go to the Cart page) to review it. There you can:

- Increase/decrease the quantity of any item with the **−** / **+** buttons.
- **Remove** an item entirely.
- See each item's subtotal and the cart's **Total**.

If your cart is empty, you'll see a prompt to go back to the catalog instead of an empty page.

You must be logged in to open the cart — if you're not, you'll be redirected to log in first.

## 6. Checkout

From the cart page, click **Continue to checkout**. On the checkout page:

1. Review/complete your **Purchase information** (name, email, address, phone). Your name, email, and address are pre-filled from your account when available.
2. Review the **Order summary** on the right — every item, quantity, and the total.
3. Click **Confirm purchase**.

If a field is invalid, it's highlighted with an explanation — fix it and submit again. If the order can't be placed (e.g. the server is unreachable), an error banner explains what happened and nothing is charged or lost — your cart stays intact so you can try again.

Click **Cancel** at any time to go back to the cart without placing the order.

## 7. Order confirmation

After a successful purchase you land on the **Order Complete** page, showing your order number, a summary table (product, quantity, unit price, subtotal), and the total. Your cart is now empty.

From here you can go **Back to catalog** to keep shopping, or **Go to home**.

## 8. Administrator guide

Accounts with the **Manager** or **Employee** role see an extra **Admin** link in the header, leading to the admin dashboard. Regular customers cannot access this area (they'll see a "no permission" message if they try).

A manager account is pre-configured for testing:

- **Email:** `admin@petstore.com`
- **Password:** `Admin123`

### 8.1 Viewing inventory

The **Admin dashboard** (`Admin` in the header) shows a **Product list** table: ID, name, price, category, stock, and an **Edit** link for each product.

### 8.2 Adding a new product

On the same dashboard, fill in the **Add new product** form — name, category, description, image URL, price, discount, and stock — then click **Add product**. The new product appears in the table immediately and in the public catalog right away.

### 8.3 Editing a product

Click **Edit** next to any product in the inventory table. On the edit page, update any field (commonly price or stock) and click **Save changes**. Click **Cancel** to go back without saving.

### 8.4 Reviewing sales

The **Recent sales** table at the bottom of the dashboard lists every order placed in the store: ID, customer, status, number of items, total, and date. If no orders have been placed yet, this section shows an empty-state message instead of a blank table.

## 9. Messages and errors

PawStore always tells you what happened instead of failing silently:

- **Green banner** — success (e.g. "Product added to your cart").
- **Red banner** — something went wrong (validation error, server error, wrong credentials). The message explains the problem; correct it and retry.
- **Empty-state messages** (e.g. "No products matched those filters", "Your cart is empty") appear instead of a blank page whenever there's nothing to show.
- If the backend server isn't running or unreachable, you'll see "Could not connect to the server" — check that the API is running (see [README.md](README.md)) and reload.

## 10. Quick reference

| Page | What it's for | Requires login? |
|---|---|---|
| Home | Landing page | No |
| Products | Browse/search the catalog | No |
| Product detail | Full info + add to cart | No (adding requires login is enforced at cart time) |
| Cart | Review/edit items before checkout | Yes |
| Checkout | Confirm shipping info and place the order | Yes |
| Order Complete | Confirmation after purchase | Yes |
| Admin dashboard | Inventory + sales + add product | Yes, Manager/Employee only |
| Edit product | Update an existing product | Yes, Manager/Employee only |
