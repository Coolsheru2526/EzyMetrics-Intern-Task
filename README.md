# EzyMetrics Backend API

This backend API is designed for EzyMetrics to manage and report on lead and campaign data. The application supports data storage, transformation, report generation (PDF/CSV), and email alerts when campaign metrics fall below specific thresholds.

## Features
- **Lead and Campaign Management**: Create leads and campaigns, and view campaign data.
- **Report Generation**: Export campaign reports as PDF or CSV.
- **Alerts**: Automated email alerts when campaign engagement drops below a certain threshold.

## Prerequisites
- **Node.js** (v14+)
- **MongoDB**
- **Environment Variables**:
  - `MONGODB_URI`: MongoDB connection URI
  - `EMAIL`: Gmail address for sending alerts
  - `EMAIL_PASSWORD`: Password for the Gmail account

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Coolsheru2526/EzyMetrics-Intern-Task.git
   cd EzyMetrics-backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and set the following variables:
   ```plaintext
   MONGODB_URI=your_mongodb_uri
   EMAIL=your_email@gmail.com
   EMAIL_PASSWORD=your_email_password
   ```

4. **Start the Server**:
   ```bash
   node app.js
   ```
   The server will start on `http://localhost:3000`.

## API Endpoints

### Leads
1. **Add Lead**
   - **Endpoint**: `/api/lead`
   - **Method**: `POST`
   - **Description**: Adds a new lead to the database.
   - **Request Body**:
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "phone": "1234567890",
       "source": "Website"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Lead added successfully!"
     }
     ```

### Campaigns
2. **Add Campaign**
   - **Endpoint**: `/api/campaign`
   - **Method**: `POST`
   - **Description**: Adds a new campaign to the database.
   - **Request Body**:
     ```json
     {
       "name": "Summer Campaign",
       "status": "Active",
       "startDate": "2024-01-01",
       "endDate": "2024-06-01",
       "metrics": {
         "engagement": 75,
         "reach": 1000
       }
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Campaign added successfully!"
     }
     ```

3. **Get All Campaigns**
   - **Endpoint**: `/api/campaigns`
   - **Method**: `GET`
   - **Description**: Retrieves all campaigns.
   - **Response**:
     ```json
     [
       {
         "name": "Summer Campaign",
         "status": "Active",
         "metrics": {
           "engagement": 75,
           "reach": 1000
         }
       }
     ]
     ```

### Reporting
4. **Generate PDF Report**
   - **Endpoint**: `/api/report/pdf`
   - **Method**: `GET`
   - **Description**: Generates a PDF report of all campaigns.
   - **Response**: Downloads a PDF file.

5. **Generate CSV Report**
   - **Endpoint**: `/api/report/csv`
   - **Method**: `GET`
   - **Description**: Generates a CSV report of all campaigns.
   - **Response**: Downloads a CSV file.

### Alerts
6. **Send Alert if Needed**
   - **Endpoint**: `/api/alert`
   - **Method**: `POST`
   - **Description**: Sends an email alert if any campaign’s engagement is below 50%.
   - **Response**:
     ```json
     {
       "message": "Alerts checked and sent as necessary."
     }
     ```

## Project Structure

```plaintext
├── app.js              # Main application file
├── db.js               # MongoDB connection setup
├── models.js           # Database models for Lead and Campaign
├── controller.js       # Controller logic for API endpoints
├── router.js           # Route definitions
├── utils.js            # Utility functions for PDF, CSV, and email handling
└── .env                # Environment variables
```

