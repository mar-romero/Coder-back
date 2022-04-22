import fs from "fs";
import __dirname from "../utils.js";

const read = async (name)=>{
    try {
        if (fs.existsSync(__dirname +`/files/${name}`)) {
            const lectura = await fs.promises.readFile(__dirname +`/files/${name}`, "utf-8");
            const array = await JSON.parse(lectura);
            return array;
        }else{
            return {error: "El JSON que se busca NO existe"};
        }
    } catch (error) {
        console.log("No se pudo leer: " + error.message);
    }
}

const write = async (name, data) =>{
    try {
        await fs.promises.writeFile(__dirname +`/files/${name}`,JSON.stringify(data,null,"\t"))
    } catch (error) {
        console.log("No se pudo guardar: " + error.message);
    }
}

export default {
    read,
    write
}