import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar } from "flowbite-react";
import { FaSun, FaMoon } from "react-icons/fa";
import { toggleTheme } from "../store/themeslice";
function MainNavigation() {
  const user = useSelector((state) => state.user.user);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <Navbar className="flex justify-between items-center mb-0 p-4 text-black  border-b shadow-sm bg-slate-50 dark:bg-gray-900 dark:text-white">
      <h1 className="font-semibold text-3xl  hover:scale-110 transition duration-150 md:ml-8">
        MyBlog
      </h1>

      <div className="flex space-x-6 md:order-2">
        <Button
          className="w-12 h-10  sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme == "light" ? <FaMoon /> : <FaSun />}
        </Button>
        <Link to="/login">
          <Button gradientDuoTone="purpleToBlue" outline>
            Sign In
          </Button>
        </Link>

        {user?.email && (
          <NavLink to={"/profile"}>
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-10 h-10 object-cover rounded-full hover:scale-110 hover:duration-150 transition"
            />
          </NavLink>
        )}

        <Navbar.Toggle />
      </div>

      {/* <div>
        <ul className="flex md:gap-8 gap-4 md:mr-6"></ul>
        <Navbar.Toggle />
      </div> */}

      <Navbar.Collapse>
        <Navbar.Link as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        {user?.email && (
          <Navbar.Link as={"div"}>
            <Link to="/new">New Blog</Link>
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MainNavigation;
