import axios from 'axios';

/**
 * Fetch data from a specific sheet tab
 * @param {string} sheetId - The unique Google Sheet ID (Required)
 * @param {string} sheetName - The name of the tab in Google Sheets
 */
export const fetchSheetData = async (sheetId, sheetName) => {
  if (!sheetId) {
    throw new Error(`Critical Error: Synchronization ID (Sheet ID) is missing for [${sheetName}].`);
  }

  const baseUrl = `https://opensheet.elk.sh/${sheetId}`;

  try {
    const response = await axios.get(`${baseUrl}/${sheetName}`);
    return response.data;
  } catch (error) {
    console.warn(`Could not fetch [${sheetName}] for sheet [${sheetId}].`);
    return [];
  }
};
