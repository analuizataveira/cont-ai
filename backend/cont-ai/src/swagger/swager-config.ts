import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Finance Records API',
      description: 'API para gerenciamento de registros financeiros',
      version: ''
    },
    servers: [
      {
        url: process.env.API_BASE_URL || 'http://localhost:3000',
        description: process.env.NODE_ENV === 'production' 
          ? 'Production server' 
          : 'Local server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], 
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express) {
  // Configuração do Swagger UI
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "Finance API Documentation",
    customCss: '.swagger-ui .topbar { display: none }',
    customfavIcon: '/public/favicon.ico'
  }));

  // Endpoint para o JSON bruto
  app.get('/docs-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

}

export default swaggerDocs;