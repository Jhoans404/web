  async function registrar() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    await fetch('https://mi-backend-7t0k.onrender.com/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password }),
    });
    alert('Usuario registrado correctamente');
      document.getElementById('nombre').value = '';
      document.getElementById('email').value = '';
      document.getElementById('password').value = ''; 
  }

  async function iniciarSesion() {
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;

    const response = await fetch('https://mi-backend-7t0k.onrender.com/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    alert(data.mensaje);
  }