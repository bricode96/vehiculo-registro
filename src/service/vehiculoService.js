import { query } from "../config/db.js"

export const getVehiculo = async () => {
    const { rows } = await query('SELECT * FROM vehiculos_td');
    return rows;
}

export const postVehiculo = async (vehiculoData) => {
    const { marca, modelo, placa } = vehiculoData;
    const { rows } = await query(
        `INSERT INTO vehiculos_td (marca, modelo, placa) VALUES ($1, $2, $3) RETURNING *`,
        [marca, modelo, placa]
    );
    return rows[0];

}

export const putVehiculo = async (vehiculoData, vehiculoId) => {
    const { marca, modelo, placa } = vehiculoData;
    const { rows } = await query(
        `UPDATE vehiculos_td SET marca = $1, modelo = $2, placa = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *`,
        [marca, modelo, placa, vehiculoId]
    );
    return rows[0];
}

export const deleteVehiculo = async (vehiculoId) =>{
    const { rowCount } = await query(`DELETE FROM vehiculos_td WHERE id = $1`,
        [vehiculoId]
    )
    return rowCount > 0;
}



