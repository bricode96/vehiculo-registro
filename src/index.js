import express from "express"
import cors from "cors"
import vehiculoRoute from "./routes/vehiculoRoute.js"
import registroRoute from "./routes/registroRoute.js"


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', vehiculoRoute);
app.use('/api', registroRoute);

app.listen(port, () => {
    console.log("Base de datos conectada")
})