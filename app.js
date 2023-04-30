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

mongoose.connect('mongodb://127.0.0.1:27017/web-api-cw', { useNewUrlParser: true, useUnifiedTopology: true})
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

app.use('/v1', v1Router);

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Trip API Home Page');
});


app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', httpStatus.NOT_FOUND));
})

app.use(errorConverter);

app.use(errorHandler);


app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
    });