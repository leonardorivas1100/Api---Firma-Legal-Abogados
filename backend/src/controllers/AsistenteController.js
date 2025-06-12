import Asistente from '../models/AsistenteModel.js';
import Usuario from '../models/UsersModel.js'; // Asegúrate de importar el modelo de Usuario

export const createAsistente = async (req, res) => {
  try {
    const { numeroIdentificacion } = req.body;  // Recibimos solo el numeroIdentificacion

    // Verificar si el usuario existe con el numeroIdentificacion
    const usuarioExistente = await Usuario.findOne({ numeroIdentificacion });
    if (!usuarioExistente) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado con ese número de identificación' });
    }

    // Verificar si ya existe un asistente con ese número de identificación
    const asistenteExistente = await Asistente.findOne({ numeroIdentificacion });
    if (asistenteExistente) {
      return res.status(400).json({ mensaje: 'Este usuario ya está registrado como asistente' });
    }

    // Crear el nuevo asistente
    const nuevoAsistente = new Asistente({
      numeroIdentificacion,
      usuario: usuarioExistente._id,  // Asociamos al usuario encontrado
    });

    await nuevoAsistente.save();
    res.status(201).json(nuevoAsistente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el asistente' });
  }
};



// Obtener un asistente por su número de identificación
export const getAsistente = async (req, res) => {
  try {
    const { numeroIdentificacion } = req.params;

    // Buscar al asistente por su número de identificación y poblar los datos del usuario
    const asistente = await Asistente.findOne({ numeroIdentificacion })
      .populate('usuario', 'nombres apellidos');  // Poblar solo los campos 'nombres' y 'apellidos' del usuario

    if (!asistente) {
      return res.status(404).json({ mensaje: 'Asistente no encontrado' });
    }

    res.status(200).json(asistente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el asistente' });
  }
};


// Actualizar un asistente
export const updateAsistente = async (req, res) => {
  try {
    const { numeroIdentificacion } = req.params;
    const { nuevoNumeroIdentificacion } = req.body;

    // Buscar el asistente por número de identificación
    const asistente = await Asistente.findOne({ numeroIdentificacion });
    if (!asistente) {
      return res.status(404).json({ mensaje: 'Asistente no encontrado' });
    }

    // Actualizar el número de identificación si se proporciona
    if (nuevoNumeroIdentificacion) {
      // Verificar si el nuevo número de identificación ya está asociado a otro asistente
      const asistenteExistente = await Asistente.findOne({ numeroIdentificacion: nuevoNumeroIdentificacion });
      if (asistenteExistente) {
        return res.status(400).json({ mensaje: 'Este número de identificación ya está asociado a otro asistente' });
      }
      
      asistente.numeroIdentificacion = nuevoNumeroIdentificacion;
    }

    // Guardar los cambios
    await asistente.save();
    res.status(200).json(asistente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el asistente' });
  }
};
