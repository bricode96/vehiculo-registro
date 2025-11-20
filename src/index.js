import express from "express"
import cors from "cors"
import vehiculoRoute from "./routes/vehiculoRoute.js"
import registroRouteSalida from "./routes/registroRouteSalida.js"
import registroRouteEntrada  from "./routes/registroRouteEntrada.js"


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', vehiculoRoute);
app.use('/api', registroRouteSalida);
app.use('/api', registroRouteEntrada)

app.listen(port, () => {
    console.log("Base de datos conectada")
})