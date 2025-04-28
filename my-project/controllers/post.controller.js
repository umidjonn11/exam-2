import { Post } from "../models/post.model.js";
import { Blog } from "../models/blog.model.js";

export const postController = {
  // Create Post
  async create(req, res) {
    try {
      const userId = req.params.userId; // Get userId from URL params
      const blogId = req.params.blogId; // Get blogId from URL params
      const { title, content } = req.body; // Post title and content come from the body

      // Check if the Blog exists
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      // Create a new Post document
      const newPost = new Post({
        title,
        content,
        blog: blogId,
        creator: userId,
      });

      await newPost.save();

      res.status(201).json({
        message: "Post created successfully",
        data: newPost,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error creating post",
        error: error.message,
      });
    }
  },

  // Get all Posts for a Blog
  async getAll(req, res) {
    try {
      const blogId = req.params.blogId; // blogId from URL params
      const posts = await Post.find({ blog: blogId });

      res.status(200).json({
        message: "Posts fetched successfully",
        data: posts,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching posts",
        error: error.message,
      });
    }
  },

  // Get Post by ID
  async getById(req, res) {
    try {
      const postId = req.params.postId; // postId from URL params
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({
          message: "Post not found",
        });
      }

      post.views += 1; // Increment views on every fetch
      await post.save();

      res.status(200).json({
        message: "Post fetched successfully",
        data: post,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching post",
        error: error.message,
      });
    }
  },

  // Update Post
  async update(req, res) {
    try {
      const userId = req.params.userId;
      const postId = req.params.postId;
      const { title, content } = req.body;

      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({
          message: "Post not found",
        });
      }

      if (post.creator.toString() !== userId) {
        return res.status(403).json({
          message: "You can only update your own posts",
        });
      }

      post.title = title || post.title;
      post.content = content || post.content;

      await post.save();

      res.status(200).json({
        message: "Post updated successfully",
        data: post,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating post",
        error: error.message,
      });
    }
  },

  // Delete Post
  async delete(req, res) {
    try {
      const userId = req.params.userId;
      const postId = req.params.postId;

      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({
          message: "Post not found",
        });
      }

      if (post.creator.toString() !== userId) {
        return res.status(403).json({
          message: "You can only delete your own posts",
        });
      }

      await post.deleteOne();

      res.status(200).json({
        message: "Post deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting post",
        error: error.message,
      });
    }
  },

  // Sort Posts by date (newest first)
  async sortByDate(req, res) {
    try {
      const blogId = req.params.blogId;
      const posts = await Post.find({ blog: blogId }).sort({ createdAt: -1 });

      res.status(200).json({
        message: "Posts sorted by date",
        data: posts,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error sorting posts",
        error: error.message,
      });
    }
  }
};
