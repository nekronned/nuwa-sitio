// Ficha de producto: lee ?id= y rellena la vista.
import { obtenerProducto, obtenerConfig, obtenerCatalogo } from '../servicios/api.js';
import { clonar, rellenar, formatoPrecio, enlaceWhatsapp, nombreCategoria } from './util.js';
import { tarjetaProducto } from './tarjetas.js';
import { observarReveal } from './ui.js';

const id = new URLSearchParams(location.search).get('id');
const ficha = document.getElementById('ficha');
const noEncontrado = document.getElementById('no-encontrado');

const [datos, config] = await Promise.all([id ? obtenerProducto(id) : null, obtenerConfig()]);

if (!datos) {
  ficha.hidden = true;
  noEncontrado.hidden = false;
} else {
  const { producto: p, sellos, categorias } = datos;
  document.title = `${p.nombre} · Nuwa`;
  rellenar(ficha, {
    nombre: p.nombre,
    marca: p.marca,
    frase: p.frase,
    descripcion: p.descripcion,
    precio: formatoPrecio(p.precio),
    categoria: nombreCategoria(categorias, p.categoria),
    formato: p.formato,
    aroma: p.aroma,
    modoUso: p.modoUso || 'Sigue las indicaciones del envase.',
    ingredientes: p.ingredientes,
    certificacionDetalle: p.certificacionDetalle,
    inci: String(p.inci).replace('.', ','),
    imagen: p.imagenes[0],
    alt: p.nombre,
    whatsapp: enlaceWhatsapp(config, `${config.mensajeWhatsapp}${p.nombre} (${p.formato}).`),
    urlCategoria: `/productos?categoria=${p.categoria}`,
  });
  ficha.dataset.color = p.color;
  document.getElementById('barra-inci').style.setProperty('--inci', `${(p.inci / 20) * 100}%`);

  // Galería
  const miniaturas = document.getElementById('miniaturas');
  const principal = document.getElementById('imagen-principal');
  if (p.imagenes.length > 1) {
    p.imagenes.forEach((src, i) => {
      const b = clonar('plantilla-miniatura', { imagen: src, alt: `${p.nombre}, vista ${i + 1}` });
      b.setAttribute('aria-pressed', String(i === 0));
      b.addEventListener('click', () => {
        principal.src = src;
        miniaturas.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      });
      miniaturas.append(b);
    });
  }

  const lista = (idEl, plantilla, items) =>
    document.getElementById(idEl).replaceChildren(...items.map((texto) => clonar(plantilla, { texto })));
  lista('resumen', 'plantilla-punto', p.ingredientesResumen);
  lista('alertas', 'plantilla-alerta', p.alertas);
  lista('certificaciones', 'plantilla-chip', p.certificaciones);

  document.getElementById('sellos').replaceChildren(
    ...p.sellos.map((s) => clonar('plantilla-sello', { nombre: sellos[s].nombre, imagen: sellos[s].img, alt: sellos[s].nombre }))
  );

  // Relacionados: misma categoría primero
  const { productos } = await obtenerCatalogo();
  const relacionados = [
    ...productos.filter((x) => x.id !== p.id && x.categoria === p.categoria),
    ...productos.filter((x) => x.id !== p.id && x.categoria !== p.categoria),
  ].slice(0, 4);
  const cont = document.getElementById('relacionados');
  relacionados.forEach((x, i) => cont.append(tarjetaProducto(x, categorias, i)));
  observarReveal(document);
}
