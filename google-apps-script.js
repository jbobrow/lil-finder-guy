/**
 * Google Apps Script — Lil Finder Guy Form Handler
 *
 * Paste this into Extensions → Apps Script in your Google Sheet.
 * Deploy as a Web App (Execute as: Me, Access: Anyone).
 * See SETUP.md for full instructions.
 */

const SHEET_NAME = 'Responses';

function doPost(e) {
  try {
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      return ContentService.createTextOutput(
        JSON.stringify({ status: 'error', message: 'Sheet not found' })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.email || '',
      data.interests || '',
      data.name || '',
      data.address || '',
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ status: 'ok' })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ status: 'ok', message: 'Lil Finder Guy form endpoint' })
  ).setMimeType(ContentService.MimeType.JSON);
}
