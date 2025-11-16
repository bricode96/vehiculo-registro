import * as vehiculoService from "../service/vehiculoService.js"

export const getVehiculo = async (req, res) => {
    try {
        const clients = await vehiculoService.getVehiculo();
        res.status(200).json(clients);
    } catch (error) {
        console.error('Error en solicitud', error);
        res.status(500).json({ message: 'Error interno de servidores' });
    }
}