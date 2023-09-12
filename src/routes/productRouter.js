import { Router } from "express"; // Importamos el módulo ROUTER de express
//import { uploader } from "../middlewares/multer.js";
import ProductManager from "../productManager.js";
const productManager = new ProductManager("./products.json"); // Instancio la clase

const router = Router() //Creo un router, instanciando el módulo

router.get("/", async (req, res) => { //Trae todos los productos (hasta LIMIT, si lo hay)
    const limit = req.query.limit
    const products = await productManager.getProducts()//Llamo al método de ProductManager que lee el archivo, me devuelve todos los productos y lo cargo en un array
    return limit ? res.send(products.slice(0, parseInt(limit, 10))) : res.send(products) // Si LIMIT no está definido, devuelvo todo el array
}) 

router.get('/:pid', async (req, res) => {  //endpoint que devuelve sólo el Id indicado
    const pid = parseInt(req.params.pid, 10)
    const producto = await productManager.getProductById(pid)
    if (producto) {
        res.status(200).send(producto)
    }else{
        res.status(404).send()
    }
})

router.post("/", async (req, res) => { //Agrego un producto
    const producto = req.body
    await productManager.addProduct(producto)
    const products = await productManager.getProducts()
    req.context.socketServer.emit("actualizar_productos", products)
    res.status(200).send() //Tomo el valor de retorno de addProduct como STATUS
})

router.put('/:pid', async (req, res) => {  //endpoint que actualiza el Id indicado
    const pid = parseInt(req.params.pid, 10)
    const data = req.body
    res.status(await productManager.updateProduct(pid, data)).send() //Tomo el valor de retorno de updateProduct como STATUS
})

router.delete('/:pid', async (req, res) => {  //endpoint que elimina el Id indicado
    const pid = parseInt(req.params.pid, 10)
    res.status(await productManager.deleteProduct(pid)).send() //Tomo el valor de retorno de deleteProduct como STATUS
})


export default router; // exporto la variable router, por defecto (puedo importarla con cuanlquier nombre)