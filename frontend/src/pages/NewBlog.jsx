import React, { useState } from 'react'
import BlogForm from '../components/BlogForm'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
function NewBlog() {
    const [description,setDescription]=useState("")
    const navigate= useNavigate();
    const user= useSelector((state)=>state.user.user)

    function handleCancel(){
        navigate("/");
    }
    async function handleSave(e){
        e.preventDefault();

        const formdata= new FormData(e.target);
        const response= await axios.post("http://localhost:3000/api/blog/new",{
            title:formdata.get("title"),
            image:formdata.get("image"),
            author:user.username,
            description:description,
            type:formdata.get("type")
        });

        const resData= await response.data;
        console.log(resData);
        navigate("/");
    }

  return (
    <BlogForm description={description} setDescription={setDescription} label={"Save"} handleCancel={handleCancel} handleUpdate={handleSave}/>
  )
}

export default NewBlog