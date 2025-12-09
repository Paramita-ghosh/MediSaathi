import express from "express";
import { createPost, getPosts, likePost } from "../controllers/communityController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getPosts)
  .post(protect, createPost);

router.route("/:id/like")
  .put(protect, likePost);


export default router;