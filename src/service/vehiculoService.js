import { query } from "../config/db.js"

export const getVehiculo = async() => {
    const {rows} = await query('SELECT * FROM vehiculo_tb');
    return rows;
}