import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { port } from "./config/connection.js"; // Conexión con la base de datos
import { swaggerJSDocs } from "./swagger.js"; // Documentación Swagger

// Importación de las rutas
import Abogadorouter from "./routes/AbogadoRoutes.js";
import roleRoutes from "./routes/RoleRoutes.js";
import usersRoutes from "./routes/UsersRoutes.js";
import AsistenteRouter from "./routes/AsistenteRoutes.js";
import ClienteRouter from "./routes/ClienteRoutes.js";
import ProcessRouter from "./routes/ProcessRoutes.js";
import tipoProcessRouter from "./routes/TipoProcessRoutes.js";
import subprocesoRouter from "./routes/SubProcessRoutes.js";
import DocEspRouter from "./routes/DocEspRoutes.js";
import facturaRouter from "./routes/FacturaRoutes.js";
import agendaRouter from "./routes/AgendaRoutes.js";
import procesoAbogadoRouter from "./routes/ProcessAbogadoRoutes.js";
import AutenticationRouter from "./routes/AutenticationRoutes.js";
import taskRouter from "./routes/TaskRoutes.js";

const app = express();

// Middleware para convertir de json a objetos javascript
app.use(express.json());

// Middleware para manejar datos URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Usando las rutas
app.use("/api/abogados", Abogadorouter);
app.use("/api/usuarios", usersRoutes);
app.use("/api/rols", roleRoutes);
app.use("/api/asistentes", AsistenteRouter);
app.use("/api/clientes", ClienteRouter);
app.use("/api/procesos", ProcessRouter);
app.use("/api/tipoprocesos", tipoProcessRouter);
app.use("/api/subprocesos", subprocesoRouter);
app.use("/api/docesp", DocEspRouter);
app.use("/api/facturas", facturaRouter);
app.use("/api/agendas", agendaRouter);
app.use("/api/procesoabogados", procesoAbogadoRouter);
app.use("/api/autenticacion", AutenticationRouter);
app.use("/api/tareas", taskRouter);

// Usamos el metodo para conectarnos a la BdD de mongoose
const clientOptions = {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};

// Rutas principales
app.get("/", (req, res) => {
  res.send("<h1>Bienvenido a mi API-WEB</h1>");
});

// Configurar Swagger para la documentación de la API
swaggerJSDocs(app, port);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
