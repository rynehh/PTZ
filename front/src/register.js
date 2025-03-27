document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameInput = document.getElementById('name');
    const errorMessage = document.getElementById('error-message');

    // Expresión regular para validar la contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    registerForm.addEventListener('submit', async(event) => {
        event.preventDefault(); // Evita que el formulario se envíe inmediatamente

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        console.log (name,email,password);
        alert("ola");

        // Validar si algún campo está vacío
        if (name === '' || email === '' || password === '' ) {
           
            errorMessage.textContent = 'Por favor, completa todos los campos.';
            errorMessage.style.display = 'block';
        }
        // Validar si la contraseña cumple con los requisitos
        else if (!passwordRegex.test(password)) {
            errorMessage.textContent = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.';
            errorMessage.style.display = 'block';
        } 
        
    });

    // Establecer la fecha máxima en el campo de fecha (para evitar seleccionar fechas futuras)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('fecha-nacimiento').setAttribute('max', today);

    
});
