// Acceso a datos: llama a las funciones de /api y, si no están disponibles
// (por ejemplo al abrir el sitio sin servidor), usa los módulos de /data.

async function pedir(url) {
  const r = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!r.ok) throw new Error(`${url} respondió ${r.status}`);
  return r.json();
}

async function datosLocales() {
  const [{ productos, categorias, sellos }, { config }] = await Promise.all([
    import('/data/productos.js'),
    import('/data/config.js'),
  ]);
  return { productos, categorias, sellos, config };
}

export async function obtenerCatalogo() {
  try {
    return await pedir('/api/productos');
  } catch {
    const { productos, categorias, sellos } = await datosLocales();
    return { productos, categorias, sellos };
  }
}

export async function obtenerProducto(id) {
  try {
    return await pedir(`/api/productos?id=${encodeURIComponent(id)}`);
  } catch {
    const { productos, categorias, sellos } = await datosLocales();
    const producto = productos.find((p) => p.id === id);
    return producto ? { producto, categorias, sellos } : null;
  }
}

let configCache;
export async function obtenerConfig() {
  if (configCache) return configCache;
  try {
    configCache = await pedir('/api/config');
  } catch {
    configCache = (await datosLocales()).config;
  }
  return configCache;
}

export async function enviarContacto(datos) {
  const r = await fetch('/api/contacto', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  return { status: r.status, ...(await r.json().catch(() => ({}))) };
}
