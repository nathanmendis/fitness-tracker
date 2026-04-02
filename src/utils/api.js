import axios from 'axios';

/**
 * Fetch data from a specific sheet tab
 * @param {string} sheetId - The unique Google Sheet ID (Required)
 * @param {string} sheetName - The name of the tab in Google Sheets
 */
export const fetchSheetData = async (sheetId, sheetName) => {
  if (!sheetId) {
    throw new Error(`Critical Error: Sheet ID is missing for [${sheetName}].`);
  }

  const baseUrl = `https://opensheet.elk.sh/${sheetId}`;

  try {
    const response = await axios.get(`${baseUrl}/${sheetName}`);
    if (response.data && response.data.error) {
       throw new Error(`Google Sheets API Error: ${response.data.error}`);
    }
    return response.data;
  } catch (error) {
    const msg = error.response?.status === 404 
       ? `Sheet tab [${sheetName}] or ID [${sheetId}] not found. Ensure ID is correct and tab is named exactly "${sheetName}".`
       : `Could not connect to Google Sheet. Ensure it is shared with "Anyone with the link" as a Viewer and the ID is correct.`;
    throw new Error(msg);
  }
};
