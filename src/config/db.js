import pg from "pg"
import env from "dotenv"

env.config();

const db = new pg.Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
})

db.connect();

db.on("Error", (err) =>{
    console.error("El Pool esta inactivo", err);
    process.exit(-1)
})

export const query = (text, params) => db.query(text, params)