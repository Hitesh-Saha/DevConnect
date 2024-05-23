import User from "../models/User.js";
import Post from "../models/Post.js";
import { validationResult } from "express-validator";

const raiseError = (err) => {
  console.error(err.message);
  if (err.kind == "ObjectId") {
    return res.status(400).json({ msg: "Post not found" });
  }
  return res.status(500).send("Server Error");
};

const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById(req.user.id).select("-password");

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });

    const post = await newPost.save();
    return res.status(200).json(post);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    return res.status(200).json(posts);
  } catch (err) {
    raiseError(err);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({ msg: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (err) {
    raiseError(err);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({ msg: "Post not found" });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User is not authorised" });
    }
    await post.remove();
    return res.status(200).json({ msg: "Post deleted successfully" });
  } catch (err) {
    raiseError(err);
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    } else {
      post.likes.unshift({ user: req.user.id });
      await post.save();
    }
    return res.status(200).json(post.likes);
  } catch (err) {
    raiseError(err);
  }
};

const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not been liked" });
    } else {
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);
      post.likes.splice(removeIndex, 1);
      await post.save();
    }

    return res.status(200).json(post.likes);
  } catch (err) {
    raiseError(err);
  }
};

const addComment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.id);

    const newComment = {
      user: req.user.id,
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
    };

    post.comments.unshift(newComment);
    await post.save();

    return res.status(200).json(post);
  } catch (err) {
    raiseError(err);
  }
};

const removeComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: "Post not found" });
    }

    const comment = post.comments.find(
      (comment) => comment.id.toString() === req.params.comment_id
    );
    if (!comment) {
      return res.status(400).json({ msg: "Comment does not exist" });
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User is not authorised" });
    }

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();

    return res.status(200).json({msg: "Comment deleted successfully"});
  } catch (err) {
    raiseError(err);
  }
};

export {
  createPost,
  getAllPosts,
  getPost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  removeComment
};
