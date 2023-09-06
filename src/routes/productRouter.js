import { Router } from "express"; // Importamos el módulo ROUTER de express
//import { uploader } from "../middlewares/multer.js";
import ProductManager from "../productManager.js";
const productManager = new ProductManager(); // Instancio la clase

const router = Router() //Creo un router, instanciando el módulo

router.get("/", (req, res) => { //Trae todos los productos (hasta LIMIT, si lo hay)
    const limit = req.query.limit
    const products = productManager.getProducts()//Llamo al método de ProductManager que lee el archivo, me devuelve todos los productos y lo cargo en un array
    return limit ? res.send(products.slice(0, parseInt(limit, 10))) : res.send(products) // Si LIMIT no está definido, devuelvo todo el array
}) 

router.get('/:pid', (req, res) => {  //endpoint que devuelve sólo el Id indicado
    const pid = parseInt(req.params.pid, 10)
    const producto = productManager.getProductById(pid)
    if (producto) {
        res.status(200).send(producto)
    }else{
        res.status(404).send()
    }
})

router.post("/", (req, res) => { //Agrego un producto
    const producto = req.body
    res.status(productManager.addProduct(producto)).send() //Tomo el valor de retorno de addProduct como STATUS
})

router.put('/:pid', (req, res) => {  //endpoint que actualiza el Id indicado
    const pid = parseInt(req.params.pid, 10)
    const data = req.body
    res.status(productManager.updateProduct(pid, data)).send() //Tomo el valor de retorno de updateProduct como STATUS
})

router.delete('/:pid', (req, res) => {  //endpoint que elimina el Id indicado
    const pid = parseInt(req.params.pid, 10)
    res.status(productManager.deleteProduct(pid)).send() //Tomo el valor de retorno de deleteProduct como STATUS
})


export default router; // exporto la variable router, por defecto (puedo importarla con cuanlquier nombre)