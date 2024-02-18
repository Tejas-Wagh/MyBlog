import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BlogForm from "../components/BlogForm";

function EditBlog() {
  const params = useParams();
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["posts", params.id],
    queryFn: () => loadPost(params.id),
  });

  const [description, setDescription] = useState(data?.description || "");
  const [image, setImage] = useState(data?.image || "");
  const disabledTrue = data?.type ? "" : "disabled";

  function handleCancel() {
    navigate("./");
  }
  async function handleUpdate(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const response = await axios.post(
      "http://localhost:3000/api/blog/edit/" + params.id,
      {
        title: data.get("title"),
        // author:data.get("author"),
        description: description,
        type: data.get("type"),
      }
    );

    navigate("/details/" + params.id);
  }
  return <BlogForm handleUpdate={handleUpdate} handleCancel={handleCancel} title={data?.title} author={data?.author} description={description} type={data?.type} image={data?.image} label={"Update"} disabledTrue={disabledTrue} setDescription={setDescription}/>
}

export default EditBlog;

const loadPost = async (id) => {
    const response = await axios.get("http://localhost:3000/api/blog/post/" + id);
    const resData = await response.data;
    return resData;
  };
  