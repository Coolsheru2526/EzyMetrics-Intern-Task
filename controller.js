const { Lead, Campaign } = require('./model');
const { generatePDFReport, generateCSVReport, sendEmailAlert } = require('./utils');

exports.addLead = async (req, res) => {
    try {
        const lead = new Lead(req.body);
        await lead.save();
        res.json({ message: 'Lead added successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Campaign Controller
exports.addCampaign = async (req, res) => {
    try {
        const campaign = new Campaign(req.body);
        await campaign.save();
        res.json({ message: 'Campaign added successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.generateReportPDF = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        const pdfReport = generatePDFReport(campaigns);
        res.setHeader('Content-Type', 'application/pdf');
        pdfReport.pipe(res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.generateReportCSV = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        await generateCSVReport(campaigns);
        res.download('campaign_report.csv');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.sendAlertIfNeeded = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        campaigns.forEach(async (campaign) => {
            if (campaign.metrics.engagement < 50) {
                await sendEmailAlert(
                    `Low Engagement Alert for ${campaign.name}`,
                    `The engagement level for ${campaign.name} is below 50. Current engagement: ${campaign.metrics.engagement}`
                );
            }
        });
        res.json({ message: 'Alerts checked and sent as necessary.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
