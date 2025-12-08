// server.js - Sample backend server for Gifted Insights

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Stripe setup
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files

// Database setup (example with PostgreSQL)
// const { Pool } = require('pg');
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// Email setup (example with SendGrid)
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Create payment intent
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount = 12900 } = req.body; // $129.00 in cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      metadata: {
        product: 'gifted-assessment-package'
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error('Payment intent error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Stripe webhook
app.post('/api/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      // TODO: Fulfill the purchase - send email, unlock assessment, etc.
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({received: true});
});

// Save assessment data
app.post('/api/save-assessment', async (req, res) => {
  try {
    const { userId, childId, assessmentType, responses } = req.body;

    // TODO: Save to database
    // const result = await pool.query(
    //   'INSERT INTO assessments (user_id, child_id, type, data) VALUES ($1, $2, $3, $4) RETURNING id',
    //   [userId, childId, assessmentType, JSON.stringify(responses)]
    // );

    // For demo purposes
    const assessmentId = Date.now();

    res.json({
      success: true,
      assessmentId: assessmentId
    });
  } catch (error) {
    console.error('Save assessment error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Generate report
app.post('/api/generate-report', async (req, res) => {
  try {
    const { assessmentId, email } = req.body;

    // TODO: Fetch assessment data from database
    // const assessment = await pool.query(
    //   'SELECT * FROM assessments WHERE id = $1',
    //   [assessmentId]
    // );

    // TODO: Generate PDF report
    // const pdfBuffer = await generatePDFReport(assessment.rows[0]);

    // TODO: Send email with report
    // await sgMail.send({
    //   to: email,
    //   from: 'reports@giftedinsights.com',
    //   subject: 'Your Gifted Assessment Report',
    //   text: 'Please find your personalized assessment report attached.',
    //   attachments: [{
    //     content: pdfBuffer.toString('base64'),
    //     filename: 'gifted-assessment-report.pdf',
    //     type: 'application/pdf',
    //   }]
    // });

    res.json({
      success: true,
      message: 'Report sent successfully'
    });
  } catch (error) {
    console.error('Generate report error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create user account
app.post('/api/create-account', async (req, res) => {
  try {
    const { email, firstName, lastName, childName, childAge } = req.body;

    // TODO: Create user in database
    // const user = await pool.query(
    //   'INSERT INTO users (email, first_name, last_name) VALUES ($1, $2, $3) RETURNING id',
    //   [email, firstName, lastName]
    // );

    // TODO: Create child profile
    // const child = await pool.query(
    //   'INSERT INTO children (user_id, name, age) VALUES ($1, $2, $3) RETURNING id',
    //   [user.rows[0].id, childName, childAge]
    // );

    // For demo purposes
    const userId = Date.now();
    const childId = userId + 1;

    res.json({
      success: true,
      userId: userId,
      childId: childId
    });
  } catch (error) {
    console.error('Create account error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get assessment results
app.get('/api/results/:assessmentId', async (req, res) => {
  try {
    const { assessmentId } = req.params;

    // TODO: Fetch from database
    // const result = await pool.query(
    //   'SELECT * FROM assessments WHERE id = $1',
    //   [assessmentId]
    // );

    // Demo response
    const mockResults = {
      assessmentId: assessmentId,
      profile: 'The Deep Processor',
      traits: [
        { name: 'Cognitive Intensity', score: 85 },
        { name: 'Emotional Sensitivity', score: 92 },
        { name: 'Creative Thinking', score: 78 },
        { name: 'Sensory Processing', score: 88 }
      ],
      recommendations: {
        home: [
          'Create quiet spaces for decompression',
          'Establish predictable routines',
          'Use visual schedules'
        ],
        learning: [
          'Allow deep dives into topics of interest',
          'Provide advanced materials',
          'Use project-based learning'
        ],
        communication: [
          'Validate feelings before solutions',
          'Give processing time',
          'Use "I notice" statements'
        ]
      }
    };

    res.json(mockResults);
  } catch (error) {
    console.error('Get results error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
});

// Utility functions

async function generatePDFReport(assessmentData) {
  // TODO: Implement PDF generation
  // const puppeteer = require('puppeteer');
  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();
  // ...
  return Buffer.from('Sample PDF content');
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  // Close database connections, etc.
  process.exit(0);
});

module.exports = app; // For testing
