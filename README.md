# Miles & Wheels

[![Quality checks](https://github.com/Rishikeshsanin/miles-and-wheels/actions/workflows/quality.yml/badge.svg)](https://github.com/Rishikeshsanin/miles-and-wheels/actions/workflows/quality.yml)

A polished, privacy-first **car and bike rental storefront for India**. This first release focuses on a production-quality customer experience while deliberately avoiding unnecessary collection of personal data.

## Product experience

Visitors can browse a 20-vehicle fleet, search with typo tolerance, display their current location, build a multi-vehicle trip, configure integer quantities and rental days, review an itemized bill, place a demo booking and reopen their booking history—all without creating a server-side account.

### Highlights

- **Cars + bikes + scooters** in one responsive rental experience.
- **Live search suggestions on every character** with fuzzy matching for inputs such as `swft` → Swift and `actva` → Activa.
- **Popular rides and full fleet browsing** with vehicle-type filters and price/name sorting.
- **Display-only location detection**—location never changes pricing, inventory, recommendations or the UI catalog.
- **Integer-only quantities** and configurable rental duration from 1–30 days.
- **Professional billing flow** with rental subtotal, service fee, GST, refundable security-deposit disclosure and final payable amount.
- **Device-only profile** for create-account / sign-in / sign-out behaviour without real authentication.
- **Local booking history** with generated booking IDs and pickup details.
- **Favourites and cart persistence** through browser `localStorage`.
- **Responsive design** for desktop, laptop, tablet and mobile.
- **Accessible basics** including semantic structure, labels, keyboard-close behaviour, reduced-motion support and a skip link.

## Privacy-first architecture

This release has **no user database**.

The browser may locally retain:

- display name
- cart contents
- favourites
- local booking history

The footer provides **Clear local data** to remove those values. No email, password, phone number, ID document or payment information is collected by the application.

The location feature uses browser geolocation and reverse-geocoding only to show the visitor where they are. The resulting location does not influence the catalog or prices.

## Stateless backend

`POST /api/quote` validates the selected vehicle IDs, integer quantities and rental durations against a server-side price book before calculating:

- rental subtotal
- 3.5% service fee
- 18% GST
- refundable security deposit
- payable amount

The endpoint stores **nothing**. If the application is opened as a purely static site, the UI has an equivalent local calculation fallback.

`GET /api/health` provides a minimal health response and explicitly reports that storage is not used.

## Fleet and pricing approach

Demo prices were calibrated against public self-drive rental listings in India instead of being chosen arbitrarily. They are illustrative—not live commercial quotes.

Typical ranges represented in v1:

| Category | Example range |
| --- | ---: |
| Compact / premium cars | ~₹2,160–₹4,680 per day |
| Large / premium 7-seat cars | ~₹6,240–₹7,944 per day |
| Scooters | ~₹552–₹672 per day |
| Motorcycles | ~₹840–₹2,519 per day |

A future real-business release would replace this catalog with live inventory, city/depot availability, insurance rules and dynamic commercial pricing.

## Technology

- Semantic HTML5
- Responsive CSS with custom design system
- Vanilla JavaScript
- Browser Geolocation API
- BigDataCloud reverse-geocode client endpoint with coordinate fallback
- `localStorage` for device-local profile, cart, favourites and booking history
- Vercel Serverless Functions for stateless quote/health APIs
- GitHub Actions quality checks
- Vercel-ready production headers and configuration

## Quality checks

Every push to `main` validates the repository-hosted source with GitHub Actions:

1. JavaScript syntax for the frontend and both API functions.
2. HTML parsing and presence of required booking/account/privacy UI.
3. Responsive breakpoint rules.
4. Quote calculation accuracy.
5. Rejection of decimal quantities.
6. Verification that the quote endpoint remains stateless.

## Project structure

```text
miles-and-wheels/
├── .github/workflows/quality.yml
├── api/
│   ├── health.js
│   └── quote.js
├── assets/favicon.svg
├── app.js
├── index.html
├── styles.css
├── site.webmanifest
├── robots.txt
├── vercel.json
├── LICENSE
└── README.md
```

## Run locally

Serve the project root with any static development server and open `index.html`. A server is recommended because browser location permissions behave more consistently on an HTTP origin than when a file is opened directly.

The `/api/*` routes are designed for Vercel; the customer flow still works without them through the stateless frontend fallback.

## Production roadmap

A later serious-business backend can add live vehicle availability, city-specific pickup hubs, KYC/document verification, secure authentication, payments, refunds, coupons, insurance packages, fleet operations, admin tooling, booking state transitions, notifications and analytics without changing the core customer journey established here.

## Credits

Built by **Rishikesh M**  
+91 90590 76106

GitHub: https://github.com/Rishikeshsanin/miles-and-wheels

## License

MIT License — see [`LICENSE`](LICENSE).
