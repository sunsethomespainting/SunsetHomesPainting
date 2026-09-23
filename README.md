# Sunset Home Painting

Static marketing site for Sunset Home Painting (St. Augustine / Northeast Florida).

- Live preview (Railway): https://web-production-52a02.up.railway.app
- Canonical domain: **https://sunsethomespainting.com** (with the **s**)
- Stack: static HTML/CSS/JS + `nginx:alpine` Dockerfile

## Contact / estimate forms (required setup)

Forms on `contact.html` and `schedule-appointment.html` submit through [Web3Forms](https://web3forms.com) (free). No paid plugins and no backend changes.

1. Open https://web3forms.com and create an access key.
2. Use the inbox that should receive leads (today’s public email is `sunsethomepainting@gmail.com`).
3. Open `js/site-config.js` and replace the placeholder:

```js
window.SUNSET_WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE';
```

4. Redeploy. Until a real key is set, the UI validates input and shows a clear setup message (it will not fake a successful send).

Fields collected: name, phone, email, service type (interior / exterior / both), city/address, message. Honeypot field: `botcheck`.

## Local / Docker

```bash
docker build -t sunset-homes .
docker run --rm -p 8080:80 sunset-homes
```

## Notes

- Phone NAP is unified to **(386) 405-3015**.
- Brand display name remains “Sunset Home Painting”; website host is `sunsethomespainting.com`.
