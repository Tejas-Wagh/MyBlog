const express= require("express");
const {getAllPosts,getPost,editPost,newPost,deletePost, handleLike}= require("../middlewares/blogMiddlewares.js");
const { getPostsComments, saveComment,commentLike, updateContent, deleteComment } = require("../middlewares/commentsMiddleware.js");
const router= express.Router();


router.get("/posts",getAllPosts);
router.get("/post/:id",getPost);
router.post("/edit/:id",editPost);
router.post("/new",newPost);
router.delete("/delete/:id",deletePost);
router.put("/post/like/:id",handleLike)
router.get("/post/comments/:id",getPostsComments);
router.post("/post/comments/:id",saveComment);
router.post("/post/comment/:id", commentLike)
router.put("/post/comment/:id",updateContent);
router.delete("/post/comment/:id",deleteComment);

module.exports=router;