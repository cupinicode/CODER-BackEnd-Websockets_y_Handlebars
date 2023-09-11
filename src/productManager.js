import { log } from 'console';
import { json } from 'express';
import fs from 'fs';

class ProductManager {

    path;

    constructor() {
        this.path = "./products.json";
    }

    async addProduct(newProduct) {
        const productsText = await fs.promises.readFile(this.path, 'utf-8')
        const products = JSON.parse(productsText)

        if (!newProduct.tittle || !newProduct.description || !newProduct.code || !newProduct.price || 
            !newProduct.stock || !newProduct.category)
            return 401;
        if (products.find((product) => product.code === newProduct.code))
            return 401;
        const id = products.reduce((idFinal, product) => product.id > idFinal ? product.id : idFinal, 0)

        const product = { id : id + 1, ...newProduct } //Desestructuro newProduct
        product.status = false
        products.push(product)
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
        return 200
    }

    async getProducts() {
        const productsText = await fs.promises.readFile(this.path, 'utf-8')
        const products = JSON.parse(productsText)
        return products
    }

    async getProductById(id) {
        const productsText = await fs.promises.readFile(this.path, 'utf-8')
        const products = JSON.parse(productsText)
        const encontrado = products.find((product) => product.id === id); // Busco la primera aparicion del Id en el array
        return (encontrado ? encontrado : undefined)
    }

    async updateProduct(productId, newProduct) {
        const productsText = await fs.promises.readFile(this.path, 'utf-8')
        const products = JSON.parse(productsText)
        const indiceEncontrado = products.findIndex((producto) => producto.id === productId);

        if (indiceEncontrado === -1) {
            return 404;
        } else {
            products[indiceEncontrado] = {id: productId, ...newProduct}
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
            return 200
        }
    }

    async deleteProduct(id) {
        const productsText = await fs.promises.readFile(this.path, 'utf-8')
        const products = JSON.parse(productsText)
        const indiceEncontrado = products.findIndex((producto) => producto.id === productId);
        if (indiceEncontrado === -1) {
            return 404;
        } else {
            //delete products[indiceEncontrado] Equivalente a splice
            this.products.splice(indiceEncontrado, 1); //Elimino 1 (un) elemento del array, comenzando por indiceEncontrado
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
            return 200
        }
    }
}

//module.exports = ProductManager
export default ProductManager
