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

export const postVehiculo = async (req, res) => {
    try {
        const vehiculoData = req.body;
        const newVehiculo = await vehiculoService.postVehiculo(vehiculoData);
        res.status(200).json({ success: true, data: newVehiculo })
    } catch (error) {
        console.error('Error al añadir vehiculo:', error);
        res.status(500).json({ message: 'Error en servidores' });
    }
}

export const putVehiculo = async (req, res) => {
    try {
        const vehiculoId = req.params.id;
        const vehiculoData = req.body;
        const updateVehiculo = await vehiculoService.putVehiculo(vehiculoData, vehiculoId);
        if (!updateVehiculo) {
            return res.status(404).json({ message: "Vehiculo no encontrado" });
        }
        res.status(200).json({ success: true, data: updateVehiculo });
    } catch (error) {
        console.error('Error actualizar vehiculo:', error);
        res.status(500).json({ message: 'Error en servidores' });
    }
}