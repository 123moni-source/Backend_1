const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/medium_clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log('Connected to MongoDB...');
}).catch(err => {
  console.error('Error connecting to MongoDB...', err);
});

const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;


const express = require('express');
const router = express.Router();
const Article = require('../models/article');

// GET /articles - display all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: 'desc' });
    res.render('articles/index', { articles: articles });
  } catch {
    res.redirect('/');
  }
});

// GET /articles/new - display the form to create a new article

router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() });
});

// POST /articles - create a new article
router.post('/', async (req, res) => {
  const article = new Article({
    title: req.body.title,
    content: req.body.content
  });
  try {
    const newArticle = await article.save();
    res.redirect(`articles/${newArticle.id}`);
  } catch {
    res.render('articles/new', { article: article });
  }
});

// GET /articles/:id - display a single article
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.render('articles/show', { article: article });
  } catch {
    res.redirect('/');
  }
});

// GET /articles/:id/edit - display the form to edit an article
router.get('/:id/edit', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.render('articles/edit', { article: article });
  } catch {
    res.redirect('/');
  }
});

// PUT /articles/:id - update an article
router.put('/:id', async (req, res) => {
  let article;
  try {
    article = await Article.findById(req.params.id);
    article.title = req.body.title;
    article.content = req.body.content;
    await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch {
    if (article == null) {
      res.redirect('/');
    } else {
      res.render('articles/edit', { article: article });
    }
  }
});

// DELETE /articles/:id - delete an article
router.delete('/:id', async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/articles');
  } catch {
    res.redirect('/articles');
  }
});

module.export=router;



