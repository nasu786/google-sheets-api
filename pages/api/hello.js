// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');

export default async function handler(req, res) {

  const { body } = req;

  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  const service = google.sheets({ version: 'v4', auth });
  const resource = {
    properties: {
      title: "body.title",
    },
  };
  const spreadsheet = await service.spreadsheets.create({
    resource,
    fields: 'spreadsheetId',
  });
  console.log(`Spreadsheet ID: ${spreadsheet.data.spreadsheetId}`);
  // return spreadsheet.data.spreadsheetId;



 return res.status(200).json({spreadsheet: body.title})
}

/**
 * Create a google spreadsheet
 * @param {string} title Spreadsheets title
 * @return {string} Created spreadsheets ID
 */
async function create(title) {



}