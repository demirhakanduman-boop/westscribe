# EmailJS Setup Guide for Westscribe Contact Form

## Overview
The contact form has been migrated from Flask/Python backend to **EmailJS**, a client-side email service that works directly in the browser. This eliminates the need for Python email configuration and backend management.

## Step-by-Step Setup

### 1. Create an EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com/)
2. Click **Sign Up**
3. Register with your email address
4. Verify your email

### 2. Create Email Service
1. Log in to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Go to **Email Services**
3. Click **Add Service**
4. Choose **Gmail** (or your preferred email provider)
   - If using Gmail:
     - Allow "Less secure app access" or use **Gmail App Password** (recommended)
     - Email: Your Gmail address
     - Password: Your Gmail password or App Password
5. Name it something like `gmail_service`
6. Click **Create Service**
7. Copy the **Service ID** (format: `service_xxxxx`)

### 3. Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Set template name: `Westscribe_Contact_Form` (or your preference)
4. Configure the template with these variables:
   ```
   To Email: bbunsal@gmail.com (or your recipient email)
   Subject: New Contact Form Submission from {{from_name}}
   
   Body (HTML):
   ---
   <h2>New Contact Form Submission</h2>
   
   <p><strong>Name:</strong> {{from_name}}</p>
   <p><strong>Email:</strong> {{from_email}}</p>
   <p><strong>Message:</strong></p>
   <p>{{message}}</p>
   
   <hr>
   <p><small>Sent from Westscribe Portfolio Site</small></p>
   ---
   ```
5. Click **Save**
6. Copy the **Template ID** (format: `template_xxxxx`)

### 4. Get Your Public Key
1. Go to **Account** → **API Keys**
2. Copy your **Public Key** (format: `xxxxx`)

### 5. Update script.js
Replace the placeholder values at the top of `script.js`:

```javascript
// EMAILJS INITIALIZATION
const EMAILJS_SERVICE_ID = 'service_YOUR_SERVICE_ID';      // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'template_YOUR_TEMPLATE_ID';   // Replace with your Template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';              // Replace with your Public Key
```

**Example:**
```javascript
const EMAILJS_SERVICE_ID = 'service_a1b2c3d4e5f6';
const EMAILJS_TEMPLATE_ID = 'template_x9y8z7w6v5';
const EMAILJS_PUBLIC_KEY = 'pk_test_123456789';
```

### 6. Test the Form
1. Run your site locally: `python app.py`
2. Go to the **Contact** section
3. Fill out the form with test data
4. Click **Send**
5. Check your recipient email inbox (might take a few seconds)
6. Verify the email was received correctly

## Important Notes

### Email Limits
- **Free Plan**: 200 emails/month
- **Upgrade to Pro** if you need more

### Security Best Practices
- Your **Public Key** is public (it's in the frontend code)
- Your **Service ID** and **Template ID** are also exposed (normal)
- Keep your **Private API Key** safe (never put in frontend)
- EmailJS handles authentication securely on their servers

### Recipient Email Configuration
You can also configure the recipient email in the EmailJS dashboard template instead of hardcoding it.

### Replies
To enable automatic reply-to functionality:
- In your template, set the "Reply-To" field to `{{reply_to}}`
- This allows you to reply directly to the user's email

## Troubleshooting

### "Error initializing EmailJS"
- Check if your Public Key is correct in `script.js`
- Verify the key format matches `pk_...`

### "Email not sending"
- Verify Service ID and Template ID are correct
- Check template is published in EmailJS dashboard
- Ensure Gmail account allows less secure apps (or use App Password)
- Check browser console for detailed error messages

### "Template not found"
- Verify Template ID is correct
- Make sure template is **Published** in EmailJS
- Check Service ID matches the template's service

## Remove Flask Email Endpoint (Optional)
If you're no longer using Flask for email, you can remove the `/api/contact` endpoint from `app.py`:

1. Open `app.py`
2. Remove the following imports if not used elsewhere:
   - `from flask_cors import CORS`
   - `import smtplib`
   - `from email.mime.text import MIMEText`
   - `import os`
   - `from dotenv import load_dotenv`

3. Remove the `/api/contact` route function
4. Remove the `.env` file if no longer needed

---

**Once set up, your contact form will work directly without any backend server!** 🚀
