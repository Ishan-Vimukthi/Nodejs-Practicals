const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// Express app
const app = express();

// MongoDB connection URI
const dbURI = "mongodb+srv://user2:user123@nodetute.gbzfj.mongodb.net/Node_Tute?retryWrites=true&w=majority&appName=NodeTute";

// Connect to MongoDB with options
mongoose.connect(dbURI, {
  useNewUrlParser: true, // Use the new MongoDB URL parser
  useUnifiedTopology: true, // Use the new MongoDB topology engine
  tls: true, // Enable TLS/SSL
  tlsInsecure: false, // Ensure secure connection (set to true if you want to bypass SSL verification)
})
  .then((result) => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Register view engine
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  });

  blog.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'All Blogs', blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);

  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => {
      res.status(404).render('404', { title: 'Blog not found' });
    });
});

app.get('/blogs/create', (req, res) => {
  res.render('create');
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page not found' });
});
