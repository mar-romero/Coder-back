import express from "express";
import {Server} from "socket.io";
import __dirname from "./utils.js";
import moment from "moment";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname+"/public"));

const server = app.listen(PORT, ()=>{console.log(`Listening on PORT: ${PORT}`)});
const io = new Server(server);

const log = [];
const products = [];

function* idGenerator (){
    let counter = 1;
    while (true) {
        yield counter++;
    }
};
const idGen = idGenerator();

io.on("connection", (socket)=>{
    console.log(`Socket #${socket.id} connected`);
    socket.emit("initial", {log, products});
    socket.on("message", (data)=>{
        data.date = moment().format('DD/MM/YYYY HH:mm:ss');
        log.push(data);
        io.emit("newLog", data);
    });
    socket.on("product", (data)=>{
        data.id = idGen.next().value;
        products.push(data);
        io.emit("newProduct", data);
    });
});