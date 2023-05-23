if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const v1Router = require('./routes/v1/index');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ExpressError = require('./utilities/ExpressError');
const { errorConverter, errorHandler } = require('./middlewares/error');
const httpStatus = require('http-status');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');
const url = process.env.MONGO_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/web-api-cw';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => { 
        console.log('Hello from the DB');
    })
    .catch((err) => { 
        console.log('Connection failed!',err);
    })
mongoose.set('strictQuery', false);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/v1', v1Router);

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Trip API Home Page');
});

app.use('/ping', (req, res) => {
    // log the method and the body
    console.log(req.method, req.body);
    res.status(200).send('Welcome to the Trip API test Page');
});

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Safarny API',
            version: '1.0.0',
            description: 'Safarny API',
        },
        servers: [
            {
                url: 'http://localhost:8080/v1',
            },
        ],
    },
    apis: ['./routes/v1/*.js'],
};

const specs = swaggerJsDoc(options);
app.use('/swagger.json', (_req, res) => res.json(specs));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, {swaggerOptions: {url: '/swagger.json'}}));







app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', httpStatus.NOT_FOUND));
})
app.use(errorConverter);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
    });