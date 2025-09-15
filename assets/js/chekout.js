document.getElementById('checkout-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Compra realizada con éxito. (Simulado)');
    localStorage.removeItem("cart"); // Vaciar carrito
    window.location.href = "/index.html";
});