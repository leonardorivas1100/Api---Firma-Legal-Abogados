import Rol from '../models/RoleModel.js';  // Importar el modelo Rol

// Controlador para crear un rol
const createRole = async (req, res) => {
  try {
    const { id_rol, nombre } = req.body;

    // Verificar si el rol ya existe
    const rolExistente = await Rol.findOne({ id_rol });
    if (rolExistente) {
      return res.status(400).json({ mensaje: 'Ya existe un rol con ese ID' });
    }

    // Crear el nuevo rol
    const nuevoRol = new Rol({ id_rol, nombre });

    // Guardar el rol en la base de datos
    await nuevoRol.save();
    res.status(201).json({ mensaje: 'Rol creado exitosamente', rol: nuevoRol });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el rol', error: error.message });
  }
};

// Obtener todos los roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Rol.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los roles', error: error.message });
  }
};

// Obtener un rol por su ID
const getRoleById = async (req, res) => {
  try {
    const { id } = req.params; // Aquí 'id' es el parámetro de la ruta

    // Convertir el id a un número
    const id_rol = Number(id);

    // Verificar si la conversión fue exitosa
    if (isNaN(id_rol)) {
      return res.status(400).json({ message: 'El ID del rol debe ser un número válido' });
    }

    const rol = await Rol.findOne({ id_rol }); // Realizamos la consulta con el id_rol como número

    if (!rol) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    res.status(200).json(rol);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el rol', error: error.message });
  }
};




// Actualizar un rol
const updateRole = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el id del parámetro de la ruta
    const { nombre } = req.body; // Obtener el nuevo nombre del rol

    // Convertir el id a número
    const id_rol = Number(id);

    // Verificar si el id es un número válido
    if (isNaN(id_rol)) {
      return res.status(400).json({ message: 'El ID del rol debe ser un número válido' });
    }

    // Buscar y actualizar el rol
    const rolActualizado = await Rol.findOneAndUpdate(
      { id_rol }, // Buscar por id_rol (número)
      { nombre }, // Actualizar el nombre
      { new: true } // Devuelve el documento actualizado
    );

    if (!rolActualizado) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    res.status(200).json({ message: 'Rol actualizado', rol: rolActualizado });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el rol', error: error.message });
  }
};

// Eliminar un rol
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el id del parámetro de la ruta

    // Convertir el id a número
    const id_rol = Number(id);

    // Verificar si el id es un número válido
    if (isNaN(id_rol)) {
      return res.status(400).json({ message: 'El ID del rol debe ser un número válido' });
    }

    // Eliminar el rol
    const rolEliminado = await Rol.findOneAndDelete({ id_rol });

    if (!rolEliminado) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    res.status(200).json({ message: 'Rol eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el rol', error: error.message });
  }
};


// Exportar las funciones
export default { createRole, getAllRoles, getRoleById, updateRole, deleteRole };
