const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});

  const doc = {
    info: {
      version: '.1.0.0',            
      title: 'My Web API',              
      description: 'API documentation using Swagger'
    },
    servers: [
      {
        url: 'http://localhost:3000/api/message',
        description: '' 
      },
    ],
    tags: [                   
      {
        name: '',             
        description: ''       
      },
      // { ... }
    ],
    components: {} 
  };

  const outputFile = '../configuration/swagger.json';
  const routes = ['../message/messageRouter.ts'];


  swaggerAutogen(outputFile, routes, doc);
