# Westscribe Portfolio Site - AI Coding Guidelines

## Project Overview

**Westscribe** is a bilingual (Turkish/English) portfolio website for a professional audiovisual translation service. The site showcases services (dubbing translation, subtitle translation, recording/broadcast scripts), portfolio metrics, workflow philosophy, and a contact form with email integration.

**Architecture:** Flask (Python) backend + vanilla HTML/CSS/JavaScript frontend in a single-directory flat structure.

---

## Core Architecture & Tech Stack

### Backend (Flask)
- **Framework:** Flask with CORS enabled
- **Key Routes:**
  - `GET /` - Serves `index.html`
  - `GET /<filename>` - Static file serving (CSS, JS, images)
  - `POST /api/contact` - Email handler (sends contact form submissions via Gmail SMTP)
- **Email Integration:** Uses `smtplib` + Gmail SMTP. Credentials loaded from `.env`: `GMAIL_ADDRESS`, `GMAIL_PASSWORD`, `RECIPIENT_EMAIL`
- **Error Handling:** Basic try/catch with JSON responses (200/400/500)
- **Run Command:** `python app.py` (runs on `http://localhost:5000` with debug=True)

### Frontend (Vanilla JS + CSS)
- **No build tools.** Single `script.js` and `style.css` files. Keep imports minimal.
- **State Management:** Uses DOM attributes (`data-theme`, `data-lang`) + `localStorage` for language persistence
- **Key Features:**
  - Bilingual content (Turkish/English) via `data-tr`/`data-en` attributes
  - Theme toggle (light/dark) with time-based auto-detection (dark after 7 PM, light 7 AM–7 PM)
  - Form submission with Flask backend communication via `fetch()`

---

## Critical Patterns & Conventions

### 1. **Bilingual Content Pattern**
- **All user-facing text uses data attributes:** `<p data-tr="Turkish text" data-en="English text">Turkish text</p>`
- **Current language stored in:** `html.getAttribute('data-lang')` (values: `'tr'` or `'en'`)
- **Update function:** `updateAllText(lang)` — called when language changes; updates both text content and form placeholders
- **Form placeholders:** Use `data-tr-placeholder` / `data-en-placeholder` attributes
- **Template literals in JS must include both languages** when showing dynamic UI messages

### 2. **Theme System**
- **Implementation:** CSS custom properties (`:root --bg-color`, `--text-primary`, etc.)
- **Selector:** `html[data-theme="light"]` / `html[data-theme="dark"]`
- **Auto-detection:** `getThemeByTime()` sets theme based on current hour (dark ≥ 7 PM or < 7 AM)
- **Icon swaps:** Theme toggle button changes between `light-off.png` and `light-on.png`
- **Image visibility:** Use `.logo-light` / `.logo-dark` classes with `display: none` in opposite theme

### 3. **Scroll & Animation Patterns**
- **Scroll-triggered fade-in:** `.scroll-fade` elements use `IntersectionObserver` to add `.visible` class when 90% visible
- **Navbar shadow:** Added when scroll > 100px
- **Parallax effect:** `.parallax` elements move at 0.5x scroll speed
- **Smooth scrolling:** All anchor links (`a[href^="#"]`) use `scrollIntoView({ behavior: 'smooth' })`

### 4. **Form Handling**
- **Form submission:** `#contactForm` POSTs to `http://localhost:5000/api/contact`
- **Expected request body:** `{ name, email, message }`
- **Success flow:** Hide form, show success message (`.success-message`), reset form on "Back" button
- **Error handling:** Use `showNotification(message, type)` function (creates temporary toast at top-right)
- **Button state:** Disable during submission, show "Gönderiliyor..." / "Sending..." based on language

### 5. **Static File Structure**
- **Images:** All referenced as root-level files (`dark-logo.png`, `contact-dark.png`, etc.)
- **CSS:** Single file; uses CSS custom properties for theming
- **JS:** Single file; all initialization in `DOMContentLoaded` event

---

## Development Workflow

### Setup & Running
```bash
# Install dependencies
pip install flask flask-cors python-dotenv

# Create .env file with
GMAIL_ADDRESS=your-email@gmail.com
GMAIL_PASSWORD=your-app-password  # Use Gmail App Password, not regular password
RECIPIENT_EMAIL=contact@westscribe.com

# Run development server
python app.py
# Opens on http://localhost:5000
```

### Common Tasks
- **Add new section:** Create HTML section with `.scroll-fade` class, add CSS to `style.css`, ensure all text has `data-tr`/`data-en`
- **Change colors:** Modify `:root` CSS variables in `style.css` (affects both themes)
- **Fix form error:** Check `GMAIL_ADDRESS`, `GMAIL_PASSWORD`, `RECIPIENT_EMAIL` in `.env`; verify Gmail allows "Less secure app access" or use App Password
- **Add new translation:** Always add both `data-tr` and `data-en` attributes; call `updateAllText()` after DOM changes

---

## Key Files & Responsibilities

| File | Purpose | Key Patterns |
|------|---------|--------------|
| [app.py](app.py) | Flask backend, email routing | CORS enabled, `.env` config, `smtplib` for Gmail |
| [index.html](index.html) | Single-page structure | Bilingual attributes, no component nesting |
| [script.js](script.js) | All interactivity | Language/theme toggles, form submission, scroll animations |
| [style.css](style.css) | All styling | CSS variables for theming, scroll-snap sections |

---

## Integration Points & Dependencies

### External
- **Gmail SMTP:** Requires valid credentials and App Password (not 2FA password)
- **localhost:5000 assumed in fetch calls** — no env-based URL configuration

### Cross-Component Data Flow
1. User submits form → `fetch()` to `/api/contact` → Flask validates + sends email → returns JSON
2. Language toggle → sets `html[data-lang]` + `localStorage` → calls `updateAllText()` → updates all `[data-tr][data-en]` elements
3. Theme toggle → sets `html[data-theme]` → CSS variables auto-apply via cascade

---

## Project-Specific Notes

- **Content is professional & service-focused:** Westscribe positions as a specialist translation service, not a generalist agency. Messaging emphasizes discipline, speed without compromising quality, and context-aware translation methods.
- **Bilingual from the start:** This is not an afterthought. Every feature assumes dual-language support.
- **No external libraries.** Keep it lightweight; animations are CSS-based or simple JS (no jQuery, no frameworks).
- **Email is critical.** Contact form is the primary client connection. Test email flow thoroughly.
