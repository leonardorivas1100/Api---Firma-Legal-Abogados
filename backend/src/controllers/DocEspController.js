import DocEsp from "../models/DocEspModel.js";
import Subproceso from "../models/SubProcessModel.js";

// Crear un nuevo DocEsp para el TipoProcess
export const crearDocEsp = async (req, res) => {
    try {
        const { id_docesp, id_subproceso, nombre } = req.body;

        // Verificar si el Subproceso existe
        const subprocesoExistente = await Subproceso.findOne({ id_subproceso });
        if (!subprocesoExistente) {
            return res.status(400).json({ message: 'El Subproceso no existe' });
        }

        // Verificar si el DocEsp ya existe
        const existeDocEsp = await DocEsp.findOne({ id_docesp });
        if (existeDocEsp) {
            return res.status(400).json({ message: 'El Documento Especifico ya existe con este ID' });
        }

        // Crear nuevo DocEsp
        const nuevoDocEsp = new DocEsp({
            id_docesp,
            id_subproceso,
            nombre
        });

        await nuevoDocEsp.save();

        // Responder con éxito
        res.status(201).json({
            message: 'Documento Especifico creado exitosamente',
            documento: nuevoDocEsp
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el Documento Especifico', error: error.message });
    }
};

// Obtener todos los DocEsp
export const obtenerDocEsp = async (req, res) => {
    try {
        const docEsp = await DocEsp.find();
        res.status(200).json(docEsp); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los Documentos Especificos', error: error.message });
    }
};

// Obtener un DocEsp por id
export const obtenerDocEspId = async (req, res) => {
    try {
        const { id_docesp } = req.params;
        const docEsp = await DocEsp.findOne({ id_docesp });

        if (!docEsp) {
            return res.status(404).json({ message: 'Documento Especifico no encontrado' });
        }

        res.status(200).json(docEsp);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el Documento Especifico', error: error.message });
    }
};

// Obtener documentos basados en el subproceso
export const obtenerDocEspPorSubproceso = async (req, res) => {
    try {
      const { id_subproceso } = req.params;
  
      console.log('ID del Subproceso:', id_subproceso);
  
      // Buscar documentos en la base de datos
      const documentos = await DocEsp.find({ id_subproceso });
  
      console.log('Documentos encontrados:', documentos);
  
      if (!documentos || !documentos.length) {
        return res.status(404).json({ message: 'No se encontraron documentos para este subproceso' });
      }
  
      res.status(200).json(documentos);
  
    } catch (error) {
      console.error('Error al obtener documentos:', error.message);
      res.status(500).json({ message: 'Error al obtener los Documentos Específicos', error: error.message });
    }
  };
  


// Eliminar DocEsp por id
export const eliminarDocEsp = async (req, res) => {
    try {
        const { id_docesp } = req.params;
        const docEsp = await DocEsp.findOneAndDelete({ id_docesp });

        if (!docEsp) {
            return res.status(404).json({ message: 'Documento Especifico no encontrado' });
        }

        res.status(200).json({ message: 'Documento Especifico eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el Documento Especifico', error: error.message });
    }
};
