import React from "react";
import { Homepage } from "./pages/homepage";
import { Route, Routes } from "react-router-dom";
import { SinglePost } from "./pages/singlepage";
import { Search } from "./components/searchedPage";
import { Login } from "./pages/login";
import { Welcome } from "./pages/welcome";
import { CreateAcc } from "./pages/createAcc";
import { Profile } from "./pages/profile";
import { PostForm } from "./components/post-form";

function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/post/:_id" element={<SinglePost />} />
        <Route path="/search" element={<Search />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/profile/:id" element={<Homepage />} />
        <Route path="/user/create-account" element={<CreateAcc />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-post" element={<PostForm />} />
      </Routes>
    </div>
  );
}

export default App;
