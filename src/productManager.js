import fs from 'fs';

class ProductManager {

    path;
    products; // Array de productos
    primerId;

    constructor() {
        this.path = "./products.json";
        this.leerArchivo(); // en el constructor, cargo el array de productos
    }

    leerArchivo() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } catch (err) {
            this.products = []; // Si el archivo no existe, inicializo el array de productos
        } //Si el array esta vacio, pongo primerId=0.  Caso contrario, le asigno el Id siguiente al ultimo elemento
        this.primerId = this.products.length === 0 ? 0 : this.products[this.products.length - 1].id + 1
    }

    grabarArchivo() {
        try {
            const data = JSON.stringify(this.products, null, 2);
            fs.writeFileSync(this.path, data, 'utf-8');
        } catch (err) {
            console.log(`Error al grabar el archivo ${path}, => ${err.message}`);
        }
    }

    addProduct(producto) {
        if (!producto.tittle || !producto.description || !producto.code || !producto.price || !producto.status
            || !producto.stock || !producto.category)
            return 401;
        producto.id = this.primerId; // Tomo el primer Id disponible
        this.primerId++
        this.products.push(producto); // Agrego el producto al array
        this.grabarArchivo(); // Persisto los cambios en el archivo .json
        return 200
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const encontrado = this.products.find((product) => product.id === id); // Busco la primera aparicion del Id en el array
        return (encontrado ? encontrado : undefined)
    }

    updateProduct(id, data) {
        const indiceEncontrado = this.products.findIndex((producto) => producto.id === id);

        if (indiceEncontrado === -1) {
            return 404;
        } else {
            const dataAnterior = this.products[indiceEncontrado]; //Guardo el valor original del producto
            const dataNueva = {...dataAnterior, ...data}; //copio los nuevos datos a un objeto auxiliar
            dataNueva.id = dataAnterior.id // NO PERMITO que se modifique el Id del producto
            this.products[indiceEncontrado] = dataNueva; //guardo el objeto auxiliar en el array
            this.grabarArchivo(); // Persisto los cambios en el archivo .json
            return 200
        }
    }

    deleteProduct(id) {
        const indiceEncontrado = this.products.findIndex((producto) => producto.id === id);

        if (indiceEncontrado === -1) {
            return 404;
        } else {
            this.products.splice(indiceEncontrado, 1); //Elimino 1 (un) elemento del array, comenzando por indiceEncontrado
            this.grabarArchivo(); // Persisto los cambios en el archivo .json
            return 200
        }
    }
}

//module.exports = ProductManager
export default ProductManager
