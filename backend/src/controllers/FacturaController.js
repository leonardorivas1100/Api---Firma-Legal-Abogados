import Factura from "../models/FacturaModel.js"; 
import Proceso from "../models/ProcessModel.js";

//Controlador para crear una factura
export const crearFactura = async (req, res) => {
    try {

        const { id_factura, monto, fecha_emision, fecha_vencimiento, estado, metodo_pago, id_proceso } = req.body;

        //verificamos si existe el proceso
        const procesos = await Proceso.findOne({ id_proceso });
        if (!procesos) {
            return res.status(404).json({ message: 'Proceso no encontrado' });
        }

        //Verificamos si ya existe una factura con ese id_proceso
        const facturaExistente = await Factura.findOne({ id_factura });
        if (facturaExistente) {
            return res.status(400).json({ message: 'Ya existe una factura con ese ID' });
        }

        //Crear la factura
        const nuevaFactura = new Factura({
            id_factura,
            monto,
            fecha_emision,
            fecha_vencimiento,
            estado,
            metodo_pago,
            id_proceso,
        });

        //Guardar la factura en la base de datos
        await nuevaFactura.save();
        res.status(201).json(nuevaFactura);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear una factura'});
    }
};

// Controlador para editar una factura
export const editarFactura = async (req, res) => {
    try {
      const { id_factura } = req.params;
      const { monto, fecha_emision, fecha_vencimiento, estado, metodo_pago, id_proceso } = req.body;
  
      // Buscar la factura por ID
      const factura = await Factura.findOne({ id_factura });
      if (!factura) {
        return res.status(404).json({ message: 'Factura no encontrada' });
      }
  
      // Actualizar los campos de la factura con los valores proporcionados
      if (monto) factura.monto = monto;
      if (fecha_emision) factura.fecha_emision = fecha_emision;
      if (fecha_vencimiento) factura.fecha_vencimiento = fecha_vencimiento;
      if (estado) factura.estado = estado;
      if (metodo_pago) factura.metodo_pago = metodo_pago;
      if (id_proceso) factura.id_proceso = id_proceso;
  
      // Guardar los cambios en la base de datos
      await factura.save();
      res.status(200).json(factura);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al editar la factura' });
    }
  };

//Controlador para obtener una factura por ID
export const getFactura = async (req, res) => {
    try {
        const { id_factura }  = req.params;

        //Buscar la factura
        const factura = await Factura.findOne({ id_factura })
        
        if (!factura) {
            return res.status(404).json({ message: 'Factura no encontrada'});
        }

       // Obtener el proceso correspondiente
       const proceso = await Proceso.findOne({ id_proceso: factura.id_proceso });

       if (!proceso) {
           return res.status(404).json({ message: 'Proceso asociado no encontrado' });
       }

       // Devolver la factura junto con los detalles del proceso
       res.status(200).json({
           factura,
           proceso: {
               id_proceso: proceso.id_proceso,
               descripcion: proceso.descripcion,
               fecha_inicio: proceso.fecha_inicio,
               estado: proceso.estado,
           },
       });
   } catch (error) {
       console.error(error);
       res.status(500).json({ message: 'Error al obtener la factura' });
   }
};

// Controlador para obtener todas las facturas
export const getAllFacturas = async (req, res) => {
    try {
        // Obtener los filtros de la consulta (por ejemplo, por estado o id_proceso)
        const { estado, id_proceso } = req.query;
        let query = {}; // Criterios de búsqueda por defecto

        // Si se proporciona un estado, agregarlo al query
        if (estado) query.estado = estado;

        // Si se proporciona un id_proceso, agregarlo al query
        if (id_proceso) query.id_proceso = id_proceso;

        // Buscar todas las facturas con los filtros
        const facturas = await Factura.find(query);

        // Si no hay facturas, devolver un array vacío con código 200
        if (facturas.length === 0) {
            return res.status(200).json([]); // Aquí devolvemos un array vacío
        }

        // Devolver las facturas encontradas
        res.status(200).json(facturas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las facturas' });
    }
};


// Controlador para eliminar una factura
export const eliminarFactura = async (req, res) => {
    try {
        const { id_factura } = req.params;

        // Buscar la factura por id_factura
        const facturaExistente = await Factura.findOne({ id_factura });

        if (!facturaExistente) {
            return res.status(404).json({ message: 'Factura no encontrada' });
        }

        // Eliminar la factura
        await Factura.deleteOne({ id_factura });

        res.status(200).json({ message: 'Factura eliminada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la factura' });
    }
};
