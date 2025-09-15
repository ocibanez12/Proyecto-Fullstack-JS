//selecciona el navbar-var
const navbarContain = document.getElementById("navbar-var");
//lee el usuario del role
let currentRol = localStorage.getItem('userRole') || 'guest';

//cfg logout
const setupLogout = () => {
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("userRole"); // elimina el rol
            alert("Cerrando sesión")
            window.location.href = "/index.html"; // redirige como invitado
        });
    }
};

//carga los navbar.
const loadNav = () => {
    const navMaps = {
        guest: '/assets/utils/navbar/navbarguest.html',
        admin: '/assets/utils/navbar/navbaradmin.html',
        user: '/assets/utils/navbar/navbarlogged.html'
    }

    const navPath = navMaps[currentRol] || navMaps['guest'];

    fetch(navPath)
        .then(response => {
            if (!response.ok) throw new Error('Error cargando navbar');
            return response.text();
        })
        .then(html => {
            navbarContain.innerHTML = html;
            setupLogout(); // activa logout si existe el botón
        })
        .catch(err => {
            console.error("Error al cargar el navbar:", err);
            navbarContain.innerHTML = `<p>Error al cargar navbar</p>`;
        });
};

loadNav();