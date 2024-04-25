import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import Footer from "./components/Footer";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPricateRoute";
import CreatePost from "./pages/CreatePost";
export default function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/sign-in" element={<Signin></Signin>}></Route>
        <Route path="/sign-up" element={<Signup></Signup>}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route
            path="/create-post"
            element={<CreatePost></CreatePost>}
          ></Route>
        </Route>
        <Route path="/projects" element={<Projects></Projects>}></Route>
      </Routes>{" "}
      <Footer></Footer>
    </BrowserRouter>
  );
}
