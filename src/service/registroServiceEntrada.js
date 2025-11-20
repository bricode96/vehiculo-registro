import { query } from "../config/db.js"

export const getRegistrosEntrada = async () => {

    const { rows } = await query(`
        SELECT E.*, S.fecha_salida, S.hora_salida, S.kilometraje_salida, S.nombre_motorista, V.modelo FROM
        entradas_td E INNER JOIN salidas_td S ON E.id_salida_fk = S.id INNER JOIN vehiculos_td V ON S.id_vehiculo_fk = V.id
        ORDER BY E.fecha_entrada DESC, E.hora_entrada DESC
    `);

    return rows;
};

export const postRegistroEntrada = async (registroDataEntrada) => {

    const { id_salida_fk, kilometraje_entrada } = registroDataEntrada;


    const { rows: entradaRows } = await query(
        `INSERT INTO entradas_td (id_salida_fk, fecha_entrada, hora_entrada, kilometraje_entrada, created_at, updated_at) 
        VALUES ($1, CURRENT_DATE, CURRENT_TIME, $2, NOW(), NOW()) RETURNING *`,
        [id_salida_fk, kilometraje_entrada]
    );

    if (entradaRows.length === 0) {
        throw new Error("No se pudo registrar la entrada.");
    }

    const registroEntrada = entradaRows[0];

    const { rows: salidaRows } = await query(
        `UPDATE salidas_td SET status = FALSE, updated_at = NOW() WHERE id = $1 RETURNING id_vehiculo_fk`,
        [id_salida_fk]
    );

    const idVehiculo = salidaRows[0]?.id_vehiculo_fk;

    const { rows: detalleRows } = await query(
        `SELECT E.*, V.modelo FROM entradas_td E INNER JOIN salidas_td S ON E.id_salida_fk = S.id INNER JOIN vehiculos_td V ON S.id_vehiculo_fk = V.id
        WHERE E.id = $1 `,
        [registroEntrada.id]
    );

    return detalleRows[0];
};

export const putRegistroEntrada = async (registroId, datosActualizar) => {


    const {fecha_entrada, hora_entrada, kilometraje_entrada} = datosActualizar;


    const { rows } = await query(
        `UPDATE entradas_td SET fecha_entrada = $1, hora_entrada = $2, kilometraje_entrada = $3, updated_at = NOW() WHERE 
            id = $4 RETURNING *`,
        [fecha_entrada, hora_entrada, kilometraje_entrada, registroId]
    );

    return rows[0];
};

export const deleteRegistroEntrada = async (registroId) => {
    const { rowCount } = await query(`DELETE FROM entradas_td WHERE id = $1`,
        [registroId]
    )
    return rowCount > 0;
}

export const searchRegistroEntrada = async (searchTerm) => {
    
    const searchPattern = `%${searchTerm}%`;

    const { rows } = await query(
        `
        SELECT
            E.*,  -- Selecciona todos los campos de la entrada
            S.nombre_motorista, -- Incluye el motorista de la salida
            S.fecha_salida,     -- Incluye la fecha de salida para referencia
            S.hora_salida,      -- Incluye la hora de salida para referencia
            V.modelo AS modelo,
            V.marca AS marca,
            V.placa AS placa
        FROM
            entradas_td E
        INNER JOIN
            salidas_td S ON E.id_salida_fk = S.id  -- 1. Une Entrada con Salida
        INNER JOIN
            vehiculos_td V ON S.id_vehiculo_fk = V.id -- 2. Une Salida con Vehículo
        WHERE
            -- Búsqueda en el nombre del motorista (desde la Salida)
            S.nombre_motorista ILIKE $1
            -- O en la marca del vehículo
            OR V.marca ILIKE $1
            -- O en el modelo del vehículo
            OR V.modelo ILIKE $1
            -- O en la placa del vehículo
            OR V.placa ILIKE $1
        ORDER BY
            E.fecha_entrada DESC, E.hora_entrada DESC
        `,
        [searchPattern]
    );
    
    return rows;
};