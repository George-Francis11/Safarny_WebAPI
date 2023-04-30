if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const tripRouter = require('./routes/trip');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ExpressError = require('./utilities/ExpressError');

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



app.use('/trips', tripRouter);


app.get('/', (req, res) => {
    res.send('Hello World!');
});
    


app.get('/currency', (req, res) => {
    res.send('The current exchange rate is 1 USD to 0.82 EUR.');
});

app.get('/food', (req, res) => {
    res.send('The current food is pizza.');
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404));
})


app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Error found' } = err;
    if (!err.message) err.message = 'Something went wrong';
    if (!err.statusCode) err.statusCode = 500;
    res.status(statusCode).json({ 'error': { err }});
 })



app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
    });