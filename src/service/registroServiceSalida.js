import { query } from "../config/db.js"

export const getRegistroSalida = async () => {
    const { rows } = await query(`SELECT S.*, V.modelo FROM salidas_td S INNER JOIN vehiculos_td V ON S.id_vehiculo_fk = V.id ORDER BY S.fecha_salida DESC, S.hora_salida DESC`);


    return rows;
};

export const postRegistroSalida = async (registroDataSalida) => {

    const { id_vehiculo_fk, nombre_motorista, kilometraje_salida } = registroDataSalida;

    const { rows: salidaRows } = await query(`INSERT INTO salidas_td (id_vehiculo_fk, nombre_motorista, fecha_salida, hora_salida, kilometraje_salida, status, created_at, updated_at) 
                                              VALUES ($1, $2, CURRENT_DATE, CURRENT_TIME, $3, TRUE, NOW(), NOW()) 
                                              RETURNING *`,
        [id_vehiculo_fk, nombre_motorista, kilometraje_salida]
    );

    if (salidaRows.length === 0) {
        throw new Error("No se pudo registrar la salida.");
    }

    const registroSalida = salidaRows[0];

    const { rows: detalleRows } = await query(
        `
        SELECT
            S.*,
            V.modelo
        FROM
            salidas_td S
        INNER JOIN
            vehiculos_td V ON S.id_vehiculo_fk = V.id
        WHERE
            S.id = $1
        `,
        [registroSalida.id]
    );


    return detalleRows[0];
};

export const putRegistroSalida = async (registroId, datosActualizar) => {

    const { nombre_motorista, kilometraje_salida, id_vehiculo_fk } = datosActualizar;
    
    const { rows } = await query(`UPDATE salidas_td SET nombre_motorista = $1, kilometraje_salida = $2,id_vehiculo_fk = $3,          
            updated_at = NOW() WHERE id = $4 RETURNING *`,
            [nombre_motorista, kilometraje_salida, id_vehiculo_fk, registroId]
    );

    return rows[0];
};


export const deleteRegistroSalida = async (registroId) => {
    const { rowCount } = await query(`DELETE FROM salidas_td WHERE id = $1`,
        [registroId]
    )
    return rowCount > 0;
}

export const searchRegistroSalida = async (searchTerm) => {
  
    const searchPattern = `%${searchTerm}%`;

    const { rows } = await query(
        `
        SELECT
            S.*,
            V.modelo AS modelo
        FROM
            salidas_td S
        INNER JOIN
            vehiculos_td V ON V.id = S.id_vehiculo_fk
        WHERE
    
            S.nombre_motorista ILIKE $1
           
            OR V.marca ILIKE $1
           
            OR V.modelo ILIKE $1
            
            OR V.placa ILIKE $1
        ORDER BY
            S.fecha_salida DESC, S.hora_salida DESC
        `,
        [searchPattern] 
    );
    
    return rows;
};