// Lista de usuarios estáticos (predefinidos)
const staticUsers = [
  { email: "user@gmail.com", password: "user123", role: "user" },
  { email: "admin@gmail.com", password: "admin123", role: "admin" }
];

const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Regex para validar email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Regex para validar contraseña: mínimo 6 caracteres, al menos una letra y un número
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!regexEmail.test(email)) {
      alert("Email inválido");
      return;
    }

    if (!regexPassword.test(password)) {
      alert("La contraseña debe tener al menos 6 caracteres e incluir letras y números");
      return;
    }

    // leer usuarios registrados en localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // unir usuarios estáticos y los del localStorage con spread
    const allUsers = [...staticUsers, ...storedUsers];

    // Buscar usuario en el array combinado
    const user = allUsers.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('userRole', user.role); // guarda rol user ya que no se puede crear admin desde este front
      localStorage.setItem('userEmail', user.email);
      alert('Inicio de sesión exitoso');
      window.location.href = '/index.html';
    } else {
      alert('Email o contraseña incorrectos');
    }
  });
}
