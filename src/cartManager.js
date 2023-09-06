import fs from 'fs';

class CartManager {

    path;
    carts; // Array de carritos
    primerId;

    constructor() {
        this.path = "./carts.json";
        this.leerArchivo();
    }

    leerArchivo() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.carts = JSON.parse(data);
        } catch (err) {
            this.carts = []; // Si el archivo no existe, inicializo el array de carritos
        } //Si el array esta vacio, pongo primerId=0.  Caso contrario, le asigno el Id siguiente al ultimo elemento
        this.primerId = this.carts.length === 0 ? 0 : this.carts[this.carts.length - 1].id + 1
    }

    grabarArchivo() {
        try {
            const data = JSON.stringify(this.carts, null, 2);
            fs.writeFileSync(this.path, data, 'utf-8');
        } catch (err) {
            console.log(`Error al grabar el archivo ${path}, => ${err.message}`);
        }
    }

    addCart() { // agrega un carrito al array
        const carrito ={}
        carrito.id = this.primerId; // Tomo el primer Id disponible
        this.primerId++
        carrito.products = []
        this.carts.push(carrito); // Agrego el carrito al array
        this.grabarArchivo(); // Persisto los cambios en el archivo .json
        return 200
    }

    getCarts() {
        return this.carts;
    }
    
    getCartById(id) {
        const encontrado = this.carts.find((carrito) => carrito.id === id); // Busco la primera aparicion del Id en el array
        return (encontrado ? encontrado : undefined)
    }

    addProductToCart(cartId, productId) { // Agrega un producto al carrito (o incrementa la cnatidad)
        const indiceEncontrado = this.carts.findIndex((carrito) => carrito.id === cartId);
        if (indiceEncontrado === -1) 
            return 404;
        const carrito = this.carts[indiceEncontrado];
        const producto = carrito.products.find((product) => product.productId === productId);
        if (producto) { //El producto ya existia en el array
            producto.quantity ++; //Le sumo UNO a la cantidad
        } else {
            carrito.products.push({ productId, quantity: 1 }); //Agrego el producto e inicializo la cantidad en UNO
        }
        this.grabarArchivo();
        return 200
    }

    getProductsInCart(Id) {
        const carrito = this.getCartById(Id);
        return carrito ? cart.products : undefined
    }
}

//module.exports = CartManager
export default CartManager