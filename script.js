// Cloud Storage Configuration
const cloudConnectBtn = document.getElementById('cloudConnectBtn');
const cloudClientIdInput = document.getElementById('cloudClientIdInput');
const cloudSheetIdInput = document.getElementById('cloudSheetIdInput');
const cloudStatus = document.getElementById('cloudStatus');
const cloudSetup = document.querySelector('.cloud-setup');
const cloudOriginValue = document.getElementById('cloudOriginValue');
const cloudRedirectValue = document.getElementById('cloudRedirectValue');
const cloudAuthUrlValue = document.getElementById('cloudAuthUrlValue');

// Get the current origin for OAuth setup
// For GitHub Pages: https://d754mk647p-cyber.github.io/Attendance-tracker
// For local: http://localhost:8000
const currentOrigin = window.location.origin;
const pathname = window.location.pathname;

// Build the redirect URI correctly
// If on GitHub Pages, include the repo path; otherwise just use origin
const isGitHubPages = currentOrigin.includes('github.io');
const redirectUri = isGitHubPages 
  ? `${currentOrigin}${pathname}/callback.html`
  : `${currentOrigin}/callback.html`;

// Set up display values for OAuth configuration
if (cloudOriginValue) cloudOriginValue.value = currentOrigin;
if (cloudRedirectValue) cloudRedirectValue.value = redirectUri;

// Cloud Connect Button Handler
if (cloudConnectBtn) {
  cloudConnectBtn.addEventListener('click', async () => {
    const clientId = cloudClientIdInput.value.trim();
    const spreadsheetId = cloudSheetIdInput.value.trim();

    // Validation
    if (!clientId) {
      cloudStatus.textContent = '❌ Error: Google OAuth Client ID is required.';
      cloudStatus.style.color = '#ff6b6b';
      return;
    }

    if (!spreadsheetId) {
      cloudStatus.textContent = '❌ Error: Spreadsheet ID is required.';
      cloudStatus.style.color = '#ff6b6b';
      return;
    }

    try {
      // Show setup instructions
      cloudSetup.classList.remove('hidden');

      // Generate OAuth URL
      const scope = 'https://www.googleapis.com/auth/spreadsheets';
      const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      authUrl.searchParams.append('client_id', clientId);
      authUrl.searchParams.append('redirect_uri', redirectUri);
      authUrl.searchParams.append('response_type', 'token');
      authUrl.searchParams.append('scope', scope);
      authUrl.searchParams.append('prompt', 'consent');

      if (cloudAuthUrlValue) {
        cloudAuthUrlValue.value = authUrl.toString();
      }

      cloudStatus.textContent = '✅ OAuth setup displayed. Review the configuration and use "Redirect Sign-In" to authenticate.';
      cloudStatus.style.color = '#51cf66';
    } catch (error) {
      cloudStatus.textContent = `❌ Error: ${error.message}`;
      cloudStatus.style.color = '#ff6b6b';
      console.error('Cloud connect error:', error);
    }
  });
}

// Copy to Clipboard Helpers
const copyButtons = [
  { btn: '#copyCloudOriginBtn', input: '#cloudOriginValue' },
  { btn: '#copyCloudRedirectBtn', input: '#cloudRedirectValue' },
  { btn: '#copyCloudAuthUrlBtn', input: '#cloudAuthUrlValue' },
];

copyButtons.forEach(({ btn, input }) => {
  const button = document.querySelector(btn);
  if (button) {
    button.addEventListener('click', () => {
      const inputEl = document.querySelector(input);
      if (inputEl) {
        inputEl.select();
        document.execCommand('copy');
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      }
    });
  }
});

// Redirect Sign-In Button
const cloudRedirectBtn = document.getElementById('cloudRedirectBtn');
if (cloudRedirectBtn) {
  cloudRedirectBtn.addEventListener('click', () => {
    const authUrl = cloudAuthUrlValue?.value;
    if (authUrl) {
      window.location.href = authUrl;
    } else {
      cloudStatus.textContent = '❌ Error: Please click "Connect" first to generate the auth URL.';
      cloudStatus.style.color = '#ff6b6b';
    }
  });
}

// Store OAuth Token from URL hash (for redirect callback)
if (window.location.hash) {
  const params = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = params.get('access_token');
  
  if (accessToken) {
    localStorage.setItem('googleAccessToken', accessToken);
    window.location.hash = ''; // Clear hash from URL
    cloudStatus.textContent = '✅ Successfully authenticated with Google!';
    cloudStatus.style.color = '#51cf66';
  }
}
