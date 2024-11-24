function recoverPassword() {
    const emailField = document.getElementById("email");
    const message = document.getElementById("message");
    const email = emailField.value;

    // Simulación de validación de email y "envío de recuperación de contraseña"
    if (validateEmail(email)) {
        message.textContent = `Se ha enviado un enlace de recuperación a ${email}.`;
        message.style.color = "green";
        emailField.value = ""; // Limpiar el campo
    } else {
        message.textContent = "Por favor, ingresa un correo electrónico válido.";
        message.style.color = "red";
    }
}

// Función para validar el formato de email
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
    return emailPattern.test(email);
}