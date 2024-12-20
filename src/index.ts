import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { AppDataSource } from "./database/data-source";
import router from "./routes";

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//app.get('/', (req, res)=>{
// console.log('hola mundo');
// res.send("Hola mundo");
//});
AppDataSource.initialize()
    .then(() => {
        console.log("Base de datos conectada");
    })
    .catch((error) => console.error(error));

app.use("/api", router);
//app.get("/", (req, res) => {
  //  res.send("¡Servidor funcionando!");
//});
const PORT = process.env.PORT || 6505;
app.listen(PORT, () => {
    //console.log("Servidor activo");
    console.log(`Servidor activo en http://localhost:${PORT}`);
});