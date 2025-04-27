import { Post } from "../models/index.js";
import { Blog } from "../models/index.js";

// Post Controller
export const postController = {
  async create(req, res) {
    try {
      const userId = req.user.id; // User ID from token
      const { blogId, title, content } = req.body;

      const blog = await Blog.findById(blogId);

      if (!blog) {
        return res.status(404).json({
          message: "Blog not found",
        });
      }

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

  async getAll(req, res) {
    try {
      const blogId = req.params.blogId;
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

  async getById(req, res) {
    try {
      const postId = req.params.id;
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({
          message: "Post not found",
        });
      }

      post.views += 1; // Increment views count
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

  async update(req, res) {
    try {
      const postId = req.params.id;
      const { title, content } = req.body;
      const userId = req.user.id;

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

  async delete(req, res) {
    try {
      const postId = req.params.id;
      const userId = req.user.id;

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
