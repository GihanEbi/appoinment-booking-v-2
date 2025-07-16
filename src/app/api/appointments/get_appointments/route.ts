// app/api/sheets/route.ts

import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const sheetId = process.env.GOOGLE_SHEET_ID;

  // --- DEBUGGING BLOCK 1: Check if variables are loaded ---
  if (!privateKey || !clientEmail || !sheetId) {
    return NextResponse.json(
      { error: 'Server configuration error. Check server logs.' },
      { status: 500 }
    );
  }

  const formattedPrivateKey = privateKey;

  // Inside your GET function in app/api/sheets/route.ts

  try {
    // We already know from the logs that clientEmail and privateKey are loaded
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL!;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY!;

    // --- The New, Corrected Credentials ---
    const credentials = {
      client_email: clientEmail,
      private_key: privateKey.replace(/\\n/g, '\n'), // This is the most common way
    };

    const auth = new google.auth.GoogleAuth({
      credentials, // Pass the constructed object here
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // ... the rest of your code remains the same
    const range = 'Appoinments!A:E';
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
    });

    const values = response.data.values;

    if (!values || values.length === 0) {
      return NextResponse.json({ error: 'No data found.' }, { status: 404 });
    }

    // Optional: Transform the data into an array of objects
    // Assumes the first row is the header
    const headers = values[0];
    const data = values.slice(1).map((row) => {
      return headers.reduce(
        (obj, header, index) => {
          obj[header] = row[index];
          return obj;
        },
        {} as Record<string, any>
      );
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.error('🔴 The API returned an error: ', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Google Sheets. Check server logs.' },
      { status: 500 }
    );
  }
}
