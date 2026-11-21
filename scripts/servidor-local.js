// Servidor local para desarrollo: sirve los HTML con URLs limpias y ejecuta /api/*.
// Uso: node scripts/servidor-local.js  ->  http://localhost:3000
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tipos = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.webp': 'image/webp', '.json': 'application/json', '.svg': 'image/svg+xml' };

async function api(req, res, url) {
  const archivo = path.join(raiz, 'api', `${url.pathname.slice(5)}.js`);
  const { default: handler } = await import(pathToFileURL(archivo).href);
  let cuerpo = '';
  for await (const parte of req) cuerpo += parte;
  req.query = Object.fromEntries(url.searchParams);
  req.body = cuerpo ? JSON.parse(cuerpo) : {};
  res.status = (c) => ((res.statusCode = c), res);
  res.json = (d) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(d)); };
  return handler(req, res);
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  try {
    if (url.pathname.startsWith('/api/')) return await api(req, res, url);
    let ruta = path.join(raiz, decodeURIComponent(url.pathname));
    if (!ruta.startsWith(raiz)) throw new Error('fuera');
    if (url.pathname === '/') ruta = path.join(raiz, 'index.html');
    else if (!path.extname(ruta)) ruta += '.html';
    await stat(ruta);
    res.setHeader('Content-Type', tipos[path.extname(ruta)] || 'application/octet-stream');
    res.end(await readFile(ruta));
  } catch {
    res.statusCode = 404;
    res.setHeader('Content-Type', tipos['.html']);
    res.end(await readFile(path.join(raiz, '404.html')));
  }
}).listen(process.env.PORT || 3000, () => console.log('Nuwa en http://localhost:' + (process.env.PORT || 3000)));
