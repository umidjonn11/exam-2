// models/blog.model.js
import { Schema, model } from "mongoose";

const blogSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
    },
    creator: {
      type: Schema.Types.ObjectId, // This still refers to the User model
      ref: "User",
      required: true, // Ensure the creator field is still mandatory
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", // members will also reference the User model
      },
    ],
  },
  { timestamps: true } // Include createdAt and updatedAt timestamps
);

export const Blog = model("Blog", blogSchema);
