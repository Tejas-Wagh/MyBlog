import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";
import { useSelector } from "react-redux";
import CommentsSection from "../components/CommentsSection";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit, FaRegEye, FaUnderline } from "react-icons/fa";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa6";

function Details() {
  const params = useParams();
  const dialog = useRef();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const { data, isError } = useQuery({
    queryKey: ["posts", params.id],
    queryFn: () => loadPost(params.id),
  });

  const alreadyLiked = data?.likes.find((e) => e == user?.email) != undefined;
  const [liked, setLiked] = useState(alreadyLiked);
  const formattedDate = new Date(data?.date).toLocaleString();
  const [likes, setLikes] = useState(0);

  useEffect(()=>{
    setLikes(data?.totalLikes)
  },[data])

  console.log(likes);
  if (isError) {
    return <p>An error occured!</p>;
  }

  function handleDelete() {
    dialog.current.open();
  }

  async function deleteBlog() {
    const response = await axios.delete(
      "http://localhost:3000/api/blog/delete/" + params.id
    );
    const resData = await response.data;
    navigate("/");
  }

  function handleEdit() {
    navigate(`/details/${params.id}/edit`);
  }

  async function handleLike() {
    const amount = liked ? -1 : 1;
    setLikes((prev) => prev + amount);
    setLiked((prev) => !prev);
    const response = await axios.put(
      "http://localhost:3000/api/blog/post/like/" + params.id,
      {
        amount: amount,
        email: user?.email,
      }
    );

    const resData = await response.data;
    console.log(resData);
  }

  return (
    <>
      <Modal
        ref={dialog}
        onProceed={deleteBlog}
        text="You want to delete the blog." 
      />
      <div className="w-screen bg-slate-[25] ">
        <div className="flex flex-col items-center justify-center bg-white  px-14 py-10 md:px-24 md:py-20 space-y-8 dark:bg-black dark:text-white ">
          <div className="flex justify-between flex-row  gap-12">
            <div className="md:-ml-96">
              <h3 className="text-xl md:text-left text-cyan-600">
                {data?.author}
              </h3>
              <p>{formattedDate}</p>
            </div>
            <div className="md:-mr-96 space-x-5">
              <button
                className="text-lg bg-gray-700 px-6 py-2 text-white rounded-lg hover:bg-gray-600 hover:scale-105 duration-200 disabled:bg-gray-600"
                onClick={handleEdit}
                disabled={user?.username != data?.author}
              >
                <FaRegEdit />
              </button>
              <button
                className="text-lg bg-red-700 px-5 py-2 text-white rounded-lg hover:bg-red-600 hover:scale-105 duration-200 disabled:bg-gray-600"
                onClick={handleDelete}
                disabled={user?.username != data?.author}
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          </div>
          <h1 className="text-5xl text-center md:w-[700px] leading-snug">
            {data?.title}
          </h1>
          <img
            src={data?.image}
            alt=""
            className="w-[550px] md:w-[850px] rounded-lg object-contain shadow-xl"
          />
          <div className="flex w-full justify-between md:w-[830px]">
            <div className="flex gap-4">
              <h3>{likes}</h3>
              <button
                onClick={handleLike}
                className="flex gap-2"
                disabled={!user}
              >
                {liked ? (
                  <AiFillLike size={"1.5em"} />
                ) : (
                  <AiOutlineLike size={"1.5em"} />
                )}
              </button>
              {/* <FaRegCommentDots size={"1.5em"} /> */}
            </div>
            <div className="flex gap-4">
              <div>
                <FaRegEye size="1.5em" />
              </div>
              <p>{data?.views}</p>
            </div>
          </div>

          <hr className="h-1 border-t-2 w-full md:w-[850px] border-solid" />

          <div
            className=" md:w-[850px] mt-3 post-content"
            dangerouslySetInnerHTML={{ __html: data?.description }}
          ></div>
          <CommentsSection />
        </div>
      </div>
    </>
  );
}

export default Details;

const loadPost = async (id) => {
  const response = await axios.get("http://localhost:3000/api/blog/post/" + id);
  const resData = await response.data;
  return resData;
};
