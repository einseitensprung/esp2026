# ein / seiten / sprung — esp2026

Premium-Website von **Stephan Fössl** (einseitensprung, Wien) — Portfolio- und Landingpage für Website-Konzeption, Coding, SEO und Barrierefreiheit.

🔗 **Live-Preview:** https://einseitensprung.github.io/esp2026/
🌐 **Produktiv-Website:** https://einseitensprung.at/

## Über das Projekt

Statische One-Page-Site (Deutsch) mit den Bereichen:

- **Hero** — Intro & Claim
- **Leistungen** — Premium Websites, Code-Optimierung, SEO, Responsive Design, Barrierefreiheit, AI & AI Testing
- **Skills** — Frontend, Backend/CMS, Design & Optimierung, Arbeitsweise
- **Clients** — Laufender Marken-/Kunden-Ticker
- **Showreel** — Video-Showreel + filterbares Projekt-Grid (Masonry) mit realen Kundenprojekten
- **Stimmen** — Testimonial-Slider
- **Kontakt** — Kontaktdaten, Social Links, CTA
- Modale für **Impressum**, **Datenschutz** und **News** (LinkedIn-Embed mit Consent-Gate, DSGVO-konform)

## Tech-Stack

- Reines **HTML5 / CSS3 / Vanilla JavaScript** — kein Framework, kein Build-Step
- 100 % HTML5 & CSS3 valide
- 100 % WCAG AAA & EN 301 549 konform (Barrierefreiheit)
- 100 % DSGVO-konform, cookie-frei
- Responsive Design (Mobile, Tablet, Desktop, Bigscreen)

## Projektstruktur

```
esp2026/
├── index.html          # Haupt-Markup / alle Sections
├── favicon.png
├── assets/
│   ├── style.css        # Haupt-Stylesheet
│   ├── news.css         # Styles für das News-/LinkedIn-Modal
│   ├── main.js           # Navigation, Rail, Ticker, Modals, Projekt-Filter
│   └── news.js           # LinkedIn-Consent & Slider-Logik
└── proj/                 # Showreel-Videos & Projekt-Screenshots
```

## Lokal ansehen

Da die Seite ohne Build-Step auskommt, reicht ein einfacher statischer Server:

```bash
python -m http.server 8080
# → http://localhost:8080/index.html
```

## Kontakt

**Stephan Fössl** · einseitensprung · Wien
📍 Wimbergergasse 14-16/2/1, 1070 Wien
📞 [+43 664 85 85 136](tel:+436648585136)
✉️ [office@einseitensprung.at](mailto:office@einseitensprung.at)
🌐 [einseitensprung.at](https://einseitensprung.at)

---

© 2026 Stephan Fössl · einseitensprung · Wien
