import * as registroService from "../service/registroService.js"

export const getRegistro = async (req, res) => {
    try {
        const registro = await registroService.getRegistro();
        res.status(200).json(registro);
    } catch (error) {
        console.error('Error en solicitud', error);
        res.status(500).json({ message: 'Error interno de servidores' });
    }
}

export const postRegistro = async (req, res) => {
    console.log("📥 BODY RECIBIDO:", req.body);   // <-- AGREGA ESTO YA

    try {
        const registroData = req.body;
        const newRegistro = await registroService.postRegistro(registroData);
        res.status(200).json({ success: true, data: newRegistro });
    } catch (error) {
        console.error("❌ ERROR EXACTO:", error.message);
        res.status(500).json({ message: error.message });
    }
};

export const putRegistro = async (req, res) => {
    try {
        console.log("➡️ Body recibido en PUT:", req.body);
        const registroId = req.params.id;
        const registroData = req.body;
        const updateRegistro = await registroService.putRegistro(registroData, registroId);
        if (!updateRegistro) {
            return res.status(404).json({ message: "Registro no encontrado" });
        }
        res.status(200).json({ success: true, data: updateRegistro });
    } catch (error) {
        console.error('Error actualizar registro:', error);
        res.status(500).json({ message: 'Error en servidores' });
    }
}

export const deleteRegistro = async (req, res) => {
    try {
        const registroId = req.params.id;
        const deleted = await registroService.deleteRegistro(registroId);

        if (!deleted) {
            return res.status(404).json({ message: "Registro no encontrado" });
        }

        res.status(200).json({ success: true, message: "Registro eliminado correctamente" });
    } catch (error) {
        console.error('Error al eliminar registro:', error);
        res.status(500).json({ message: 'Error en servidores' });
    }
}

export const searchRegistro = async (req, res) => {
    try {
        console.log(req.query); // <- para depuración
        const searchTerm = req.query?.q;
        if (!searchTerm) return res.status(400).json({ message: "Parametro query 'q' es requerido" });

        const registros = await registroService.searchRegistro(searchTerm);
        res.status(200).json(registros);

    } catch (error) {
        console.error('Error al buscar registro:', error);
        res.status(500).json({ message: 'Error de servidores' });
    }
}