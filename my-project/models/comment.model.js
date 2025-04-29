import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    content: { type: String, required: true, minlength: 3 },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Comment = model("Comment", commentSchema);
