# Sitio web Nuwa

Sitio estático (HTML + Tailwind) con funciones de servidor en Vercel.

## Estructura
```
index.html, productos.html, producto.html, disruptores.html,
nosotras.html, preguntas.html, contacto.html, animaciones.html, 404.html   ← una vista por archivo
assets/css/entrada.css    ← fuente de Tailwind
assets/css/estilos.css    ← CSS compilado (no editar a mano)
assets/img/{marca,sellos,recursos,fotos,productos}
data/productos.js         ← catálogo (desde la ficha de productos)
data/config.js            ← WhatsApp, horario, redes, despacho (completar PENDIENTE)
api/                      ← servidor (funciones de Vercel): productos, config, contacto
js/servicios/api.js       ← acceso a datos desde el navegador
js/logica/*.js            ← comportamiento de cada vista
scripts/servidor-local.js ← servidor de desarrollo
tailwind.config.cjs       ← colores y tipografías del manual de marca
```

## Desarrollo
```
npm install
npm run css:watch          # recompila Tailwind al guardar
node scripts/servidor-local.js   # http://localhost:3000
```
Las clases de Tailwind van dentro de las etiquetas HTML. Cuando el JS cambia un estado
solo agrega una clase (`is-revealed`, `is-scrolled`, `menu-abierto`) y los estilos
de ese estado están escritos en el HTML con las variantes `revealed:`, `scrolled:` y `menu-open:`.
