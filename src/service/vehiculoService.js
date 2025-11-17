import { query } from "../config/db.js"

export const getVehiculo = async () => {
    const { rows } = await query('SELECT * FROM vehiculos_td');
    return rows;
}

export const postVehiculo = async (vehiculoData) => {
    const { marca, modelo, placa, status } = vehiculoData;
    const { rows } = await query(
        `INSERT INTO vehiculos_td (marca, modelo, placa, status) VALUES ($1, $2, $3, $4) RETURNING *`,
        [marca, modelo, placa, status]
    );
    return rows[0];

}

export const putVehiculo = async (vehiculoData, vehiculoId) => {
    const { marca, modelo, placa, status } = vehiculoData;

    const { rows } = await query(
        `UPDATE vehiculos_td 
         SET marca = $1, modelo = $2, placa = $3, status = $4, updated_at = CURRENT_TIMESTAMP 
         WHERE id = $5 
         RETURNING *`,
        [marca, modelo, placa, status, vehiculoId]
    );

    return rows[0];
}


export const deleteVehiculo = async (vehiculoId) =>{
    const { rowCount } = await query(`DELETE FROM vehiculos_td WHERE id = $1`,
        [vehiculoId]
    )
    return rowCount > 0;
}

export const searchVehiculo = async (searchTerm) =>{
    const { rows } = await query(
        `SELECT * FROM vehiculos_td WHERE marca ILIKE $1 OR modelo ILIKE $1 OR placa ILIKE $1`,
        [`%${searchTerm}%`]
    )
    return rows;
}
