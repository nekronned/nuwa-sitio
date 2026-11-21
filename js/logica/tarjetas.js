// Construye tarjetas de producto a partir de <template id="plantilla-tarjeta">.
import { clonar, formatoPrecio, nombreCategoria } from './util.js';

export function tarjetaProducto(p, categorias, indice = 0) {
  const nodo = clonar('plantilla-tarjeta', {
    nombre: p.nombre,
    marca: p.marca,
    frase: p.frase,
    precio: formatoPrecio(p.precio),
    categoria: nombreCategoria(categorias, p.categoria),
    url: `/producto?id=${p.id}`,
    imagen: p.imagenes[0],
    alt: p.nombre,
    inci: String(p.inci).replace('.', ','),
  });
  nodo.dataset.color = p.color;
  nodo.style.transitionDelay = `${(indice % 4) * 90}ms`;
  nodo.addEventListener('transitionend', () => (nodo.style.transitionDelay = ''), { once: true });
  nodo.querySelector('[data-ninos]')?.toggleAttribute('hidden', !p.ninos);
  return nodo;
}
