import { query } from "../config/db.js"

export const getVehiculo = async () => {
    const { rows } = await query('SELECT * FROM vehiculos_td');
    return rows;
}

export const postVehiculo = async (vehiculoData) => {
    try {
        const { marca, modelo, placa } = vehiculoData;
        const { rows } = await query(
            `INSERT INTO vehiculos (marca, modelo, placa) VALUES ($1, $2, $3) RETURNING *`,
            [marca, modelo, placa]
        );
        return rows[0];
    } catch (error) {
        console.error('Error al insertar vehículo:', error);
        throw error; 
    }
}




