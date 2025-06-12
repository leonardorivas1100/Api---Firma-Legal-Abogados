import Subproceso from '../models/SubProcessModel.js';
import TipoProcess from '../models/TipoProcessModel.js';

// Crear subproceso
export const crearSubproceso = async (req, res) => {
  try {
    const { id_subproceso, id_tipo, nombre } = req.body;

    const tipoExistente = await TipoProcess.findOne({ id_tipo });
    if (!tipoExistente) {
      return res.status(400).json({ message: 'El tipo de proceso no existe.' });
    }

    const existeSubproceso = await Subproceso.findOne({ id_tipo, nombre });
    if (existeSubproceso) {
      return res.status(400).json({ message: 'Este subproceso ya existe para este tipo.' });
    }

    const nuevoSubproceso = new Subproceso({
      id_subproceso, 
      id_tipo,        
      nombre,         
    });

    await nuevoSubproceso.save();

    res.status(201).json({ message: 'Subproceso creado exitosamente', subproceso: nuevoSubproceso });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el subproceso', error });
  }
};

// Obtener todos los subprocesos
export const obtenerSubprocesos = async (req, res) => {
  try {
    const subprocesos = await Subproceso.find();
    res.status(200).json(subprocesos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los subprocesos', error });
  }
};

// Obtener un subproceso por id_subproceso
export const obtenerSubproceso = async (req, res) => {
  try {
    const { id_subproceso } = req.params;
    const subproceso = await Subproceso.findOne({ id_subproceso });

    if (!subproceso) {
      return res.status(404).json({ message: 'Subproceso no encontrado' });
    }

    res.status(200).json(subproceso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el subproceso', error });
  }
};

// Obtener subprocesos por id_tipo
export const obtenerSubprocesosPorTipo = async (req, res) => {
  try {
    const { id_tipo } = req.params;

    if (isNaN(id_tipo)) {
      return res.status(400).json({ message: "El parámetro id_tipo debe ser un número válido." });
    }

    const subprocesos = await Subproceso.find({ id_tipo: Number(id_tipo) });

    res.status(200).json(subprocesos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener subprocesos", error });
  }
};


// Eliminar subproceso por id_subproceso
export const eliminarSubproceso = async (req, res) => {
  try {
    const { id_subproceso } = req.params;
    const subproceso = await Subproceso.findOneAndDelete({ id_subproceso });

    if (!subproceso) {
      return res.status(404).json({ message: 'Subproceso no encontrado' });
    }

    res.status(200).json({ message: 'Subproceso eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el subproceso', error });
  }
};
