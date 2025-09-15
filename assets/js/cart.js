const cartContainer = document.getElementById("cart-container");
const checkoutBtn = document.getElementById("checkout-btn");
const totalPriceEl = document.getElementById("total-price");

function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("Carrito actual:", cart);
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Tu carrito está vacío</p>";
    totalPriceEl.textContent = "";
    checkoutBtn.style.display = "none";
    return;
  }

  checkoutBtn.style.display = "inline-block";

  let total = 0;

  //calculo del total y renderizado de productos
  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const row = document.createElement("div");
    row.className = "d-flex align-items-center mb-3 border p-2";
    row.innerHTML = `
      <div class="me-3">
        <img src="${item.img}" width="60" alt="${item.name}">
      </div>
      <div class="flex-grow-1">
        <h6>${item.name}</h6>
        <p>$${item.price.toLocaleString()} x <span id="qty-${item.id}">${item.quantity}</span> = $${(total).toLocaleString()}</p>
      </div>
      <div class="d-flex gap-1">
        <button class="btn btn-sm btn-success" id="increase-${item.id}">+</button>
        <button class="btn btn-sm btn-danger" id="decrease-${item.id}">-</button>
      </div>
    `;
    cartContainer.appendChild(row);
    //aumentar cantidad de prod en carro
    document.getElementById(`increase-${item.id}`).addEventListener("click", () => {
      item.quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
    //disminuir cantidad de prod en carro
    document.getElementById(`decrease-${item.id}`).addEventListener("click", () => {
      item.quantity--;
      if (item.quantity <= 0) cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });

  totalPriceEl.textContent = `Total: $${total.toLocaleString()}`;

  checkoutBtn.onclick = () => {
    window.location.href = "/assets/pages/checkout.html";
  };
}

// Llamar renderCart al cargar la página
renderCart();
