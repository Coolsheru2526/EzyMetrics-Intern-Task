// model.js
const mongoose = require('mongoose');

// Lead Schema
const LeadSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    source: String,
    dateAdded: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', LeadSchema);

// Campaign Schema
const CampaignSchema = new mongoose.Schema({
    name: String,
    status: String,
    startDate: Date,
    endDate: Date,
    metrics: {
        engagement: Number,
        reach: Number
    }
});

const Campaign = mongoose.model('Campaign', CampaignSchema);

module.exports = { Lead, Campaign };
