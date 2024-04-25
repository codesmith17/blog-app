import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PostPage from "./pages/PostPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Search from "./pages/Search";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPricateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/sign-in" element={<Signin></Signin>}></Route>
        <Route path="/sign-up" element={<Signup></Signup>}></Route>
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route
            path="/create-post"
            element={<CreatePost></CreatePost>}
          ></Route>
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/projects" element={<Projects></Projects>}></Route>{" "}
        <Route path="/post/:postSlug" element={<PostPage />} />
      </Routes>{" "}
      <Footer></Footer>
    </BrowserRouter>
  );
}
