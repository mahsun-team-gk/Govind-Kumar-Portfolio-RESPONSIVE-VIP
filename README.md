# Govind Kumar — Ultimate Developer Portfolio

Premium dark/cyan developer portfolio inspired by the visual structure and interaction patterns of the supplied reference portfolio, populated with Govind Kumar's provided CV/profile information.

## Run locally
Open the folder in VS Code and use Live Server, or open `index.html` directly.

## Deploy
Static site: upload the whole folder to Vercel, Netlify, GitHub Pages or another static host.

## Main files
- `index.html` — complete page structure and content
- `style.css` — responsive UI, animations, hover states and themes
- `script.js` — GSAP/ScrollTrigger, Lenis, typewriter, cursor, active navigation, forms and interactions
- `assets/govind-kumar.jpg` — profile image
- `assets/Govind-Kumar-CV.pdf` — CV

## Contact forms
The direct-message and subscribe forms use a `mailto:` fallback so they work without a backend service. For production email delivery, replace these handlers with Formspree, Web3Forms, EmailJS or your own backend endpoint.

## Social links
The portfolio currently includes the GitHub repository, email and WhatsApp links available from the provided/project context. Add any personal LinkedIn/Instagram URLs in `index.html` when available.


FIX NOTE: The loading overlay is now guaranteed to disappear after page load, with a 2.2-second safety fallback, so the portfolio cannot remain stuck on 'GK / INITIALIZING PORTFOLIO'.


## Social links
The header/footer include GitHub plus visual placeholders for Facebook, LinkedIn, X/Twitter and Instagram. Those placeholder icons intentionally do not navigate anywhere until the personal profile URLs are known. Replace their `href="#"` values in `index.html` when you have the exact URLs.
