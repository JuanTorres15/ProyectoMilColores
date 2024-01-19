let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

const contenedor_productos = document.querySelector("#contenedor_productos");
const botones_categorias = document.querySelectorAll(".boton_categoria");
const tituloPrincipal = document.querySelector("#titulo_principal");
let botonesAgregar = document.querySelectorAll(".producto_agregar")
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedor_productos.innerHTML = "";

    productosElegidos.forEach(producto => {
        
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto_imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto_detalles">
                <h3 class="producto_titulo">${producto.titulo}</h3>
                <p class="producto_precio">${producto.precio}</p>
                <button class="producto_agregar" id="${producto.id}">Agregar</button>
            </div>

        `;

        contenedor_productos.append(div);

    })

    actualizarBotonesAgregar ();
}

botones_categorias.forEach(boton => {
    
    boton.addEventListener("click", (e) => {

        botones_categorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })

});

function actualizarBotonesAgregar () {
    botonesAgregar = document.querySelectorAll(".producto_agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let NuevoNumerito = productosEnCarrito.reduce((acc, producto)  => acc + producto.cantidad, 0);
    numerito.innerText = NuevoNumerito;
}
