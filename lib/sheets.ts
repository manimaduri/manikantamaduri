/**
 * Append a contact submission as a row to a Google Sheet via a Google
 * Apps Script web-app webhook (no service-account JSON to manage).
 *
 * Set GOOGLE_SHEETS_WEBHOOK_URL to the deployed Apps Script /exec URL.
 * The script should read e.postData.contents (JSON) and appendRow().
 * Failure here is non-fatal — email remains the source of truth.
 */
interface SheetRow {
  timestamp: string;
  name: string;
  email: string;
  message: string;
}

export async function appendContactRow(row: SheetRow): Promise<boolean> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return false;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    });
    return res.ok;
  } catch {
    return false;
  }
}
