// Vista de ejemplos de animación: botón para repetir cada demo.
document.querySelectorAll('[data-repetir]').forEach((boton) => {
  boton.addEventListener('click', () => {
    const demo = document.getElementById(boton.dataset.repetir);
    demo.querySelectorAll('[data-reveal]').forEach((el) => el.classList.remove('is-revealed'));
    demo.querySelectorAll('[data-reinicia]').forEach((el) => {
      el.style.animation = 'none';
      void el.offsetWidth; // fuerza reflujo para reiniciar la animación
      el.style.animation = '';
    });
    requestAnimationFrame(() => setTimeout(() => demo.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-revealed')), 60));
  });
});
