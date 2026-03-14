# Goya · Dali — Worker + D1

Arquitectura única y limpia para Cloudflare Workers:

- `_worker.js` maneja `POST /api/registro`
- `env.ASSETS.fetch(request)` sirve la web estática
- D1 binding: `DB`
- Assets binding: `ASSETS`

## Estructura
- `_worker.js`
- `wrangler.jsonc`
- `index.html`
- `app.js`
- `style.css`
- `assets/`

## Despliegue
Sube el contenido completo del repo y despliega en Cloudflare como Worker con assets.
