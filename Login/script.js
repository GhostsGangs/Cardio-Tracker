const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

document.querySelector(".sign-up form").addEventListener("submit", async(e) => {
    e.preventDefault();
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const message = await response.text();
        alert(message);

        if (response.ok) {
            // Redirige al usuario a la página principal después de registrarse
            window.location.href = 'index.html'; // Aquí pones la ruta de la página principal
        }

    } catch (err) {
        alert("Error al registrar: " + err.message);
    }
});

document.querySelector(".sign-in form").addEventListener("submit", async(e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const message = await response.text();
        alert(message);
    } catch (err) {
        alert("Error al iniciar sesión: " + err.message);
    }
});