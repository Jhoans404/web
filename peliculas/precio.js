/* ---------- precio.js (versión única) ---------- */
document.addEventListener('DOMContentLoaded', () => {

  /* ====== ELEMENTOS ====== */
  const modalP      = document.getElementById('modalPrecio');          // calculadora
  const btnOpen     = document.getElementById('btnCalcularPrecio');
  const btnCloseP   = modalP.querySelector('.close');

  const btnCalcular = document.getElementById('calcular');
  const resultado   = document.getElementById('resultado');
  const btnConfirm  = document.getElementById('confirmarCompra');

  const modalT      = document.getElementById('modalTicket');          // ticket
  const btnCloseT   = modalT.querySelector('.close-ticket');
  const btnPrint    = modalT.querySelector('#btnImprimirBoleto');

  /* ====== ABRIR / CERRAR CALCULADORA ====== */
  btnOpen .addEventListener('click', () => modalP.style.display = 'block');
  btnCloseP.addEventListener('click', () => modalP.style.display = 'none');

  window.addEventListener('click', e => {
    if (e.target === modalP) modalP.style.display = 'none';
    if (e.target === modalT) modalT.style.display = 'none';
  });

  /* ====== CALCULAR PRECIO ====== */
  btnCalcular.addEventListener('click', () => {
    const tipo      = document.querySelector('input[name="tipo"]:checked').value;
    const desc      = document.querySelector('input[name="descuento"]').checked;
    const promo     = document.querySelector('input[name="promocion"]').checked;
    const combo     = document.querySelector('input[name="combo"]').checked;

    let precio = (tipo === '3D') ? 25 : 20;
    if (desc)  precio *= 0.85;
    if (promo) precio *= 0.90;
    if (combo) precio += 10;

    resultado.innerHTML = `
      Precio final: <span style="font-size:1.2em;">S/${precio.toFixed(2)}</span>
      <br><small>
        Desglose: ${tipo} (${tipo==='3D' ? 'S/25' : 'S/20'})
        ${desc ? ' | -15%' : ''}${promo ? ' | -10%' : ''}${combo ? ' | +S/10' : ''}
      </small>`;

    btnConfirm.style.display = 'inline-block';
  });

  /* ====== CONFIRMAR COMPRA ====== */
  btnConfirm.addEventListener('click', () => {
    modalP.style.display = 'none';

    /* rellena ticket */
    const tituloFicha = document.querySelector('h1');  // tu <h1> de la ficha
    document.getElementById('ticket-titulo').textContent  =
        tituloFicha ? tituloFicha.textContent : 'Película';
    document.getElementById('ticket-precio').textContent  = resultado.textContent.trim();
    document.getElementById('ticket-fecha').textContent   = new Date().toLocaleString();
    document.getElementById('ticket-asiento').textContent =
        Math.floor(Math.random() * 100) + 1;

    modalT.style.display = 'block';
    btnConfirm.style.display = 'none';                  // oculta Confirmar Compra
  });

  /* ====== IMPRIMIR BOLETO ====== */
  btnPrint.addEventListener('click', () => window.print());

  /* ====== CERRAR TICKET ====== */
  btnCloseT.addEventListener('click', () => modalT.style.display = 'none');
});
/* ---------- fin de precio.js ---------- */
