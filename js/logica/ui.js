// Comportamiento común a todas las vistas: cabecera, menú móvil,
// aparición al hacer scroll, enlaces de WhatsApp y año del pie.
import { obtenerConfig } from '../servicios/api.js';
import { enlaceWhatsapp } from './util.js';

// Cabecera con fondo al bajar
const marcarScroll = () => document.body.classList.toggle('is-scrolled', window.scrollY > 24);
marcarScroll();
window.addEventListener('scroll', marcarScroll, { passive: true });

// Menú móvil
const botonMenu = document.querySelector('[data-menu-boton]');
botonMenu?.addEventListener('click', () => {
  const abierto = document.body.classList.toggle('menu-abierto');
  botonMenu.setAttribute('aria-expanded', String(abierto));
});
document.querySelectorAll('[data-menu] a').forEach((a) =>
  a.addEventListener('click', () => document.body.classList.remove('menu-abierto'))
);

// Página actual en la navegación
const ruta = location.pathname.replace(/\/$/, '/index').replace(/\.html$/, '').split('/').pop() || 'index';
document.querySelectorAll('[data-nav]').forEach((a) => {
  if (a.dataset.nav === ruta) a.setAttribute('aria-current', 'page');
});

// Aparición suave al entrar en pantalla (una sola vez por elemento)
const observador = new IntersectionObserver(
  (entradas) => {
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('is-revealed');
      observador.unobserve(e.target);
    }
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);
export const observarReveal = (raiz = document) =>
  raiz.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach((el) => observador.observe(el));
observarReveal();

// Enlaces de WhatsApp y datos de contacto
obtenerConfig().then((config) => {
  document.querySelectorAll('[data-whatsapp]').forEach((a) => {
    a.href = enlaceWhatsapp(config, a.dataset.whatsapp || 'Hola Nuwa, quiero más información.');
    a.target = '_blank';
    a.rel = 'noopener';
  });
  document.querySelectorAll('[data-config]').forEach((el) => {
    const valor = config[el.dataset.config];
    if (!valor) return;
    if (el.tagName === 'A') el.href = el.dataset.config === 'correo' ? `mailto:${valor}` : valor;
    if (!el.dataset.soloEnlace) el.textContent = valor;
  });
});

document.querySelectorAll('[data-anio]').forEach((el) => (el.textContent = new Date().getFullYear()));
