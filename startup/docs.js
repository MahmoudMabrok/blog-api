const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const winston = require('winston');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog API',
            version: '1.0.0',
            description: 'Blog API Documentation',
            contact: {
                name: 'API Support',
                email: 'support@example.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ],
        components: {
            schemas: {
                Login: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string',
                            description: 'The username of the user'
                        },
                        password: {
                            type: 'string',
                            description: 'The password of the user'
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.js', './routes/*.js'] // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
    winston.error('Swagger docs installed');
    
    app.use('/api-docs',
        swaggerUi.serve, 
        swaggerUi.setup(swaggerDocs, { explorer: true })
    );
};
