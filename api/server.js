// server.js - Backend for Navigator Kids AI

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // Import the email tool
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve your HTML files

// --- EMAIL CONFIGURATION ---
// This connects to your Gmail account
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'JasonPulzar@gmail.com', // Your Gmail address
        pass: 'xxxx xxxx xxxx xxxx'    // PASTE YOUR 16-CHAR GMAIL APP PASSWORD HERE
    }
});

// Helper function to send email
async function sendEmailNotification(subject, text) {
    try {
        await transporter.sendMail({
            from: '"Navigator Kids Bot" <JasonPulzar@gmail.com>', 
            to: 'JasonPulzar@gmail.com', // Send to yourself
            subject: subject,
            text: text
        });
        console.log('✅ Email sent successfully');
    } catch (error) {
        console.error('❌ Failed to send email:', error);
    }
}

// Routes

// 1. Handle Contact Form
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;
    
    console.log(`📩 Contact Form: ${name} (${email})`);

    const emailText = `
    New Contact Message
    -------------------
    From: ${name}
    Email: ${email}
    Subject: ${subject}
    
    Message:
    ${message}
    `;

    await sendEmailNotification(`New Inquiry: ${subject}`, emailText);
    res.json({ success: true });
});

// 2. Handle Assessment Results
app.post('/api/save-assessment', async (req, res) => {
    const { childName, parentEmail, answers } = req.body;

    console.log(`🧠 Assessment: ${childName} (${parentEmail})`);

    const emailText = `
    New Assessment Completed
    ------------------------
    Child: ${childName}
    Parent Email: ${parentEmail}
    
    Raw Answers:
    ${JSON.stringify(answers, null, 2)}
    `;

    await sendEmailNotification(`Assessment: ${childName}`, emailText);
    res.json({ success: true });
});

// 3. Handle Emergency Kit Downloads (Leads)
app.post('/api/download-kit', async (req, res) => {
    const { name, email, childAge, source } = req.body;

    console.log(`⬇️ Kit Download: ${name} (${email})`);

    const emailText = `
    New Lead (Emergency Kit)
    ------------------------
    Name: ${name}
    Email: ${email}
    Child Age: ${childAge}
    Source Form: ${source}
    `;

    await sendEmailNotification(`New Lead: ${name}`, emailText);
    res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('EMAILS WILL BE SENT TO: JasonPulzar@gmail.com');
});
