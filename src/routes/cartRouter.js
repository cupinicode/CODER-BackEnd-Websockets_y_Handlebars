import { Router } from "express"; // Importamos el módulo ROUTER de express
//import { uploader } from "../middlewares/multer.js";
import CartManager from "../cartManager.js";
const cartManager = new CartManager(); // Instancio la clase


// Para poder validar que en un carrito sólo se puedan agregar IDs de productos existentes,
// debo importar la clase ProductManager aquí (en el ROUTER de carritos), y así poder acceder al 
// método getProductById, perteneciente a la clase ProductManager.
// Esta validación no está solicitada en la consigna del ejercicio, pero entiendo que es necesaria,
// para evitar agregar productos inexistentes a los carritos

import ProductManager from "../productManager.js";
const productManager = new ProductManager(); // Instancio la clase ProductManager, para verificar IDs de productos

const router = Router() //Creo un router, instanciando el módulo

router.post("/", (req, res) => { //Agrego un carrito nuevo al array
    res.status(cartManager.addCart()).send() //Tomo el valor de retorno de addProduct como STATUS
})

router.get('/:cid', (req, res) => {  //endpoint que devuelve el contenido del carrito indicado
    const cid = parseInt(req.params.cid, 10)
    const carrito = cartManager.getCartById(cid)
    if (carrito) {
        res.status(200).send(carrito.products) // Devuelvo el array de productos, del carrito seleccionado
    }else{
        res.status(404).send()
    }
})

router.post('/:cid/product/:pid', (req, res) => {  //endpoint que agrega un producto al carrito (o suma en 1 la cantidad) 
    const cid = parseInt(req.params.cid, 10)
    const pid = parseInt(req.params.pid, 10)
    if (!productManager.getProductById(pid)) // Valido que en producto existe, ANTES de meterlo en un carrito
        return res.status(404).send() // Si el producto no existe, devuelvo 404
    res.status(cartManager.addProductToCart(cid, pid)).send() //Tomo el valor de retorno de addProduct como STATUS
})












/*router.get("/", (req, res) => res.send(carts)) //Agrego una ruta al router
router.post("/", (req, res) => {
    const carrito = req.body
    carts.push(carrito)
    res.status(200).send()
})*/


export default router; // exporto la variable router, por defecto (puedo importarla con cuanlquier nombre)