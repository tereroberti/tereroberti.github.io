'use strict';

const form = document.getElementById('formCompra');

form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        showNotification("No hay productos en el carrito para finalizar la compra", "danger");
        return; 
    }

    if (form.checkValidity()) {
        clearCart(); 
        window.location.href = 'compra-finalizada.html'; 
    } else {
        form.reportValidity();
    }
});

function renderPedido() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let pedido = document.getElementById("pedido");
    if (!pedido) return;

    pedido.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        let subtotal = item.price * item.cantidad;
        total += subtotal;

        let div = document.createElement("div");
        div.className = "row align-items-center mb-2";
        div.innerHTML = `
            <div class="col-3 col-md-2 col-lg-3">
                <img src="${item.img}" class="img-fluid rounded" alt="${item.name}" style="max-height:50px;">
            </div>
            <div class="col-5 col-md-6 col-lg-5">
                <h6 class="mb-0">${item.name}</h6>
                <small>Cantidad: ${item.cantidad}</small>
            </div>
            <div class="col-4 col-md-2 col-lg-2">
                <small>$${item.price.toLocaleString()} c/u</small>
            </div>
            <div class="col-12 col-md-2 col-lg-2 text-end">
                <small class="fw-bold">$${subtotal.toLocaleString()}</small>
            </div>
        `;
        pedido.appendChild(div);
        pedido.appendChild(document.createElement("hr"));
    });

    let totalDiv = document.createElement("div");
    totalDiv.className = "row justify-content-end";
    totalDiv.innerHTML = `
        <div class="col-12 col-md-4 text-end">
            <h6>Total: $${total.toLocaleString()}</h6>
            <span class="badge bg-rojo">Pago pendiente</span>
        </div>
    `;
    pedido.appendChild(totalDiv);
}

document.addEventListener("DOMContentLoaded", () => {
    renderPedido();
});
