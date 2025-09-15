const profileContainer = document.getElementById("profile-container");
const logoutBtn = document.getElementById("logout-btn");

// Obtener datos del usuario logueado
const userEmail = localStorage.getItem("userEmail");
const userRole = localStorage.getItem("userRole");

// Traer todos los usuarios (estáticos + registrados)
const staticUsers = [
    { email: "user@gmail.com", password: "user123", role: "user" },
    { email: "admin@gmail.com", password: "admin123", role: "admin" }
];

const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
const allUsers = [...staticUsers, ...storedUsers];

// Buscar el usuario que inició sesión
const currentUser = allUsers.find(u => u.email === userEmail);

if (!currentUser) {
    window.location.href = "/assets/pages/login.html"; // Si no hay usuario, redirigir
} else {
    profileContainer.innerHTML = `
        <p><strong>Email:</strong> ${currentUser.email}</p>
        <p><strong>Rol:</strong> ${currentUser.role}</p>
    `;
}

// Cerrar sesión
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    window.location.href = "/assets/pages/login.html";
});
