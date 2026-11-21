// Inicio: muestra productos destacados.
import { obtenerCatalogo } from '../servicios/api.js';
import { tarjetaProducto } from './tarjetas.js';
import { observarReveal } from './ui.js';

const DESTACADOS = ['skin-food-weleda', 'protector-solar-badger-sport', 'desodorante-toms-clean-coast', 'gel-dental-ninos-weleda'];
const contenedor = document.getElementById('destacados');

const { productos, categorias } = await obtenerCatalogo();
DESTACADOS.map((id) => productos.find((p) => p.id === id))
  .filter(Boolean)
  .forEach((p, i) => contenedor.append(tarjetaProducto(p, categorias, i)));
observarReveal(contenedor);
