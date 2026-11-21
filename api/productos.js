// GET /api/productos            -> catálogo completo
// GET /api/productos?id=...     -> un producto
// GET /api/productos?categoria=manos&ninos=1 -> filtrado
import { productos, categorias, sellos } from '../data/productos.js';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Método no permitido' });
  }
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=86400');
  const { id, categoria, ninos } = req.query || {};

  if (id) {
    const producto = productos.find((p) => p.id === id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    return res.status(200).json({ producto, sellos, categorias });
  }

  let lista = productos;
  if (categoria) lista = lista.filter((p) => p.categoria === categoria);
  if (ninos === '1') lista = lista.filter((p) => p.ninos);
  return res.status(200).json({ productos: lista, categorias, sellos });
}
