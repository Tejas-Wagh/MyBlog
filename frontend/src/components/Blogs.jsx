import React from "react";
import { useQuery } from "@tanstack/react-query";
import Blog from "./Blog";
import axios from "axios";
function Blogs() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Posts"],
    queryFn: getPosts,
  });

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (isError) {
    return <p>An error occured!</p>;
  }

  if (data.length == 0) {
    return <p>No posts available</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 sm:grid-cols-1 p-32 gap-16 bg-slate-50 dark:bg-gray-900 dark:text-white">
      {data?.map((post) => (
        <Blog
          image={post.image}
          title={post.title}
          description={post.description}
          author={post.author}
          date={post.date}
          key={post._id}
          id={post._id}
        />
      ))}{" "}
    </div>
  );
}

export default Blogs;

export async function getPosts() {
  const response = await axios.get("http://localhost:3000/api/blog/posts");
  const resData = await response.data;

  return resData;
}
