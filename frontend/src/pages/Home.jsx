import React from "react";
import Blogs from "../components/Blogs";
import HeroSection from "../components/HeroSection";

function Home() {
  return (
    <>
      <div className="w-screen h-full p-8 bg-slate-[25] dark:bg-black dark:text-white">
        <HeroSection />
      </div>
      <Blogs />
    </>
  );
}

export default Home;
