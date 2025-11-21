import express from "express"
import cors from "cors"
import vehiculoRoute from "./routes/vehiculoRoute.js"
import registroRouteSalida from "./routes/registroRouteSalida.js"
import registroRouteEntrada  from "./routes/registroRouteEntrada.js"
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "../swagger/swagger.js"; // SIN llaves

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/api', vehiculoRoute);
app.use('/api', registroRouteSalida);
app.use('/api', registroRouteEntrada)

app.listen(port, () => {
    console.log("Base de datos conectada")
})