import { Router } from "express"; // Importamos el módulo ROUTER de express
//import { uploader } from "../middlewares/multer.js";
import ProductManager from "../productManager.js";
const productManager = new ProductManager(); // Instancio la clase

const router = Router() //Creo un router, instanciando el módulo

router.get("/", async (req, res) => { //Trae todos los productos
    const products = await productManager.getProducts()//Llamo al método de ProductManager que lee el archivo, me devuelve todos los productos y lo cargo en un array
    res.render("home", { products }) 
}) 

export default router
