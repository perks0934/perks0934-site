# perks:0934

Sito single page di perks:0934. Statico, servito come Cloudflare Worker con static assets.

## Struttura
- `public/index.html` — la pagina intera (ASCII animato del ritratto incorporato).
- `wrangler.jsonc` — configurazione del Worker: serve la cartella `public/`.

## Deploy (Cloudflare Workers, stesso giro di baselife)
Il Worker è collegato a questo repo. A ogni push su `main` la build esegue:

    npx wrangler deploy

che pubblica il contenuto di `public/`. Nel pannello Cloudflare, sezione build:
- Build command: vuoto
- Deploy command: `npx wrangler deploy`
- Path: `/`
- API token: uno con permesso Workers Scripts:Edit

Il campo `name` in `wrangler.jsonc` deve combaciare con il nome del Worker nel dashboard.
Dopo il primo deploy il sito è raggiungibile su un indirizzo `*.workers.dev`.

## Dominio
Custom domain `perks0934.xyz` dal Worker (Settings, Domains & Routes). Il dominio va gestito come zona Cloudflare: su GoDaddy imposta i due nameserver che Cloudflare fornisce.

## Modifiche rapide
- Archivio: array `ARCHIVE` nello script in fondo a `public/index.html`.
- Password del documento: `DOC_PASSWORD` e `DOC_LINK`.
- Dimensione del riquadro ASCII: `margin` nel blocco animazione, o `width` e `margin` di `.hero`.
- Font: ABC Diatype con fallback sans; per servirlo a tutti, ospita i woff2 e attiva `@font-face`.

Tutti i diritti riservati.
