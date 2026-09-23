# Sunset Home Painting

Static marketing site for Sunset Home Painting (St. Augustine / Northeast Florida).

- Live preview (Railway): https://web-production-52a02.up.railway.app
- Canonical domain: **https://sunsethomespainting.com** (with the **s**)
- Stack: static HTML/CSS/JS + `nginx:alpine` Dockerfile

## Contact / estimate forms

Forms on `contact.html` and `schedule-appointment.html` submit through [FormSubmit](https://formsubmit.co) (free AJAX endpoint). No API key and no backend changes.

- Endpoint: `https://formsubmit.co/ajax/sunsethomepainting@gmail.com`
- Payload includes `_subject`, form fields (name, email, phone, service_type, city_address, message), `_template=table`, `_captcha=false`
- Honeypot field: `botcheck`

**Activation (one-time):** The first real submission sends an activation email to `sunsethomepainting@gmail.com`. The inbox owner must click the FormSubmit confirmation link once before further leads arrive.

## Local / Docker

```bash
docker build -t sunset-homes .
docker run --rm -p 8080:80 sunset-homes
```

## Notes

- Phone NAP is unified to **(386) 405-3015**.
- Brand display name remains “Sunset Home Painting”; website host is `sunsethomespainting.com`.
