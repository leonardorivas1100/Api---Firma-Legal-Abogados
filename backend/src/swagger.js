import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

// Configuración de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API con conexión a MongoDB',
      version: '1.0.0',
      description: 'Ejemplo de API con MongoDB para gestionar usuarios, abogados, asistentes, clientes, roles y facturas',
      contact: {
        name: 'API Support',
        email: 'supportADSO@example.com',
      },
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'Se utiliza para autenticar las peticiones mediante JWT.',
        }
      },
    },
    security: [
      { BearerAuth: [] }, // Esto asegura que la autenticación se aplica a todas las rutas de forma global
    ],
  },
  apis: [
    './src/routes/AutenticationRoutes.js',
    './src/routes/RoleRoutes.js',
    './src/routes/UsersRoutes.js',
    './src/routes/AbogadoRoutes.js',
    './src/routes/AsistenteRoutes.js',
    './src/routes/ClienteRoutes.js',
    './src/routes/ProcessRoutes.js',
    './src/routes/TipoProcessRoutes.js',
    './src/routes/SubProcessRoutes.js', 
    './src/routes/DocEspRoutes.js', 
    './src/routes/FacturaRoutes.js', 
    './src/routes/AgendaRoutes.js',
    './src/routes/ProcessAbogadoRoutes.js'
  ]
};


const swaggerSpec = swaggerJSDoc(options);

const swaggerJSDocs = (app, port) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.log(
    `Versión No 1 de la documentación estará disponible en http://localhost:${port}/api-docs`
  );
};

export { swaggerJSDocs };
