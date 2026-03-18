# Lil Finder Guy — Setup Guide

## GitHub Pages

1. Go to **Settings → Pages** in your GitHub repo
2. Set **Source** to "Deploy from a branch"
3. Select the `main` branch and `/ (root)` folder
4. Save — your site will be live at `https://jbobrow.github.io/lil-finder-guy/`

## Google Sheets Email Capture

### 1. Create a Google Sheet

- Create a new Google Sheet
- Name the first sheet `Responses`
- Add these headers in row 1: **Timestamp | Email | Interests | Name | Address**

### 2. Create the Apps Script

- In the Sheet, go to **Extensions → Apps Script**
- Delete any existing code and paste the contents of `google-apps-script.js` from this repo
- Save the project (name it anything, e.g. "Lil Finder Guy Responses")

### 3. Deploy as Web App

1. Click **Deploy → New deployment**
2. Select type: **Web app**
3. Set **Execute as**: Me
4. Set **Who has access**: Anyone
5. Click **Deploy** and authorize when prompted
6. Copy the **Web app URL**

### 4. Connect to the Site

Open `script.js` and replace the empty string on this line:

```js
const GOOGLE_SCRIPT_URL = '';
```

with your deployed URL:

```js
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

Commit and push — done! Form submissions will now appear in your Google Sheet.
