document.addEventListener("DOMContentLoaded", () => {
  // ---------------- UTILIDADES ----------------
  const PRODUCTS_KEY = "products";

  function getProducts() {
    return JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
  }

  function saveProducts(products) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }

  function generateId() {
    const products = getProducts();
    return products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
  }

  // ---------------- ELEMENTOS DEL DOM ----------------
  const productGrid = document.getElementById("product-grid");
  const productsList = document.getElementById("productsList"); // opcional
  const form = document.getElementById("productForm"); // opcional

  // ---------------- RENDER ----------------
  function renderProducts() {
    const products = getProducts();

    // Render grid
    if (productGrid) {
      productGrid.innerHTML = "";
      products.forEach(product => {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-4";
        col.innerHTML = `
          <div class="card h-100 shadow-sm">
            <img src="${product.img || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${product.name}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">$${product.price.toLocaleString()}</p>
              <div class="mt-auto d-flex gap-2">
                <button class="btn btn-success btn-sm flex-fill ver-mas">
                  <a href="verMas.html?id=${product.id}" class="text-white text-decoration-none d-block">Ver más</a>
                </button>
                <button class="btn btn-success btn-sm flex-fill comprar-btn">Comprar</button>
              </div>
            </div>
          </div>
        `;
        productGrid.appendChild(col);

        const comprarBtn = col.querySelector(".comprar-btn");
        comprarBtn.addEventListener("click", () => {
          if (window.addToCart) window.addToCart(product);
          else console.log("Añadido al carrito:", product);
        });
      });
    }

    // Render lista (opcional)
    if (productsList) {
      productsList.innerHTML = "";
      products.forEach(p => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `ID: ${p.id} | ${p.name} | Tipo: ${p.tipo} - $${p.price.toLocaleString()}`;
        productsList.appendChild(li);
      });
    }
  }

  // ---------------- FORMULARIO DE CREACION ----------------
  if (form) {
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
      form.reset();

      renderProducts();
    });
  }

  // ---------------- CARGA INICIAL ----------------
  renderProducts();
});
