import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Test de conexión
db.connect()
  .then(() => console.log("✅ Base de datos conectada"))
  .catch((err) => {
    console.error("❌ Error al conectar la base de datos:", err);
    process.exit(1);
  });

db.on("error", (err) => {
  console.error("El pool de PostgreSQL está inactivo", err);
  process.exit(-1);
});

export const query = (text, params) => db.query(text, params);
