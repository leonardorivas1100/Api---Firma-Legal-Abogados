import Cliente from '../models/ClienteModel.js';
import Usuario from '../models/UsersModel.js';

// Controlador para crear cliente
export const crearCliente = async (req, res) => {
  try {
    const { numeroIdentificacion, direccion, estado, estado_cliente } = req.body;

    // Verificar si el número de identificación está presente
    if (!numeroIdentificacion) {
      return res.status(400).json({ mensaje: 'El número de identificación es obligatorio' });
    }

    // Verificar si el usuario con ese número de identificación existe
    const usuarioExistente = await Usuario.findOne({ numeroIdentificacion });
    if (!usuarioExistente) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado con ese número de identificación' });
    }

    // Verificar si ya existe un cliente con ese número de identificación
    const clienteExistente = await Cliente.findOne({ numeroIdentificacion });
    if (clienteExistente) {
      return res.status(400).json({ mensaje: 'Este usuario ya está registrado como cliente con ese número de identificación' });
    }

    // Crear el nuevo cliente
    const nuevoCliente = new Cliente({
      numeroIdentificacion,
      direccion,
      estado,
      estado_cliente,
      usuario: usuarioExistente._id  // Asociar al usuario
    });

    // Guardar el cliente en la base de datos
    await nuevoCliente.save();
    res.status(201).json(nuevoCliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el cliente' });
  }
};


// Endpoint para obtener un cliente
export const getCliente = async (req, res) => {
  try {
    const { numeroIdentificacion } = req.params;
    const cliente = await Cliente.findOne({ numeroIdentificacion }).populate('usuario', 'nombres apellidos');

    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    res.status(200).json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el cliente' });
  }
};

// Controlador para obtener todos los clientes
export const getClientes = async (req, res) => {
  try {
    // Obtener todos los clientes
    const clientes = await Cliente.find().populate('usuario', 'nombres apellidos');

    // Si no hay clientes, devolver un array vacío 
    if (!clientes) {
      return res.status(200).json([]);
    }

    res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los clientes' });
  }
};





// Actualizar los datos de un cliente
export const updateCliente = async (req, res) => {
  try {
    const { numeroIdentificacion } = req.params;
    const { direccion, estado, estado_cliente } = req.body;

    // Buscar al cliente por número de identificación
    const cliente = await Cliente.findOne({ numeroIdentificacion });
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    // Actualizar el cliente con los nuevos datos
    cliente.direccion = direccion || cliente.direccion;
    cliente.estado = estado || cliente.estado;
    cliente.estado_cliente = estado_cliente || cliente.estado_cliente;

    await cliente.save();
    res.status(200).json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el cliente' });
  }
};
