const socket = io() // Inicializo el Socket

const productosContainer = document.getElementById("productos")

socket.on("Productos", (products) => { // Renderizo todos los productos
    const tittles = products.map((product) => product.tittle)
    productosContainer.innerHTML = tittles.join("<br></br>")
})

socket.on("actualizar_productos", (products) => {
    console.log("ACTUALIZANDO")
    const tittles = products.map((product) => product.tittle)
    productosContainer.innerHTML = tittles.join("<br></br>")
})

console.log("Hola MUNDO !!!")