import express from "express";
import cors from "cors";
import vehiculoRoute from "./routes/vehiculoRoute.js";
import registroRoute from "./routes/registroRoute.js";
import { pool } from "./db.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", vehiculoRoute);
app.use("/api", registroRoute);

// Conexión a la base de datos antes de levantar el servidor
pool.connect()
  .then(() => {
    console.log("✅ Base de datos conectada");

    app.listen(port, () => {
      console.log(`Servidor corriendo en puerto ${port}`);
    });

  })
  .catch((err) => {
    console.error("❌ Error al conectar la base de datos:", err);
    process.exit(1);
  });
