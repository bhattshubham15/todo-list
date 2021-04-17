const express = require('express');
const bodyParser = require('body-parser');
const mainRoutes = require('./router/router');
require("dotenv").config();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Project Support',
    });
});
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/api', mainRoutes);

app.listen(5000, () => {
    console.log(`port is listening on ${process.env.APP_PORT}`);
});

