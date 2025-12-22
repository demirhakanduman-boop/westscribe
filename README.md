# Westscribe Portfolio Site

A bilingual (Turkish/English) portfolio website for Westscribe, a professional audiovisual translation service.

## Features

- **Bilingual Content:** Full Turkish/English support with language toggle
- **Responsive Design:** Mobile-first approach with adaptive layouts
- **Theme Support:** Light/dark mode with auto-detection based on time
- **Contact Form:** Email integration via Flask backend
- **Project Carousel:** Interactive scrollable project list
- **Smooth Animations:** Scroll-triggered fade-ins and parallax effects

## Tech Stack

- **Backend:** Flask (Python)
- **Frontend:** Vanilla HTML/CSS/JavaScript (no build tools)
- **Email:** Gmail SMTP integration
- **Styling:** CSS custom properties for theming

## Project Structure

```
portfolio-site/
├── app.py              # Flask backend
├── index.html          # Single-page HTML
├── style.css           # All styling with theme variables
├── script.js           # All interactivity
├── titlelist.txt       # Project list
└── [images]            # Logo, icons, and assets
```

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Create `.env` file:
   ```
   GMAIL_ADDRESS=your-email@gmail.com
   GMAIL_PASSWORD=your-app-password
   RECIPIENT_EMAIL=contact@westscribe.com
   ```

3. Run development server:
   ```bash
   python app.py
   ```

   The site will be available at `http://localhost:5000`

## Environment Variables

- `GMAIL_ADDRESS`: Gmail account for sending emails
- `GMAIL_PASSWORD`: Gmail App Password (not regular password)
- `RECIPIENT_EMAIL`: Where contact form submissions go

## Deployment

This app is ready for Vercel deployment. Configure environment variables in Vercel dashboard.

## License

© 2025 Westscribe. All rights reserved.
