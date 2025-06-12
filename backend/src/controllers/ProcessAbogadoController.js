import ProcesoAbogado from "../models/ProcessAbogadoModel.js";
import Proceso from "../models/ProcessModel.js"; 
import Usuario from "../models/UsersModel.js"; 

export const crearProcesoAbogado = async (req, res) => {
    try {
        const { id_procesoabogado, numeroIdentificacion, id_proceso } = req.body;

        // Verificar si el proceso existe
        const proceso = await Proceso.findOne({ id_proceso });
        if (!proceso) {
            return res.status(404).json({ message: 'Proceso no encontrado' });
        }

        // Verificar si el abogado (usuario) con el numeroIdentificacion existe
        const abogado = await Usuario.findOne({ numeroIdentificacion });
        if (!abogado) {
            return res.status(404).json({ message: 'Abogado no encontrado' });
        }

        // Verificar si ya existe la relación entre el proceso y el abogado
        const existeRelacion = await ProcesoAbogado.findOne({ numeroIdentificacion, id_proceso });
        if (existeRelacion) {
            return res.status(400).json({ message: 'Este abogado ya está asociado a este proceso' });
        }

        // Crear la relación entre el proceso y el abogado
        const nuevaRelacion = new ProcesoAbogado({
            id_procesoabogado,
            numeroIdentificacion,
            id_proceso,
        });

        // Guardar la relación en la base de datos
        await nuevaRelacion.save();
        res.status(201).json(nuevaRelacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la relación abogado-proceso' });
    }
};

export const editarProcesoAbogado = async (req, res) => {
    try {
        const { id_procesoabogado } = req.params;
        const { numeroIdentificacion, id_proceso } = req.body;

        // Buscar la relación por ID
        const relacion = await ProcesoAbogado.findOne({ id_procesoabogado });
        if (!relacion) {
            return res.status(404).json({ message: 'Relación no encontrada' });
        }

        // Actualizar los campos de la relación
        if (numeroIdentificacion) relacion.numeroIdentificacion = numeroIdentificacion;
        if (id_proceso) relacion.id_proceso = id_proceso;

        // Guardar los cambios en la base de datos
        await relacion.save();
        res.status(200).json(relacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al editar la relación abogado-proceso' });
    }
};

export const getProcesoAbogado = async (req, res) => {
    try {
        const { id_procesoabogado } = req.params;

        // Buscar la relación entre proceso y abogado por ID
        const relacion = await ProcesoAbogado.findOne({ id_procesoabogado });
        if (!relacion) {
            return res.status(404).json({ message: 'Relación no encontrada' });
        }

        // Obtener el proceso y el abogado asociados
        const proceso = await Proceso.findOne({ id_proceso: relacion.id_proceso });
        const abogado = await Usuario.findOne({ numeroIdentificacion: relacion.numeroIdentificacion });

        // Responder con los datos de la relación
        res.status(200).json({
            relacion,
            proceso,
            abogado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la relación abogado-proceso' });
    }
};


// Obtener todos los ProcesoAbogados
export const getAllProcesoAbogados = async (req, res) => {
  try {
      const { id_proceso } = req.query;  // Obtener el parámetro de consulta (si existe)

      let filtros = {};  // Inicializar filtros vacíos

      if (id_proceso) {
          filtros.id_proceso = id_proceso;  // Si se pasa id_proceso, agregarlo a los filtros
      }

      // Obtener los ProcesoAbogados con filtros opcionales
      const procesosAbogados = await ProcesoAbogado.find(filtros)
          .populate('id_proceso')  // Poblamos los datos del proceso
          .populate('numeroIdentificacion');  // Poblamos los datos del abogado (usuario)

      res.status(200).json(procesosAbogados);  // Enviar los resultados
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los ProcesoAbogados' });
  }
};

export const eliminarProcesoAbogado = async (req, res) => {
    try {
        const { id_procesoabogado } = req.params;

        // Buscar la relación por ID
        const relacionExistente = await ProcesoAbogado.findOne({ id_procesoabogado });
        if (!relacionExistente) {
            return res.status(404).json({ message: 'Relación no encontrada' });
        }

        // Eliminar la relación
        await ProcesoAbogado.deleteOne({ id_procesoabogado });
        res.status(200).json({ message: 'Relación eliminada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la relación abogado-proceso' });
    }
};

