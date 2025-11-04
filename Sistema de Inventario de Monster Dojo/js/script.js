document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('navbarToggle');
  const collapse = document.getElementById('navbarSupportedContent');

  if (toggle && collapse) {
    toggle.addEventListener('click', function () {
      const isHidden = collapse.hasAttribute('hidden');
      if (isHidden) {
        collapse.removeAttribute('hidden');
        toggle.setAttribute('aria-expanded', 'true');
      } else {
        collapse.setAttribute('hidden', '');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Función para manejar dropdowns
  function setupDropdowns() {
    document.querySelectorAll('.dropdown-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // No cerrar al hacer click en otro menu
        const submenu = btn.nextElementSibling; // el <ul> debajo del botón
        if (!submenu) return;
        // Alternar visible
        submenu.style.display = (submenu.style.display === 'block') ? 'none' : 'block';
      });
    });

    // Cerrar todos los submenus al hacer click fuera
    document.addEventListener('click', () => {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.display = 'none';
      });
    });
  }

  setupDropdowns();

  // Marcar nav-link activo
  const path = window.location.pathname.split('/').pop();
  if (path) {
    document.querySelectorAll('.nav-link').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href === path) a.classList.add('active');
    });
  }
});

// Carrusel basico
const items = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

function showItem(index) {
  items.forEach((item, i) => item.classList.toggle('active', i === index));
}

document.querySelector('.carousel-control.prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  showItem(currentIndex);
});

document.querySelector('.carousel-control.next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % items.length;
  showItem(currentIndex);
});
