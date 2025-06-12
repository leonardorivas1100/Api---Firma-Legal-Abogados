import TipoProcess from '../models/TipoProcessModel.js'; 

// Obtener todos los tipos de procesos
export const obtenerTodosTipoProcess = async (req, res) => {
  try {
    const tipos = await TipoProcess.find(); // No necesitas parámetros aquí
    res.status(200).json(tipos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los tipos de proceso' });
  }
};

// Obtener un tipo de proceso por ID
export const obtenerTipoProcessPorId = async (req, res) => {
  try {
    const { id_tipo } = req.params;
    const tipo = await TipoProcess.findOne({ id_tipo });

    if (!tipo) {
      return res.status(404).json({ mensaje: 'Tipo de proceso no encontrado' });
    }

    res.status(200).json(tipo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el tipo de proceso' });
  }
};

// Crear un nuevo tipo de proceso
export const crearTipoProcess = async (req, res) => {
  try {
    const { id_tipo, nombre } = req.body;

    // Verificar si el tipo de proceso ya existe
    const tipoExistente = await TipoProcess.findOne({ id_tipo });
    if (tipoExistente) {
      return res.status(400).json({ mensaje: 'El tipo de proceso con ese ID ya existe' });
    }

    // Crear el nuevo tipo de proceso
    const nuevoTipo = new TipoProcess({ id_tipo, nombre });
    await nuevoTipo.save();

    res.status(201).json(nuevoTipo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el tipo de proceso' });
  }
};

// Eliminar un tipo de proceso
export const eliminarTipoProcess = async (req, res) => {
  try {
    const { id_tipo } = req.params;

    // Verificar si el tipo de proceso existe
    const tipoExistente = await TipoProcess.findOne({ id_tipo });
    if (!tipoExistente) {
      return res.status(404).json({ mensaje: 'Tipo de proceso no encontrado' });
    }

    // Eliminar el tipo de proceso
    await TipoProcess.deleteOne({ id_tipo });
    res.status(200).json({ mensaje: 'Tipo de proceso eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el tipo de proceso' });
  }
};