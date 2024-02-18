const { Comment } = require("../db/index.js");
const getPostsComments = async (req, res, next) => {
  const postId = req.params.id;

  const comments = await Comment.find({ postId });

  return res.status(200).json(comments);
};

const saveComment = async (req, res, next) => {
  const newComment = new Comment({
    content: req.body.content,
    postId: req.body.postId,
    userId: req.body.userId,
    email: req.body.email,
    numberOfLikes: 0,
    likes: [],
  });

  try {
    await newComment.save();

    const comments = await Comment.find();

    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
  }
};

const commentLike = async (req, res, next) => {
  const commmentId = req.params.id;
  const amount = req.body.amount;
  const email = req.body.email;
  const preComment = await Comment.findOne({ _id: commmentId });
  if (amount > 0) {
    await Comment.findByIdAndUpdate(
      commmentId,
      {
        $set: {
          numberOfLikes: preComment.numberOfLikes + amount,
        },
        $push: {
          likes: email,
        },
      },
      { new: true }
    );
  } else {
    await Comment.findByIdAndUpdate(
      commmentId,
      {
        $set: {
          numberOfLikes: preComment.numberOfLikes + amount,
        },
        $pull: {
          likes: email,
        },
      },
      { new: true }
    );
  }

  res.status(200).json({message:amount>0 ? "Liked" : "Unliked"});
};

const updateContent = async (req, res) => {
  const updatedContent = req.body.content;
  const id = req.params.id;
  await Comment.updateOne({ _id: id }, { content: updateContent });
  res.status(200).json({
    message: "Successfull!",
  });
};

const deleteComment = async (req, res) => {
  const id = req.params.id;
  await Comment.deleteOne({ _id: id });

  const resData= await Comment.find();
  res.status(200).json(resData);
};

module.exports = {
  getPostsComments,
  saveComment,
  commentLike,
  updateContent,
  deleteComment,
};
