# Shree Balaji Transport Services Pvt. Ltd. — Website

A modern, responsive website for a truck booking and logistics company, built with plain HTML, CSS, and JavaScript (no build tools required).

## Folder contents

```
index.html          Main page (all sections)
style.css            All styling
script.js            Navigation, form validation, WhatsApp message, demo admin panel
assets/
  logo-header.png    Logo used in the top navigation
  logo-footer.png    Logo used in the footer
  favicon.png        Browser tab icon (large)
  favicon-32.png      Browser tab icon (small)
README.md            This file
```

## 1. Running it on your own computer

You don't need to install anything special.

**Easiest way:**
1. Download the whole folder.
2. Double-click `index.html`. It will open in your web browser.

**Better way (recommended):** browsers sometimes block small features when you open a file directly. To avoid this, run a tiny local server:

- If you have Python installed, open a terminal/command prompt inside the folder and run:
  ```
  python -m http.server 8000
  ```
  Then open `http://localhost:8000` in your browser.

- If you use VS Code, install the "Live Server" extension, right-click `index.html`, and choose "Open with Live Server."

## 2. Publishing for free with GitHub Pages

**Step 1 — Create a GitHub account**
Go to [github.com](https://github.com) and sign up (it's free).

**Step 2 — Create a new repository**
1. Click the **+** icon (top right) → **New repository**.
2. Give it a name, e.g. `shree-balaji-transport`.
3. Keep it **Public**.
4. Click **Create repository**.

**Step 3 — Upload your website files**
1. On your new repository page, click **Add file → Upload files**.
2. Drag in `index.html`, `style.css`, `script.js`, and the whole `assets` folder.
3. Scroll down and click **Commit changes**.

**Step 4 — Enable GitHub Pages**
1. In your repository, click **Settings**.
2. In the left sidebar, click **Pages**.
3. Under "Branch," select **main** and folder **/ (root)**.
4. Click **Save**.

**Step 5 — Select the main branch**
This is done in the same step above — GitHub Pages builds directly from the `main` branch you selected.

**Step 6 — Get your live website URL**
After a minute or two, GitHub will show a message like:
```
Your site is live at https://your-username.github.io/shree-balaji-transport/
```
Open that link — your website is now online.

**Step 7 — Connect a custom domain later**
1. Buy a domain (e.g. from GoDaddy, Namecheap, or Google Domains).
2. In your domain provider's DNS settings, add a **CNAME record** pointing to `your-username.github.io`.
3. Back in GitHub → **Settings → Pages → Custom domain**, type your domain name and save.
4. Wait for DNS to update (can take a few hours), then GitHub will confirm it's connected.

**Step 8 — Update the website after publishing**
1. Go to your repository on GitHub.
2. Click the file you want to change (e.g. `index.html`).
3. Click the pencil (✏️) icon to edit, make your changes, and click **Commit changes**.
4. Your live site updates automatically within a minute.

## 3. Publishing with Netlify (alternative)

1. Go to [netlify.com](https://netlify.com) and sign up (free).
2. Click **Add new site → Deploy manually**.
3. Drag and drop your whole website folder onto the page.
4. Netlify gives you a live URL immediately (e.g. `random-name.netlify.app`).
5. You can rename the site or connect a custom domain from **Site settings → Domain management**.

## 4. Publishing with Vercel (alternative)

1. Go to [vercel.com](https://vercel.com) and sign up (free).
2. Click **Add New → Project**.
3. Since this is a plain HTML/CSS/JS site (no framework), the simplest route is:
   - Push your files to a GitHub repository (see Step 2–3 above).
   - In Vercel, choose **Import Git Repository** and select it.
   - Leave the build settings empty/default (Vercel will serve the static files as-is).
4. Click **Deploy**. Vercel gives you a live URL.

## 5. How WhatsApp booking works

The booking form does **not** send data to any server. When a visitor fills it in and clicks **"💬 Send Enquiry on WhatsApp,"** the script:
1. Checks that all required fields are filled in.
2. Builds a pre-written message with all the enquiry details.
3. Opens WhatsApp (web or app) with your number `+91 93583 99156` and that message ready to send.

To change the WhatsApp number, open `script.js` and `index.html` and replace every occurrence of `919358399156` with your new number (in international format, no `+` or spaces).

## 6. How to replace the logo

The uploaded logo is already placed in:
- `assets/logo-header.png` (navigation bar)
- `assets/logo-footer.png` (footer)
- `assets/favicon.png` / `assets/favicon-32.png` (browser tab icon)

To replace it later:
1. Prepare your new logo as a PNG (ideally square, transparent or white background).
2. Rename your file to match one of the names above, and replace the file in the `assets` folder — keeping the same file name means you don't need to change any code.
3. If you'd rather use a different file name, update the `src="assets/..."` paths in `index.html` to match.

## 7. Adding a real backend later

Right now, the site is fully front-end (no server, no database):
- The booking form sends enquiries only to WhatsApp.
- The **Demo Admin Panel** on the page only stores enquiries in the visitor's own browser memory — they disappear on refresh, and there is no real login protecting it.

To make this production-ready, a developer would typically:
1. Add a backend (e.g. Node.js/Express, PHP, or a service like Firebase/Supabase) to receive and store form submissions in a real database.
2. Add secure staff login (authentication) before showing any admin/enquiry data.
3. Optionally connect the WhatsApp Business API for automated replies, in addition to (or instead of) the simple `wa.me` link used here.
4. Add HTTPS, form spam protection (e.g. a CAPTCHA), and server-side validation.

## 8. Future improvements

- Add real customer testimonials once you have them (do not use placeholder/fake reviews).
- Add real fleet photos once available.
- Add a proper backend + database + secure admin login (see section 7).
- Add Google Analytics or another analytics tool to understand visitor traffic.
- Add a blog or news section for SEO if you want to publish updates regularly.
- Add multi-language support (e.g. Hindi) if useful for your customers.
