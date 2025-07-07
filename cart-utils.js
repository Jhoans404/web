/* clave única del carrito en localStorage */
const CART_KEY = 'cinesario_cart';

/* ---------------- utilidades base ---------------- */
function loadCart () {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}
function saveCart (cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* ---------- pinta el badge cada vez que se invoque ---------- */
function updateCartBadge () {
  const badge = document.getElementById('cart-count');
  if (!badge) return;                       // la página no tiene carrito
  const n = loadCart().length;
  badge.textContent = n;
  badge.style.display = n ? 'inline-block' : 'none';
}

/* --------- sincroniza entre páginas / pestañas -------------- */
window.addEventListener('storage', e => {
  if (e.key === CART_KEY) updateCartBadge();  // otra pestaña cambió el carrito
});
