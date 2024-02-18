import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import About from "./pages/About";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Details from "./pages/Details";
import EditBlog from "./pages/EditBlog";
import NewBlog from "./pages/NewBlog";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainNavigation/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewBlog />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/details/:id/edit" element={<EditBlog />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
