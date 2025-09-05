'use strict';

// Carrito 

// Notificación
function showNotification(mensaje, tipo = 'success') {
    const existing = document.querySelector(`.notificacion.${tipo}[data-msg="${mensaje}"]`);
    if (existing) return;

    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.setAttribute("data-msg", mensaje);
    notificacion.innerHTML = `
        <span>${mensaje}</span>
        <button aria-label="Cerrar">&times;</button>
    `;
    document.body.appendChild(notificacion);

  
    notificacion.querySelector('button').addEventListener('click', () => {
        if (document.body.contains(notificacion)) {
            document.body.removeChild(notificacion);
        }
    });


    setTimeout(() => {
        if (document.body.contains(notificacion)) {
            document.body.removeChild(notificacion);
        }
    }, 7000);
}

// Filtrado de productos por categoría
document.addEventListener("DOMContentLoaded", () => filtrarPorCategoria("Todos"));

function filtrarPorCategoria(categoria) {
    const productos = document.querySelectorAll(".container-productos");
    productos.forEach(prod => {
        const cat = prod.getAttribute("data-category");
        prod.style.display = (categoria === "Todos" || cat === categoria) ? "block" : "none";
    });
}

document.querySelectorAll(".cat-link").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        filtrarPorCategoria(e.target.getAttribute("data-category"));
    });
});

// Agregar producto al carrito
function addToCart(name, price, img) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let item = cart.find(p => p.name === name);
    if (item) {
        item.cantidad += 1;
    } else {
        cart.push({ name, price, img, cantidad: 1 });
    }

    showNotification(`Producto ${name} agregado al carrito`, "success");
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Eliminar producto del carrito
function removeFromCart(name) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let itemIndex = cart.findIndex(p => p.name === name);

    if (itemIndex > -1) {
        if (cart[itemIndex].cantidad > 1) {
            cart[itemIndex].cantidad -= 1; 
        } else {
            cart.splice(itemIndex, 1); 
        }
    }
    showNotification("Producto eliminado", "danger"); 
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Vaciar carrito completo
function clearCart() {
    showNotification("Carrito vaciado", "warning");   
    localStorage.removeItem("cart");
    renderCart();
}

// Renderizar carrito en el offcanvas
function renderCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let list = document.getElementById("cart");
    let total = 0;
    let totalItems = 0;
    list.innerHTML = "";

    cart.forEach((item) => {
        let subtotal = item.price * item.cantidad;
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${item.img}" alt="${item.name}" style="height:40px; width:40px; object-fit:cover; border-radius:5px; margin-right:8px;">
                ${item.name} x${item.cantidad}
            </div>
            <div>
                <span class="text-success me-2">$${subtotal}</span>
                <button class="btn btn-sm boton-eliminar" onclick="removeFromCart('${item.name}')">X</button>
            </div>
        `;

        list.appendChild(li);
        total += subtotal;
        totalItems += item.cantidad;
    });

    document.getElementById("total").textContent = total;
    document.getElementById("cartCount").textContent = totalItems; 
    document.getElementById("ItemCount").textContent = totalItems; 
}

// Inicializar carrito al cargar
renderCart();
