import { query } from "../config/db.js"

export const getVehiculo = async () => {
    const { rows } = await query('SELECT * FROM vehiculo_tb');
    return rows;
}

export const postVehiculo = async (vehiculoData) => {
    const { motorista, vehiculo, modelo, color, fecha_registro, anio, tipo, activo, estado } = vehiculoData;
    const { rows } = await query(
        `INSERT INTO vehiculo_tb 
        (motorista, vehiculo, modelo, color, fecha_registro, anio, tipo, activo, estado)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [motorista, vehiculo, modelo, color, fecha_registro, anio, tipo, activo, estado]
    );

    return rows[0];
};
