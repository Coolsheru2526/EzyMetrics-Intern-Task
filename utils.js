// utils.js
const PDFDocument = require('pdfkit');
const { createObjectCsvWriter } = require('csv-writer');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// PDF Report Generation
function generatePDFReport(campaigns) {
    const doc = new PDFDocument();
    campaigns.forEach(campaign => {
        doc.text(`Campaign: ${campaign.name}`);
        doc.text(`Status: ${campaign.status}`);
        doc.text(`Metrics: ${JSON.stringify(campaign.metrics)}`);
        doc.moveDown();
    });
    doc.end();
    return doc;
}

// CSV Report Generation
async function generateCSVReport(campaigns) {
    const csvWriter = createObjectCsvWriter({
        path: 'campaign_report.csv',
        header: [
            { id: 'name', title: 'Name' },
            { id: 'status', title: 'Status' },
            { id: 'metrics', title: 'Metrics' }
        ]
    });
    const data = campaigns.map(c => ({
        name: c.name,
        status: c.status,
        metrics: JSON.stringify(c.metrics)
    }));
    await csvWriter.writeRecords(data);
}

// Email Alert
async function sendEmailAlert(subject, text) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: 'recipient@example.com',
        subject,
        text
    });
}

module.exports = {
    generatePDFReport,
    generateCSVReport,
    sendEmailAlert
};
