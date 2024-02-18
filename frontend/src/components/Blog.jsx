import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Blog({ image, title, description, author, date, id }) {
const navigate= useNavigate();
console.log(description);
  function handleClick(){
    navigate(`/details/${id}`);
  }

  const formattedDesc= description.length > 50 ? description.slice(0,120)+"...": description;

  return (
    <div className="flex flex-col bg-white border border-slate-200 shadow-xl rounded-lg hover:scale-105 transition hover:duration-200 p-2 gap-4 dark:bg-black dark:text-white">
      <div className="h-full">
        <img src={image} alt="Blog-Image" className="w-full h-full object-cover" />
      </div>

      <div className="px-2 py-2 h-full">
        <h1 className=" text-2xl font-semibold text-gray-700 mt-1 dark:text-white">{title}</h1>
        <div className="text-slate-600 mt-2 dark:text-white" dangerouslySetInnerHTML={{__html:formattedDesc}}></div>
        <p className="mt-3">By {author}</p>
        <p className="mt-1">{new Date(date).toLocaleString()}</p>
        <button className="order-2 my-3 w-full bg-slate-700  dark:bg-gray-700 px-2 py-4 rounded-lg text-white hover:bg-slate-500 hover:text-black " onClick={handleClick}>Read More</button>
      </div>
    </div>
  );
}

export default Blog;
