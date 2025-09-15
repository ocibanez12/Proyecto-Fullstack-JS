// productos desde local
function getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

// guardar productos en local
function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

// render lista de productos existentes
function renderProducts() {
    const products = getProducts();
    const list = document.getElementById("productsList");
    list.innerHTML = "";

    products.forEach(p => {
        const li = document.createElement("li");
        li.textContent = `ID: ${p.id} | ${p.name} | Tipo: ${p.tipo} - $${p.price.toLocaleString()}`;
        list.appendChild(li);
    });
}

// ID único
function generateId() {
    const products = getProducts();
    if (products.length === 0) return 1;
    const maxId = Math.max(...products.map(p => p.id));
    return maxId + 1;
}

// envío del formulario
const form = document.getElementById("productForm");
form.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const tipo = document.getElementById("tipo").value.trim();
    const img = document.getElementById("img").value.trim();
    const description = document.getElementById("description").value.trim();

    if (!name || isNaN(price) || !tipo || !img || !description) {
        alert("Completa todos los campos correctamente");
        return;
    }

    const products = getProducts();
    const newProduct = {
        id: generateId(),
        name,
        price,
        tipo,
        img,
        description
    };

    products.push(newProduct);
    saveProducts(products);

    alert(`Producto "${name}" creado con ID ${newProduct.id}`);
    form.reset();
    renderProducts();
});

renderProducts();
