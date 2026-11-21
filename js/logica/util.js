// Utilidades compartidas: plantillas <template>, formato y enlaces de WhatsApp.

/** Clona un <template> por id y rellena los nodos con data-campo. */
export function clonar(idPlantilla, datos = {}) {
  const t = document.getElementById(idPlantilla);
  const nodo = t.content.firstElementChild.cloneNode(true);
  rellenar(nodo, datos);
  return nodo;
}

/** Rellena [data-campo], [data-href], [data-src] y [data-alt] dentro de un nodo. */
export function rellenar(raiz, datos) {
  const todos = [raiz, ...raiz.querySelectorAll('[data-campo],[data-href],[data-src],[data-alt]')];
  for (const el of todos) {
    if (el.dataset.campo && datos[el.dataset.campo] != null) el.textContent = datos[el.dataset.campo];
    if (el.dataset.href && datos[el.dataset.href] != null) el.href = datos[el.dataset.href];
    if (el.dataset.src && datos[el.dataset.src] != null) el.src = datos[el.dataset.src];
    if (el.dataset.alt && datos[el.dataset.alt] != null) el.alt = datos[el.dataset.alt];
  }
}

export const formatoPrecio = (precio) =>
  precio == null ? 'Consultar precio' : new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(precio);

export const enlaceWhatsapp = (config, texto) =>
  `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(texto)}`;

export const nombreCategoria = (categorias, id) => categorias.find((c) => c.id === id)?.nombre ?? '';
