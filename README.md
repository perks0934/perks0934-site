# perks:0934

Sito single page di perks:0934. Statico, nessuna build, nessuna dipendenza.

## File
- `index.html` — la pagina intera. Il ritratto ASCII animato (con la scritta PERKS 0934 e il bordo) è incorporato direttamente qui, quindi il file funziona da solo.

## Modifiche rapide
- Voci dell'archivio: array `ARCHIVE` nello script in fondo a `index.html`.
- Password del documento: costante `DOC_PASSWORD` (e `DOC_LINK` per l'URL del documento).
- Dimensione del riquadro ASCII: `margin` dentro il blocco animazione (più alto = più bianco attorno), oppure `width` e `margin` di `.hero`.
- Font: la pagina usa ABC Diatype con fallback a un sans neutro. Per servirlo a tutti, ospita i woff2 e attiva il blocco `@font-face` in cima al CSS.

## Deploy (GitHub → Cloudflare Pages → GoDaddy)
1. Push di questo repo su GitHub.
2. Cloudflare Pages: Create → Connect to Git → questo repo. Framework preset: none. Build command: vuoto. Output directory: `/`.
3. Custom domain `perks0934.xyz` nel progetto Pages. Aggiungi il dominio come zona su Cloudflare e, su GoDaddy, imposta i due nameserver che Cloudflare fornisce. SSL automatico.

Tutti i diritti riservati.
