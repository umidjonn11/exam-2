import { Blog } from "../models/blog.model";
import { User } from "../models/user.model";

// Blog Controller
export const blogController = {
  // Create Blog
  async create(req, res) {
    try {
      const userId = req.user.id; // User ID from token
      const { name, description } = req.body;

      const newBlog = new Blog({
        name,
        description,
        creator: userId,
      });

      await newBlog.save();

      res.status(201).json({
        message: "Blog created successfully",
        data: newBlog,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error creating blog",
        error: error.message,
      });
    }
  },

  // Get user's blogs
  async getMyBlogs(req, res) {
    try {
      const userId = req.user.id; // User ID from token
      const blogs = await Blog.find({ creator: userId });

      res.status(200).json({
        message: "Your blogs",
        data: blogs,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching blogs",
        error: error.message,
      });
    }
  },

  // Get joined blogs
  async getMyJoinedBlogs(req, res) {
    try {
      const userId = req.user.id; // User ID from token
      const user = await User.findById(userId).populate("joinedBlogs");
      
      res.status(200).json({
        message: "Joined blogs",
        data: user.joinedBlogs,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching joined blogs",
        error: error.message,
      });
    }
  },

  // Get blog info by ID
  async getBlogInfo(req, res) {
    try {
      const blogId = req.params.id;
      const blog = await Blog.findById(blogId);

      if (!blog) {
        return res.status(404).json({
          message: "Blog not found",
        });
      }

      res.status(200).json({
        message: "Blog details",
        data: blog,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching blog details",
        error: error.message,
      });
    }
  },

  // Update blog
  async update(req, res) {
    try {
      const userId = req.user.id;
      const blogId = req.params.id;
      const { name, description } = req.body;

      const blog = await Blog.findById(blogId);

      if (!blog) {
        return res.status(404).json({
          message: "Blog not found",
        });
      }

      if (blog.creator.toString() !== userId) {
        return res.status(403).json({
          message: "You can only update your own blogs",
        });
      }

      blog.name = name || blog.name;
      blog.description = description || blog.description;

      await blog.save();

      res.status(200).json({
        message: "Blog updated successfully",
        data: blog,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating blog",
        error: error.message,
      });
    }
  },

  // Delete blog
  async delete(req, res) {
    try {
      const userId = req.user.id;
      const blogId = req.params.id;

      const blog = await Blog.findById(blogId);

      if (!blog) {
        return res.status(404).json({
          message: "Blog not found",
        });
      }

      if (blog.creator.toString() !== userId) {
        return res.status(403).json({
          message: "You can only delete your own blogs",
        });
      }

      await blog.deleteOne();

      res.status(200).json({
        message: "Blog deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting blog",
        error: error.message,
      });
    }
  },

  // Search blogs by name
  async search(req, res) {
    try {
      const searchTerm = req.query.name || "";
      const blogs = await Blog.find({
        name: { $regex: searchTerm, $options: "i" },
      });

      res.status(200).json({
        message: "Blogs found",
        data: blogs,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error searching blogs",
        error: error.message,
      });
    }
  },

  // Join blog
  async joinBlog(req, res) {
    try {
      const userId = req.user.id;
      const blogId = req.params.id;

      const blog = await Blog.findById(blogId);
      const user = await User.findById(userId);

      if (!blog) {
        return res.status(404).json({
          message: "Blog not found",
        });
      }

      if (user.joinedBlogs.includes(blogId)) {
        return res.status(400).json({
          message: "Already a member of this blog",
        });
      }

      user.joinedBlogs.push(blogId);
      await user.save();

      res.status(200).json({
        message: "Joined the blog successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error joining the blog",
        error: error.message,
      });
    }
  },

  // Leave blog
  async leaveBlog(req, res) {
    try {
      const userId = req.user.id;
      const blogId = req.params.id;

      const blog = await Blog.findById(blogId);
      const user = await User.findById(userId);

      if (!blog) {
        return res.status(404).json({
          message: "Blog not found",
        });
      }

      if (!user.joinedBlogs.includes(blogId)) {
        return res.status(400).json({
          message: "Not a member of this blog",
        });
      }

      user.joinedBlogs = user.joinedBlogs.filter(id => id.toString() !== blogId);
      await user.save();

      res.status(200).json({
        message: "Left the blog successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error leaving the blog",
        error: error.message,
      });
    }
  },
};
