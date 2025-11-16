import express from "express"
import cors from "cors"
import vehiculoRoute from "./routes/vehiculoRoute.js"


const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/api', vehiculoRoute);

app.listen(port, ()=>{
    console.log("Base de datos conectada")
})