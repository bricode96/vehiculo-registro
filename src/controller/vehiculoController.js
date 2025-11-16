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
        console.error('Error al ingresar registro:', error);
        res.status(500).json({ message: 'Error en servidores' });
    }
}

export const putVehiculo = async (req, res) => {
    try {
        const vehiculoId = req.params.id;
        const vehiculoData = req.body;
        const updateVehiculo = await vehiculoService.putVehiculo(vehiculoData, vehiculoId);
        if (!updateVehiculo) {
            return res.status(404).json({ message: "Registro no encontrado" });
        }
        res.status(200).json({ success: true, data: updateVehiculo });
    } catch (error) {
        console.error('Error actualizar registro:', error);
        res.status(500).json({ message: 'Error en servidores' });
    }
}

export const deleteVehiculo = async (req, res) => {
    try {
        const vehiculoId = req.params.id;
        const deleted = await vehiculoService.deleteVehiculo(vehiculoId);

        if (!deleted) {
            return res.status(404).json({ message: "Registro no encontrado" });
        }

        res.status(200).json({ success: true, message: "Registro eliminado correctamente" });
    } catch (error) {
        console.error('Error al eliminar registro:', error);
        res.status(500).json({ message: 'Error en servidores' });
    }
}

export const searchVehiculo = async (req, res) => {
    try {
        console.log(req.query); // <- para depuración
        const searchTerm = req.query?.q;
        if (!searchTerm) return res.status(400).json({ message: "Parametro query 'q' es requerido" });

        const vehiculos = await vehiculoService.searchVehiculo(searchTerm);
        res.status(200).json(vehiculos);

    } catch (error) {
        console.error('Error al buscar registro:', error);
        res.status(500).json({ message: 'Error de servidores' });
    }
}