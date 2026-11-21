// POST /api/contacto { nombre, correo, mensaje }
// Valida el formulario y deja el mensaje en los logs de Vercel.
// Siguiente paso: conectar un servicio de correo (por ejemplo Resend) con una variable de entorno.
import { config } from '../data/config.js';

const correoValido = (c) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c);
const limpiar = (t, max) => String(t ?? '').trim().slice(0, max);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido' });
  }
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const nombre = limpiar(body.nombre, 80);
  const correo = limpiar(body.correo, 120);
  const mensaje = limpiar(body.mensaje, 2000);
  if (body.sitio) return res.status(200).json({ ok: true }); // trampa anti-spam

  const errores = {};
  if (nombre.length < 2) errores.nombre = 'Cuéntanos tu nombre.';
  if (!correoValido(correo)) errores.correo = 'Revisa tu correo.';
  if (mensaje.length < 5) errores.mensaje = 'Escribe un mensaje un poco más largo.';
  if (Object.keys(errores).length) return res.status(422).json({ ok: false, errores });

  console.log('[contacto]', JSON.stringify({ nombre, correo, mensaje, fecha: new Date().toISOString() }));
  const texto = encodeURIComponent(`Hola Nuwa, soy ${nombre}. ${mensaje}`);
  return res.status(200).json({ ok: true, whatsapp: `https://wa.me/${config.whatsapp}?text=${texto}` });
}
