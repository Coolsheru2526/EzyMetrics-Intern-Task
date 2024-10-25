// router.js
const express = require('express');
const {
    addLead,
    addCampaign,
    getCampaigns,
    generateReportPDF,
    generateReportCSV,
    sendAlertIfNeeded
} = require('./controller');

const router = express.Router();

// Lead Routes
router.post('/lead', addLead);

// Campaign Routes
router.post('/campaign', addCampaign);
router.get('/campaigns', getCampaigns);
router.get('/report/pdf', generateReportPDF);
router.get('/report/csv', generateReportCSV);
router.post('/alert', sendAlertIfNeeded);

module.exports = router;
