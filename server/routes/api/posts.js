const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Post = require('../../models/Post');
const { check, validationResult } = require('express-validator');

//Add a post data
//Endpoint api/posts/
router.post(
  '/',
  [auth, check('text', 'Text is required').not().isEmpty()],
  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        const post = await newPost.save();
        res.json(post)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//Get all post data
//Endpoint api/posts/
router.get('/', auth, async (req, res) => {
    try {
      const posts = await Post.find().sort({date: -1})
      res.json(posts);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

//Get a post data
//Endpoint api/posts/:id
router.get('/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)

      if(!post) {
        return res.status(400).json({ msg: 'Post not found' });
      }
      
      res.json(post);

    } catch (err) {
      console.error(err.message);
      if(error.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Post not found' });
      }
      res.status(500).send('Server Error');
    }
});

//Delete a post data
//Endpoint api/posts/:id
router.delete('/:id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)

      if(!post) {
        return res.status(400).json({ msg: 'Post not found' });
      }

      if(post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User is not authorised' }); 
      }

      await post.remove();
      
      res.json({ msg: 'Post deleted successfully' });

    } catch (err) {
      console.error(err.message);
      if(err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'Post not found' });
      }
      res.status(500).send('Server Error');
    }
});

module.exports = router;
