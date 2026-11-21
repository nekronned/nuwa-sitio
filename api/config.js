// GET /api/config -> datos públicos de contacto y venta
import { config } from '../data/config.js';

export default function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=86400');
  return res.status(200).json(config);
}
