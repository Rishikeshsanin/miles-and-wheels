# Miles & Wheels

A polished, privacy-first car and bike rental storefront concept for India.

Miles & Wheels is intentionally built as a frontend-first release: visitors can browse a realistic rental fleet, search with typo tolerance, detect their location for display only, build a multi-vehicle trip, configure integer quantities and rental days, review a full billing breakdown, place a demo booking, and reopen local booking history without creating a server-side account.

## What makes this release different

- **No authentication database** — create account / sign in only stores the display name in the browser.
- **No user data collection** — no email, password, phone number, ID or payment data is sent to a backend.
- **Location is display-only** — geolocation never changes prices, inventory, search results or recommendations.
- **Typo-tolerant live search** — suggestions update on every character and handle common misspellings such as `swft` → Swift or `actva` → Activa.
- **Real booking flow** — cart, integer quantity controls, rental duration, service fee, GST, refundable security-deposit display, pickup details and a professional confirmation screen.
- **Local booking history** — saved in `localStorage` so it works without a database.
- **Responsive UI** — designed for desktop, laptop, tablet and mobile.
- **Zero-build deployment** — plain HTML/CSS/JavaScript for high reliability and instant static hosting.

## Fleet and pricing approach

Demo prices were calibrated against public self-drive rental listings in India rather than invented at random. Actual commercial pricing would eventually need a live inventory and pricing service, taxes by jurisdiction, availability windows, insurance rules, KYC and payment settlement.

Current example ranges used in the UI:

- Cars: roughly ₹2.1k/day for compact hatchbacks through ~₹7.9k/day for premium 7-seat vehicles.
- Scooters: roughly ₹550–₹700/day.
- Motorcycles: roughly ₹840/day for common street bikes through ~₹2.5k/day for premium touring/adventure models.

## Tech

- Semantic HTML5
- Responsive CSS (no framework dependency)
- Vanilla JavaScript
- Browser Geolocation API
- BigDataCloud reverse-geocode client endpoint with coordinate fallback
- `localStorage` for profile, cart, favourites and booking history
- Vercel-ready static configuration
- GitHub Pages workflow included

## Run locally

Open `index.html` directly, or serve the directory with any static server for full geolocation behaviour.

## Privacy model

The following values can exist in the visitor's own browser:

- display name
- cart contents
- favourites
- local booking history

They can be removed with **Clear local data** in the footer. This release does not include a database or real account authentication.

## Roadmap for a real business release

A later production backend can add live vehicle availability, city-specific depots, KYC/document verification, secure user accounts, payments, refunds, coupons, insurance packages, fleet operations, admin tooling, booking state transitions, notifications and analytics without changing the core customer experience.

## Credits

**Rishikesh M**  
+91 90590 76106

Repository: `https://github.com/Rishikeshsanin/miles-and-wheels`

## License

MIT
