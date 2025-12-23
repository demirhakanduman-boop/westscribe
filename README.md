# Westscribe Portfolio Site

A bilingual (Turkish/English) portfolio website for Westscribe, a professional audiovisual translation service.

## Features

- **Bilingual Content:** Full Turkish/English support with language toggle
- **Responsive Design:** Mobile-first approach with adaptive layouts
- **Theme Support:** Light/dark mode with auto-detection based on time
- **Contact Form:** Email integration via EmailJS (client-side)
- **Project Carousel:** Interactive scrollable project list (3 columns × 7 items)
- **Smooth Animations:** Scroll-triggered fade-ins and parallax effects

## Tech Stack

- **Frontend:** Vanilla HTML/CSS/JavaScript (no build tools, no frameworks)
- **Email:** EmailJS (client-side, no backend needed)
- **Styling:** CSS custom properties for theming
- **Deployment:** Static hosting (Vercel, Netlify, GitHub Pages, etc.)

## Project Structure

```
portfolio-site/
├── app.py              # Simple HTTP server (for local dev only)
├── index.html          # Single-page HTML
├── style.css           # All styling with theme variables
├── script.js           # All interactivity (EmailJS integration)
├── titlelist.txt       # 600+ project titles for carousel
├── requirements.txt    # No external Python dependencies
├── EMAILJS_SETUP.md    # EmailJS configuration guide
└── [images]            # Logo, icons, and assets
```

## Setup for Local Development

1. **No dependencies required!** Just Python's built-in `http.server`

2. Run development server:
   ```bash
   python app.py
   ```
   The site will be available at `http://localhost:5000`

## Email Setup (EmailJS)

The contact form uses **EmailJS** for email handling (completely client-side).

1. Go to [emailjs.com](https://www.emailjs.com/) and create a free account
2. Get your **Service ID**, **Template ID**, and **Public Key**
3. Update these values in `script.js`:
   ```javascript
   const EMAILJS_SERVICE_ID = 'service_YOUR_ID';
   const EMAILJS_TEMPLATE_ID = 'template_YOUR_ID';
   const EMAILJS_PUBLIC_KEY = 'pk_YOUR_KEY';
   ```

See [EMAILJS_SETUP.md](EMAILJS_SETUP.md) for detailed instructions.

## Deployment

### Static Hosting (Vercel, Netlify, GitHub Pages)
Simply upload the files - no backend needed!

### Vercel with `vercel.json`
Already configured. Just run:
```bash
vercel
```

## License

© 2025 Westscribe. All rights reserved.

