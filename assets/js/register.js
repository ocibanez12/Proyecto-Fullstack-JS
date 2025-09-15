const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", e => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Validaciones regex
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

        if (!regexEmail.test(email)) {
            alert("Por favor, introduce un email válido.");
            return;
        }

        if (!regexPassword.test(password)) {
            alert("La contraseña debe tener al menos 6 caracteres, incluir letras y números.");
            return;
        }

        // usuarios existentes de localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Verificar que no exista un usuario con el mismo email
        if (users.some(user => user.email === email)) {
            alert("Este correo ya está registrado. Intenta iniciar sesión.");
            return;
        }

        // Crear el nuevo usuario con rol "user"
        const newUser = { email, password, role: "user" };
        users.push(newUser);

        // Guardar en localStorage
        localStorage.setItem("users", JSON.stringify(users));

        alert("Usuario registrado con éxito.");
        window.location.href = "/assets/pages/login.html";
    });
}
