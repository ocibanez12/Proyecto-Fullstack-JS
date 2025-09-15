// obtener usuarios de localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// guardar usuarios en localStorage
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// renderizar tabla de usuarios
function renderUsers() {
    const users = getUsers();
    const tbody = document.querySelector("#usersTable tbody");
    tbody.innerHTML = "";

    users.forEach((user, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><input type="email" value="${user.email}" class="form-control email-input"></td>
            <td>
                <select class="form-select role-select">
                    <option value="user" ${user.role === "user" ? "selected" : ""}>User</option>
                    <option value="admin" ${user.role === "admin" ? "selected" : ""}>Admin</option>
                </select>
            </td>
            <td class="d-flex gap-2">
                <button class="btn btn-primary btn-sm save-btn">Guardar</button>
                <button class="btn btn-danger btn-sm delete-btn">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);

        // guardar cambios
        tr.querySelector(".save-btn").addEventListener("click", () => {
            const updatedEmail = tr.querySelector(".email-input").value.trim();
            const updatedRole = tr.querySelector(".role-select").value;

            if (!updatedEmail) {
                alert("El email no puede estar vacío");
                return;
            }

            users[index].email = updatedEmail;
            users[index].role = updatedRole;
            saveUsers(users);
            alert("Usuario actualizado");
            renderUsers();
        });

        // eliminar usuario
        tr.querySelector(".delete-btn").addEventListener("click", () => {
            if (confirm(`¿Eliminar usuario ${user.email}?`)) {
                users.splice(index, 1);
                saveUsers(users);
                renderUsers();
            }
        });
    });
}

// crear nuevo usuario desde formulario
const userForm = document.getElementById("userForm");
userForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (!email || !password) {
        alert("Completa todos los campos");
        return;
    }

    const users = getUsers();
    if (users.some(u => u.email === email)) {
        alert("Este email ya está registrado");
        return;
    }

    users.push({ email, password, role });
    saveUsers(users);

    alert("Usuario creado exitosamente");
    userForm.reset();
    renderUsers();
});

renderUsers();
