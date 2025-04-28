import { Comment } from "../models/comment.model.js";

// Comment Controller
export const commentController = {
  async create(req, res) {
    try {
      const userId = req.user.id;
      const { postId, content } = req.body;

      const comment = new Comment({
        post: postId,
        content,
        creator: userId,
      });

      await comment.save();

      res.status(201).json({
        message: "Comment created successfully",
        data: comment,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error creating comment",
        error: error.message,
      });
    }
  },

  async update(req, res) {
    try {
      const commentId = req.params.id;
      const { content } = req.body;
      const userId = req.user.id;

      const comment = await Comment.findById(commentId);

      if (!comment) {
        return res.status(404).json({
          message: "Comment not found",
        });
      }

      if (comment.creator.toString() !== userId) {
        return res.status(403).json({
          message: "You can only update your own comments",
        });
      }

      comment.content = content || comment.content;

      await comment.save();

      res.status(200).json({
        message: "Comment updated successfully",
        data: comment,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating comment",
        error: error.message,
      });
    }
  },

  async delete(req, res) {
    try {
      const commentId = req.params.id;
      const userId = req.user.id;

      const comment = await Comment.findById(commentId);

      if (!comment) {
        return res.status(404).json({
          message: "Comment not found",
        });
      }

      if (comment.creator.toString() !== userId) {
        return res.status(403).json({
          message: "You can only delete your own comments",
        });
      }

      await comment.deleteOne();

      res.status(200).json({
        message: "Comment deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting comment",
        error: error.message,
      });
    }
  }
};
