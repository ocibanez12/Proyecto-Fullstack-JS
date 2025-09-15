const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));
const detailContainer = document.getElementById("product-detail");

// Traer productos desde JSON
fetch("/assets/utils/data/products.json")
  .then(res => res.json())
  .then((products) => {
    const product = products.find((p) => p.id === productId);

    if (product) {
      // console log dejado a proposito para verificar en prueba que sea el producto correcto
      console.log("Detalles del producto:", product);
      detailContainer.innerHTML = `
        <div class="row">
          <div class="col-md-6">
            <img src="${product.img}" class="img-fluid" alt="${product.name}">
          </div>
          <div class="col-md-6">
            <h2>${product.name}</h2>
            <p><strong>Precio:</strong> $${product.price.toLocaleString()}</p>
            <p><strong>Tipo:</strong> ${product.tipo}</p>
            <p>${product.description}</p>
            <button id="comprar-btn" class="btn btn-success btn-lg">Comprar</button>
          </div>
        </div>
      `;

      // Usar la función global definida en productos.js
      document.getElementById("comprar-btn").addEventListener("click", () => {
        window.addToCart(product);
      });
    } else {
      detailContainer.innerHTML = `<p>Producto no encontrado.</p>`;
    }
  })
  .catch((err) => console.error("Error cargando productos:", err));
