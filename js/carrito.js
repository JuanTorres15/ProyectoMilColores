let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const carrito_vacio = document.querySelector("#carrito_vacio");
const carrito_productos = document.querySelector("#carrito_productos");
const carrito_acciones = document.querySelector("#carrito_acciones");
const carrito_lleno = document.querySelector("#carrito_lleno");
let botonesEliminar = document.querySelectorAll(".carrito_producto_eliminar");
const botonVaciar = document.querySelector("#carrito_acciones_vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito_acciones_comprar");

function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {


        carrito_vacio.classList.add("disabled");
        carrito_productos.classList.remove("disabled");
        carrito_acciones.classList.remove("disabled");
        carrito_lleno.classList.add("disabled");
    
        carrito_productos.innerHTML = "";
    
        productosEnCarrito.forEach (producto => {
            const div = document.createElement("div");
            div.classList.add("carrito_producto");
            div.innerHTML = `
                <img class="carrito_producto_imagen"  src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito_producto_titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito_producto_cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito_producto_precio">
                    <small>Precio</small>
                    <p>${producto.precio}</p>
                </div>
                <div class="carrito_producto_subtotal">
                    <small>Subtotal</small>
                    <p>${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito_producto_eliminar" id="${producto.id}"><i class="bi bi-trash3"></i></button>
            `;
    
            carrito_productos.append(div);
        })
    } else{
    
        carrito_vacio.classList.remove("disabled");
        carrito_productos.classList.add("disabled");
        carrito_acciones.classList.add("disabled");
        carrito_lleno.classList.add("disabled");
    }

    actualizarBotonesEliminar();
    actualizarTotal ();
}

cargarProductosCarrito();


function actualizarBotonesEliminar () {
    botonesEliminar = document.querySelectorAll(".carrito_producto_eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
} 

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito () {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "¿Estas seguro que quieres vaciar tu carrito?",
        text: "Estas a punto de eliminar los productos de tu carrito!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, quiero eliminarlo",
        cancelButtonText: "No, quiero mantener mi carrito",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
          swalWithBootstrapButtons.fire({
            title: "Carrito vacio!",
            text: "Tu carrito ha sido eliminado",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Se mantiene tu carrito",
            text: "Por favor continua con tu compra :)",
            icon: "error",
          });
        }
      });
}

function actualizarTotal () {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerHTML = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito () {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();

    carrito_vacio.classList.add("disabled");
    carrito_productos.classList.add("disabled");
    carrito_acciones.classList.add("disabled");
    carrito_lleno.classList.remove("disabled");
}
