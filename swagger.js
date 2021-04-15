const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json';
const endpointsFiles = ['./router/router.js'];
const doc = {
    info: {
        version: "1.0.0",
        title: "Todo List Api's",
        description: "Todo List Api's In Node Backend"
    },
    host: "localhost:5000",
    basePath: "/api",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [],
    securityDefinitions: {
        Bearer: {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header",
            "description": "Enter your bearer token in the format **Bearer &lt;token>**"
        },
        oAuthSample: {
            type: "oauth2",
            authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
            flow: "implicit",
            scopes: {
                read_pets: "read your pets",
                write_pets: "modify pets in your account"
            }
        }
    },
    security: [
        {
          ApiKeyAuth: []
        }
      ],
}
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js')
})