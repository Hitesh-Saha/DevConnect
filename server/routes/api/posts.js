import { Router } from "express";
import auth from "../../middleware/auth.js";
import { check } from "express-validator";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  likePost,
  removeComment,
  unlikePost,
  addComment
} from "../../operations/postop.js";

const router = Router();

//Add a post data
//Endpoint api/posts/
router.post(
  "/",
  [auth, check("text", "Text is required").not().isEmpty()],
  async (req, res) => {
    createPost(req, res);
  }
);

//Get all post data
//Endpoint api/posts/
router.get("/", auth, async (req, res) => {
  getAllPosts(req, res);
});

//Get a post data
//Endpoint api/posts/:id
router.get("/:id", auth, async (req, res) => {
  getPost(req, res);
});

//Delete a post data
//Endpoint api/posts/:id
router.delete("/:id", auth, async (req, res) => {
  deletePost(req, res);
});

//Like a post
//Endpoint api/posts/like/:id
router.put("/like/:id", auth, async (req, res) => {
  likePost(req, res);
});

//Unlike a post
//Endpoint api/posts/unlike/:id
router.put("/unlike/:id", auth, async (req, res) => {
  unlikePost(req, res);
});

//Add a comment
//Endpoint api/posts/comment/:id
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    addComment(req, res);
  }
);

//Delete a comment
//Endpoint api/posts/comment/:id/:comment_id
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  removeComment(req, res);
});

export default router;
