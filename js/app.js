//alert();

let articulosCarrito = [];

const contenedorCarrito = document.querySelector("#lista-carrito tbody");

const listaProductos = document.querySelector("#lista-productos");

const vaciarCarrito = document.querySelector("#vaciar-carrito");

function agregarProducto(evt){
    evt.preventDefault();
    //console.log(evt.target.classList.contains("agregar-carrito"));
    if (evt.target.classList.contains("agregar-carrito")){
        const producto = (evt.target.parentElement.parentElement.parentElement);
        leerDatosProducto(producto)
    }
}

function leerDatosProducto(item){
    const infoProducto = {
        imagen: item.querySelector('img').src,
        titulo: item.querySelector("h4").textContent,
        precio: item.querySelector("p").textContent,
    };

    articulosCarrito = [...articulosCarrito, infoProducto];
    console.log(articulosCarrito);

    dibujarCarritoHTML();
}

function dibujarCarritoHTML(){
    articulosCarrito.forEach((producto) => {
        const fila = document.createElement("tr");
        fila.innerHTML += `
        <td><img src="${producto.imagen}" width="50" /></td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        `;
        contenedorCarrito.appendChild(fila);
    });

    sincronizarStorage();
}



function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

listaProductos.addEventListener("click", agregarProducto);
window.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito"));
    dibujarCarritoHTML();
});

