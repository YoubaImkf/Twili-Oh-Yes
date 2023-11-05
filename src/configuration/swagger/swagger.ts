const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});
require('dotenv').config();

const baseURL = process.env.NGROK_BASE_URL || 'http://localhost:3000';

  const doc = {
    info: {
      version: '1.0.0',        
      title: 'My Web API',  
      description: 'API documentation using Swagger'
    },
    servers: [
      {
        url: `${baseURL}/api/message`, 
        description: ''
      },

    ],
    tags: [  
      {
        name: '',
        description: '' 
      },
    ],
    components: {}
  };

  const outputFile = './swagger.json';
  const routes = ['../../message/message-router.ts'];


  swaggerAutogen(outputFile, routes, doc);
