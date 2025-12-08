# Gifted Insights - Assessment Platform

A comprehensive web platform for assessing and supporting twice-gifted children through personalized assessments and coaching resources.

## 🚀 Project Overview

This platform provides:
- Quick screening quiz for parents
- Comprehensive parent assessment tool
- Child self-assessment interface
- Personalized 12-page reports
- Educational articles and resources
- Payment integration with Stripe
- Email automation for report delivery

## 📁 Project Structure

```
gifted-insights/
├── index.html                    # Landing page
├── navigation.html               # Shared navigation component
├── quiz.html                     # Quick 2-minute screening quiz
├── parent-assessment.html        # Parent assessment landing
├── gifted-assessment-tool.html   # Full React-based assessment
├── child-self-assessment.html    # Child-friendly assessment
├── checkout.html                 # Stripe payment page
├── results.html                  # Assessment results & report
├── articles/
│   ├── asynchronous-development.html
│   ├── black-hole-backpack.html
│   ├── dopamine-menu.html
│   ├── interest-based-friendships.html
│   ├── little-professor.html
│   ├── restraint-collapse.html
│   └── social-connection.html
└── README.md
```

## 🛠️ Setup Instructions

### 1. Prerequisites

- Web server (Apache, Nginx, or Node.js)
- Stripe account for payment processing
- SSL certificate (required for Stripe)
- Email service (SendGrid, Mailgun, etc.)

### 2. Local Development

```bash
# Clone the repository
git clone https://github.com/powder677/gifted-test.git
cd gifted-test

# Start a local server (Python)
python -m http.server 8000

# Or using Node.js
npx http-server -p 8000

# Visit http://localhost:8000
```

### 3. Stripe Integration

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe dashboard
3. Update `checkout.html` with your publishable key:

```javascript
const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY');
```

4. Set up a backend endpoint to handle payments (see Backend Setup below)

### 4. Navigation Integration

Add the navigation to all pages by including this snippet:

```html
<!-- Include Navigation -->
<div id="navigation-placeholder"></div>

<script>
// Load navigation
fetch('navigation.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navigation-placeholder').innerHTML = data;
    });
</script>
```

### 5. Backend Setup (Required for Production)

You'll need a backend server to:
- Process Stripe payments
- Store assessment data
- Generate PDF reports
- Send emails

Example Node.js/Express setup:

```javascript
// server.js
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to cents
    currency: 'usd',
  });
  
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.post('/save-assessment', async (req, res) => {
  // Save assessment data to database
  // Generate PDF report
  // Send email with report
});

app.listen(3000);
```

### 6. Database Schema

```sql
-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Children table
CREATE TABLE children (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  name VARCHAR(100),
  age INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Assessments table
CREATE TABLE assessments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  child_id INT,
  assessment_data JSON,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (child_id) REFERENCES children(id)
);

-- Payments table
CREATE TABLE payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  stripe_payment_intent VARCHAR(255),
  amount DECIMAL(10,2),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 7. Email Templates

Create email templates for:
- Purchase confirmation
- Assessment report delivery
- Follow-up coaching offers

### 8. PDF Generation

Use a library like Puppeteer or jsPDF to generate reports:

```javascript
const puppeteer = require('puppeteer');

async function generatePDF(assessmentData) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Load report template with data
  const html = generateReportHTML(assessmentData);
  await page.setContent(html);
  
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true
  });
  
  await browser.close();
  return pdf;
}
```

## 🚦 User Flow

1. **Landing Page** → User learns about service
2. **Quick Quiz** → 2-minute screening
3. **Checkout** → Payment for full assessment ($129)
4. **Parent Assessment** → 20-minute detailed questionnaire
5. **Child Assessment** → Optional child self-assessment
6. **Results Page** → View immediate insights
7. **Email Delivery** → Receive full PDF report

## 📊 Analytics Setup

Add Google Analytics to track:
- Conversion rates
- Assessment completion rates
- Article engagement
- Payment success rates

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔒 Security Considerations

1. **HTTPS Required** - Stripe requires SSL
2. **Data Protection** - Encrypt sensitive assessment data
3. **GDPR Compliance** - Add privacy policy and consent
4. **PCI Compliance** - Let Stripe handle card details
5. **Input Validation** - Sanitize all user inputs

## 🚀 Deployment

### Option 1: Static Hosting + Serverless

- Frontend: Netlify, Vercel, or GitHub Pages
- Backend: AWS Lambda, Vercel Functions
- Database: AWS RDS, PlanetScale, or Supabase

### Option 2: Full-Stack Platform

- Heroku, Railway, or Render
- Include both frontend and backend

### Option 3: Traditional VPS

- DigitalOcean, Linode, or AWS EC2
- Nginx for static files
- Node.js/PM2 for backend

## 📝 Environment Variables

Create a `.env` file:

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
DATABASE_URL=mysql://...
EMAIL_API_KEY=...
ADMIN_EMAIL=support@giftedinsights.com
```

## 🧪 Testing

1. Test payment flow with Stripe test cards
2. Verify assessment data saves correctly
3. Check PDF generation
4. Test email delivery
5. Mobile responsiveness testing

## 📧 Support

For questions or issues:
- Email: support@giftedinsights.com
- Documentation: docs.giftedinsights.com

## 🎯 Next Steps

1. Set up Stripe account and update keys
2. Deploy backend server
3. Configure email service
4. Add SSL certificate
5. Test complete user flow
6. Launch! 🚀

---

Built with ❤️ for supporting twice-gifted children and their families.
