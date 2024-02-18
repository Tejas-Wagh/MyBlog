import React from "react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center space-y-10 my-24  text-left md:mx-5">
      <h1 className="md:text-6xl text-5xl  text-cyan-600 font-semibold dark:text-white">
        Explore, Learn, Inspire: Your Gateway to Knowledge
      </h1>
      <p className="text-slate-800 font-light md:text-md text-left dark:text-white">
        Dive into the world of insightful articles, captivating stories, and
        expert advice. Unleash your curiosity, ignite your passion, and embark
        on a journey of discovery. Join our vibrant community of learners and
        explorers as we delve into the depth of knowledge together.{" "}
        <Link className="font-semibold text-lg text-cyan-600" to={"/signup"}>
          Start your adventure today{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            // stroke-width="1.5"
            stroke="currentColor"
            className="w-5 h-5 inline"
          >
            <path
              // stroke-linecap="round"
              // stroke-linejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </Link>
      </p>
    </div>
  );
}

export default HeroSection;
