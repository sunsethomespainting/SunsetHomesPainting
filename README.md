# Sunset Home Painting

Static marketing site for Sunset Home Painting (Saint Augustine / Northeast Florida).

- Live preview (Railway): https://web-production-52a02.up.railway.app
- Canonical domain: **https://sunsethomespainting.com** (with the **s**)
- Stack: static HTML/CSS/JS + `nginx:alpine` Dockerfile

## Contact / estimate forms

Forms on `contact.html` and `schedule-appointment.html` submit through [FormSubmit](https://formsubmit.co) (AJAX).

- Endpoint: `https://formsubmit.co/ajax/goode434@gmail.com`
- Required lead fields: name, phone, email, service address, city, job type, preferred visit window, short notes
- Optional: photos, sq ft/rooms, how they heard about us
- Lead only — thank-you copy does **not** invent a price; free on-site estimate after we visit

**Activation (one-time):** First real submission emails `goode434@gmail.com`. The inbox owner must click FormSubmit’s confirmation link once.

## NAP

- Phone: **(386) 405-3015**
- Email: goode434@gmail.com
- Locality: Saint Augustine, FL 32084

## Local / Docker

```bash
docker build -t sunset-homes .
docker run --rm -p 8080:80 sunset-homes
```

`.dockerignore` excludes `.git`, `scripts/`, and markdown from the nginx image.
