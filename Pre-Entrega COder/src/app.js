import express from "express";
import __dirname from "./utils.js";
import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";
import login from "./services/login.js";

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{console.log(`Listening on PORT ${PORT}`)});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname+"/public"));

const routesMiddleware = (req, res, next)=>{
    res.status(404).send({error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`});
}

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//ruta provisoria para validar el login
app.post("/api/login", (req, res)=>{
    const user = req.headers.user;
    const pass = req.headers.pass;
    const isAdm = login.login(user, pass);
    res.json(isAdm);
})

app.use(routesMiddleware);