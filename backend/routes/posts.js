const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Create a post
router.post('/', auth, async (req, res) => {
  const { content } = req.body;
  try {
    const post = new Post({ user: req.user.id, content });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;