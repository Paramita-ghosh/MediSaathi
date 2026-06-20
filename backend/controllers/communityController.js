import Post from "../models/postModel.js";
import { summarizePostContent } from "../utils/geminiService.js";

// 🧾 Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Post({
      title,
      content,
      author: req.user._id,
      summary: content.length > 220 ? `${content.slice(0, 220)}...` : content,
      sentiment: "neutral",
    });

    try {
      const geminiResult = await summarizePostContent(content);
      if (geminiResult?.summary) post.summary = geminiResult.summary;
      if (geminiResult?.sentiment) post.sentiment = geminiResult.sentiment;
    } catch (innerError) {
      console.error("Gemini summarization failed:", innerError);
    }

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ message: "Failed to create post" });
  }
};

// 📋 Get all posts (sorted by likes DESC)
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name").sort({ likes: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// 👍 Like a post
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.likes += 1;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to like post" });
  }
};