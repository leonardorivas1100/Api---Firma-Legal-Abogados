import Abogado from '../models/AbogadoModel.js';
import Usuario from '../models/UsersModel.js';

// 1. Controlador para crear un abogado
export const crearAbogado = async (req, res) => {
  try {
    const { numeroIdentificacion, especialidad, area_juridica, experiencia } = req.body;

    // Verificar si el número de identificación está presente
    if (!numeroIdentificacion) {
      return res.status(400).json({ 
        Request_failed: 'El número de identificación es obligatorio' });
    }
    
    // Verificar si el usuario con ese número de identificación existe
    const usuarioExistente = await Usuario.findOne({ numeroIdentificacion });
    if (!usuarioExistente) {
      return res.status(404).json({ 
        Request_failed: `Usuario no encontrado con el número de identificación: ${numeroIdentificacion}`});
    }

    // Verificar si ya existe un abogado con ese número de identificación
    const abogadoExistente = await Abogado.findOne({ numeroIdentificacion });
    if (abogadoExistente) {
      return res.status(400).json({ 
        Request_failed: `Este usuario ya está registrado como abogado con el numero de identificacion: ${numeroIdentificacion}`  });
    }

    // Crear el nuevo abogado
    const nuevoAbogado = new Abogado({
      numeroIdentificacion,
      especialidad,
      area_juridica,
      experiencia,
      usuario: usuarioExistente._id  // Asociar el usuario con el ObjectId del usuario existente
    });

    // Guardar el abogado en la base de datos
    await nuevoAbogado.save();
    res.status(201).json({
      Request_success: '¡Abogado creado exitosamente!',
      nuevoAbogado
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      Request_failed: 'Error al crear el abogado!' });
  }
};


// 2. Controlador para obtener un abogado
export const getAbogado = async (req, res) => {
  try {
    const { numeroIdentificacion } = req.params;
    const abogado = await Abogado.findOne({ numeroIdentificacion }).populate('usuario', 'nombres apellidos');

    if (!abogado) {
      return res.status(404).json({ 
      Request_failed: `No se encontro un abogado con el numero de identificacion: ${numeroIdentificacion}` });
    }

    res.status(200).json({
      Request_success: 'Abogado encontrado exitosamente!',
      Lawyer_found:
      abogado
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      Request_failed: 'Error al obtener el abogado!' });
  }
};

// 3. Controlador para actualizar un abogado
export const updateAbogado = async (req, res) => {
  try {
    const { numeroIdentificacion } = req.params;
    const { especialidad, area_juridica, experiencia, usuario } = req.body;

    // Buscar el abogado por número de identificación
    const abogado = await Abogado.findOne({ numeroIdentificacion });
    if (!abogado) {
      return res.status(404).json({ 
        Request_failed: 'Abogado no encontrado' });
    }

    // Actualizar el abogado con los nuevos datos
    abogado.especialidad = especialidad || abogado.especialidad;
    abogado.area_juridica = area_juridica || abogado.area_juridica;
    abogado.experiencia = experiencia || abogado.experiencia;
    abogado.usuario = usuario || abogado.usuario;

    await abogado.save();
    res.status(200).json({Request_success: 'Abogado actualizado exitosamente!'}
      

    )

  } catch (error) {
    console.error(error);
    res.status(500).json({ Request_failed: 'Error al actualizar el abogado' });
  }
};
