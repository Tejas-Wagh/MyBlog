const {Post} = require("../db/index.js");
const { errorHandler } = require("./errorMiddleware.js");

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  const id = req.params.id;

  try {
    const post = await Post.findOne({ _id: id });
    const prevViews= post.views;
    await Post.findByIdAndUpdate(id,{
        $set:{
            views:prevViews+1
        }
    },{new:true})

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const newPost = async (req, res, next) => {
  const newPost = new Post({
    image: req.body.image,
    title: req.body.title,
    type: req.body.type,
    description: req.body.description,
    author: req.body.author,
    date:new Date(),
    totalLikes:0,
    likes:[],
    views:0,
  });

  try {
    await newPost.save();
    res.status(200).json({ message: "Post created!" });
  } catch (error) {
    next(error);
  }
};

const editPost = async (req, res, next) => {
  const id = req.params.id;

  try {
    const post = await Post.findOne({ _id: id });

    if (!post) {
      next(errorHandler(404, "Post is not available!"));
    }

    await Post.findByIdAndUpdate(id, {
      $set: {
        photo: req.body.image,
        title: req.body.title,
        type: req.body.type,
        description: req.body.description,
      },
    },{new:true});

    res.status(200).json({ message: "Post Updated!" });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Post Deleted!" });
  } catch (error) {
    next(error);
  }
};

const handleLike= async(req,res)=>{
  const amount=req.body.amount;

  if(amount>0){
    await Post.updateOne({_id:req.params.id},{
      $inc:{
        totalLikes:amount,
      },
      $push:{
        likes:req.body.email,
      }
    })
  }else{
    await Post.updateOne({_id:req.params.id},{
      $inc:{
        totalLikes:amount,
      },
      $pull:{
        likes:req.body.email,
      }
    })
  }
}


module.exports={
    getAllPosts,
    getPost,
    editPost,
    newPost,
    deletePost,
    handleLike
}