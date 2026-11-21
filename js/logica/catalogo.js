// Catálogo: filtros por categoría, "para niños" y búsqueda por texto.
import { obtenerCatalogo } from '../servicios/api.js';
import { clonar } from './util.js';
import { tarjetaProducto } from './tarjetas.js';
import { observarReveal } from './ui.js';

const rejilla = document.getElementById('rejilla');
const filtros = document.getElementById('filtros');
const buscador = document.getElementById('buscador');
const contador = document.getElementById('contador');
const vacio = document.getElementById('vacio');

const { productos, categorias } = await obtenerCatalogo();
const params = new URLSearchParams(location.search);
const estado = { categoria: params.get('categoria') || 'todas', texto: '' };

// Botones de filtro
const opciones = [{ id: 'todas', nombre: 'Todo' }, ...categorias, { id: 'ninos', nombre: 'Para niños' }];
for (const op of opciones) {
  const b = clonar('plantilla-filtro', { nombre: op.nombre });
  b.dataset.filtro = op.id;
  b.addEventListener('click', () => { estado.categoria = op.id; pintar(); });
  filtros.append(b);
}

buscador.addEventListener('input', () => { estado.texto = buscador.value.trim().toLowerCase(); pintar(); });

const normalizar = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

function pintar() {
  filtros.querySelectorAll('[data-filtro]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filtro === estado.categoria)));
  const texto = normalizar(estado.texto);
  const lista = productos.filter((p) => {
    if (estado.categoria === 'ninos' && !p.ninos) return false;
    if (!['todas', 'ninos'].includes(estado.categoria) && p.categoria !== estado.categoria) return false;
    if (!texto) return true;
    return normalizar([p.nombre, p.marca, p.frase, p.aroma, p.ingredientes].join(' ')).includes(texto);
  });
  rejilla.replaceChildren(...lista.map((p, i) => tarjetaProducto(p, categorias, i)));
  contador.textContent = `${lista.length} ${lista.length === 1 ? 'producto' : 'productos'}`;
  vacio.hidden = lista.length > 0;
  const url = estado.categoria === 'todas' ? location.pathname : `?categoria=${estado.categoria}`;
  history.replaceState(null, '', url);
  observarReveal(rejilla);
}
pintar();
