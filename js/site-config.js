/**
 * Sunset Home Painting — site configuration
 *
 * Google Analytics 4
 * 1. https://analytics.google.com/ → Admin → Data Streams → sunsethomespainting.com
 * 2. Copy Measurement ID (G-XXXXXXXXXX) into SUNSET_GA_ID below
 *
 * Contact / estimate forms (Web3Forms — free)
 * 1. Create a key at https://web3forms.com (use sunsethomepainting@gmail.com or the inbox you want)
 * 2. Paste the access key into SUNSET_WEB3FORMS_ACCESS_KEY below
 * 3. Redeploy. Forms post to https://api.web3forms.com/submit — no backend required.
 *
 * Until a real key is set, the UI still validates and shows a clear setup message
 * instead of a silent fake success.
 */
window.SUNSET_GA_ID = 'G-CF667F9SM2';

/** Replace YOUR_ACCESS_KEY_HERE with the Web3Forms access key for the friend's inbox. */
window.SUNSET_WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE';

window.SUNSET_WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

window.SUNSET_FORM_TO_EMAIL = 'sunsethomepainting@gmail.com';
window.SUNSET_PHONE_DISPLAY = '(386) 405-3015';
window.SUNSET_PHONE_TEL = '3864053015';
