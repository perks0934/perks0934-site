# perks:0934

Sito di perks:0934 — il redesign a 4 schermate scroll-snap (hero ASCII ditherato,
standfirst, archive, documents/collaborators/footer). Monocromo, ABC Diatype,
look ditherato. Servito come Cloudflare Worker con static assets.

## Struttura
- `public/index.html` — la pagina consegnata, singolo file autonomo (offline-ready:
  font, JS, immagini, favicon e OG tutti inline). **Source of truth del design — non ridisegnare.**
- `public/og-image.png` — immagine OG/Twitter, servita a `/og-image.png`.
- `src/index.js` — Worker: gate teaser + serve gli asset.
- `wrangler.toml` — config del Worker (`name = "perks0934-site"`, assets + var TEASER).
- `archive.csv` — dati archivio (Phase-2, non ancora wired nella pagina).

## Teaser gate
Pubblico di default = **teaser ON** (solo l'animazione hero; screen 2–4 e toggle nascosti).
Il flag è reale, non hard-baked:
- **Accendere il sito completo** senza rebuild: metti `TEASER = "false"` in `wrangler.toml` e `npx wrangler deploy`.
- **Override per singola richiesta** (preview): aggiungi `?full=1` all'URL.

Il Worker riscrive l'HTML servito (flip del prop `teaser` del bundle) senza toccare il design.

## Deploy
Deploy manuale via CLI (nessuna CI Git attiva al momento):

    npx wrangler deploy

- Worker: `perks0934-site` (account perks0934@gmail.com)
- Preview: `perks0934-site.perks0934.workers.dev`
- Produzione: **perks0934.xyz** (Workers Custom Domain, gestito lato Cloudflare, preservato tra i deploy)

## Backend da wire-are (Phase-2, ancora placeholder)
Tutti stub client-side nell'artifact, visibili solo con `?full=1`:
- Archive → bind a `archive.csv` o Google Sheet (col: date,name,type,status,description,url,image)
- Immagini progetto (`/img/`) rese con dithering Bayer + video ditherati b/n
- Access gate: password reale (ora `0934` placeholder) + URL documento protetto (check server-side)
- Form: candidatura + due "request document" → endpoint di submission reali

Tutti i diritti riservati.
