import { query } from "../config/db.js"

export const getRegistro = async () => {
    const { rows } = await query('SELECT * FROM vehicle_logs');
    return rows;
}

export const postRegistro = async (registroData) => { 
    let {
        vehiculo_id,
        motorista_nombre,
        km_entrada,
        fecha_hora_entrada,
        km_salida,
        fecha_hora_salida,
        destino_notas,
        status
    } = registroData;

    // Validaciones básicas
    if (!vehiculo_id) throw new Error("vehiculo_id es obligatorio");
    if (!motorista_nombre) throw new Error("motorista_nombre es obligatorio");
    if (!status) throw new Error("status es obligatorio");

    // Obtener el vehículo
    const vehiculo = await query(
        "SELECT id FROM vehiculos_td WHERE id = $1",
        [vehiculo_id]
    );

    if (vehiculo.rows.length === 0) {
        throw new Error("Vehículo no encontrado");
    }

    // Si es SALIDA → km_entrada y fecha_hora_entrada no aplican
    if (status === "out") {
        km_entrada = null;
        fecha_hora_entrada = null;
    }

    // Si es ENTRADA → km_salida y fecha_hora_salida no aplican
    if (status === "in") {
        km_salida = null;
        fecha_hora_salida = null;
        destino_notas = null;
    }

    const insert = await query(
        `INSERT INTO vehicle_logs 
         (vehiculo_id, motorista_nombre, km_entrada, fecha_hora_entrada, km_salida, fecha_hora_salida, destino_notas, status)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
         RETURNING *`,
        [
            vehiculo_id,
            motorista_nombre,
            km_entrada,
            fecha_hora_entrada,
            km_salida,
            fecha_hora_salida,
            destino_notas,
            status
        ]
    );

    return insert.rows[0];
};

export const putRegistro = async (registroData, registroId) => {
    let {
        vehiculo_id, motorista_nombre, km_entrada, fecha_hora_entrada, status, km_salida = null, fecha_hora_salida = null,
        destino_notas = null } = registroData;

    // Verificar que el vehículo exista y esté activoz
    const { rows: vehiculoRows } = await query(
        "SELECT id, status FROM vehiculos_td WHERE id = $1",
        [vehiculo_id]
    );

    if (vehiculoRows.length === 0 || !vehiculoRows[0].status) {
        throw new Error("Vehículo no existe o está inactivo");
    }

    // Si el status es "IN", limpiar los campos de salida
    if (status === "IN") {
        km_salida = null;
        fecha_hora_salida = null;
        destino_notas = null;
    }

    const { rows } = await query(
        `UPDATE vehicle_logs SET vehiculo_id = $1, motorista_nombre = $2, km_entrada = $3, fecha_hora_entrada = $4,
             status = $5, km_salida = $6, fecha_hora_salida = $7, destino_notas = $8, updated_at = CURRENT_TIMESTAMP
         WHERE log_id = $9 RETURNING *`,
        [vehiculo_id, motorista_nombre, km_entrada, fecha_hora_entrada, status, km_salida,
            fecha_hora_salida, destino_notas, registroId
        ]
    );

    return rows[0];
};

export const deleteRegistro = async (registroId) => {
    const { rowCount } = await query(`DELETE FROM vehicle_logs WHERE log_id = $1`,
        [registroId]
    )
    return rowCount > 0;
}

export const searchRegistro = async (searchTerm) => {
    const { rows } = await query(
        `SELECT vl.*, v.modelo AS modelo_vehiculo
         FROM vehicle_logs vl
         JOIN vehiculos_td v ON v.id = vl.vehiculo_id
         WHERE (vl.motorista_nombre ILIKE $1 OR v.marca ILIKE $1 OR v.modelo ILIKE $1 OR v.placa ILIKE $1)
           AND v.status = true`,
        [`%${searchTerm}%`]
    );
    return rows;
};
