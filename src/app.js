import express, { urlencoded } from "express";
import handlebars from "express-handlebars"
import {Server} from "socket.io"

import cartRouter from "./routes/cartRouter.js"
import productRouter from "./routes/productRouter.js"

import viewsRouter from "./routes/viewsRouter.js"

const app = express() //instancio la aplicación
const httpServer = app.listen(8080, () => console.log("Servidor escuchando en 8080"))
const socketServer = new Server(httpServer)

app.engine("handlebars", handlebars.engine())
app.set("views", "./src/views")
app.set("view engine", "handlebars")
app.use(express.static("./src/public"))

app.use((req, res, next) => { // Cada vez que se llama un EndPoint, al req se le agrega como context el socketServer,
    req.context = { socketServer } //para usarlo en el endPoint del productRouter
    next() // Al finalizar el middleware, continuamos con la solicitud
})

app.use(express.json()) // middleware para procesar solicitudes y leer json
app.use(express.urlencoded({ extended: true}))

import ProductManager from './productManager.js'; //importo la CLASE 
//import CartManager from './cartManager.js'; //importo la CLASE
const productManager = new ProductManager("./products.json"); // Instancio la clase
//const cartManager = new CartManager(); // Instancio la clase

app.use("/", viewsRouter)

app.use("/api/products", productRouter) // Indico que para la ruta PRODUCT, voy a usar todos los EndPoints del router correspondiente

app.use("/api/carts", cartRouter) // Indico que para la ruta CART, voy a usar todos los EndPoints del router correspondiente

socketServer.on("connection", async (socket) => {
    console.log("Nuevo cliente ", socket.id)
    socket.emit("Productos", await productManager.getProducts())
})