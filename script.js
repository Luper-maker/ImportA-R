
//GALERIA DE IMAGENES HERO//
const heroImages = document.querySelectorAll(".hero-img");
let currentHero = 0;

setInterval(() => {
    heroImages[currentHero].classList.remove("active");
    currentHero = (currentHero + 1) % heroImages.length;
    heroImages[currentHero].classList.add("active");
}, 2000); // cambia cada 3 segundos

//FUNCION MODAL, CARRITO Y CATALOGO //
let carrito = [];

function abrirModal() {
    document.getElementById("modalRelojes").style.display = "block";
}

function cerrarModal() {
    document.getElementById("modalRelojes").style.display = "none";
}

// ✅ AHORA GUARDA IMAGEN
function agregarAlCarrito(nombre, precio, imagen) {
    const productoExistente = carrito.find(p => p.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, imagen, cantidad: 1 });
    }

    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById("listaCarrito");
    const totalSpan = document.getElementById("total");
    const contador = document.getElementById("contadorCarrito");

    lista.innerHTML = "";
    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach((producto, index) => {
        total += producto.precio * producto.cantidad;
        cantidadTotal += producto.cantidad;

        lista.innerHTML += `
            <div class="carrito-item">
                <img src="${producto.imagen}" class="carrito-img">
                <div class="carrito-info">
                    <strong>${producto.nombre}</strong>
                    <p>$${producto.precio} x ${producto.cantidad}</p>
                    <div class="carrito-botones">
                        <button onclick="restarProducto(${index})">-</button>
                        <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio}, '${producto.imagen}')">+</button>
                        <button onclick="eliminarProducto(${index})">🗑</button>
                    </div>
                </div>
            </div>
        `;
    });

    totalSpan.textContent = total;
    contador.textContent = cantidadTotal;
}

function restarProducto(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
    } else {
        carrito.splice(index, 1);
    }
    actualizarCarrito();
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function abrirCarrito() {
    document.getElementById("carritoLateral").classList.add("abierto");
    document.getElementById("overlay").classList.add("activo");
}

function cerrarCarrito() {
    document.getElementById("carritoLateral").classList.remove("abierto");
    document.getElementById("overlay").classList.remove("activo");
}

function enviarWhatsApp() {
    let mensaje = "Buen día! adjunto mi carrito para la compra:%0A";

    carrito.forEach(p => {
        mensaje += `${p.nombre} x${p.cantidad} - $${p.precio * p.cantidad}%0A`;
    });

    mensaje += `Total: $${document.getElementById("total").textContent}`;

    window.open(`https://wa.me/5491149400068?text=${mensaje}`);
}





