document.addEventListener('DOMContentLoaded', () => {
  // Elementos del DOM para el modal de precio
  const modal = document.getElementById('modalPrecio');
  const btnOpen = document.getElementById('btnCalcularPrecio');
  const btnClose = document.querySelector('.close');
  const btnCalcular = document.getElementById('calcular');
  const resultado = document.getElementById('resultado');
  
  // Elementos del DOM para el modal de ticket
  const btnComprar = document.getElementById('btnComprar');
  const modalTicket = document.getElementById('modalTicket');
  const btnCloseTicket = document.querySelector('.close-ticket');
  const btnImprimir = document.getElementById('btnImprimir');

  // 1) Abrir modal de precio
  btnOpen.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  // 2) Cerrar modal de precio
  btnClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // 3) Cerrar modal de precio al hacer clic fuera
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
    if (event.target === modalTicket) {
      modalTicket.style.display = 'none';
    }
  });

  // 4) Calcular precio
  btnCalcular.addEventListener('click', () => {
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    const descuento = document.querySelector('input[name="descuento"]').checked;
    const promocion = document.querySelector('input[name="promocion"]').checked;
    const combo = document.querySelector('input[name="combo"]').checked;

    // Precio base
    let precioCalc = tipo === '3D' ? 25 : 20;
    if (descuento) precioCalc *= 0.85;   // -15%
    if (promocion) precioCalc *= 0.90;   // -10%
    if (combo) precioCalc += 10;         // +S/10

    resultado.innerHTML = `
      Precio final: <span style="font-size: 1.2em;">S/${precioCalc.toFixed(2)}</span>
      <br><small>Desglose: ${tipo} (S/${tipo === '3D' ? '25' : '20'}) 
      ${descuento ? '| -15%' : ''} 
      ${promocion ? '| -10%' : ''} 
      ${combo ? '| +S/10' : ''}</small>
    `;
  });

  // 5) Confirmar compra y generar ticket
  btnComprar.addEventListener('click', () => {
    // Título desde la sección de película activa
    const titulo = document.getElementById('titulo-pelicula').textContent;
    // Texto del precio ya renderizado
    const precioText = resultado.textContent.trim();
    // Fecha y hora actuales
    const fecha = new Date().toLocaleString();
    // Asiento aleatorio 1–100
    const asiento = Math.floor(Math.random() * 100) + 1;
    // Mostrar ticket
    generarTicket({ titulo, precio: precioText, fecha, asiento });
  });

  btnConfirmar.addEventListener('click', () => {
    // cierra modal de precio
    modal.style.display = 'none';
    // muestra el botón de imprimir
    document.getElementById('btnImprimirBoleto').style.display = 'inline-block';
    // oculta el de confirmar
    btnConfirmar.style.display = 'none';
  });

  document
    .getElementById('btnImprimirBoleto')
    .addEventListener('click', () => {
      window.print();
    });


  // 6) Función que rellena y muestra el modal del ticket
  function generarTicket({ titulo, precio, fecha, asiento }) {
    document.getElementById('ticket-titulo').textContent = titulo;
    document.getElementById('ticket-precio').textContent = precio;
    document.getElementById('ticket-fecha').textContent = fecha;
    document.getElementById('ticket-asiento').textContent = asiento;
    modalTicket.style.display = 'block';
  }

  // 7) Cerrar modal de ticket
  btnCloseTicket.addEventListener('click', () => {
    modalTicket.style.display = 'none';
  });

  // 8) Imprimir boleto
  btnImprimir.addEventListener('click', () => {
    window.print();
  });
});