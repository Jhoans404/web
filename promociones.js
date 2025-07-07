/* =========================================================
   utilidades de carrito (localStorage + badge + toast)
========================================================= */
const CART_KEY = 'cinesario_cart';

/* cargar / guardar */
function loadCart () {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}
function saveCart (cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* numerito del carrito en el nav */
function updateCartBadge () {
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = loadCart().length;
}

/* toast – mensaje flotante */
function toast (msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style, {
    position: 'fixed', bottom: '24px', left: '50%',
    transform: 'translateX(-50%)',
    background: '#00e6b8', color: '#000',
    padding: '10px 18px', borderRadius: '6px',
    fontWeight: 'bold', zIndex: 3000,
  });
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

/* =========================================================
   overlay “Oferta del Día”
========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const overlay  = document.getElementById('promo-overlay');
  const closeBtn = overlay.querySelector('.close-overlay');

  /* abrir overlay desde cualquier link a promociones.html */
  document.querySelectorAll('a[href$="promociones.html"]')
          .forEach(link => link.addEventListener('click', e => {
            e.preventDefault();
            overlay.style.display = 'flex';
          }));

  /* cerrar con click en fondo oscuro o X */
  overlay.addEventListener('click', e => {
    const clickedBackdrop = e.target === overlay;
    const clickedClose    = e.target === closeBtn;
    if (clickedBackdrop || clickedClose) overlay.style.display = 'none';
  });

  /* cerrar con Esc */
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') overlay.style.display = 'none';
  });

  /* al cargar, refresca badge por si acaso */
  updateCartBadge();
});

/* =========================================================
   botones “Agregar” en la grilla de .promo-card
========================================================= */
document.querySelectorAll('.promo-card .boton-comprar')
        .forEach(btn => {
  btn.addEventListener('click', () => {
    const card  = btn.closest('.promo-card');
    const promo = {
      titulo : card.querySelector('h3').textContent.trim(),
      precio : card.querySelector('.precio')?.textContent.trim() || '',
      img    : card.querySelector('img')?.src || ''
    };
    const cart = loadCart(); cart.push(promo); saveCart(cart);
    toast('Promo añadida al carrito');
    updateCartBadge();
  });
});

/* botones “Copiar Código” (dentro de promo-card) */
document.querySelectorAll('.promo-card button')
        .forEach(btn => {
  if (btn.textContent.includes('Copiar')) {
    btn.addEventListener('click', () => {
      const codigo = 'CINEMANIA';
      navigator.clipboard.writeText(codigo)
        .then(() => {
          btn.textContent = '¡Copiado!';
          toast('Código aplicado: ' + codigo);
          setTimeout(() => btn.textContent = 'Copiar Código', 2500);
        })
        .catch(() => toast('No se pudo copiar 😢'));
    });
  }
});

/* =========================================================
   botón del overlay (pantalla completa) – ya existía
========================================================= */
const overlayBtn = document.querySelector('#promo-overlay .boton-comprar');
if (overlayBtn) {
  overlayBtn.addEventListener('click', () => {
    const promo = {
      titulo : 'Combo VIP Golden',
      precio : 'S/ 45.00',
      img    : document.querySelector('#promo-overlay img')?.src
    };
    const cart = loadCart(); cart.push(promo); saveCart(cart);
    document.getElementById('promo-overlay').style.display = 'none';
    toast('Combo VIP añadido al carrito');
    updateCartBadge();
  });
}

/* =========================================================
   botón “¡Aprovechar Ahora!” de la sección fija #promo-vip
========================================================= */
const btnVip = document.getElementById('btnVip');
if (btnVip) {
  btnVip.addEventListener('click', () => {
    const promo = {
      titulo : 'Combo VIP Golden',
      precio : 'S/ 45.00',
      img    : document.querySelector('#promo-vip img')?.src || ''
    };
    const cart = loadCart(); cart.push(promo); saveCart(cart);
    updateCartBadge();
    toast('Combo VIP añadido al carrito');
  });
}
