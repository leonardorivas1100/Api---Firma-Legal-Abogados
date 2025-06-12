import Agenda from "../models/AgendaModel.js";
import Proceso from "../models/ProcessModel.js";

// Controlador para crear una agenda
export const crearAgenda = async (req, res) => {
  try {
    const { fecha, hora, descripcion, estado, id_proceso } = req.body;

    // Verificamos si existe el proceso
    const proceso = await Proceso.findOne({ id_proceso });
    console.log("Proceso encontrado:", proceso); // Depuración clave

    if (!proceso) {
      return res.status(404).json({ message: "Proceso no encontrado" });
    }

    // Generar el próximo id_agenda automáticamente
    const ultimaAgenda = await Agenda.findOne().sort({ id_agenda: -1 });
    const nuevoIdAgenda = ultimaAgenda ? ultimaAgenda.id_agenda + 1 : 1;

    console.log("Nuevo ID de agenda generado:", nuevoIdAgenda);

    // Crear la agenda
    const nuevaAgenda = new Agenda({
      id_agenda: nuevoIdAgenda,
      fecha,
      hora,
      descripcion,
      estado,
      id_proceso,
    });

    // Guardar la agenda en la base de datos
    await nuevaAgenda.save();
    res.status(201).json(nuevaAgenda);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la agenda" });
  }
};

// Controlador para editar una agenda
export const editarAgenda = async (req, res) => {
  console.log("Cuerpo de la petición (req.body):", req.body); // <--- Aquí la depuración
  try {
    const { id_agenda } = req.params;
    const { fecha, hora, descripcion, estado, id_proceso } = req.body;

    // Buscar la agenda por ID
    const agenda = await Agenda.findOne({ id_agenda });
    if (!agenda) {
      return res.status(404).json({ message: "Agenda no encontrada" });
    }

    // Actualizar los campos de la agenda con los valores proporcionados
    if (fecha) agenda.fecha = fecha;
    if (hora) agenda.hora = hora;
    if (descripcion) agenda.descripcion = descripcion;
    if (estado) agenda.estado = estado;
    if (id_proceso) agenda.id_proceso = id_proceso;

    // Guardar los cambios en la base de datos
    await agenda.save();
    res.status(200).json(agenda);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al editar la agenda" });
  }
};

// Controlador para obtener una agenda por ID
export const getAgenda = async (req, res) => {
  try {
    const { id_agenda } = req.params;

    // Buscar la agenda por ID
    const agenda = await Agenda.findOne({ id_agenda });
    if (!agenda) {
      return res.status(404).json({ message: "Agenda no encontrada" });
    }

    // Obtener el proceso correspondiente
    const proceso = await Proceso.findOne({ id_proceso: agenda.id_proceso });
    if (!proceso) {
      return res
        .status(404)
        .json({ message: "Proceso asociado no encontrado" });
    }

    // Devolver la agenda junto con los detalles del proceso
    res.status(200).json({
      agenda,
      proceso: {
        id_proceso: proceso.id_proceso,
        descripcion: proceso.descripcion,
        fecha_inicio: proceso.fecha_inicio,
        estado: proceso.estado,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la agenda" });
  }
};

// Controlador para obtener todas las agendas

export const getAllAgendas = async (req, res) => {
  try {
    const { estado, id_proceso } = req.query;
    let query = {};

    if (estado) query.estado = estado;
    if (id_proceso) query.id_proceso = id_proceso;

    const agendas = await Agenda.find(query);

    if (agendas.length === 0) {
      return res.status(200).json([]);
    }

    // Construir respuesta con descripcion del proceso y numeroIdentificacionCliente
    const agendasConProceso = await Promise.all(
      agendas.map(async (agenda) => {
        const proceso = await Proceso.findOne({
          id_proceso: agenda.id_proceso,
        });
        return {
          _id: agenda._id,
          id_agenda: agenda.id_agenda,
          fecha: agenda.fecha,
          hora: agenda.hora,
          descripcion: agenda.descripcion,
          estado: agenda.estado,
          procesoDescripcion: proceso ? proceso.descripcion : null,
          numeroIdentificacionCliente: proceso
            ? proceso.numeroIdentificacionCliente
            : null,
          numeroIdentificacionAbogado: proceso
            ? proceso.numeroIdentificacionAbogado
            : null,
          createdAt: agenda.createdAt,
          updatedAt: agenda.updatedAt,
          __v: agenda.__v,
        };
      })
    );

    res.status(200).json({
      mesage: "Agendas obtenidas con éxito",
      agendasConProceso,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las agendas" });
  }
};

// Controlador para eliminar una agenda
export const eliminarAgenda = async (req, res) => {
  try {
    const { id_agenda } = req.params;

    // Buscar la agenda por id_agenda
    const agendaExistente = await Agenda.findOne({ id_agenda });

    if (!agendaExistente) {
      return res.status(404).json({ message: "Agenda no encontrada" });
    }

    // Eliminar la agenda
    await Agenda.deleteOne({ id_agenda });

    res.status(200).json({ message: "Agenda eliminada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la agenda" });
  }
};

// Controlador para obtener agendas por número de identificación del ABOGADO
export const getAgendasByIdentificacionAbogado = async (req, res) => {
  try {
    const { numeroIdentificacionAbogado } = req.params;
    console.log("Parámetros completos:", req.params); // Depuración clave

    // Validación y limpieza del parámetro
    const numeroAbogado = numeroIdentificacionAbogado.trim();
    if (!numeroAbogado) {
      return res.status(400).json({
        message: "Número de identificación inválido",
      });
    }

    // Buscar procesos donde el abogado tenga ese número de identificación
    console.log("Buscando abogado con número:", numeroAbogado);
    const procesos = await Proceso.find({
      numeroIdentificacionAbogado: numeroIdentificacionAbogado.trim(),
    });
    console.log("Procesos encontrados:", procesos);

    if (procesos.length === 0) {
      return res.status(200).json({
        message: "No se encontraron procesos para este abogado",
      });
    }

    // Obtener los IDs de los procesos encontrados
    const idsProcesos = procesos.map((proceso) => proceso.id_proceso);

    // Buscar agendas asociadas a esos procesos
    const agendas = await Agenda.find({
      id_proceso: { $in: idsProcesos },
    });

    // Construir respuesta con detalles combinados (igual que getAllAgendas)
    const agendasConProceso = await Promise.all(
      agendas.map(async (agenda) => {
        const proceso = procesos.find(
          (p) => String(p.id_proceso) === String(agenda.id_proceso) // ← Conversión a string
        );
        return {
          _id: agenda._id,
          id_agenda: agenda.id_agenda,
          fecha: agenda.fecha,
          hora: agenda.hora,
          descripcion: agenda.descripcion,
          estado: agenda.estado,
          procesoDescripcion:
            proceso && proceso.descripcion ? proceso.descripcion : "", // numeroIdentificacionCliente:
          // proceso?.numeroIdentificacionCliente || null,
          numeroIdentificacionAbogado: numeroIdentificacionAbogado,
          createdAt: agenda.createdAt,
          updatedAt: agenda.updatedAt,
          __v: agenda.__v,
        };
      })
    );

    res.status(200).json(agendasConProceso);
    console.log("AGENDAMIENTO CON CITAS UBICADAS CON NUMERO DE IDENTIFICACION");
    // Agrega esto después de encontrar los procesos:
    console.log(
      "Descripciones de procesos:",
      procesos.map((p) => p.descripcion)
    );
    console.log("IDs de Procesos:", idsProcesos);
    console.log(
      "IDs en Agendas:",
      agendas.map((a) => a.id_proceso)
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al buscar agendas por identificación del abogado",
      error: error.message,
    });
  }
};
