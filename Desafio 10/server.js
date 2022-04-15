import express from "express";
import productsRouter from "./routes/products.js";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.js";

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>{console.log(`Listening on port: ${PORT}`)});

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname+"/public"));

app.use("/api/products", productsRouter);
app.use("/", viewsRouter);