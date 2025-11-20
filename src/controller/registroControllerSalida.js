import * as registroServiceSalida from "../service/registroServiceSalida.js"

export const getRegistroSalida = async (req, res) => {
    try {
        const registro = await registroServiceSalida.getRegistroSalida();
        res.status(200).json(registro);
    } catch (error) {
        console.error('Error en solicitud', error);
        res.status(500).json({ message: 'Error interno de servidores' });
    }
}

export const postRegistroSalida = async (req, res) => {
    console.log("📥 BODY RECIBIDO:", req.body);   // <-- AGREGA ESTO YA

    try {
        const registroData = req.body;
        const newRegistro = await registroServiceSalida.postRegistroSalida(registroData);
        res.status(200).json({ success: true, data: newRegistro });
    } catch (error) {
        console.error("❌ ERROR EXACTO:", error.message);
        res.status(500).json({ message: error.message });
    }
};

export const putRegistroSalida = async (req, res) => {
    try {
        console.log("➡️ Body recibido en PUT:", req.body);
        const registroId = req.params.id;
        const registroData = req.body;
        const updateRegistro = await registroServiceSalida.putRegistroSalida(registroId, registroData);
        if (!updateRegistro) {
            return res.status(404).json({ message: "Registro no encontrado" });
        }
        res.status(200).json({ success: true, data: updateRegistro });
    } catch (error) {
        console.error('Error actualizar registro:', error);
        res.status(500).json({ message: 'Error en servidores' });
    }
}

export const deleteRegistroSalida = async (req, res) => {
    try {
        const registroId = req.params.id;
        const deleted = await registroServiceSalida.deleteRegistroSalida(registroId);

        if (!deleted) {
            return res.status(404).json({ message: "Registro no encontrado" });
        }

        res.status(200).json({ success: true, message: "Registro eliminado correctamente" });
    } catch (error) {
        console.error('Error al eliminar registro:', error);
        res.status(500).json({ message: 'Error en servidores' });
    }
}

export const searchRegistroSalida = async (req, res) => {
    try {
        console.log(req.query); // <- para depuración
        const searchTerm = req.query?.q;
        if (!searchTerm) return res.status(400).json({ message: "Parametro query 'q' es requerido" });

        const registros = await registroServiceSalida.searchRegistroSalida(searchTerm);
        res.status(200).json(registros);

    } catch (error) {
        console.error('Error al buscar registro:', error);
        res.status(500).json({ message: 'Error de servidores' });
    }
}