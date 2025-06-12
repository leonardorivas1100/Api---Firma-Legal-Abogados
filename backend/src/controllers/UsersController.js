import bcrypt from 'bcryptjs';
import Usuario from '../models/UsersModel.js';
import Rol from '../models/RoleModel.js';  
import Abogado from '../models/AbogadoModel.js';
import Asistente from '../models/AsistenteModel.js';
import Cliente from '../models/ClienteModel.js';

export const createUser = async (req, res) => {
  const { numeroIdentificacion, nombres, apellidos, telefono, email, password, id_rol } = req.body;

  try {
    // Verificamos si el rol existe en la base de datos usando el id_rol como número
    const role = await Rol.findOne({ id_rol }); // Buscar el rol por ID (usando el número)

    if (!role) {
      return res.status(400).json({ message: 'Rol no encontrado' });
    }

    // Verificamos si ya existe un usuario con el mismo correo o teléfono
    const existingUser = await Usuario.findOne({
      $or: [{ numeroIdentificacion }, { email }, { telefono }],
    });

    if (existingUser) {
      return res.status(400).json({ message: 'N. Identificación, correo o teléfono ya registrados' });
    }

    // Encriptamos la contraseña antes de guardar al usuario
    const hashedPassword = await bcrypt.hash(password, 10);

    // Si no hay duplicados, creamos el usuario
    const newUser = new Usuario({
      numeroIdentificacion,
      nombres,
      apellidos,
      telefono,
      email,
      password: hashedPassword, // Guardamos la contraseña encriptada
      id_rol,  // Guardamos el ID del rol (es un número)
    });

    // Guardamos el usuario en la base de datos
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado con éxito', data: newUser });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  //Obtener todos los usuarios
  export const getAllUsers = async (req, res) => {
    try {
      // Obtener todos los usuarios sin hacer uso de populate
      const users = await Usuario.find();
  
      // Obtener los roles para todos los usuarios
      const roles = await Rol.find(); // Obtener todos los roles disponibles
  
      // Asociar el nombre del rol con cada usuario
      const usersWithRoles = users.map(user => {
        const role = roles.find(r => r.id_rol === user.id_rol);  // Buscar el rol por id_rol (número)
        return {
          ...user.toObject(),
          rol: role ? role.nombre : null  // Si se encuentra, asignar el nombre del rol, si no, null
        };
      });
  
      res.status(200).json({ data: usersWithRoles });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
  };
  


 //Obtener un usuario por su número de identificación

 export const getUserById = async (req, res) => {
  const { numeroIdentificacion } = req.params;

  try {
    // Obtener el usuario por numeroIdentificacion
    const user = await Usuario.findOne({ numeroIdentificacion });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Obtener el rol correspondiente
    const role = await Rol.findOne({ id_rol: user.id_rol });

    // Responder con el usuario y su rol
    res.status(200).json({ 
      data: {
        ...user.toObject(),
        rol: role ? role.nombre : null  // Asignar el nombre del rol o null si no se encuentra
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { numeroIdentificacion } = req.params;
  const { nombres, apellidos, telefono, email, password, id_rol } = req.body;

  try {
    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({ numeroIdentificacion });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Asegurarse de que id_rol sea un número válido antes de proceder
    const validIdRol = Number(id_rol);  // Convertir id_rol a número

    if (isNaN(validIdRol)) {
      return res.status(400).json({ message: 'El rol debe ser un número válido.' });
    }

    // Verificar si el rol existe en la base de datos
    const role = await Rol.findOne({ id_rol: validIdRol });

    if (!role) {
      return res.status(400).json({ message: 'Rol no encontrado' });
    }

    // Si se proporciona una nueva contraseña, encriptarla antes de actualizar
    let updatedPassword = password;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10); // Encriptamos la nueva contraseña
    }

    // Actualizar los datos del usuario
    const userUpdate = await Usuario.updateOne(
      { numeroIdentificacion },
      { 
        $set: {
          nombres, 
          apellidos, 
          telefono, 
          email, 
          password: updatedPassword, // Guardamos la nueva contraseña encriptada si se proporcionó
          id_rol: validIdRol  // Guardar el id_rol como número válido
        }
      }
    );

    if (userUpdate.matchedCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/// Eliminar un usuario por su número de identificación
export const deleteUser = async (req, res) => {
  const { numeroIdentificacion } = req.params;

  try {
    // Buscar al usuario por su numeroIdentificacion
    const usuario = await Usuario.findOne({ numeroIdentificacion });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Eliminar abogado si existe
    const abogado = await Abogado.findOne({ numeroIdentificacion });
    if (abogado) {
      await Abogado.deleteOne({ _id: abogado._id });
    }

    // Eliminar asistente si existe
    const asistente = await Asistente.findOne({ numeroIdentificacion });
    if (asistente) {
      await Asistente.deleteOne({ _id: asistente._id });
    }

    // Eliminar cliente si existe
    const cliente = await Cliente.findOne({ numeroIdentificacion });
    if (cliente) {
      await Cliente.deleteOne({ _id: cliente._id });
    }

    // Eliminar el usuario
    await Usuario.deleteOne({ numeroIdentificacion });

    res.status(200).json({ message: 'Usuario y sus relaciones eliminados correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario y las relaciones asociadas', error: error.message });
  }
};
