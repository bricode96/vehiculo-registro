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