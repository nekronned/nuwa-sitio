// Formulario de contacto: valida en el navegador y envía a /api/contacto.
import { enviarContacto } from '../servicios/api.js';

const form = document.getElementById('form-contacto');
const estado = document.getElementById('estado-form');
const boton = form.querySelector('button[type="submit"]');
const exito = document.getElementById('exito');
const enlaceExito = document.getElementById('exito-whatsapp');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  form.querySelectorAll('[data-error]').forEach((el) => (el.textContent = ''));
  if (!form.reportValidity()) return;

  boton.disabled = true;
  estado.textContent = 'Enviando…';
  const datos = Object.fromEntries(new FormData(form));
  try {
    const r = await enviarContacto(datos);
    if (r.ok) {
      form.hidden = true;
      exito.hidden = false;
      if (r.whatsapp) enlaceExito.href = r.whatsapp;
      return;
    }
    for (const [campo, msg] of Object.entries(r.errores || {})) {
      const el = form.querySelector(`[data-error="${campo}"]`);
      if (el) el.textContent = msg;
    }
    estado.textContent = r.errores ? 'Revisa los campos marcados.' : 'No pudimos enviar el mensaje. Escríbenos por WhatsApp.';
  } catch {
    estado.textContent = 'No pudimos enviar el mensaje. Escríbenos por WhatsApp.';
  } finally {
    boton.disabled = false;
  }
});
