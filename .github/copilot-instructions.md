# Westscribe Portfolio Site - AI Coding Guidelines

## Project Overview

**Westscribe** is a bilingual (Turkish/English) portfolio website for a professional audiovisual translation service. The site showcases services (dubbing translation, subtitle translation, recording/broadcast scripts), portfolio metrics, workflow philosophy, and a contact form with email integration.

**Architecture:** Fully static (vanilla HTML/CSS/JavaScript) + EmailJS for email handling. No backend dependencies required.

---

## Core Architecture & Tech Stack

### Backend
- **None required for production!**
- **Local development only:** `app.py` is a simple HTTP server (uses Python built-in `http.server`)
- **Email Integration:** EmailJS (client-side, no backend email handling)

### Frontend (Vanilla JS + CSS)
- **No build tools.** Single `script.js` and `style.css` files. Keep imports minimal.
- **State Management:** Uses DOM attributes (`data-theme`, `data-lang`) + `localStorage` for language persistence
- **Key Features:**
  - Bilingual content (Turkish/English) via `data-tr`/`data-en` attributes
  - Theme toggle (light/dark) with time-based auto-detection (dark after 7 PM, light 7 AM–7 PM)
  - Form submission via EmailJS (client-side only)
  - Project carousel: 3 columns × 7 items, loads from `titlelist.txt`

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

### 4. **Form Handling (EmailJS)**
- **Form submission:** `#contactForm` sends via EmailJS (client-side)
- **EmailJS initialization:** `emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY })`
- **Template parameters:** `{ from_name, from_email, message, reply_to }`
- **Success flow:** Hide form, show success message (`.success-message`), reset form on "Back" button
- **Error handling:** Use `showNotification(message, type)` function (creates temporary toast at top-right)
- **Button state:** Disable during submission, show "Gönderiliyor..." / "Sending..." based on language
- **Required setup:** Three constants in `script.js`:
  - `EMAILJS_SERVICE_ID` (from EmailJS dashboard)
  - `EMAILJS_TEMPLATE_ID` (from EmailJS dashboard)
  - `EMAILJS_PUBLIC_KEY` (from EmailJS account settings)

### 5. **Static File Structure**
- **Images:** All referenced as root-level files (`dark-logo.png`, `contact-dark.png`, etc.)
- **CSS:** Single file; uses CSS custom properties for theming
- **JS:** Single file; all initialization in `DOMContentLoaded` event
- **Project list:** `titlelist.txt` contains 600+ titles loaded into carousel (3 columns × 7 items)

---

## Development Workflow

### Setup & Running
```bash
# No dependencies! Just Python (built-in http.server)
python app.py
# Opens on http://localhost:5000
```

### Email Setup
1. Create free EmailJS account at https://www.emailjs.com/
2. Get Service ID, Template ID, Public Key
3. Update constants in `script.js`
4. See EMAILJS_SETUP.md for detailed instructions

### Common Tasks
- **Add new section:** Create HTML section with `.scroll-fade` class, add CSS to `style.css`, ensure all text has `data-tr`/`data-en`
- **Change colors:** Modify `:root` CSS variables in `style.css` (affects both themes)
- **Update projects:** Edit `titlelist.txt` (one title per line, auto-sorted alphabetically in carousel)
- **Add new translation:** Always add both `data-tr` and `data-en` attributes; call `updateAllText()` after DOM changes

---

## Key Files & Responsibilities

| File | Purpose | Key Patterns |
|------|---------|--------------|
| [app.py](app.py) | Simple HTTP server for local dev only | Python built-in `http.server` |
| [index.html](index.html) | Single-page structure | Bilingual attributes, no component nesting |
| [script.js](script.js) | All interactivity | Language/theme toggles, EmailJS integration, scroll animations |
| [style.css](style.css) | All styling | CSS variables for theming, scroll-snap sections |
| [titlelist.txt](titlelist.txt) | Project carousel data | 600+ titles, auto-sorted alphabetically |

---

## Integration Points & Dependencies

### External
- **EmailJS API:** Handles all email sending (no backend needed)
- **No localhost assumptions** — fully static, works on any hosting

### Cross-Component Data Flow
1. User submits form → EmailJS client library → `emailjs.send()` → returns success/error
2. Language toggle → sets `html[data-lang]` + `localStorage` → calls `updateAllText()` → updates all `[data-tr][data-en]` elements
3. Theme toggle → sets `html[data-theme]` → CSS variables auto-apply via cascade
4. Carousel loads → `fetch('titlelist.txt')` → sorts alphabetically → renders 3 columns × 7 items

---

## Project-Specific Notes

- **Content is professional & service-focused:** Westscribe positions as a specialist translation service, not a generalist agency. Messaging emphasizes discipline, speed without compromising quality, and context-aware translation methods.
- **Bilingual from the start:** This is not an afterthought. Every feature assumes dual-language support.
- **No external libraries.** Keep it lightweight; animations are CSS-based or simple JS (no jQuery, no frameworks).
- **Email is critical.** Contact form is the primary client connection. Test email flow thoroughly.

