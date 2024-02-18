const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO).then(() => console.log("success"));

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      default:
        "https://image.shutterstock.com/image-photo/blog-blogging-homepage-social-media-260nw-381746308.jpg",
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
    },
    date: Date,
    totalLikes: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },

    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);
const Post = new mongoose.model("Post", postSchema);
const Comment = new mongoose.model("Comment", commentSchema);
module.exports = { User, Post, Comment };
