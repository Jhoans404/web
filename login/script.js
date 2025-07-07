 document.addEventListener('DOMContentLoaded', function() {
            const signUpButton = document.getElementById('signUp');
            const signInButton = document.getElementById('signIn');
            const signUpOverlay = document.getElementById('signUpOverlay');
            const signInOverlay = document.getElementById('signInOverlay');
            const container = document.getElementById('container');

            setTimeout(() => {
                container.classList.add('container-active');
            }, 300);

            if (signUpButton) {
                signUpButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    container.classList.add("right-panel-active");
                });
            }
            if (signInButton) {
                signInButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    container.classList.remove("right-panel-active");
                });
            }
            if (signUpOverlay) {
                signUpOverlay.addEventListener('click', (e) => {
                    e.preventDefault();
                    container.classList.add("right-panel-active");
                });
            }
            if (signInOverlay) {
                signInOverlay.addEventListener('click', (e) => {
                    e.preventDefault();
                    container.classList.remove("right-panel-active");
                });
            }

            // Efecto de foco en inputs
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.parentElement.style.transform = 'translateY(-3px)';
                });
                input.addEventListener('blur', () => {
                    input.parentElement.style.transform = 'translateY(0)';
                });
            });
        });