import Tarea from "../models/TaskModel.js";
import Proceso from "../models/ProcessModel.js";

export const crearTarea = async (req, res) => {
  try {
    const {
      id_tarea,
      titulo,
      descripcion,
      fecha,
      hora_inicio,
      hora_fin,
      estado,
      todo_el_dia,
      vincular_expediente,
      asociar_directorios,
      asignado_a,
      id_proceso,
      creado_por,
    } = req.body;

    // Verificar si ya existe una tarea con ese ID
    const tareaExistente = await Tarea.findOne({ id_tarea });
    if (tareaExistente) {
      return res.status(400).json({
        message: "Ya existe una tarea con ese ID",
        details: [`ID ${id_tarea} ya esta en uso`],
      });
    }

    // Validar estado correcto
    const estadosPermitidos = [
      "Pendiente",
      "En progreso",
      "Resultado",
      "En revisión",
    ];
    if (!estadosPermitidos.includes(estado)) {
      return res.status(400).json({
        message: "Estado no válido",
        details: [`El estado debe ser uno de: ${estadosPermitidos.join(", ")}`],
      });
    }

    // Si se asocia a un proceso, verificar que existe
    if (id_proceso) {
      const proceso = await Proceso.findOne({ id_proceso });
      if (!proceso) {
        return res.status(404).json({
          message: "Proceso no encontrado",
          details: [`No existe proceso con ID ${id_proceso}`],
        });
      }
    }

    // Crear la nueva tarea
    const nuevaTarea = new Tarea({
      id_tarea,
      titulo,
      descripcion,
      fecha: new Date(fecha), // Asegurar formato de fecha
      hora_inicio,
      hora_fin,
      estado,
      todo_el_dia,
      vincular_expediente,
      asociar_directorios,
      asignado_a,
      id_proceso,
      creado_por: creado_por || "Sistema", // Valor por defecto si no viene
    });

    await nuevaTarea.save();
    res.status(201).json({
      message: "Tarea creada exitosamente",
      tarea: nuevaTarea,
    });
  } catch (error) {
    console.error("Error detallado:", error);
    res.status(500).json({
      message: "Error al crear la tarea",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// Obtener todas las tareas con filtros
export const obtenerTodasTareas = async (req, res) => {
  try {
    const { estado, id_proceso, asignado_a } = req.query;
    let query = {};

    if (estado) query.estado = estado;
    if (id_proceso) query.id_proceso = id_proceso;
    if (asignado_a) query.asignado_a = asignado_a;

    const tareas = await Tarea.find(query).sort({ fecha: 1, hora_inicio: 1 });

    if (tareas.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(tareas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
};

// Obtener una tarea por ID
export const obtenerTareaPorId = async (req, res) => {
  try {
    const { id_tarea } = req.params;

    const tarea = await Tarea.findOne({ id_tarea });
    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    // Si tiene proceso asociado, obtener info del proceso
    let procesoInfo = null;
    if (tarea.id_proceso) {
      const proceso = await Proceso.findOne({ id_proceso: tarea.id_proceso });
      if (proceso) {
        procesoInfo = {
          id_proceso: proceso.id_proceso,
          descripcion: proceso.descripcion,
          estado: proceso.estado,
        };
      }
    }

    res.status(200).json({
      tarea,
      proceso: procesoInfo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la tarea" });
  }
};

// Actualizar una tarea
export const actualizarTarea = async (req, res) => {
  try {
    const { id_tarea } = req.params;
    const updateData = req.body;

    const tarea = await Tarea.findOne({ id_tarea });
    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    // Actualizar campos permitidos
    const camposPermitidos = [
      "titulo",
      "descripcion",
      "fecha",
      "hora_inicio",
      "hora_fin",
      "estado",
      "todo_el_dia",
      "vincular_expediente",
      "asociar_directorios",
      "asignado_a",
      "id_proceso",
    ];

    camposPermitidos.forEach((campo) => {
      if (updateData[campo] !== undefined) {
        tarea[campo] = updateData[campo];
      }
    });

    await tarea.save();
    res.status(200).json(tarea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la tarea" });
  }
};

// Eliminar una tarea
export const eliminarTarea = async (req, res) => {
  try {
    const { id_tarea } = req.params;

    const tarea = await Tarea.findOne({ id_tarea });
    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    await Tarea.deleteOne({ id_tarea });
    res.status(200).json({ message: "Tarea eliminada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la tarea" });
  }
};
