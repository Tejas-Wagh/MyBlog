import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cmt from "./Cmt";
function CommentsSection() {
  const [comments, setComment] = useState([]);
  const navigate= useNavigate();

  const user = useSelector((state) => state.user.user);
  const { id } = useParams();
  const content = useRef();
  console.log(comments);

  async function postComment(e) {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3000/api/blog/post/comments/:id",
      {
        content: content.current.value,
        userId: user._id,
        postId: id,
        email: user.email,
      }
    );
    const resData = await response.data;
    setComment(resData);
  }

  useEffect(() => {
    async function loadComments() {
      const response = await axios.get(
        "http://localhost:3000/api/blog/post/comments/" + id
      );
      const resData = await response.data;
      setComment(resData);
    }
    loadComments();
  }, [comments]);

  function deleteComment(id){
    const response= axios.delete("http://localhost:3000/api/blog/post/comment/"+id);
    const resData= response.data;
    setComment(resData);
    
  }

  return (
    <div className="flex flex-col md:w-[850px] w-[450px] gap-8 py-12 bg-slate-[25]">
      <h2 className="text-2xl font-semibold">Comments Section</h2>
      <div>
        {user && (
          <div>
            <form
              onSubmit={postComment}
              className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-5"
            >
              <input
                ref={content}
                type="text"
                id="comment"
                name="comment"
                placeholder="Write a Comment"
                className="bg-gray-100  dark:text-black rounded-lg py-3 px-4 w-full md:w-[650px] placeholder:text-lg placeholder:text-gray-700 focus:outline-none"
              />
              <button className="px-4 py-2 w-[150px] bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-500 rounded-xl text-white focus:outline-none hover:bg-gray-500 hover:scale-110 duration-150 transition ">
                Post
              </button>
            </form>
          </div>
        )}
        {!user && <div>Sign In to post a comment</div>}
      </div>
      <div>
        {comments?.length == 0 && <p>No comments yet</p>}
        <div>
          {comments?.length > 0 &&
            comments?.map((comment) => (
              <Cmt
              deleteComment= {()=>deleteComment(comment?._id)}
                userId={comment.userId}
                key={comment._id}
                content={comment?.content}
                email={comment?.email}
                id={comment._id}
                likes={comment.numberOfLikes}
                isLiked= {comment.likes.find((e)=>e==user?.email) != undefined ? true : false}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default CommentsSection;
