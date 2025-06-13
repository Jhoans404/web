const btnLogin = document.getElementById("btn-login");
const btnRegister = document.getElementById("btn-register");
const formWrapper = document.getElementById("form-wrapper");
const slider = document.getElementById("slider");
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

// Cambiar a login
btnLogin.addEventListener("click", () => {
  formWrapper.style.transform = "translateX(0%)";
  slider.style.transform = "translateX(0%)";
});

// Cambiar a registro
btnRegister.addEventListener("click", () => {
  formWrapper.style.transform = "translateX(-50%)";
  slider.style.transform = "translateX(100%)";
});

// Registro simulado y redirección
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("¡Registro exitoso!");
  window.location.href = "../index.html"; // Redirección a la página principal
});

// Inicio de sesión simulado
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  // Simulación de verificación simple
  if (email === "demo@cine.com" && password === "1234") {
    alert("Inicio de sesión exitoso");
    window.location.href = "../index.html"; // Redirección si es correcto
  } else {
    alert("Correo o contraseña incorrectos");
  }
});
