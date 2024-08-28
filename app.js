const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// express app

const app = express();

//connect to mongodb
const dbURI = "mongodb+srv://user2:user123@nodetute.gbzfj.mongodb.net/?retryWrites=true&w=majority&appName=NodeTute";
mongoose.connect(dbURI);

//register view engine
app.set('view engine', 'ejs');

app.listen(3000);

app.get('/', (req, res) => {

    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Sample words for testing'},
        {title: 'Yoshi finds eggs', snippet: 'Sample words for testing'},
        {title: 'Yoshi finds eggs', snippet: 'Sample words for testing'},
    ];
    res.render('index', {blogs});

});

app.get('/about', (req, res) => {

    res.render('about');
});

app.get('/blogs/create', (req, res) =>{
    res.render('create');
});

app.use((req, res) => {
    res.status(404).render('404');
});