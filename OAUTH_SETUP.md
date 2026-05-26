# OAuth Setup for Attendance Tracker

## Step 1: Enable GitHub Pages

1. Go to repository Settings → Pages
2. Under "Build and deployment" → Source: select "Deploy from a branch"
3. Select Branch: **main**
4. Select Folder: **/ (root)**
5. Click **Save**

Wait 1-2 minutes for deployment. Your app will be available at:
```
https://d754mk647p-cyber.github.io/jubilant-memory/
```

## Step 2: Get OAuth Values from the App

1. Open the deployed app URL above
2. Scroll to the **Cloud Storage** panel
3. You'll see three copyable fields:
   - **Authorized JavaScript origin**
   - **Authorized redirect URI**
   - **Generated Google auth URL**

Copy these values (use the "Copy" buttons in the app).

## Step 3: Configure Google OAuth Client

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project and go to **APIs & Services** → **Credentials**
3. Find your OAuth 2.0 Client ID (or create one if needed)
4. Click to edit it
5. Under **Authorized JavaScript origins**, add:
   ```
   https://d754mk647p-cyber.github.io
   ```
6. Under **Authorized redirect URIs**, add:
   ```
   https://d754mk647p-cyber.github.io/jubilant-memory/
   ```
7. Click **Save**

## Step 4: Connect the App to Google Sheets

1. Return to the Attendance Tracker app
2. In the **Cloud Storage** panel:
   - Paste your **Google OAuth Client ID**
   - Click **Create Sheet** to auto-generate a new Google Sheet, or paste an existing Spreadsheet ID
3. Click **Connect** to authorize
4. Follow the Google sign-in flow

## Step 5: Enable Cloud Sync (Optional)

Check the **Auto-sync changes** box to automatically sync attendance data to Google Sheets whenever you make changes.

For manual sync:
- Click **Push Cloud** to upload local data to the sheet
- Click **Pull Cloud** to download sheet data to this browser

## Multi-Device Use

Share the **Spreadsheet ID** with team members. They can:
1. Open the same app URL
2. Enter the same Spreadsheet ID
3. Sign in with their Google account
4. All users will see the same synchronized data

---

**Note:** Data syncs on a last-save-wins basis. Coordinate edits to avoid conflicts.
