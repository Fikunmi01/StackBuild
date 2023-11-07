import React from "react";
import { Homepage } from "./pages/homepage";
import { Route, Routes } from "react-router-dom";
import { SinglePost } from "./pages/singlepage";
import { Search } from "./components/searchedPage";
import { Login } from "./pages/login";
import { Welcome } from "./pages/welcome";
import { CreateAcc } from "./pages/createAcc";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/post/:postId" element={<SinglePost />} />
        <Route path="/search" element={<Search />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/login/:username" element={<Homepage />} />
        <Route path="/user/create-account" element={<CreateAcc />} />
        <Route path="/welcome" element={<Welcome/>}/>
      </Routes>
    </div>
  );
}

export default App;
