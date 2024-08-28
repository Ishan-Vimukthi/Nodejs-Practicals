const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app

const app = express();

//connect to mongodb
const dbURI = "mongodb+srv://user2:user123@nodetute.gbzfj.mongodb.net/?retryWrites=true&w=majority&appName=NodeTute";
mongoose.connect(dbURI);

//register view engine
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

app.listen(3000);

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/', (req, res) => {

    res.redirect('/blogs')

});

app.get('/about', (req, res) => {

    res.render('about');
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((result) => {
            res.render('index', {title: 'All Blogs', blogs: result})
        })
        .catch((err) => {
            console.log(err);
        })
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/blogs/create', (req, res) =>{
    res.render('create');
});

app.use((req, res) => {
    res.status(404).render('404');
});