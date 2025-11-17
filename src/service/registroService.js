import { query } from "../config/db.js"

export const getRegistro = async () => {
    const { rows } = await query('SELECT * FROM vehicle_logs');
    return rows;
} 